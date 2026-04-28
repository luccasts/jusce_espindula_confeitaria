// ============================================================
//  bolos.js — Galeria de Bolos | Jusce Confeitaria
//  Para adicionar novos bolos: edite apenas o array BOLOS_DATA
// ============================================================

// ──────────────────────────────────────────────────────────
//  DADOS DOS BOLOS
//  • img       → substitua pela URL ou caminho local da foto
//  • cat       → categoria usada nos filtros (slug sem acento)
//  • badge     → "Destaque" | "Novo" | "Limitado" | "Popular" | ""
//  • badgeClass→ "destaque" | "novo" | "limitado" | "popular" | ""
//  • detalhes  → array de { label, valor } exibidos no modal
// ──────────────────────────────────────────────────────────
const BOLOS_DATA = [
  {
    id: 1,
    nome: 'Piscina de Maracujá',
    desc: 'Sabor refrescante de maracujá com cobertura transbordante',
    preco: 'R$ 320',
    cat: 'naked',
    badge: 'Novo',
    badgeClass: 'novo',
    img: 'images/bolos/bolo_maracuja_LE_upscale_prime.jpg',
    imgAlt: 'Bolo maracujá decorado',
    detalhes: [
      { label: 'Porções',   valor: 'até 25 fatias'  },
      { label: 'Prazo',     valor: '4 dias úteis'    },
      { label: 'Recheio',   valor: 'Maracujá' },
      { label: 'Cobertura', valor: 'Maracujá' },
    ],
  },
  {
    id: 2,
    nome: 'Morango Vibrante',
    desc: 'Massa aveludada, cobertura de chantilly, recheio de morango e confetes comestíveis',
    preco: 'R$ 240',
    cat: 'naked',
    badge: 'Destaque',
    badgeClass: 'destaque',
    img: 'images/bolos/bolo_morango_LE_upscale_prime.jpg',
    imgAlt: 'Bolo Morango Vibrante',
    detalhes: [
      { label: 'Porções',   valor: 'até 20 fatias'  },
      { label: 'Prazo',     valor: '3 dias úteis'    },
      { label: 'Recheio',   valor: 'Morango'    },
      { label: 'Cobertura', valor: 'Morango'    },
    ],
  },
  {
    id: 3,
    nome: 'Bolo de Festa Sonic',
    desc: 'Chocolate, recheio de brigadeiro e glíter comestível',
    preco: 'R$ 310',
    cat: 'infantil',
    cat: 'aniversario',
    badge: '',
    badgeClass: '',
    img: 'images/bolos/bolo_sonic_infantil.jpg',
    imgAlt: 'Bolo Infantil Sonic',
    detalhes: [
      { label: 'Porções',   valor: 'até 30 fatias'      },
      { label: 'Prazo',     valor: '5 dias úteis'        },
      { label: 'Recheio',   valor: 'Chocolate'   },
      { label: 'Cobertura', valor: 'Brigadeiro' },
    ],
  },
  {
    id: 4,
    nome: 'Bolo Natalino',
    desc: 'Massa branca, leite ninho e cobertura de chantininho com decorações comestíveis',
    preco: 'R$ 290',
    cat: 'especial',
    cat: 'especial',
    badge: 'Limitado',
    badgeClass: 'limitado',
    img: 'images/bolos/bolo_natal_festivo.jpg',
    imgAlt: 'Bolo de Natal',
    detalhes: [
      { label: 'Porções',   valor: 'até 22 fatias'     },
      { label: 'Prazo',     valor: '4 dias úteis'       },
      { label: 'Recheio',   valor: 'Massa branca' },
      { label: 'Cobertura', valor: 'Leite ninho'   },
    ],
  },
  {
    id: 5,
    nome: 'Bolo de Festa Hora de Aventura',
    desc: 'Massa branca recheada com bastante chantininho',
    preco: 'R$ 200',
    cat: 'infantil',
    cat: 'aniversario',
    badge: 'Popular',
    badgeClass: 'popular',
    img: "images/bolos/bolo_adventuretime.jpg",
    imgAlt: 'Bolo de Festa Hora De Aventura',
    detalhes: [
      { label: 'Porções',   valor: 'até 20 fatias'     },
      { label: 'Prazo',     valor: '3 dias úteis'       },
      { label: 'Recheio',   valor: 'Ninho'  },
      { label: 'Cobertura', valor: 'Chantininho colorido' },
    ],
  },
  {
    id: 5,
    nome: 'Bolo de Festa Homem-Aranha',
    desc: 'Massa branca recheada com chocolate e cobertura de chantininho',
    preco: 'R$ 200',
    cat: 'infantil',
    cat: 'aniversario',
    badge: 'Popular',
    badgeClass: 'popular',
    img: "images/bolos/bolo_infantil_spiderman.jpg",
    imgAlt: 'Bolo de Festa Homem-Aranha',
    detalhes: [
      { label: 'Porções',   valor: 'até 20 fatias'     },
      { label: 'Prazo',     valor: '3 dias úteis'       },
      { label: 'Recheio',   valor: 'Brigadeiro'  },
      { label: 'Cobertura', valor: 'Chantininho' },
    ],
  },
  {
    id: 6,
    nome: 'Bolo de Festa Verão Praiano',
    desc: 'Massa branca, recheio de leite ninho e cobertura colorida de chantininho com decorações comestíveis',
    preco: 'R$ 350',
    cat: 'especial',
    cat: 'aniversario',
    badge: 'Destaque',
    badgeClass: 'destaque',
    img: 'images/bolos/bolo_duplo_aniversario.jpg',
    imgAlt: 'Bolo Verão Praiano',
    detalhes: [
      { label: 'Porções',   valor: 'até 18 fatias'    },
      { label: 'Prazo',     valor: '6 dias úteis'      },
      { label: 'Recheio',   valor: 'Leite ninho'    },
      { label: 'Cobertura', valor: 'Chantininho' },
    ],
  },
  // ── Para adicionar um novo bolo, copie o bloco acima e edite ──
];

