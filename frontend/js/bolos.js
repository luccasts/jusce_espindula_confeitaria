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
    nome: 'Bolo Elegância Noir',
    desc: 'Chocolate belga, ganache 70% e coulis de framboesa',
    preco: 'R$ 280',
    cat: 'casamento',
    badge: 'Destaque',
    badgeClass: 'destaque',
    img: 'images/bolos/bolo-elegancia.jpg',        // ← substitua
    imgAlt: 'Bolo Elegância Noir decorado com frutas vermelhas',
    detalhes: [
      { label: 'Porções',   valor: 'até 30 fatias'     },
      { label: 'Prazo',     valor: '5 dias úteis'       },
      { label: 'Recheio',   valor: 'Ganache + framboesa' },
      { label: 'Cobertura', valor: 'Fondant artesanal'  },
    ],
  },
  {
    id: 2,
    nome: 'Naked Cake Floral',
    desc: 'Baunilha, chantilly levinho e flores naturais comestíveis',
    preco: 'R$ 320',
    cat: 'naked',
    badge: 'Novo',
    badgeClass: 'novo',
    img: 'images/bolos/naked-floral.jpg',
    imgAlt: 'Naked Cake decorado com flores comestíveis',
    detalhes: [
      { label: 'Porções',   valor: 'até 25 fatias'  },
      { label: 'Prazo',     valor: '4 dias úteis'    },
      { label: 'Recheio',   valor: 'Creme de baunilha' },
      { label: 'Cobertura', valor: 'Chantilly natural' },
    ],
  },
  {
    id: 3,
    nome: 'Red Velvet Luxo',
    desc: 'Massa aveludada, cream cheese artesanal e frutas vermelhas',
    preco: 'R$ 240',
    cat: 'aniversario',
    badge: '',
    badgeClass: '',
    img: 'images/bolos/red-velvet.jpg',
    imgAlt: 'Bolo Red Velvet com cream cheese',
    detalhes: [
      { label: 'Porções',   valor: 'até 20 fatias'  },
      { label: 'Prazo',     valor: '3 dias úteis'    },
      { label: 'Recheio',   valor: 'Cream cheese'    },
      { label: 'Cobertura', valor: 'Cream cheese'    },
    ],
  },
  {
    id: 4,
    nome: 'Bolo de Limão Siciliano',
    desc: 'Limão siciliano, merengue italiano e calda cítrica',
    preco: 'R$ 260',
    cat: 'casamento',
    badge: '',
    badgeClass: '',
    img: 'images/bolos/limao-siciliano.jpg',
    imgAlt: 'Bolo de limão siciliano com merengue',
    detalhes: [
      { label: 'Porções',   valor: 'até 25 fatias'  },
      { label: 'Prazo',     valor: '4 dias úteis'    },
      { label: 'Recheio',   valor: 'Curd de limão'  },
      { label: 'Cobertura', valor: 'Merengue italiano' },
    ],
  },
  {
    id: 5,
    nome: 'Drip Cake Caramelo',
    desc: 'Caramelo salgado, nozes torradas e cobertura dourada',
    preco: 'R$ 310',
    cat: 'especial',
    badge: 'Destaque',
    badgeClass: 'destaque',
    img: 'images/bolos/drip-caramelo.jpg',
    imgAlt: 'Drip Cake com caramelo salgado e nozes',
    detalhes: [
      { label: 'Porções',   valor: 'até 30 fatias'      },
      { label: 'Prazo',     valor: '5 dias úteis'        },
      { label: 'Recheio',   valor: 'Caramelo + nozes'   },
      { label: 'Cobertura', valor: 'Ganache + drip gold' },
    ],
  },
  {
    id: 6,
    nome: 'Naked Rústico Chocolate',
    desc: 'Chocolate meio amargo, morangos frescos e avelãs caramelizadas',
    preco: 'R$ 290',
    cat: 'naked',
    badge: '',
    badgeClass: '',
    img: 'images/bolos/naked-chocolate.jpg',
    imgAlt: 'Naked Cake de chocolate com morangos',
    detalhes: [
      { label: 'Porções',   valor: 'até 22 fatias'     },
      { label: 'Prazo',     valor: '4 dias úteis'       },
      { label: 'Recheio',   valor: 'Mousse de chocolate' },
      { label: 'Cobertura', valor: 'Ganache rústica'   },
    ],
  },
  {
    id: 7,
    nome: 'Bolo de Festa Arco-Íris',
    desc: 'Baunilha colorida, brigadeiro branco e confetes comestíveis',
    preco: 'R$ 200',
    cat: 'infantil',
    badge: 'Popular',
    badgeClass: 'popular',
    img: 'images/bolos/festa-arco-iris.jpg',
    imgAlt: 'Bolo de festa colorido com confetes',
    detalhes: [
      { label: 'Porções',   valor: 'até 20 fatias'     },
      { label: 'Prazo',     valor: '3 dias úteis'       },
      { label: 'Recheio',   valor: 'Brigadeiro branco'  },
      { label: 'Cobertura', valor: 'Chantilly colorido' },
    ],
  },
  {
    id: 8,
    nome: 'Opera Cake Clássico',
    desc: 'Café espresso, amêndoas torradas e ganache noir refinada',
    preco: 'R$ 350',
    cat: 'especial',
    badge: 'Limitado',
    badgeClass: 'limitado',
    img: 'images/bolos/opera-cake.jpg',
    imgAlt: 'Opera Cake clássico com café e amêndoas',
    detalhes: [
      { label: 'Porções',   valor: 'até 18 fatias'    },
      { label: 'Prazo',     valor: '6 dias úteis'      },
      { label: 'Recheio',   valor: 'Creme de café'    },
      { label: 'Cobertura', valor: 'Ganache espelhada' },
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