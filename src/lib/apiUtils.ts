export function getAllUsers() {
  return [];
}

export async function storeQuestion({ userId, question }) {
  try {
    const response = await fetch('/preguntas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarioId: userId,
        contenido: question,
        titulo: 'Temporada 1'
      })
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error al guardar la pregunta:', error);
    return false;
  }
}

export async function getRespuestas(preguntaId: number) {
  try {
    const response = await fetch(`/pregunta/${preguntaId}/respuestas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener las respuestas:', error);
    return [];
  }
}

export async function storeRespuesta({ usuarioId, preguntaId, contenido }) {
  try {
    const response = await fetch('/respuestas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarioId,
        preguntaId,
        contenido,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al guardar la respuesta:', error);
    return false;
  }
}

export async function deleteQuestion(preguntaId: number) {
  try {
    const response = await fetch(`/preguntas/${preguntaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al eliminar la pregunta:', error);
    return false;
  }
}

