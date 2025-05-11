import mysql from "mysql2/promise";
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from "drizzle-orm/mysql2/migrator";

const dbPath = process.env.DATABASE_URL;

const connection = mysql.createPool({
  uri: dbPath,
});
const db = drizzle(connection);
migrate(db, { migrationsFolder: "./drizzle" })
.then(() => {
  console.log("Migrations applied successfully");
  process.exit();
});