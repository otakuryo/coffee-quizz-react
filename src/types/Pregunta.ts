export interface Pregunta {
  id: number;
  contenido: string;
  usuarioId: string;
  createdAt: number;
  visible: boolean;
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