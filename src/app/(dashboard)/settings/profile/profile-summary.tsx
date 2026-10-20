import type { CustomerProfile } from "@/lib/customers/profile";

export function ProfileSummary({ profile }: { profile: CustomerProfile }) {
  const initials = `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`.toUpperCase();
  const memberSince = new Intl.DateTimeFormat(profile.locale, {
    month: "long",
    year: "numeric",
    timeZone: profile.timezone,
  }).format(new Date(profile.createdAt));
  const lastUpdated = new Intl.DateTimeFormat(profile.locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: profile.timezone,
  }).format(new Date(profile.updatedAt));

  return (
    <div className="mb-8 flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div
        aria-hidden
        className="flex size-14 items-center justify-center rounded-full bg-zinc-900 text-lg font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold">
          {profile.firstName} {profile.lastName}
        </p>
        <p className="truncate text-sm text-zinc-600 dark:text-zinc-400">{profile.email}</p>
      </div>
      <dl className="hidden text-right text-xs text-zinc-500 sm:block">
        <div>
          <dt className="inline">Member since </dt>
          <dd className="inline">{memberSince}</dd>
        </div>
        <div>
          <dt className="inline">Last updated </dt>
          <dd className="inline">{lastUpdated}</dd>
        </div>
      </dl>
    </div>
  );
}
