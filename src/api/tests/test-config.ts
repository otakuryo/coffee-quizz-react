// import { config } from 'bun';

// config({ path: '.env.test' }); // NODE_ENV=test

export const API_URL = process.env.API_URL ?? 'http://localhost:3000';
export const DB_URL = process.env.DB_URL ?? 'file:./tests/test.sqlite';
// export const DB_FILE_NAME = process.env.DB_FILE_NAME ?? 'test.sqlite';
export const DB_FILE_NAME = process.env.DB_FILE_NAME;
