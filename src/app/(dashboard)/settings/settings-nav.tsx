"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsLinks = [{ href: "/settings/profile", label: "Profile" }];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 flex gap-6 border-b border-zinc-200 dark:border-zinc-800">
      {settingsLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`-mb-px border-b-2 pb-3 text-sm font-medium ${
              isActive
                ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
