// ============================================================
//  bolos.js — Galeria de Bolos
// ============================================================

// FIX: importa fazerRequisicao diretamente — como módulo ES, não fica no escopo global
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
  try {
    const produtos = await fazerRequisicao('/api/produtos');

    BOLOS_DATA = produtos.map(p => ({
      id: p.id,
      nome: p.nome,
      cat: p.categorias || [],
      badge: p.badge,
      badgeClass: p.badgeClass,
      // FIX: imagemUrl do banco é caminho relativo (ex: "images/bolos/bolo_cenoura.jpeg")
      // Usado direto como src — funciona porque o frontend serve esses arquivos
      img: p.imagemUrl || null,
      // FIX: se preco for null mas precoPorSolicitacao=false, evita NaN
      preco: p.precoPorSolicitacao || p.preco == null
        ? 'Sob consulta'
        : `R$ ${parseFloat(p.preco).toFixed(2).replace('.', ',')}`,
      descricao: p.descricao
    }));

    console.log('✓ Produtos carregados:', BOLOS_DATA.length);
    renderGaleria('todos');
  } catch (erro) {
    console.error('✗ Erro ao carregar produtos:', erro);
    const grid = document.getElementById('gbGrid');
    if (grid) {
      grid.innerHTML = '<p style="text-align:center; padding: 2rem;">Erro ao carregar produtos. Verifique se o backend está rodando.</p>';
    }
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
  // Usa a descrição cadastrada no banco se existir; caso contrário usa o texto padrão
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

  // FIX: se não há imagem no banco, renderiza um placeholder visual sem <img> quebrado
  // FIX: usa classe gb-img-placeholder que já existe no bolos.css (não tenta carregar placeholder.jpg)
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

// FIX: exposta no window para funcionar no onclick="resetFiltro()" do bolos.html
window.resetFiltro = function() {
  document.querySelectorAll('.gb-filter-btn')
    .forEach(b => b.classList.remove('active'));

  document.querySelector('[data-cat="todos"]').classList.add('active');
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
// FIX: módulos ES com type="module" rodam com defer — o DOMContentLoaded pode já ter
// disparado quando o script executa. Checar readyState garante que o init sempre roda.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', carregarProdutosDoBackend);
} else {
  carregarProdutosDoBackend();
}