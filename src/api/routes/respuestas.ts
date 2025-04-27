import { eq } from 'drizzle-orm';
import { db } from '../db';
import { respuestas } from '../db/schema';
import { validateUserExists, validateQuestionExists, validateAnswerExists } from '../helpers/validation';

export async function respuestasHandler(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/')[2];

  if (req.method === 'GET') {
    const all = await db.select().from(respuestas);
    return Response.json(all);
  }

  if (req.method === 'POST') {
    const body = await req.json();

    if (!body.usuarioId || !body.preguntaId || !body.contenido) {
      return new Response('usuarioId, preguntaId y contenido son requeridos', { status: 400 });
    }

    if (!await validateUserExists(body.usuarioId)) {
      return new Response('Usuario no encontrado', { status: 404 });
    }

    if (!await validateQuestionExists(body.preguntaId)) {
      return new Response('Pregunta no encontrada', { status: 404 });
    }

    await db.insert(respuestas).values({
      preguntaId: body.preguntaId,
      usuarioId: body.usuarioId,
      contenido: body.contenido,
    });
    return new Response('Respuesta creada', { status: 201 });
  }

  if (req.method === 'PUT' && id) {
    const body = await req.json();

    if (!await validateAnswerExists(Number(id))) {
      return new Response('Respuesta no encontrada', { status: 404 });
    }

    if (!body.contenido) {
      return new Response('contenido es requerido', { status: 400 });
    }

    let bodyContent = {
      contenido: body.contenido,
    }

    await db.update(respuestas).set(bodyContent).where(eq(respuestas.id, Number(id)));
    return new Response('Respuesta actualizada', { status: 200 });
  }

  if (req.method === 'DELETE' && id) {
    if (!await validateAnswerExists(Number(id))) {
      return new Response('Respuesta no encontrada', { status: 404 });
    }

    await db.delete(respuestas).where(eq(respuestas.id, Number(id)));
    return new Response('Respuesta eliminada', { status: 200 });
  }

  return new Response('Not Found', { status: 404 });
}
