import { test, expect, beforeAll, afterAll } from 'bun:test';
import { clearDatabase } from '../helpers/db-utils';
import { API_URL } from './test-config';

const USERS_URL = `${API_URL}/usuarios`;
let userId: number;

beforeAll(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
});

test('Crear usuario', async () => {
  let strRandom = Math.floor(Math.random() * 100);
  const res = await fetch(USERS_URL, {
    method: 'POST',
    body: JSON.stringify({ nombre: 'Usuario Creacion', email: `usuario-creacion-${strRandom}@email.com` }),
    headers: { 'Content-Type': 'application/json' },
  });

  expect(res.status).toBe(201);
});

test('Obtener usuarios', async () => {
  const res = await fetch(USERS_URL, { method: 'GET' });
  expect(res.status).toBe(200);

  const data = await res.json();
  expect(Array.isArray(data)).toBe(true);
  userId = data[0].id;
});

test('Obtener usuario', async () => {
  const res = await fetch(`${USERS_URL}/${userId}`, { method: 'GET' });
  expect(res.status).toBe(200);

  const data = await res.json();
  expect(data).not.toBeEmpty();
  expect(data).toBeInstanceOf(Object);
  userId = data[0].id;
});

test('Actualizar usuario', async () => {
  let strRandom = Math.floor(Math.random() * 100);
  const res = await fetch(`${USERS_URL}/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ nombre: 'Usuario Actualizado', email: `usuario-actualizado-${strRandom}@email.com` }),
    headers: { 'Content-Type': 'application/json' },
  });
  expect(res.status).toBe(200);
});

test('Eliminar usuario', async () => {
  const res = await fetch(`${USERS_URL}/${userId}`, { method: 'DELETE' });
  expect(res.status).toBe(200);
});
