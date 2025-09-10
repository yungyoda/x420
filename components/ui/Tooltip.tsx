"use client";

import * as React from "react";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

export default function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = React.useState<{ top: number; left: number } | null>(null);

  React.useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spacing = 8;
    let top = rect.top + window.scrollY;
    let left = rect.left + window.scrollX;

    switch (side) {
      case 'top':
        top = top - spacing;
        left = left + rect.width / 2;
        break;
      case 'bottom':
        top = top + rect.height + spacing;
        left = left + rect.width / 2;
        break;
      case 'left':
        top = top + rect.height / 2;
        left = left - spacing;
        break;
      case 'right':
        top = top + rect.height / 2;
        left = left + rect.width + spacing;
        break;
    }

    setPosition({ top, left });
  }, [open, side]);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div ref={triggerRef} className="inline-flex">
        {children}
      </div>
      {open && position && (
        <div
          className="pointer-events-none fixed z-50"
          style={{ top: position.top, left: position.left, transform: 'translate(-50%, -100%)' }}
        >
          <div className="rounded-md bg-black/80 text-white text-xs px-2 py-1 shadow-lg border border-white/10 whitespace-nowrap">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}


