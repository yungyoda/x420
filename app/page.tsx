"use client";

import * as React from "react";
import { motion } from "motion/react";
import Input, { InputWithButton } from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AnimatedGradientBackground from "@/components/AnimatedGradientBackground";
import { useCreateEntry } from "@/hooks/useCreateEntry";
import { useToast } from "@/components/ui/Toast";
import { useEntries } from "@/hooks/useEntries";
import EntryCard from "@/components/EntryCard";
import InlineActionButton from "@/components/InlineActionButton";
import Tooltip from "@/components/ui/Tooltip";
import { useHealthCheck } from "@/hooks/useHealthCheck";
import CopyButton from "@/components/CopyButton";
import Navigation from "@/components/common/Navigation";

export default function Home() {
  const [endpoint, setEndpoint] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [wallet, setWallet] = React.useState("");
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const advancedContentRef = React.useRef<HTMLDivElement>(null);
  const [advancedMaxHeight, setAdvancedMaxHeight] = React.useState(0);
  const entriesContentRef = React.useRef<HTMLDivElement>(null);
  const [entriesMaxHeight, setEntriesMaxHeight] = React.useState(0);
  const [entriesVisible, setEntriesVisible] = React.useState(false);
  const CONTAINER_PADDING_PX = 12; // px-3 = 12px

  const { show } = useToast();
  const { mutate, isPending } = useCreateEntry();
  const { check: runHealthCheck, isChecking } = useHealthCheck();
  const [createdId, setCreatedId] = React.useState<string | null>(null);
  const { data: entriesData, isLoading: entriesLoading, refetch: refetchEntries } = useEntries({ limit: 3, sort: 'newest' });
  const entries = entriesData?.entries ?? [];
  const totalEntries = entriesData?.pagination?.total ?? 0;

  // Get current domain for ID prefixing
  const getDomainId = (id: string) => {
    if (typeof window === 'undefined') return id;
    return `${window.location.origin}/api/${id}`;
  };

  React.useEffect(() => {
    const el = advancedContentRef.current;
    if (!el) return;
    const updateHeight = () => {
      setAdvancedMaxHeight(showAdvanced ? el.scrollHeight + CONTAINER_PADDING_PX * 2 : 0);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [showAdvanced, title, amount, description, wallet]);

  React.useEffect(() => {
    const el = entriesContentRef.current;
    if (!el) return;
    const updateHeight = () => {
      const hasEntries = entries.length > 0 && !entriesLoading;
      setEntriesVisible(hasEntries);
      setEntriesMaxHeight(hasEntries ? el.scrollHeight + CONTAINER_PADDING_PX * 2 : 0);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [entries, entriesLoading]);

  React.useEffect(() => {
    setShowAdvanced(endpoint.trim().length > 0);
  }, [endpoint]);

  const handleFieldChange = (name: string, value: string) => {
    // Update the field value
    switch (name) {
      case 'endpoint':
        setEndpoint(value);
        break;
      case 'title':
        setTitle(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'wallet':
        setWallet(value);
        break;
    }

    // Clear error for this field if it's now valid
    const error = validateField(name, value);
    if (!error && errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'endpoint':
        if (!value.trim()) return 'API endpoint is required';
        if (!value.match(/^https?:\/\/.+/)) return 'Please enter a valid URL (http:// or https://)';
        return '';
      case 'title':
        if (!value.trim()) return 'Title is required';
        if (value.trim().length < 3) return 'Title must be at least 3 characters';
        return '';
      case 'amount':
        if (!value.trim()) return 'Amount is required';
        const numAmount = parseFloat(value);
        if (isNaN(numAmount) || numAmount <= 0) return 'Please enter a valid amount greater than 0';
        return '';
      case 'description':
        if (!value.trim()) return 'Description is required';
        if (value.trim().length < 10) return 'Description must be at least 10 characters';
        return '';
      case 'wallet':
        if (!value.trim()) return 'Wallet address is required';
        if (!value.match(/^0x[a-fA-F0-9]{40}$/)) return 'Please enter a valid Ethereum address';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const fields = { endpoint, title, amount, description, wallet };

    Object.entries(fields).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = endpoint.trim().length > 0 &&
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    amount.trim().length > 0 &&
    wallet.trim().length > 0 &&
    Object.keys(errors).length === 0;

  const containerVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 }
    },
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.02, staggerDirection: -1 }
    }
  } as const;

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 8 }
  } as const;

  return (
    <div className="relative px-4 py-10 md:py-16 min-h-screen flex flex-col justify-center">
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <Navigation />
        <div className="text-center mb-8 md:mb-12 space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight heading-gradient"
          >
            x402 Proxy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-white/70 max-w-xl mx-auto text-sm md:text-base"
          >
            Temporarily setup paywalls for any API
          </motion.p>
        </div>

        <div className="space-y-5 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <InputWithButton
              value={createdId ? getDomainId(createdId) : endpoint}
              onChange={(e) => handleFieldChange('endpoint', e.target.value)}
              placeholder="Enter your public API endpoint (e.g. https://api.example.com/data)"
              className="h-12 md:h-14 !rounded-full px-3 md:px-3 text-base md:text-lg"
              error={errors.endpoint}
              disabled={!!createdId}
              variant={createdId ? 'success' : 'default'}
              rightButton={
                createdId ? (
                  <CopyButton
                    text={getDomainId(createdId)}
                    onCopied={() => show({ type: 'success', title: 'Copied', description: 'ID copied to clipboard' })}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Tooltip content="Check if your endpoint works via the proxy">
                      <InlineActionButton
                        loading={isChecking}
                        disabled={!endpoint || !!createdId || isChecking}
                        ariaLabel="Health check"
                        icon={
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                            <path d="M3 12h4l2-5 4 10 2-5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        }
                        onClick={async () => {
                          if (!endpoint) return;
                          try {
                            const res = await runHealthCheck(endpoint);
                            const statusText = `${res.status} ${res.statusText}`;
                            if (res.ok) {
                              show({ type: 'success', title: 'Endpoint reachable', description: statusText });
                              // Open in new tab to show actual response
                              const url = `/api/health?${new URLSearchParams({ endpoint }).toString()}`;
                              window.open(url, '_blank');
                            } else {
                              show({ type: 'error', title: 'Health check failed', description: statusText });
                            }
                          } catch (e) {
                            show({ type: 'error', title: 'Health check error', description: (e as Error).message });
                          }
                        }}
                      />
                    </Tooltip>
                    <Tooltip content="Create temporary x402 proxy for your endpoint">
                      <InlineActionButton
                        loading={isPending}
                        disabled={!isFormValid || isPending}
                        ariaLabel="Create proxy"
                        onClick={() => {
                          if (!validateForm() || isPending) return;
                          mutate(
                            { endpoint, title, description, amount, wallet },
                            {
                              onSuccess: (data) => {
                                setCreatedId(data.id);
                                show({ type: 'success', title: 'Proxy created', description: `ID: ${data.id}` });
                                refetchEntries();
                              },
                              onError: (error) => {
                                show({ type: 'error', title: 'Failed to create entry', description: error.message });
                              },
                            }
                          );
                        }}
                      />
                    </Tooltip>
                  </div>
                )
              }
            />
          </motion.div>

          <div
            className="overflow-hidden transition-all duration-300 ease-out px-3"
            style={{ maxHeight: advancedMaxHeight }}
            aria-hidden={!showAdvanced}
          >
            <motion.div
              ref={advancedContentRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
              initial={false}
              variants={containerVariants}
              animate={showAdvanced ? 'open' : 'closed'}
              style={{ pointerEvents: showAdvanced ? 'auto' : 'none' }}
            >
              <motion.div variants={itemVariants}>
                <Input
                  label="Title"
                  value={title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="My API Paywall"
                  error={errors.title}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input
                  label="Amount (USDC)"
                  value={amount}
                  onChange={(e) => handleFieldChange('amount', e.target.value)}
                  placeholder="0.01"
                  inputMode="decimal"
                  error={errors.amount}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input
                  label="Description"
                  value={description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Brief description of your API"
                  error={errors.description}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input
                  label="Wallet Address"
                  value={wallet}
                  onChange={(e) => handleFieldChange('wallet', e.target.value)}
                  placeholder="0x..."
                  error={errors.wallet}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="sm:col-span-2 flex items-center gap-2 pt-2">
                <Badge
                  variant="muted"
                  icon={<img src="/base-logo-white.png" alt="Base" className="w-3 h-3" />}
                >
                  Base
                </Badge>
                <Badge
                  variant="muted"
                  icon={<img src="/usdc-logo-white.png" alt="USDC" className="w-3 h-3" />}
                >
                  USDC
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-5xl mt-10">
        <div
          className="overflow-hidden transition-all duration-300 ease-out p-3"
          style={{ maxHeight: entriesMaxHeight }}
          aria-hidden={!entriesVisible}
        >
          <motion.div
            ref={entriesContentRef}
            className="space-y-6"
            initial={false}
            variants={containerVariants}
            animate={entriesVisible ? 'open' : 'closed'}
            style={{ pointerEvents: entriesVisible ? 'auto' : 'none' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {entries.map((entry) => (
                <motion.div key={entry.id} variants={itemVariants}>
                  <EntryCard entry={entry} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatedGradientBackground />
    </div>
  );
}

