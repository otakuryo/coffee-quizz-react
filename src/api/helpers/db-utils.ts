import { db } from '../db';
import { usuarios, preguntas, respuestas } from '../db/schema';

export async function clearDatabase() {
  // Borramos en orden inverso por relaciones
  await db.delete(respuestas);
  await db.delete(preguntas);
  await db.delete(usuarios);
}

export function buildResponse({data, message, success}: {data: any, message: string, success: boolean }) {
  return {
    data,
    message,
    success,
  }
}