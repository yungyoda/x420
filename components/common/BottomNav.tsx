"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "./Icon";

type NavItem = {
  label: string;
  href: string;
  icon: IconName;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Components", href: "/components", icon: "components" },
  // { label: "Spin", href: "/spin", icon: "spin" },
  // { label: "Raffle", href: "/raffle", icon: "raffle" },
];

export default function BottomNav({ items = NAV_ITEMS }: { items?: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-3 left-1/2 -translate-x-1/2 transform z-30 pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary"
    >
      <div className="glass-nav">
        <ul className="inline-flex items-center gap-1">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "group inline-flex h-12 min-w-16 items-center justify-center gap-2 transition-colors px-3 rounded-xl",
                    active
                      ? "bg-white/15 text-white"
                      : "bg-transparent text-white/80 hover:bg-white/10",
                  ].join(" ")}
                  aria-label={item.label}
                >
                  <Icon name={item.icon} className="" size={22} />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}



