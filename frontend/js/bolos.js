// ============================================================
//  bolos.js — Galeria de Bolos
// ============================================================

import { fazerRequisicao } from './config.js';

// ================= DESCRIÇÕES =================
const DESC_PADRAO =
  'Este é um modelo de inspiração. Personalize sabores, recheios e acabamento conforme sua preferência.';

const DESC_TRADICIONAL =
  'Bolo com sabor tradicional já definido. Ideal para quem busca um clássico delicioso e pronto para encomenda.';

// ================= DADOS =================
let BOLOS_DATA = [];

// ================= ESTADO =================
let categoriaAtiva = 'todos';

// ================= CARREGA PRODUTOS DA API =================
async function carregarProdutosDoBackend() {
  const grid = document.getElementById('gbGrid');
  if (grid) {
    grid.innerHTML = `
      <div class="gb-loader-container">
        <div class="gb-spinner"></div>
        <p>Buscando deliciosos bolos...</p>
      </div>
    `;
  }

  const produtos = await fazerRequisicao('/api/produtos');

  BOLOS_DATA = produtos.map(p => ({
    id: p.id,
    nome: p.nome,
    cat: (p.categorias || []).map(c => c.slug),
    badge: p.badge,
    badgeClass: p.badgeClass,
    img: p.imagemUrl || null,
    preco: p.precoPorSolicitacao || p.preco == null
      ? 'Sob consulta'
      : `R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}`,
    descricao: p.descricao
  }));

  console.log('✓ Produtos carregados:', BOLOS_DATA.length);
  renderGaleria('todos');
}

// ================= CARREGA FILTROS DINÂMICOS DA API =================
async function carregarFiltros() {
  const container = document.getElementById('gbFilters');
  if (!container) return;

  const categorias = await fazerRequisicao('/api/categorias');

  const botoesCategoria = categorias.map(c => `
    <button class="gb-filter-btn" data-cat="${c.slug}">${c.nome}</button>
  `).join('');

  container.innerHTML = `
    <button class="gb-filter-btn active" data-cat="todos">Todos</button>
    ${botoesCategoria}
  `;

  container.querySelectorAll('.gb-filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      container.querySelectorAll('.gb-filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderGaleria(this.dataset.cat || 'todos');
    });
  });
}

// ================= ELEMENTOS =================
const grid = document.getElementById('gbGrid');
const countEl = document.getElementById('gbCount');
const emptyEl = document.getElementById('gbEmpty');

const modal = document.getElementById('gbModal');
const modalClose = document.getElementById('gbModalClose');

// ================= DESCRIÇÃO =================
function getDescricao(bolo) {
  if (bolo.descricao) return bolo.descricao;
  return bolo.cat.includes('tradicionais')
    ? DESC_TRADICIONAL
    : DESC_PADRAO;
}

// ================= CARD =================
function criarCard(bolo, delay) {
  const card = document.createElement('div');
  card.className = 'gb-card';
  card.style.animationDelay = delay + 'ms';

  const imgHtml = bolo.img
    ? `<img src="${bolo.img}" alt="${bolo.nome}" loading="lazy"
          onerror="this.parentElement.innerHTML='<div class=\\'gb-img-placeholder\\'><span>🎂</span></div>'">`
    : `<div class="gb-img-placeholder"><span>🎂</span></div>`;

  card.innerHTML = `
    <div class="gb-card-img-wrap">
      ${imgHtml}
      ${bolo.badge ? `<span class="gb-card-badge ${bolo.badgeClass || ''}">${bolo.badge}</span>` : ''}
    </div>

    <div class="gb-card-body">
      <p class="gb-card-nome">${bolo.nome}</p>
      <p class="gb-card-desc">${getDescricao(bolo)}</p>

      <div class="gb-card-footer">
        <div>
          ${
            bolo.preco !== 'Sob consulta'
              ? `<span class="gb-card-preco">${bolo.preco}</span>`
              : `<span class="gb-card-preco-label">Sob consulta</span>`
          }
        </div>
        <button class="gb-ver-btn">Ver opções</button>
      </div>
    </div>
  `;

  card.querySelector('.gb-ver-btn')
    .addEventListener('click', () => abrirModal(bolo));

  return card;
}

// ================= RENDER =================
function renderGaleria(categoria) {
  categoriaAtiva = categoria;

  const lista = categoria === 'todos'
    ? BOLOS_DATA
    : BOLOS_DATA.filter(b => b.cat.includes(categoria));

  grid.innerHTML = '';

  if (lista.length === 0) {
    emptyEl.classList.add('show');
    countEl.textContent = '';
    return;
  }

  emptyEl.classList.remove('show');

  lista.forEach((bolo, i) => {
    grid.appendChild(criarCard(bolo, i * 60));
  });

  countEl.textContent = `${lista.length} bolos encontrados`;
}

// ================= RESET FILTRO =================
window.resetFiltro = function() {
  const container = document.getElementById('gbFilters');
  if (container) {
    container.querySelectorAll('.gb-filter-btn').forEach(b => b.classList.remove('active'));
    const btnTodos = container.querySelector('[data-cat="todos"]');
    if (btnTodos) btnTodos.classList.add('active');
  }
  renderGaleria('todos');
};

// ================= MODAL =================
function abrirModal(bolo) {
  const modalImg = document.getElementById('modalImg');

  if (bolo.img) {
    modalImg.src = bolo.img;
    modalImg.style.display = '';
  } else {
    modalImg.style.display = 'none';
  }

  document.getElementById('modalNome').textContent = bolo.nome;
  document.getElementById('modalDesc').textContent = getDescricao(bolo);

  const precoLabel = document.getElementById('modalPrecoLabel');
  const preco = document.getElementById('modalPreco');
  const obs = document.getElementById('modalObs');

  if (bolo.preco !== 'Sob consulta') {
    precoLabel.textContent = 'Preço';
    preco.textContent = bolo.preco;
    obs.textContent = '';
  } else {
    precoLabel.textContent = 'Valor sob consulta';
    preco.textContent = '';
    obs.textContent = 'Cada bolo é único e feito sob medida 💕';
  }

  const msg = encodeURIComponent(
    `Olá! Gostaria de um bolo no estilo *${bolo.nome}*. Podemos conversar sobre detalhes?`
  );

  document.getElementById('modalWhats').href =
    `https://wa.me/5575988373099?text=${msg}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', fecharModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) fecharModal();
});

// ================= INIT =================
async function init() {
  const [resultFiltros, resultProdutos] = await Promise.allSettled([
    carregarFiltros(),
    carregarProdutosDoBackend()
  ]);

  if (resultFiltros.status === 'rejected') {
    console.error('✗ Erro ao carregar filtros:', resultFiltros.reason);
    // Mantém o botão "Todos" como fallback
    const container = document.getElementById('gbFilters');
    if (container) {
      container.innerHTML = '<button class="gb-filter-btn active" data-cat="todos">Todos</button>';
      container.querySelector('[data-cat="todos"]').addEventListener('click', function () {
        this.classList.add('active');
        renderGaleria('todos');
      });
    }
  }

  if (resultProdutos.status === 'rejected') {
    console.error('✗ Erro ao carregar produtos:', resultProdutos.reason);
    const gridEl = document.getElementById('gbGrid');
    if (gridEl) {
      gridEl.innerHTML = '<p style="text-align:center; padding: 2rem;">Erro ao carregar produtos. Verifique se o backend está rodando.</p>';
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}