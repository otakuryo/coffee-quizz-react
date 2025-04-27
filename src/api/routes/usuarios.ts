import { eq } from 'drizzle-orm';
import { db } from '../db';
import { usuarios } from '../db/schema';
import { validateUserExists } from '../helpers/validation';

// TODO: ROUTES: Modificar las funciones para construirlos de esta manera
export async function getUsuarioById(id: string) {
  const userSelect = await db.select()
    .from(usuarios)
    .where(eq(usuarios.id, Number(id)));
  return Response.json(userSelect);
}

export async function usuariosHandler(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/')[2];

  if (req.method === 'GET' && id) {
    const userSelect = await db.select().from(usuarios).where(eq(usuarios.id, Number(id)));
    return Response.json(userSelect);
  }

  if (req.method === 'GET') {
    const all = await db.select().from(usuarios);
    return Response.json(all);
  }

  if (req.method === 'POST') {
    const body = await req.json();

    // Validación básica
    if (!body.nombre || typeof body.nombre !== 'string') {
      return new Response('Nombre es requerido y debe ser texto', { status: 400 });
    }

    await db.insert(usuarios).values({ nombre: body.nombre, email: body.email ?? "NONE" });
    return new Response('Usuario creado', { status: 201 });
  }

  if (req.method === 'PUT' && id) {
    const body = await req.json();

    // Validar existencia del usuario
    if (!await validateUserExists(Number(id))) {
      return new Response('Usuario no encontrado', { status: 404 });
    }

    if (!body.nombre || typeof body.nombre !== 'string') {
      return new Response('Nombre es requerido y debe ser texto', { status: 400 });
    }

    await db.update(usuarios).set({ nombre: body.nombre }).where(eq(usuarios.id, Number(id)));
    return new Response('Usuario actualizado', { status: 200 });
  }

  if (req.method === 'DELETE' && id) {
    if (!await validateUserExists(Number(id))) {
      return new Response('Usuario no encontrado', { status: 404 });
    }

    await db.delete(usuarios).where(eq(usuarios.id, Number(id)));
    return new Response('Usuario eliminado', { status: 200 });
  }

  return new Response('Not Found', { status: 404 });
}
