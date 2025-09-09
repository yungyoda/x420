import React from "react";

export type IconName = "home" | "spin" | "raffle" | "components";

type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export default function Icon({
  name,
  className,
  size = 24,
  strokeWidth = 2,
}: IconProps) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    role: "img",
    "aria-hidden": true as unknown as undefined,
  } as React.SVGProps<SVGSVGElement>;

  switch (name) {
    case "home":
      return (
        <svg {...commonProps}>
          <path
            d="M3 10.5L12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9.5Z"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <path
            d="M9 22v-6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v6"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "spin":
      return (
        <svg {...commonProps}>
          {/* Wheel */}
          <circle cx="12" cy="10" r="6" stroke="currentColor" strokeWidth={strokeWidth} />
          {/* Hub */}
          <circle cx="12" cy="10" r="1.5" fill="currentColor" />
          {/* Spokes */}
          <line x1="12" y1="10" x2="12" y2="4" stroke="currentColor" strokeWidth={strokeWidth} />
          <line x1="12" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth={strokeWidth} />
          <line x1="12" y1="10" x2="12" y2="16" stroke="currentColor" strokeWidth={strokeWidth} />
          <line x1="12" y1="10" x2="6" y2="10" stroke="currentColor" strokeWidth={strokeWidth} />
          <line x1="12" y1="10" x2="16.24" y2="5.76" stroke="currentColor" strokeWidth={strokeWidth} />
          <line x1="12" y1="10" x2="16.24" y2="14.24" stroke="currentColor" strokeWidth={strokeWidth} />
          <line x1="12" y1="10" x2="7.76" y2="14.24" stroke="currentColor" strokeWidth={strokeWidth} />
          <line x1="12" y1="10" x2="7.76" y2="5.76" stroke="currentColor" strokeWidth={strokeWidth} />
          {/* Cabins */}
          <circle cx="12" cy="4" r="1" fill="currentColor" />
          <circle cx="16.24" cy="5.76" r="1" fill="currentColor" />
          <circle cx="18" cy="10" r="1" fill="currentColor" />
          <circle cx="16.24" cy="14.24" r="1" fill="currentColor" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
          <circle cx="7.76" cy="14.24" r="1" fill="currentColor" />
          <circle cx="6" cy="10" r="1" fill="currentColor" />
          <circle cx="7.76" cy="5.76" r="1" fill="currentColor" />
          {/* Stand */}
          <line x1="9" y1="16" x2="7" y2="21" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1="15" y1="16" x2="17" y2="21" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1="6" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );
    case "raffle":
      return (
        <svg {...commonProps}>
          <path
            d="M4 8a2 2 0 0 1 2-2h12v4a2 2 0 0 0 0 4v4H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <path
            d="M13 8v8"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray="2 3"
          />
        </svg>
      );
    case "components":
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
          <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
          <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
          <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
        </svg>
      );
    default:
      return null;
  }
}



