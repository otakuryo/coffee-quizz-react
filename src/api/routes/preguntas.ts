import { eq } from 'drizzle-orm';
import { db } from '../db';
import { preguntas, respuestas } from '../db/schema';
import { validateUserExists, validateQuestionExists } from '../helpers/validation';
import { buildResponse } from '../helpers/db-utils';

export async function preguntasHandler(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/')[2];

  if (req.method === 'GET') {
    const all = await db.select().from(preguntas);
    return Response.json(all);
  }

  if (req.method === 'POST') {
    const body = await req.json();

    // Validaciones de campos
    if (!body.usuarioId || !body.titulo || !body.contenido) {
      return new Response('usuarioId, titulo y contenido son requeridos', { status: 400 });
    }

    if (!await validateUserExists(body.usuarioId)) {
      return new Response('Usuario no encontrado', { status: 404 });
    }

    await db.insert(preguntas).values({
      usuarioId: body.usuarioId,
      titulo: body.titulo,
      contenido: body.contenido,
    });
    return new Response('Pregunta creada', { status: 201 });
  }

  if (req.method === 'PUT' && id) {
    const body = await req.json();

    if (!await validateQuestionExists(Number(id))) {
      return new Response('Pregunta no encontrada', { status: 404 });
    }

    if (!body.titulo || !body.contenido) {
      return new Response('titulo y contenido son requeridos', { status: 400 });
    }

    await db.update(preguntas).set({
      titulo: body.titulo,
      contenido: body.contenido,
    }).where(eq(preguntas.id, Number(id)));
    return new Response('Pregunta actualizada', { status: 200 });
  }

  if (req.method === 'DELETE' && id) {
    if (!await validateQuestionExists(Number(id))) {
      return new Response('Pregunta no encontrada', { status: 404 });
    }
    await db.transaction(async (tx) => {
      await tx.delete(respuestas).where(eq(respuestas.preguntaId, Number(id)));
      await tx.delete(preguntas).where(eq(preguntas.id, Number(id)));
    });

    let response = buildResponse({
      data: null,
      message: 'Pregunta eliminada',
      success: true,
    })
    return new Response(JSON.stringify(response), { status: 200 });
  }

  return new Response('Not Found', { status: 404 });
}
