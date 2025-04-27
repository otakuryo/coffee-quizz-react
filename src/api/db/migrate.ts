import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const dbPath = process.env.DB_FILE_NAME;
const sqlite = new Database(dbPath);
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "./drizzle" });