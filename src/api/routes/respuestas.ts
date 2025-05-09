import { eq } from 'drizzle-orm';
import { db } from '../db';
import { respuestas, preguntas } from '../db/schema';
import { validateUserExists, validateQuestionExists, validateAnswerExists } from '../helpers/validation';
import { buildResponse } from '../helpers/db-utils';

export async function getPreguntaByIdWithRespuestas({params, req}: {params: {id: string}, req: Request}) {

  if (!await validateQuestionExists(Number(params.id))) {
    let error = {
      message: 'Pregunta no encontrada',
      data: null,
      success: false,
    }
    return new Response(JSON.stringify(error), { status: 404 });
  }

  const respuestasPreguntas = await db.query.preguntas.findMany({
    where: eq(preguntas.id, Number(params.id)),
    with: {
      respuestas: true,
    },
  });

  let respuestasPregunta = undefined;

  if(respuestasPreguntas.length > 0) {
    respuestasPregunta = respuestasPreguntas[0];
  }

  let response = buildResponse({
    data: respuestasPregunta,
    message: 'OK',
    success: true,
  })

  return Response.json(response);
}

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
