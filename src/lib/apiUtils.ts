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