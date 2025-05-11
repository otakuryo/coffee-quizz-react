import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'mysql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/api/db/migrate.ts'
})
