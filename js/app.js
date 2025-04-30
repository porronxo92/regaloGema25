/**
 * app.js
 * Lógica principal de la aplicación interactiva.
 */

import { loadStory } from './dataLoader.js';
import { renderScene } from './renderer.js';

let scoreA = 0;
let scoreB = 0;
let storyData = null;

/**
 * Función que se llama cada vez que el usuario hace una elección.
 * @param {Object} choice  – El objeto choice del JSON ({id, label, img, next}).
 */
function handleChoice(choice) {
  // 1. Incrementar contador según A o B
  if (choice.id === 'A') scoreA++;
  else scoreB++;

  // 2. Avanzar a la siguiente escena
  const nextKey = choice.next;
  if (nextKey === 'end') {
    showFinal();
  } else {
    const nextScene = storyData.scenes[nextKey];
    renderScene(nextScene, handleChoice);
  }
}

/**
 * Muestra la pantalla final según el conteo de A vs B.
 */
function showFinal() {
  const imgEl = document.getElementById('scene-img');
  const textEl = document.getElementById('scene-text');
  const choicesEl = document.getElementById('choices');

  const isAndorra = scoreA > scoreB;
  imgEl.src = isAndorra
    ? storyData.scenes.end.imgA
    : storyData.scenes.end.imgB;
  imgEl.alt = isAndorra ? 'Fin de semana en Andorra' : 'Noche en Valencia';

  textEl.textContent = isAndorra
    ? storyData.scenes.end.textA
    : storyData.scenes.end.textB;

  // Eliminar botones de elección
  choicesEl.innerHTML = '';
}

/**
 * Punto de entrada de la app.
 * Carga el story.json y arranca la primera escena.
 */
async function init() {
  try {
    storyData = await loadStory();
    const firstSceneKey = storyData.start;
    const firstScene = storyData.scenes[firstSceneKey];
    renderScene(firstScene, handleChoice);
  } catch (err) {
    console.error('Error iniciando la app:', err);
    document.getElementById('scene-text').textContent =
      'Error cargando la historia. Por favor recarga la página.';
  }
}

// Arranca la aplicación
init();
