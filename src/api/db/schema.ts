import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';

// Tabla de Usuarios
export const usuarios = sqliteTable('usuarios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

// Tabla de Preguntas
export const preguntas = sqliteTable('preguntas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titulo: text('titulo').notNull(),
  contenido: text('contenido').notNull(),
  usuarioId: integer('usuario_id')
    .references(() => usuarios.id)
    .notNull(),
  createdAt: integer('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

// Tabla de Respuestas
export const respuestas = sqliteTable('respuestas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  contenido: text('contenido').notNull(),
  preguntaId: integer('pregunta_id')
    .references(() => preguntas.id)
    .notNull(),
  usuarioId: integer('usuario_id')
    .references(() => usuarios.id)
    .notNull(),
  createdAt: integer('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

// Relacion entre preguntas y respuestas
export const preguntaRelacion = relations(preguntas, ({ many }) => ({
  respuestas: many(respuestas, {
    fields: [preguntas.id],
    references: [respuestas.preguntaId],
  }),
}));

// Relacion entre respuesta y pregunta
export const respuestaRelacion = relations(respuestas, ({ one }) => ({
  pregunta: one(preguntas, {
    fields: [respuestas.preguntaId],
    references: [preguntas.id],
  }),
}));
