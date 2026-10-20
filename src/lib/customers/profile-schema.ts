import { z } from "zod";

export const SUPPORTED_LOCALES = [
  { value: "en-US", label: "English (United States)" },
  { value: "en-GB", label: "English (United Kingdom)" },
  { value: "fr-FR", label: "Français (France)" },
  { value: "de-DE", label: "Deutsch (Deutschland)" },
  { value: "es-ES", label: "Español (España)" },
  { value: "ja-JP", label: "日本語 (日本)" },
] as const;

export const COMMON_TIMEZONES = [
  "UTC",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
] as const;

export const BIO_MAX_LENGTH = 500;

const localeValues = SUPPORTED_LOCALES.map((locale) => locale.value) as [string, ...string[]];

// Digits, spaces, and common separators, with an optional leading "+".
const PHONE_PATTERN = /^\+?[0-9\s().-]{7,20}$/;

function isValidTimezone(timezone: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

function optionalText(max: number) {
  return z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer`)
    .transform((value) => (value === "" ? null : value))
    .nullable();
}

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "Must be 100 characters or fewer"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Must be 100 characters or fewer"),
  phone: optionalText(32).refine(
    (value) => value === null || PHONE_PATTERN.test(value),
    "Enter a valid phone number, e.g. +1 415 555 0134",
  ),
  company: optionalText(200),
  jobTitle: optionalText(120),
  timezone: z.string().refine(isValidTimezone, "Choose a valid time zone"),
  locale: z.enum(localeValues, { error: "Choose a supported language" }),
  bio: optionalText(BIO_MAX_LENGTH),
  marketingOptIn: z.boolean(),
});

export const profilePatchSchema = profileSchema
  .partial()
  .strict()
  .refine((value) => Object.keys(value).length > 0, "Provide at least one field to update");

export type ProfileInput = z.infer<typeof profileSchema>;
export type ProfilePatchInput = z.infer<typeof profilePatchSchema>;
export type ProfileField = keyof ProfileInput;
