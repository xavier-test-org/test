import { PageHeader } from "@/components/page-header";
import { SettingsNav } from "./settings-nav";

export default function SettingsLayout({ children }: LayoutProps<"/settings">) {
  return (
    <div className="max-w-5xl">
      <PageHeader title="Settings" description="Manage your personal details and preferences." />
      <SettingsNav />
      {children}
    </div>
  );
}
