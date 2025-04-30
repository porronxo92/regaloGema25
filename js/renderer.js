/**
 * renderer.js
 * Funciones para pintar la escena actual y sus opciones.
 */

/**
 * Renderiza una escena:
 * - Muestra la imagen (o viñeta) principal.
 * - Inserta el texto de la escena.
 * - Crea botones para cada opción A/B.
 *
 * @param {Object} scene     Datos de la escena (object del JSON).
 * @param {Function} onChoose Callback que se ejecuta al hacer clic en una opción.
 */
export function renderScene(scene, onChoose) {
  const imgEl     = document.getElementById('scene-img');
  const textEl    = document.getElementById('scene-text');
  const promptEl  = document.getElementById('prompt-text');
  const choicesEl = document.getElementById('choices');

  // 1) Escena base: imagen + texto
  imgEl.src = scene.img;
  imgEl.alt = scene.text.slice(0, 50) + '...';
  textEl.textContent = scene.text;

  // 2) Prompt para elección
  promptEl.textContent = 'ELIGE UNA OPCIÓN';

  // 3) Limpiar opciones anteriores
  choicesEl.innerHTML = '';

  // 4) Crear rows de opciones A/B
  if (Array.isArray(scene.choices)) {
    scene.choices.forEach(choice => {
      const row = document.createElement('div');
      row.className = 'choice-row';

      const img = document.createElement('img');
      img.className = 'choice-img';
      img.src = choice.img;
      img.alt = choice.label;
      row.appendChild(img);

      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.label;
      btn.value = choice.id;
      btn.dataset.next = choice.next;

      btn.addEventListener('click', () => {
        // Pequeña animación de feedback
        imgEl.src = choice.img;
        setTimeout(() => onChoose(choice), 400);
      });

      row.appendChild(btn);
      choicesEl.appendChild(row);
    });
  }
}