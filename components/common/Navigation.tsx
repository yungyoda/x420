"use client";

import * as React from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import { useRouter, usePathname } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-8"
    >
      <Button
        onClick={() => router.push('/')}
        variant="ghost"
        size="sm"
        className="px-3 py-2"
      >
        <span className="text-lg font-semibold heading-gradient">x402</span>
      </Button>

      {pathname === '/' && (
        <Button
          onClick={() => router.push('/entries')}
          variant="ghost"
          size="sm"
          className="px-4 py-2"
        >
          Browse All APIs
        </Button>
      )}

      {pathname === '/entries' && (
        <Button
          onClick={() => router.push('/')}
          variant="ghost"
          size="sm"
          className="px-3 py-2"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path 
              d="M15 18l-6-6 6-6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </Button>
      )}
    </motion.nav>
  );
}
