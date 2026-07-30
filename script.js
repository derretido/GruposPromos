// ============================================
// WIDGET 1: Contador "pessoas vendo agora"
// Faz o número flutuar sozinho de tempos em tempos
// ============================================
(function () {
  const el = document.getElementById('viewerCount');
  if (!el) return;

  const MIN = 8;
  const MAX = 30;
  let current = parseInt(el.textContent, 10) || 30;

  function tick() {
    // varia um pouco pra cima ou pra baixo, sem sair do intervalo
    const delta = Math.floor(Math.random() * 5) - 2; // -2 a +2
    current = Math.min(MAX, Math.max(MIN, current + delta));
    el.textContent = current;

    // próxima atualização entre 3 e 7 segundos
    const next = 3000 + Math.random() * 4000;
    setTimeout(tick, next);
  }

  setTimeout(tick, 4000);
})();

// ============================================
// WIDGET 2: Avisos de quem entrou no grupo
// Mostra um toast no canto da tela de tempos em tempos
// ============================================
(function () {
  const container = document.getElementById('joinToastContainer');
  if (!container) return;

  // Troque/edite esses nomes à vontade
  const NAMES = [
    'Camila', 'Bruno', 'Ana Paula', 'Rafael', 'Juliana',
    'Marcos', 'Fernanda', 'Lucas', 'Patrícia', 'Diego',
    'Larissa', 'Thiago', 'Beatriz', 'Gustavo', 'Mariana',
    'Tania', 'Giovanni', 'Gabriel', 'Nicoly', 'Natan',
    'Julia', 'João', 'Leonardo', 'Giovanna', 'Marcello'
  ];

  const AVATAR_COLORS = [
    '#ff6b6b', '#4dabf7', '#ffa94d', '#63e6be',
    '#9775fa', '#ff8787', '#69db7c', '#4dd4d0'
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function showToast() {
    const name = pick(NAMES);
    const color = pick(AVATAR_COLORS);
    const initial = name.charAt(0).toUpperCase();

    const toast = document.createElement('div');
    toast.className = 'join-toast';
    toast.innerHTML = `
      <div class="avatar-circle" style="background:${color}">
        ${initial}
        <span class="check-badge">✓</span>
      </div>
      <div class="toast-text">
        <div class="name-line">${name} acabou de entrar no grupo</div>
        <div class="time-line"><span class="live-dot"></span> agora mesmo</div>
      </div>
    `;

    container.appendChild(toast);

    // força reflow pra animação de entrada funcionar
    requestAnimationFrame(() => toast.classList.add('show'));

    // some depois de alguns segundos
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 450);
    }, 4200);
  }

  function scheduleNext() {
    // aparece a cada 6 a 14 segundos, aleatoriamente
    const delay = 6000 + Math.random() * 8000;
    setTimeout(() => {
      showToast();
      scheduleNext();
    }, delay);
  }

  // primeiro aviso logo no início, depois segue o ciclo
  setTimeout(showToast, 2500);
  scheduleNext();
})();
