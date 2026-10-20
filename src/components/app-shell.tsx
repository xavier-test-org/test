import Link from "next/link";
import { SidebarNav } from "./sidebar-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-zinc-200 bg-white px-4 py-6 md:block dark:border-zinc-800 dark:bg-zinc-900">
        <Link href="/" className="mb-8 block px-3 text-lg font-semibold tracking-tight">
          Northstar
        </Link>
        <SidebarNav />
      </aside>
      <main className="flex-1 px-6 py-8 md:px-10">{children}</main>
    </div>
  );
}
