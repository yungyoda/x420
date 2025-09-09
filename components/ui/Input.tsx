"use client";

import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || React.useId();
    
    const inputElement = (
      <input 
        ref={ref} 
        id={inputId}
        className={[
          "glass-input", 
          error ? "border-rose-300/30 bg-rose-400/10 focus:ring-rose-300/40" : "",
          className
        ].filter(Boolean).join(" ")} 
        {...props} 
      />
    );
    
    if (label || error) {
      return (
        <div className="space-y-2">
          {label && (
            <label htmlFor={inputId} className="block text-sm font-medium text-white/90">
              {label}
            </label>
          )}
          {inputElement}
          {error && (
            <p className="text-sm text-rose-400">{error}</p>
          )}
        </div>
      );
    }
    
    return inputElement;
  }
);

Input.displayName = "Input";

export interface InputWithButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  label?: string;
  error?: string;
  variant?: 'default' | 'error' | 'success';
}

export const InputWithButton = React.forwardRef<HTMLInputElement, InputWithButtonProps>(
  ({ className, leftButton, rightButton, label, error, id, variant = 'default', ...props }, ref) => {
    const inputId = id || React.useId();
    
    const isError = !!error || variant === 'error';
    const isSuccess = variant === 'success';

    const inputElement = (
      <div className={[
        "border rounded-xl w-full flex items-center gap-2 focus-within:ring-2",
        isSuccess
          ? "border-emerald-300/30 bg-emerald-400/20 focus-within:ring-emerald-300/40"
          : isError
          ? "border-rose-300/30 bg-rose-400/10 focus-within:ring-rose-300/40"
          : "border-white/10 bg-white/5 focus-within:ring-cyan-300/40",
        className
      ].filter(Boolean).join(" ")}>
        {leftButton && <div className="flex-shrink-0">{leftButton}</div>}
        <input 
          ref={ref} 
          id={inputId}
          className="flex-1 bg-transparent border-none outline-none placeholder-white/40 text-sm"
          {...props} 
        />
        {rightButton && <div className="flex-shrink-0">{rightButton}</div>}
      </div>
    );
    
    if (label || error) {
      return (
        <div className="space-y-2">
          {label && (
            <label htmlFor={inputId} className="block text-sm font-medium text-white/90">
              {label}
            </label>
          )}
          {inputElement}
          {error && (
            <p className="text-sm text-rose-400">{error}</p>
          )}
        </div>
      );
    }
    
    return inputElement;
  }
);

InputWithButton.displayName = "InputWithButton";

export default Input;

 

