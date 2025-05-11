import mysql from "mysql2/promise";
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

const dbPath = process.env.DATABASE_URL;
const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;
const dbName = process.env.DATABASE_NAME;

const connection = mysql.createPool({
  uri: dbPath,
});

export const db = drizzle(connection, { schema: schema, mode: 'default' });