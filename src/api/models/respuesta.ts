// src/models/respuesta.ts
export interface Respuesta {
  id: number;
  contenido: string;
  preguntaId: number;
  usuarioId: number;
  createdAt: string;
}
