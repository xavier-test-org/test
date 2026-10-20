import "server-only";

import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { connection } from "next/server";
import * as schema from "./schema";
import { seed } from "./seed";

async function createDatabase() {
  const client = new PGlite();
  const db = drizzle({ client, schema });

  await migrate(db, { migrationsFolder: path.join(process.cwd(), "drizzle") });
  await seed(db);

  return db;
}

export type Database = Awaited<ReturnType<typeof createDatabase>>;

// Reuse one connection across hot reloads in development.
const globalForDb = globalThis as unknown as { northstarDb?: Promise<Database> };

export async function getDb() {
  // Database reads are per-customer, so keep them out of prerendering.
  await connection();
  if (!globalForDb.northstarDb) {
    globalForDb.northstarDb = createDatabase();
  }
  return globalForDb.northstarDb;
}
