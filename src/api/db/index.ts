import { createConnection } from "mysql2/promise";
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;
const dbName = process.env.DATABASE_NAME;

const connection = await createConnection({
  host: dbHost,
  user: dbUser,
  database: dbName,
  password: dbPassword,
  port: parseInt(dbPort),
  Promise: globalThis.Promise
});

export const db = drizzle(connection, { schema: schema, mode: 'default' });