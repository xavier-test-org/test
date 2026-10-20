import type { Database } from "./index";
import { customers } from "./schema";

export const DEFAULT_CUSTOMER_ID = "6f1c2b8e-4a1d-4f5e-9b3a-2d7c8e9f0a11";

export async function seed(db: Database) {
  await db
    .insert(customers)
    .values({
      id: DEFAULT_CUSTOMER_ID,
      email: "jordan.lee@example.com",
      firstName: "Jordan",
      lastName: "Lee",
      phone: "+1 415 555 0134",
      company: "Lee & Partners",
      jobTitle: "Operations Manager",
      timezone: "America/Los_Angeles",
      locale: "en-US",
      bio: "Runs purchasing for a small design studio in San Francisco.",
      marketingOptIn: true,
    })
    .onConflictDoNothing();
}
