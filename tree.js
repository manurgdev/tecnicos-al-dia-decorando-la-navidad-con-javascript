/**
 * Genera la estructura de un árbol de navidad como filas.
 * - levels: número de filas (mínimo 10)
 * - ornamentRatio: 0–1 (porcentaje de elementos que serán bolas)
 */
function generateTreeModel(levels, ornamentRatio) {
  const rows = [];

  for (let level = 0; level < levels; level++) {
    const bulbs = 1 + level * 2; // 1, 3, 5, 7...
    const ornamentCount = Math.round(bulbs * ornamentRatio);

    const ornamentIndices = new Set();
    while (ornamentIndices.size < ornamentCount) {
      ornamentIndices.add(Math.floor(Math.random() * bulbs));
    }

    rows.push({
      level: level + 1,
      bulbs,
      ornamentIndices: Array.from(ornamentIndices),
    });
  }

  return rows;
}

function renderTree(model, container) {
  container.innerHTML = "";

  model.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "tree-row";

    for (let i = 0; i < row.bulbs; i++) {
      const isOrnament = row.ornamentIndices.includes(i);
      const bulb = document.createElement("button");
      bulb.type = "button";

      bulb.className = isOrnament
        ? "tree-bulb tree-bulb--ornament"
        : "tree-bulb tree-bulb--leaf";

      bulb.setAttribute(
        "aria-label",
        isOrnament
          ? `Bola decorativa ${i + 1} del nivel ${row.level}`
          : `Luz ${i + 1} del nivel ${row.level}`
      );

      const randomDelay = (Math.random() * 2).toFixed(2); // 0–2s
      bulb.style.setProperty("--twinkle-delay", `${randomDelay}s`);

      rowEl.appendChild(bulb);
    }

    container.appendChild(rowEl);
  });
}

function setupTreeControls() {
  const treeContainer = document.getElementById("tree");

  const levelsInput = document.getElementById("levels");
  const ornamentsInput = document.getElementById("ornaments");
  const levelsValue = document.getElementById("levels-value");
  const ornamentsValue = document.getElementById("ornaments-value");

  const animationToggle = document.getElementById("animation-toggle");
  const animationToggleLabel = document.getElementById("animation-toggle-label");

  function updateTree() {
    const levels = Number(levelsInput.value);
    const ornamentsPercent = Number(ornamentsInput.value); // 0–60
    const ornamentRatio = ornamentsPercent / 100; // 0–0.6

    levelsValue.textContent = levels;
    ornamentsValue.textContent = `${ornamentsPercent}%`;

    const model = generateTreeModel(levels, ornamentRatio);
    renderTree(model, treeContainer);
  }

  function updateAnimation() {
    const animationsEnabled = animationToggle.checked;

    if (!animationsEnabled) {
      document.body.classList.add("no-animations");
      animationToggleLabel.textContent = "Estática";
    } else {
      document.body.classList.remove("no-animations");
      animationToggleLabel.textContent = "Activa";
    }
  }

  // Escuchar cambios en los controles
  levelsInput.addEventListener("input", updateTree);
  ornamentsInput.addEventListener("input", updateTree);
  animationToggle.addEventListener("change", updateAnimation);

  // Pintar árbol inicial
  updateTree();
  // Activar estado inicial de animación (por defecto: activas)
  updateAnimation();
}

// Punto de entrada
document.addEventListener("DOMContentLoaded", () => {
  setupTreeControls();
});
