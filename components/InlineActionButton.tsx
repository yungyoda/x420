import * as React from "react";

interface InlineActionButtonProps {
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
  ariaLabel?: string;
  icon?: React.ReactNode;
}

export default function InlineActionButton({ loading, disabled, onClick, ariaLabel = 'Continue', icon }: InlineActionButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled || loading}
      className={`h-8 w-8 md:h-9 md:w-9 rounded-full border border-white/10 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300/40 ${disabled || loading
        ? 'bg-white/5 text-white/40 cursor-not-allowed'
        : 'bg-white/5 hover:bg-white/10 text-white/90 cursor-pointer'
        }`}
    >
      {loading ? (
        <span className="inline-block h-3 w-3 md:h-4 md:w-4 animate-spin rounded-full border-2 border-white/60 border-r-transparent" />
      ) : (
        icon ?? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
            <path d="M5 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      )}
    </button>
  );
}
