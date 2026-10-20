"use client";

import { startTransition, useActionState, useState } from "react";
import type { CustomerProfile } from "@/lib/customers/profile";
import {
  BIO_MAX_LENGTH,
  COMMON_TIMEZONES,
  SUPPORTED_LOCALES,
  type ProfileField,
} from "@/lib/customers/profile-schema";
import { updateProfileAction, type ProfileFormState } from "./actions";

const inputClassName =
  "mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100 dark:focus:ring-zinc-100 dark:disabled:bg-zinc-800";

const initialState: ProfileFormState = { status: "idle" };

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }
  return (
    <p id={id} className="mt-1 text-sm text-red-600 dark:text-red-400">
      {errors[0]}
    </p>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 border-b border-zinc-200 py-8 first:pt-0 md:grid-cols-3 dark:border-zinc-800">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 md:col-span-2">{children}</div>
    </section>
  );
}

export function ProfileForm({ profile }: { profile: CustomerProfile }) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);
  const [bioLength, setBioLength] = useState(profile.bio?.length ?? 0);

  let fieldErrors: Partial<Record<ProfileField, string[]>> = {};
  if (state.status === "error") {
    fieldErrors = state.fieldErrors;
  }

  // Submitting manually skips React's automatic form reset, so inputs keep what the customer
  // entered. `action` still handles submissions before hydration.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  function errorProps(field: ProfileField) {
    if (!fieldErrors[field]?.length) {
      return {};
    }
    return { "aria-invalid": true, "aria-describedby": `${field}-error` };
  }

  const timezones: string[] = [...COMMON_TIMEZONES];
  if (!timezones.includes(profile.timezone)) {
    timezones.unshift(profile.timezone);
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate>
      <Section title="Personal information" description="How we address you across Northstar.">
        <label className="block text-sm font-medium">
          First name
          <input
            name="firstName"
            autoComplete="given-name"
            required
            maxLength={100}
            defaultValue={profile.firstName}
            className={inputClassName}
            {...errorProps("firstName")}
          />
          <FieldError id="firstName-error" errors={fieldErrors.firstName} />
        </label>
        <label className="block text-sm font-medium">
          Last name
          <input
            name="lastName"
            autoComplete="family-name"
            required
            maxLength={100}
            defaultValue={profile.lastName}
            className={inputClassName}
            {...errorProps("lastName")}
          />
          <FieldError id="lastName-error" errors={fieldErrors.lastName} />
        </label>
        <label className="block text-sm font-medium">
          Email address
          <input
            type="email"
            value={profile.email}
            disabled
            readOnly
            aria-describedby="email-help"
            className={inputClassName}
          />
          <p id="email-help" className="mt-1 text-xs font-normal text-zinc-500">
            Contact support to change the email address on your account.
          </p>
        </label>
        <label className="block text-sm font-medium">
          Phone number <span className="font-normal text-zinc-500">(optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 415 555 0134"
            defaultValue={profile.phone ?? ""}
            className={inputClassName}
            {...errorProps("phone")}
          />
          <FieldError id="phone-error" errors={fieldErrors.phone} />
        </label>
      </Section>

      <Section title="Work" description="Shown on invoices and shared with your account manager.">
        <label className="block text-sm font-medium">
          Company <span className="font-normal text-zinc-500">(optional)</span>
          <input
            name="company"
            autoComplete="organization"
            maxLength={200}
            defaultValue={profile.company ?? ""}
            className={inputClassName}
            {...errorProps("company")}
          />
          <FieldError id="company-error" errors={fieldErrors.company} />
        </label>
        <label className="block text-sm font-medium">
          Job title <span className="font-normal text-zinc-500">(optional)</span>
          <input
            name="jobTitle"
            autoComplete="organization-title"
            maxLength={120}
            defaultValue={profile.jobTitle ?? ""}
            className={inputClassName}
            {...errorProps("jobTitle")}
          />
          <FieldError id="jobTitle-error" errors={fieldErrors.jobTitle} />
        </label>
        <label className="block text-sm font-medium sm:col-span-2">
          About you <span className="font-normal text-zinc-500">(optional)</span>
          <textarea
            name="bio"
            rows={4}
            maxLength={BIO_MAX_LENGTH}
            defaultValue={profile.bio ?? ""}
            onChange={(event) => setBioLength(event.target.value.length)}
            className={inputClassName}
            {...errorProps("bio")}
          />
          <span className="mt-1 flex justify-between text-xs font-normal text-zinc-500">
            <span>A short note to help our team understand your needs.</span>
            <span>
              {bioLength}/{BIO_MAX_LENGTH}
            </span>
          </span>
          <FieldError id="bio-error" errors={fieldErrors.bio} />
        </label>
      </Section>

      <Section
        title="Preferences"
        description="Controls how dates, times, and emails are presented to you."
      >
        <label className="block text-sm font-medium">
          Time zone
          <select
            name="timezone"
            defaultValue={profile.timezone}
            className={inputClassName}
            {...errorProps("timezone")}
          >
            {timezones.map((timezone) => (
              <option key={timezone} value={timezone}>
                {timezone.replaceAll("_", " ")}
              </option>
            ))}
          </select>
          <FieldError id="timezone-error" errors={fieldErrors.timezone} />
        </label>
        <label className="block text-sm font-medium">
          Language
          <select
            name="locale"
            defaultValue={profile.locale}
            className={inputClassName}
            {...errorProps("locale")}
          >
            {SUPPORTED_LOCALES.map((locale) => (
              <option key={locale.value} value={locale.value}>
                {locale.label}
              </option>
            ))}
          </select>
          <FieldError id="locale-error" errors={fieldErrors.locale} />
        </label>
        <label className="flex items-start gap-3 text-sm sm:col-span-2">
          <input
            name="marketingOptIn"
            type="checkbox"
            defaultChecked={profile.marketingOptIn}
            className="mt-0.5 size-4 rounded border-zinc-300 accent-zinc-900 dark:accent-zinc-100"
          />
          <span>
            <span className="font-medium">Product updates and offers</span>
            <span className="block text-zinc-600 dark:text-zinc-400">
              Receive occasional emails about new products, promotions, and events. Order and
              account emails are always sent.
            </span>
          </span>
        </label>
      </Section>

      <div className="flex flex-col-reverse items-start gap-4 pt-6 sm:flex-row sm:items-center sm:justify-end">
        <p role="status" aria-live="polite" className="text-sm">
          {state.status === "success" && (
            <span className="text-emerald-700 dark:text-emerald-400">{state.message}</span>
          )}
          {state.status === "error" && (
            <span className="text-red-600 dark:text-red-400">{state.message}</span>
          )}
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {isPending ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
