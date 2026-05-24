// ============================================================
//  bolos.js — Galeria de Bolos 
// ============================================================

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
  try {
    const produtos = await fazerRequisicao('/api/produtos');
    
    // Transforma resposta da API para o formato esperado pelo frontend
    BOLOS_DATA = produtos.map(p => ({
      id: p.id,
      nome: p.nome,
      cat: p.categorias || [],
      badge: p.badge,
      badgeClass: p.badgeClass,
      img: p.imagemUrl || 'images/placeholder.jpg',
      preco: p.precoPorSolicitacao ? 'Sob consulta' : `R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}`,
      descricao: p.descricao
    }));
    
    console.log('✓ Produtos carregados:', BOLOS_DATA.length);
    renderGaleria('todos');
  } catch (erro) {
    console.error('✗ Erro ao carregar produtos:', erro);
    // Fallback: renderiza com dados vazios ou mostra mensagem de erro
    grid.innerHTML = '<p style="text-align:center; padding: 2rem;">Erro ao carregar produtos. Verifique se o backend está rodando.</p>';
  }
}

// ================= ELEMENTOS =================
const grid = document.getElementById('gbGrid');
const countEl = document.getElementById('gbCount');
const emptyEl = document.getElementById('gbEmpty');

const modal = document.getElementById('gbModal');
const modalClose = document.getElementById('gbModalClose');

// ================= DESCRIÇÃO =================
function getDescricao(bolo) {
  return bolo.cat.includes('tradicionais')
    ? DESC_TRADICIONAL
    : DESC_PADRAO;
}

// ================= CARD =================
function criarCard(bolo, delay) {
  const card = document.createElement('div');
  card.className = 'gb-card';
  card.style.animationDelay = delay + 'ms';

  card.innerHTML = `
    <div class="gb-card-img-wrap">
      <img src="${bolo.img}" alt="${bolo.nome}">
      ${bolo.badge ? `<span class="gb-card-badge ${bolo.badgeClass}">${bolo.badge}</span>` : ''}
    </div>

    <div class="gb-card-body">
      <p class="gb-card-nome">${bolo.nome}</p>
      <p class="gb-card-desc">${getDescricao(bolo)}</p>

      <div class="gb-card-footer">
        <div>
          ${
            bolo.cat.includes('tradicionais') && bolo.nome !== 'Red Velvet'
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

// ================= FILTROS =================
document.querySelectorAll('.gb-filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {

    document.querySelectorAll('.gb-filter-btn')
      .forEach(b => b.classList.remove('active'));

    this.classList.add('active');

    const categoria = this.dataset.cat || 'todos';
    renderGaleria(categoria);
  });
});

// botão "ver todos" do estado vazio
function resetFiltro() {
  document.querySelectorAll('.gb-filter-btn')
    .forEach(b => b.classList.remove('active'));

  document.querySelector('[data-cat="todos"]').classList.add('active');
  renderGaleria('todos');
}

// ================= MODAL =================
function abrirModal(bolo) {
  document.getElementById('modalImg').src = bolo.img;
  document.getElementById('modalNome').textContent = bolo.nome;
  document.getElementById('modalDesc').textContent = getDescricao(bolo);

  const precoLabel = document.getElementById('modalPrecoLabel');
  const preco = document.getElementById('modalPreco');
  const obs = document.getElementById('modalObs');

  if (bolo.cat.includes('tradicionais') && bolo.nome !== 'Red Velvet') {
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

// fechar no X
modalClose.addEventListener('click', fecharModal);

// fechar clicando fora
modal.addEventListener('click', (e) => {
  if (e.target === modal) fecharModal();
});

// ================= INIT =================
document.addEventListener('DOMContentLoaded', carregarProdutosDoBackend);