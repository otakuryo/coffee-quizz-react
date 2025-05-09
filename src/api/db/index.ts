// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';
// import * as schema from './schema';

// const sqlite = new Database('database.db');
// export const db = drizzle(sqlite, { schema });

import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';

// const dbPath = process.env.DB_FILE_NAME ?? 'file:./db.sqlite';
const dbPath = process.env.DB_FILE_NAME;
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
