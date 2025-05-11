import mysql from "mysql2/promise";
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

const dbPath = process.env.DATABASE_URL;

const connection = mysql.createPool({
  uri: dbPath,
});

export const db = drizzle(connection, { schema: schema, mode: 'default' });