import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

const dbPath = process.env.DATABASE_URL;
export const db = drizzle(dbPath, { schema: schema, mode: 'default' });
