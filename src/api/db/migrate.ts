import { migrate } from "drizzle-orm/mysql2/migrator";

import { drizzle } from "drizzle-orm/mysql2";

const dbPath = process.env.DATABASE_URL;
const db = drizzle(dbPath);
migrate(db, { migrationsFolder: "./drizzle" });