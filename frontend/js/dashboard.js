// ================= CONFIGURAÇÕES ================= 

const API_BASE = 'http://localhost:8081/api';

// ================= ELEMENTOS DOM ================= 

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Produtos
const btnNovoProduto = document.getElementById('btnNovoProduto');
const formProduto = document.getElementById('formProduto');
const formProdutoElement = document.getElementById('formProdutoElement');
const btnCancelarProduto = document.getElementById('btnCancelarProduto');
const produtosList = document.getElementById('produtosList');

// Categorias
const btnNovaCategoria = document.getElementById('btnNovaCategoria');
const formCategoria = document.getElementById('formCategoria');
const formCategoriaElement = document.getElementById('formCategoriaElement');
const btnCancelarCategoria = document.getElementById('btnCancelarCategoria');
const categoriasList = document.getElementById('categoriasList');

// Modal
const modalConfirm = document.getElementById('modalConfirm');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');
const btnCancelDelete = document.getElementById('btnCancelDelete');

// Logout
const logout = document.getElementById('logout');

// ================= ESTADO ================= 

let estadoEdicao = {
  tipoProduto: null,
  idProduto: null,
  idCategoria: null
};

let deleteCallback = null;

// ================= INICIALIZAÇÃO ================= 

document.addEventListener('DOMContentLoaded', () => {
  carregarProdutos();
  carregarCategorias();
  setupEventListeners();
});

// ================= EVENT LISTENERS ================= 

function setupEventListeners() {
  // Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      mudarTab(tabName);
    });
  });

  // Produtos
  btnNovoProduto.addEventListener('click', abrirFormularioProduto);
  btnCancelarProduto.addEventListener('click', fecharFormularioProduto);
  formProdutoElement.addEventListener('submit', (e) => {
    e.preventDefault();
    salvarProduto();
  });

  // Categorias
  btnNovaCategoria.addEventListener('click', abrirFormularioCategoria);
  btnCancelarCategoria.addEventListener('click', fecharFormularioCategoria);
  formCategoriaElement.addEventListener('submit', (e) => {
    e.preventDefault();
    salvarCategoria();
  });

  // Modal
  btnConfirmDelete.addEventListener('click', () => {
    if (deleteCallback) deleteCallback();
    fecharModal();
  });

  btnCancelDelete.addEventListener('click', fecharModal);

  // Logout
  logout.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

// ================= TABS ================= 

function mudarTab(tabName) {
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));

  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  document.getElementById(`tab-${tabName}`).classList.add('active');
}

// ================= PRODUTOS ================= 

async function carregarProdutos() {
  try {
    const response = await fetch(`${API_BASE}/produtos`);
    if (!response.ok) throw new Error('Erro ao carregar produtos');

    const produtos = await response.json();
    renderizarProdutos(produtos);
  } catch (error) {
    console.error('Erro:', error);
    produtosList.innerHTML = `<tr><td colspan="4" class="loading">Erro ao carregar produtos</td></tr>`;
  }
}

function renderizarProdutos(produtos) {
  if (produtos.length === 0) {
    produtosList.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 30px;">Nenhum produto cadastrado</td></tr>';
    return;
  }

  produtosList.innerHTML = produtos.map(p => `
    <tr>
      <td><strong>${p.nome}</strong></td>
      <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
      <td>${p.descricao ? p.descricao.substring(0, 50) + '...' : '-'}</td>
      <td>
        <div class="table-actions">
          <button class="btn-edit" onclick="editarProduto(${p.id})">
            <i class="lni lni-pencil"></i> Editar
          </button>
          <button class="btn-delete" onclick="deletarProduto(${p.id})">
            <i class="lni lni-trash"></i> Deletar
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function abrirFormularioProduto() {
  limparFormularioProduto();
  estadoEdicao.tipoProduto = 'novo';
  formProduto.style.display = 'block';
  formProduto.scrollIntoView({ behavior: 'smooth' });
}

function fecharFormularioProduto() {
  formProduto.style.display = 'none';
  limparFormularioProduto();
  estadoEdicao.tipoProduto = null;
  estadoEdicao.idProduto = null;
}

function limparFormularioProduto() {
  formProdutoElement.reset();
  document.getElementById('produtoNome').value = '';
  document.getElementById('produtoPreco').value = '';
  document.getElementById('produtoDescricao').value = '';
  document.getElementById('produtoImagem').value = '';
  document.getElementById('produtoBadge').value = '';
  document.getElementById('produtoOrdem').value = '';
  document.getElementById('produtoPrecoSolicitacao').checked = false;
}

async function editarProduto(id) {
  try {
    const response = await fetch(`${API_BASE}/produtos/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar produto');

    const produto = await response.json();
    
    document.getElementById('produtoNome').value = produto.nome || '';
    document.getElementById('produtoPreco').value = produto.preco || '';
    document.getElementById('produtoDescricao').value = produto.descricao || '';
    document.getElementById('produtoImagem').value = produto.imagemUrl || '';
    document.getElementById('produtoBadge').value = produto.badge || '';
    document.getElementById('produtoOrdem').value = produto.ordemExibicao || '';
    document.getElementById('produtoPrecoSolicitacao').checked = produto.precoPorSolicitacao || false;

    estadoEdicao.tipoProduto = 'editar';
    estadoEdicao.idProduto = id;
    formProduto.style.display = 'block';
    formProduto.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar produto para edição');
  }
}

