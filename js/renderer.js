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
    const imgEl = document.getElementById('scene-img');
    const textEl = document.getElementById('scene-text');
    const choicesEl = document.getElementById('choices');
  
    // Mostrar imagen base de la escena
    imgEl.src = scene.img;
    imgEl.alt = scene.text.slice(0, 50) + '...';
  
    // Pintar texto de la escena
    textEl.textContent = scene.text;
  
    // Limpiar botones anteriores
    choicesEl.innerHTML = '';
  
    // Generar botón para cada opción
    if (Array.isArray(scene.choices)) {
        scene.choices.forEach(choice => {
            const row = document.createElement('div');
            row.className = 'choice-row';
          
            const img = document.createElement('img');
            img.className = 'choice-img';
            img.src = choice.img;
            img.alt = `Opción ${choice.id}`;
            row.appendChild(img);
          
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.label;
            btn.value = choice.id;
            btn.dataset.next = choice.next;

            if (choice.desc) {
                const desc = document.createElement('p');
                desc.className = 'choice-desc';
                desc.textContent = choice.desc;
                row.appendChild(desc);
              }
                        
            btn.addEventListener('click', () => {
              // Mostrar primero la viñeta (ya está visible en este rediseño)
              setTimeout(() => onChoose(choice), 400);
            });
          
            row.appendChild(btn);
            choicesEl.appendChild(row);
          });
    } else {
      // Si no hay choices (escena 'end'), no crea botones
      choicesEl.innerHTML = '';
    }
  }
  