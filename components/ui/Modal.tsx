"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="glass-modal-overlay" onClick={onClose}>
      <div className="glass-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal>
        {title ? <div className="mb-2 text-lg font-semibold heading-gradient">{title}</div> : null}
        <div className="text-white/85 modal-content flex-1 min-h-0">{children}</div>
        {footer ? (
          <div className="mt-4 shrink-0">
            <div className="glass-divider" />
            <div className="pt-4">{footer}</div>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}

export default Modal;