async function salvarProduto() {
  const dados = {
    nome: document.getElementById('produtoNome').value,
    descricao: document.getElementById('produtoDescricao').value,
    preco: parseFloat(document.getElementById('produtoPreco').value),
    precoPorSolicitacao: document.getElementById('produtoPrecoSolicitacao').checked,
    imagemUrl: document.getElementById('produtoImagem').value,
    badge: document.getElementById('produtoBadge').value,
    badgeClass: '', // pode ser expandido depois
    ordemExibicao: parseInt(document.getElementById('produtoOrdem').value) || 0
  };

  try {
    let response;
    if (estadoEdicao.tipoProduto === 'novo') {
      response = await fetch(`${API_BASE}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    } else {
      response = await fetch(`${API_BASE}/produtos/${estadoEdicao.idProduto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    }

    if (!response.ok) throw new Error('Erro ao salvar produto');

    alert(estadoEdicao.tipoProduto === 'novo' ? 'Produto criado com sucesso!' : 'Produto atualizado com sucesso!');
    fecharFormularioProduto();
    carregarProdutos();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao salvar produto: ' + error.message);
  }
}

function deletarProduto(id) {
  deleteCallback = async () => {
    try {
      const response = await fetch(`${API_BASE}/produtos/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao deletar produto');

      alert('Produto deletado com sucesso!');
      carregarProdutos();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao deletar produto: ' + error.message);
    }
  };

  mostrarModal('Tem certeza que deseja deletar este produto?');
}

// ================= CATEGORIAS ================= 

async function carregarCategorias() {
  try {
    const response = await fetch(`${API_BASE}/categorias`);
    if (!response.ok) throw new Error('Erro ao carregar categorias');

    const categorias = await response.json();
    renderizarCategorias(categorias);
  } catch (error) {
    console.error('Erro:', error);
    categoriasList.innerHTML = `<tr><td colspan="4" class="loading">Erro ao carregar categorias</td></tr>`;
  }
}

function renderizarCategorias(categorias) {
  if (categorias.length === 0) {
    categoriasList.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 30px;">Nenhuma categoria cadastrada</td></tr>';
    return;
  }

  categoriasList.innerHTML = categorias.map(c => `
    <tr>
      <td><strong>${c.nome}</strong></td>
      <td><code>${c.slug}</code></td>
      <td>${c.ordemExibicao || 0}</td>
      <td>
        <div class="table-actions">
          <button class="btn-edit" onclick="editarCategoria(${c.id})">
            <i class="lni lni-pencil"></i> Editar
          </button>
          <button class="btn-delete" onclick="deletarCategoria(${c.id})">
            <i class="lni lni-trash"></i> Deletar
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function abrirFormularioCategoria() {
  limparFormularioCategoria();
  estadoEdicao.tipoProduto = 'novo';
  formCategoria.style.display = 'block';
  formCategoria.scrollIntoView({ behavior: 'smooth' });
}

function fecharFormularioCategoria() {
  formCategoria.style.display = 'none';
  limparFormularioCategoria();
  estadoEdicao.idCategoria = null;
}

function limparFormularioCategoria() {
  formCategoriaElement.reset();
}

async function editarCategoria(id) {
  try {
    const response = await fetch(`${API_BASE}/categorias/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar categoria');

    const categoria = await response.json();
    
    document.getElementById('categoriaSlug').value = categoria.slug || '';
    document.getElementById('categoriaNome').value = categoria.nome || '';
    document.getElementById('categoriaOrdem').value = categoria.ordemExibicao || '';

    estadoEdicao.idCategoria = id;
    formCategoria.style.display = 'block';
    formCategoria.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar categoria para edição');
  }
}

async function salvarCategoria() {
  const dados = {
    slug: document.getElementById('categoriaSlug').value,
    nome: document.getElementById('categoriaNome').value,
    ordemExibicao: parseInt(document.getElementById('categoriaOrdem').value) || 0
  };

  try {
    let response;
    if (!estadoEdicao.idCategoria) {
      response = await fetch(`${API_BASE}/categorias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    } else {
      response = await fetch(`${API_BASE}/categorias/${estadoEdicao.idCategoria}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    }

    if (!response.ok) throw new Error('Erro ao salvar categoria');

    alert(!estadoEdicao.idCategoria ? 'Categoria criada com sucesso!' : 'Categoria atualizada com sucesso!');
    fecharFormularioCategoria();
    carregarCategorias();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao salvar categoria: ' + error.message);
  }
}

function deletarCategoria(id) {
  deleteCallback = async () => {
    try {
      const response = await fetch(`${API_BASE}/categorias/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao deletar categoria');

      alert('Categoria deletada com sucesso!');
      carregarCategorias();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao deletar categoria: ' + error.message);
    }
  };

  mostrarModal('Tem certeza que deseja deletar esta categoria?');
}

// ================= MODAL ================= 

function mostrarModal(mensagem) {
  document.getElementById('modalConfirmMsg').textContent = mensagem;
  modalConfirm.style.display = 'flex';
}

function fecharModal() {
  modalConfirm.style.display = 'none';
  deleteCallback = null;
}

// Fechar modal ao clicar fora
modalConfirm.addEventListener('click', (e) => {
  if (e.target === modalConfirm) {
    fecharModal();
  }
});


// ================= Exceções =================
const res = await fetch('/api/produtos', { 

    method: 'POST', 

    body: formData, 

    headers: { 'Authorization': 'Bearer ' + token } 

}); 

if (!res.ok) { 

    const erro = await res.json(); 

    // erro.mensagem contém a mensagem legível 

    // erro.status contém o código HTTP (400, 404, etc.) 

    mostrarErro(erro.mensagem); 

    return; 

}