import { db } from '../db';
import { usuarios, preguntas, respuestas } from '../db/schema';
import { eq } from 'drizzle-orm';

/**
 * Valida si un usuario existe
 */
export async function validateUserExists(id: number) {
  const user = await db.select().from(usuarios).where(eq(usuarios.id, id));
  return user.length > 0;
}

/**
 * Valida si una pregunta existe
 */
export async function validateQuestionExists(id: number) {
  const question = await db.select().from(preguntas).where(eq(preguntas.id, id));
  return question.length > 0;
}

/**
 * Valida si una respuesta existe
 */
export async function validateAnswerExists(id: number) {
  const answer = await db.select().from(respuestas).where(eq(respuestas.id, id));
  return answer.length > 0;
}
