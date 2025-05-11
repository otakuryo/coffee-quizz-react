import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm';

// Tabla de Usuarios
export const usuarios = mysqlTable('usuarios', {
  id: int().primaryKey().autoincrement(),
  nombre: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
});

// Tabla de Preguntas
export const preguntas = mysqlTable('preguntas', {
  id: int().primaryKey().autoincrement(),
  titulo: varchar({ length: 255 }).notNull(),
  contenido: varchar({ length: 255 }).notNull(),
  usuarioId: int()
    .references(() => usuarios.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

// Tabla de Respuestas
export const respuestas = mysqlTable('respuestas', {
  id: int().primaryKey().autoincrement(),
  contenido: varchar({ length: 255 }).notNull(),
  preguntaId: int()
    .references(() => preguntas.id, { onDelete: 'cascade' })
    .notNull(),
  usuarioId: int()
    .references(() => usuarios.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
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
