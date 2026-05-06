// ============================================================
//  bolos.js — Galeria de Bolos 
// ============================================================

// ================= DESCRIÇÕES =================
const DESC_PADRAO =
  'Este é um modelo de inspiração. Personalize sabores, recheios e acabamento conforme sua preferência.';

const DESC_TRADICIONAL =
  'Bolo com sabor tradicional já definido. Ideal para quem busca um clássico delicioso e pronto para encomenda.';

// ================= DADOS =================
const BOLOS_DATA = [
  { id: 1, nome: 'Morango Natalino', cat: ['especial'], badge: 'Destaque', badgeClass: 'destaque', img: 'images/bolos/bolo_morango_LE_upscale_prime.jpg' },
  { id: 2, nome: 'Bolo Sonic', cat: ['comemorativos', 'tematicos'], img: 'images/bolos/bolo_sonic_infantil.jpg' },
  { id: 3, nome: 'Bolo Natalino', cat: ['especial'], img: 'images/bolos/bolo_natal_festivo.jpg' },
  { id: 4, nome: 'Bolo Hora de Aventura', cat: ['comemorativos', 'tematicos'], badge: 'Popular', badgeClass: 'popular', img: "images/bolos/bolo_adventuretime.jpg" },
  { id: 5, nome: 'Bolo Homem-Aranha', cat: ['comemorativos', 'tematicos'], badge: 'Popular', badgeClass: 'popular', img: "images/bolos/bolo_infantil_spiderman.jpg" },
  { id: 6, nome: 'Bolo Verão Praiano', cat: ['tematicos'], badge: 'Destaque', badgeClass: 'destaque', img: 'images/bolos/bolo_duplo_aniversario.jpg' },
  { id: 7, nome: 'Bolo Dia das Mães', cat: ['especial'], img: "images/bolos/bolo_mae.jpg" },

  // TRADICIONAIS
  { id: 8, nome: 'Brigadeiro', cat: ['tradicionais'], preco: 'R$ 100,00', img: 'images/bolos/bolo_brigadeirov2.jpeg' },
  { id: 9, nome: 'Bolo de Cenoura', cat: ['tradicionais'], preco: 'R$ 100,00', badge: 'Destaque', badgeClass: 'destaque', img: 'images/bolos/bolo_maracuja_LE_upscale_prime.jpg' },
  { id: 10, nome: 'Bolo de Chocolate', cat: ['tradicionais'], preco: 'R$ 100,00', badge: 'Popular', badgeClass: 'popular', img: 'images/bolos/bolo_chocolate.jpeg' },
  { id: 11, nome: 'Bolo de Maracujá', cat: ['tradicionais'], preco: 'R$ 100,00', img: 'images/bolos/bolo_padrao_maracuja.jpeg' },
  { id: 12, nome: 'Red Velvet', cat: ['tradicionais'], badge: 'Destaque', badgeClass: 'destaque', img: 'images/bolos/bolo_redvelvet.jpeg' },
  { id: 13, nome: 'Bolo de Limão', cat: ['tradicionais'], preco: 'R$ 100,00', img: 'images/bolos/bolo_limao.jpeg' },
  { id: 14, nome: 'Bolo de Laranja', cat: ['tradicionais'], preco: 'R$ 100,00', img: 'images/bolos/bolo_laranja.jfif' },
  { id: 15, nome: 'Bolo Formigueiro', cat: ['tradicionais'], preco: 'R$ 100,00', img: 'images/bolos/bolo_formigueiro.jpeg' },
];

// ================= ESTADO =================
let categoriaAtiva = 'todos';

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
renderGaleria('todos');