import mysql from "mysql2/promise";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/mysql2";

const dbPath = process.env.DATABASE_URL;

(async () => {
  const connection = await mysql.createConnection(dbPath);
  const db = drizzle(connection);
  await migrate(db, { migrationsFolder: "./drizzle" });
  process.exit();
})();