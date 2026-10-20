"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { updateCustomerProfile } from "@/lib/customers/profile";
import { profileSchema, type ProfileField } from "@/lib/customers/profile-schema";
import { getCurrentCustomerId } from "@/lib/session";

export type ProfileFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<ProfileField, string[]>>;
    };

function readText(formData: FormData, field: ProfileField) {
  return String(formData.get(field) ?? "");
}

export async function updateProfileAction(
  _previousState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const customerId = await getCurrentCustomerId();
  const parsed = profileSchema.safeParse({
    firstName: readText(formData, "firstName"),
    lastName: readText(formData, "lastName"),
    phone: readText(formData, "phone"),
    company: readText(formData, "company"),
    jobTitle: readText(formData, "jobTitle"),
    timezone: readText(formData, "timezone"),
    locale: readText(formData, "locale"),
    bio: readText(formData, "bio"),
    marketingOptIn: formData.get("marketingOptIn") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const profile = await updateCustomerProfile(customerId, parsed.data);
  if (!profile) {
    return {
      status: "error",
      message: "We couldn't find your account. Please sign in again.",
      fieldErrors: {},
    };
  }

  refresh();
  return { status: "success", message: "Your profile has been updated." };
}