// ──────────────────────────────────────────────────────────
//  ESTADO
// ──────────────────────────────────────────────────────────
let categoriaAtiva = 'todos';
const favoritosSet = new Set();

// ──────────────────────────────────────────────────────────
//  ELEMENTOS
// ──────────────────────────────────────────────────────────
const grid      = document.getElementById('gbGrid');
const countEl   = document.getElementById('gbCount');
const emptyEl   = document.getElementById('gbEmpty');
const modal     = document.getElementById('gbModal');
const modalClose = document.getElementById('gbModalClose');

// ──────────────────────────────────────────────────────────
//  RENDER
// ──────────────────────────────────────────────────────────
function criarCard(bolo, delay) {
  const card = document.createElement('div');
  card.className = 'gb-card';
  card.style.animationDelay = delay + 'ms';
  card.setAttribute('role', 'listitem');

  const favClass = favoritosSet.has(bolo.id) ? ' liked' : '';

  card.innerHTML = `
    <div class="gb-card-img-wrap">
      <img
        src="${bolo.img}"
        alt="${bolo.imgAlt || bolo.nome}"
        loading="lazy"
        onerror="this.parentElement.innerHTML='<div class=\\'gb-img-placeholder\\'>🎂</div>'"
      >
      ${bolo.badge ? `<span class="gb-card-badge ${bolo.badgeClass}">${bolo.badge}</span>` : ''}
      <button class="gb-fav-btn${favClass}" data-id="${bolo.id}" aria-label="Favoritar ${bolo.nome}">
        <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>
    <div class="gb-card-body">
      <p class="gb-card-nome">${bolo.nome}</p>
      <p class="gb-card-desc">${bolo.desc}</p>
      <div class="gb-card-footer">
        <div class="gb-card-preco-wrap">
          <span class="gb-card-preco-label">a partir de</span>
          <span class="gb-card-preco">${bolo.preco}</span>
        </div>
        <button class="gb-ver-btn" data-id="${bolo.id}">Ver detalhes</button>
      </div>
    </div>
  `;

  // Favoritar
  card.querySelector('.gb-fav-btn').addEventListener('click', function (e) {
    e.stopPropagation();
    const id = Number(this.dataset.id);
    favoritosSet.has(id) ? favoritosSet.delete(id) : favoritosSet.add(id);
    this.classList.toggle('liked');
    this.setAttribute('aria-label', favoritosSet.has(id) ? `Remover favorito ${bolo.nome}` : `Favoritar ${bolo.nome}`);
  });

  // Ver detalhes → abre modal
  card.querySelector('.gb-ver-btn').addEventListener('click', () => abrirModal(bolo));

  return card;
}

function renderGaleria(cat) {
  const lista = cat === 'todos'
    ? BOLOS_DATA
    : BOLOS_DATA.filter(b => b.cat === cat);

  grid.innerHTML = '';
  emptyEl.classList.remove('show');

  if (lista.length === 0) {
    emptyEl.classList.add('show');
    countEl.textContent = '';
    return;
  }

  lista.forEach((bolo, i) => grid.appendChild(criarCard(bolo, i * 65)));

  const total = lista.length;
  countEl.textContent = `${total} ${total === 1 ? 'bolo encontrado' : 'bolos encontrados'}`;
}

// ──────────────────────────────────────────────────────────
//  FILTROS
// ──────────────────────────────────────────────────────────
document.querySelectorAll('.gb-filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.gb-filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    categoriaAtiva = this.dataset.cat || 'todos';
    renderGaleria(categoriaAtiva);
  });
});

function resetFiltro() {
  categoriaAtiva = 'todos';
  document.querySelectorAll('.gb-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === 'todos');
  });
  renderGaleria('todos');
}

// ──────────────────────────────────────────────────────────
//  MODAL
// ──────────────────────────────────────────────────────────
function abrirModal(bolo) {
  document.getElementById('modalImg').src     = bolo.img;
  document.getElementById('modalImg').alt     = bolo.imgAlt || bolo.nome;
  document.getElementById('modalNome').textContent  = bolo.nome;
  document.getElementById('modalDesc').textContent  = bolo.desc;
  document.getElementById('modalPreco').textContent = bolo.preco;

  const badge = document.getElementById('modalBadge');
  badge.textContent  = bolo.badge || '';
  badge.className    = 'gb-modal-badge ' + (bolo.badgeClass || '');

  const detEl = document.getElementById('modalDetalhes');
  detEl.innerHTML = (bolo.detalhes || []).map(d => `
    <div class="gb-modal-detalhe-item">
      <p class="gb-modal-detalhe-label">${d.label}</p>
      <p class="gb-modal-detalhe-valor">${d.valor}</p>
    </div>
  `).join('');

  const msg = encodeURIComponent(`Olá! Tenho interesse no bolo *${bolo.nome}* (${bolo.preco}). Poderia me dar mais informações?`);
  document.getElementById('modalWhats').href = `https://wa.me/5575988373099?text=${msg}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function fecharModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', fecharModal);
modal.addEventListener('click', e => { if (e.target === modal) fecharModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });

// ──────────────────────────────────────────────────────────
//  INIT
// ──────────────────────────────────────────────────────────
renderGaleria('todos');