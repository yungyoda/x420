"use client";

import * as React from "react";

type ToastType = "default" | "success" | "error" | "warning";

export interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: ToastType;
  durationMs?: number;
}

export interface ToastItem extends Required<Omit<ToastOptions, "id" | "durationMs">> {
  id: string;
  durationMs: number;
}

type ToastContextValue = {
  toasts: ToastItem[];
  show: (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
  clear: () => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

function variantClasses(type: ToastType) {
  switch (type) {
    case "success":
      return "border border-emerald-300/30 bg-emerald-400/20";
    case "error":
      return "border border-rose-300/30 bg-rose-400/20";
    case "warning":
      return "border border-amber-300/30 bg-amber-400/20";
    default:
      return "border border-white/15 bg-white/10";
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clear = React.useCallback(() => setToasts([]), []);

  const show = React.useCallback((opts: ToastOptions) => {
    const id = opts.id ?? Math.random().toString(36).slice(2);
    const item: ToastItem = {
      id,
      title: opts.title ?? "",
      description: opts.description ?? "",
      type: opts.type ?? "default",
      durationMs: Math.max(1000, Math.min(15000, opts.durationMs ?? 3500)),
    };
    setToasts((prev) => [...prev, item]);

    if (item.durationMs !== Infinity) {
      window.setTimeout(() => dismiss(id), item.durationMs);
    }

    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toasts, show, dismiss, clear }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[60] flex flex-col items-end gap-3 p-4">
        {toasts.map((t) => (
          <div key={t.id} className={`glass-toast ${variantClasses(t.type)} pointer-events-auto`}>
            <div className="flex-1">
              {t.title ? <div className="toast-title">{t.title}</div> : null}
              {t.description ? <div className="toast-desc">{t.description}</div> : null}
            </div>
            <button className="toast-close" onClick={() => dismiss(t.id)}>Close</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;



