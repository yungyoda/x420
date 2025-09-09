"use client";

import * as React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select ref={ref} className={["glass-select", className].filter(Boolean).join(" ")} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;



