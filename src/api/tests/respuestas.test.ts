import { test, expect, beforeAll, afterAll } from 'bun:test';
import { clearDatabase } from '../helpers/db-utils';
import { API_URL } from './test-config';

const API_URL_USUARIOS = `${API_URL}/usuarios`;
const API_URL_PREGUNTAS = `${API_URL}/preguntas`;
const API_URL_RESPUESTAS = `${API_URL}/respuestas`;

let userId: number;
let preguntaId: number;
let respuestaId: number;

beforeAll(async () => {
  await clearDatabase();

  let strRandom = Math.floor(Math.random() * 100);

  const resUser = await fetch(API_URL_USUARIOS, {
    method: 'POST',
    body: JSON.stringify({ nombre: 'RespuestaUser', email: `usuario-respuesta-${strRandom}@email.com`  }),
    headers: { 'Content-Type': 'application/json' },
  });

  const usuariosRes = await fetch(API_URL_USUARIOS, { method: 'GET' });
  const usuarios = await usuariosRes.json();
  userId = usuarios[0].id;

  const resPregunta = await fetch(API_URL_PREGUNTAS, {
    method: 'POST',
    body: JSON.stringify({ usuarioId: userId, titulo: 'Pregunta para respuesta', contenido: 'Contenido' }),
    headers: { 'Content-Type': 'application/json' },
  });

  const preguntasRes = await fetch(API_URL_PREGUNTAS, { method: 'GET' });
  const preguntas = await preguntasRes.json();
  preguntaId = preguntas[0].id;
});

afterAll(async () => {
  await clearDatabase();
});

test('Crear respuesta', async () => {
  const res = await fetch(API_URL_RESPUESTAS, {
    method: 'POST',
    body: JSON.stringify({ usuarioId: userId, preguntaId: preguntaId, contenido: 'Respuesta test' }),
    headers: { 'Content-Type': 'application/json' },
  });

  expect(res.status).toBe(201);
});

test('Obtener respuestas', async () => {
  const res = await fetch(API_URL_RESPUESTAS, { method: 'GET' });
  expect(res.status).toBe(200);

  const data = await res.json();
  expect(Array.isArray(data)).toBe(true);
  respuestaId = data[0].id;
});

test('Actualizar respuesta', async () => {
  const res = await fetch(`${API_URL_RESPUESTAS}/${respuestaId}`, {
    method: 'PUT',
    body: JSON.stringify({ contenido: 'Respuesta actualizada' }),
    headers: { 'Content-Type': 'application/json' },
  });
  expect(res.status).toBe(200);
});

test('Eliminar respuesta', async () => {
  const res = await fetch(`${API_URL_RESPUESTAS}/${respuestaId}`, { method: 'DELETE' });
  expect(res.status).toBe(200);
});
