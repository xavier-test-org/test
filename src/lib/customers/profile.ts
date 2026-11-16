import "server-only";

import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { customers, type Customer } from "@/db/schema";
import type { ProfilePatchInput } from "./profile-schema";

export type CustomerProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  company: string | null;
  jobTitle: string | null;
  timezone: string;
  locale: string;
  bio: string | null;
  marketingOptIn: boolean;
  createdAt: string;
  updatedAt: string;
};

function toProfile(customer: Customer): CustomerProfile {
  return {
    id: customer.id,
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    phone: customer.phone,
    company: customer.company,
    jobTitle: customer.jobTitle,
    timezone: customer.timezone,
    locale: customer.locale,
    bio: customer.bio,
    marketingOptIn: customer.marketingOptIn,
    createdAt: customer.createdAt.toISOString(),
    updatedAt: customer.updatedAt.toISOString(),
  };
}

export async function getCustomerProfile(customerId: string) {
  const db = await getDb();
  const customer = await db.query.customers.findFirst({
    where: eq(customers.id, customerId),
  });

  if (!customer) {
    return null;
  }
  return toProfile(customer);
}

export async function updateCustomerProfile(customerId: string, input: ProfilePatchInput) {
  const db = await getDb();
  const [customer] = await db
    .update(customers)
    .set(input)
    .where(eq(customers.id, customerId))
    .returning();

  if (!customer) {
    return null;
  }
  return toProfile(customer);
}
