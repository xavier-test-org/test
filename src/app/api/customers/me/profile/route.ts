import { z } from "zod";
import { getCustomerProfile, updateCustomerProfile } from "@/lib/customers/profile";
import { profilePatchSchema } from "@/lib/customers/profile-schema";
import { getCurrentCustomerId } from "@/lib/session";

function notFound() {
  return Response.json({ error: "Customer not found" }, { status: 404 });
}

export async function GET() {
  const customerId = await getCurrentCustomerId();
  const profile = await getCustomerProfile(customerId);

  if (!profile) {
    return notFound();
  }
  return Response.json({ profile });
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  const parsed = profilePatchSchema.safeParse(body);
  if (!parsed.success) {
    const { formErrors, fieldErrors } = z.flattenError(parsed.error);
    return Response.json(
      { error: "Validation failed", formErrors, fieldErrors },
      { status: 422 },
    );
  }

  const customerId = await getCurrentCustomerId();
  const profile = await updateCustomerProfile(customerId, parsed.data);

  if (!profile) {
    return notFound();
  }
  return Response.json({ profile });
}
