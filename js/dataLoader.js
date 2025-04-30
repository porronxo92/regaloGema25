/**
 * dataLoader.js
 * Función para cargar story.json
 */

export async function loadStory() {
    try {
      const response = await fetch('story.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const story = await response.json();
      return story;
    } catch (err) {
      console.error('Error cargando story.json:', err);
      throw err;
    }
  }
  