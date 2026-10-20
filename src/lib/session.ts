import "server-only";

import { cookies } from "next/headers";
import { z } from "zod";
import { DEFAULT_CUSTOMER_ID } from "@/db/seed";

const CUSTOMER_COOKIE = "ns_customer_id";

export async function getCurrentCustomerId() {
  const cookieStore = await cookies();
  const parsed = z.uuid().safeParse(cookieStore.get(CUSTOMER_COOKIE)?.value);

  if (parsed.success) {
    return parsed.data;
  }
  return DEFAULT_CUSTOMER_ID;
}
