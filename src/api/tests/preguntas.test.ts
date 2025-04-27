import { test, expect, beforeAll, afterAll } from 'bun:test';
import { clearDatabase } from '../helpers/db-utils';
import { API_URL } from './test-config';

const API_URL_USUARIOS = `${API_URL}/usuarios`;
const API_URL_PREGUNTAS = `${API_URL}/preguntas`;

let userId: number;
let preguntaId: number;

beforeAll(async () => {
  await clearDatabase();
  let strRandom = Math.floor(Math.random() * 100);
  const res = await fetch(API_URL_USUARIOS, {
    method: 'POST',
    body: JSON.stringify({ nombre: 'PreguntaUser', email: `usuario-pregunta-${strRandom}@email.com` }),
    headers: { 'Content-Type': 'application/json' },
  });
  const usuariosRes = await fetch(API_URL_USUARIOS, { method: 'GET' });
  const usuarios = await usuariosRes.json();
  userId = usuarios[0].id;
});

afterAll(async () => {
  await clearDatabase();
});

test('Crear pregunta', async () => {
  const res = await fetch(API_URL_PREGUNTAS, {
    method: 'POST',
    body: JSON.stringify({ usuarioId: userId, titulo: 'Titulo test', contenido: 'Contenido test' }),
    headers: { 'Content-Type': 'application/json' },
  });

  expect(res.status).toBe(201);
});

test('Obtener preguntas', async () => {
  const res = await fetch(API_URL_PREGUNTAS, { method: 'GET' });
  expect(res.status).toBe(200);

  const data = await res.json();
  expect(Array.isArray(data)).toBe(true);
  preguntaId = data[0].id;
});

test('Actualizar pregunta', async () => {
  const res = await fetch(`${API_URL_PREGUNTAS}/${preguntaId}`, {
    method: 'PUT',
    body: JSON.stringify({ titulo: 'Titulo actualizado', contenido: 'Contenido actualizado' }),
    headers: { 'Content-Type': 'application/json' },
  });
  expect(res.status).toBe(200);
});

test('Eliminar pregunta', async () => {
  const res = await fetch(`${API_URL_PREGUNTAS}/${preguntaId}`, { method: 'DELETE' });
  expect(res.status).toBe(200);
});
