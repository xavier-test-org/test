import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCustomerProfile } from "@/lib/customers/profile";
import { getCurrentCustomerId } from "@/lib/session";
import { ProfileForm } from "./profile-form";
import { ProfileSummary } from "./profile-summary";

export const metadata: Metadata = {
  title: "Profile",
};

async function ProfileContent() {
  const customerId = await getCurrentCustomerId();
  const profile = await getCustomerProfile(customerId);

  if (!profile) {
    notFound();
  }

  return (
    <>
      <ProfileSummary profile={profile} />
      <ProfileForm profile={profile} />
    </>
  );
}

function ProfileSkeleton() {
  return (
    <div aria-busy className="animate-pulse space-y-6">
      <div className="h-24 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-64 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

export default function ProfileSettingsPage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
