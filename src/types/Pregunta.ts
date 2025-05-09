export interface Pregunta {
  id: number;
  contenido: string;
  usuarioId: string;
  createAt: string;
  respuestas: Respuesta[];
}

export interface Respuesta {
  id: number;
  contenido: string;
  preguntaId: number;
  usuarioId: string;
  createAt: string;
}

export interface Usuario {
  id: string;
  nombre: string;
}