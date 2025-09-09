"use client";

import * as React from "react";

interface CopyButtonProps {
  text: string;
  onCopied?: () => void;
}

export default function CopyButton({ text, onCopied }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  
  return (
    <button
      type="button"
      aria-label="Copy ID"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          onCopied?.();
          setTimeout(() => setCopied(false), 1200);
        } catch { }
      }}
      className={`h-8 w-8 md:h-9 md:w-9 rounded-full border border-emerald-300/30 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300/40 bg-emerald-400/20 text-emerald-200`}
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <rect x="2" y="2" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )}
    </button>
  );
}
