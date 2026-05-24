// ================= CONFIGURAÇÕES ================= 
import { fazerRequisicao } from './config.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const IMGUR_CLIENT_ID = import.meta.env.VITE_IMGUR_CLIENT_ID;

// Helper: envia FormData com JWT (para POST/PUT de produtos)
async function fazerRequisicaoForm(endpoint, method, formData) {
  const token = sessionStorage.getItem('token');
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: formData
  });

  if (!response.ok) throw new Error(`Erro ${response.status}`);
  if (response.status === 204) return null;
  return await response.json();
}

// Helper: DELETE com JWT — retorna 204 sem body, não tenta .json()
async function fazerDelete(endpoint) {
  const token = sessionStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { method: 'DELETE', headers });
  if (!response.ok) throw new Error(`Erro ${response.status}`);
  // 204 No Content — não chama .json()
}

// ================= ELEMENTOS DOM ================= 

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

const btnNovoProduto = document.getElementById('btnNovoProduto');
const formProduto = document.getElementById('formProduto');
const formProdutoElement = document.getElementById('formProdutoElement');
const btnCancelarProduto = document.getElementById('btnCancelarProduto');
const produtosList = document.getElementById('produtosList');

const btnNovaCategoria = document.getElementById('btnNovaCategoria');
const formCategoria = document.getElementById('formCategoria');
const formCategoriaElement = document.getElementById('formCategoriaElement');
const btnCancelarCategoria = document.getElementById('btnCancelarCategoria');
const categoriasList = document.getElementById('categoriasList');

const modalConfirm = document.getElementById('modalConfirm');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');
const btnCancelDelete = document.getElementById('btnCancelDelete');

const modalAlert = document.getElementById('modalAlert');
const btnOkAlert = document.getElementById('btnOkAlert');

const logout = document.getElementById('logout');

// ================= ESTADO ================= 

let estadoEdicao = {
  tipoProduto: null,
  idProduto: null,
  idCategoria: null
};

let deleteCallback = null;

// ================= INICIALIZAÇÃO =================

// FIX: módulos ES com type="module" rodam com defer — o DOMContentLoaded pode já ter
// disparado quando o script executa. Checar readyState garante que o init sempre roda.
async function init() {
  setupEventListeners();
  await Promise.all([
    carregarProdutos(),
    carregarCategorias()
  ]);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ================= EVENT LISTENERS ================= 

function setupEventListeners() {
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      mudarTab(tabName);
    });
  });

  btnNovoProduto.addEventListener('click', abrirFormularioProduto);
  btnCancelarProduto.addEventListener('click', fecharFormularioProduto);
  formProdutoElement.addEventListener('submit', (e) => {
    e.preventDefault();
    salvarProduto();
  });

  btnNovaCategoria.addEventListener('click', abrirFormularioCategoria);
  btnCancelarCategoria.addEventListener('click', fecharFormularioCategoria);
  formCategoriaElement.addEventListener('submit', (e) => {
    e.preventDefault();
    salvarCategoria();
  });

  btnConfirmDelete.addEventListener('click', () => {
    if (deleteCallback) deleteCallback();
    fecharModal();
  });

  btnCancelDelete.addEventListener('click', fecharModal);
  
  if(btnOkAlert) {
    btnOkAlert.addEventListener('click', fecharAlerta);
  }

  logout.addEventListener('click', () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('adminLogado');
    window.location.href = 'admin.html';
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
    const produtos = await fazerRequisicao('/api/produtos');
    renderizarProdutos(produtos);
  } catch (error) {
    console.error('Erro:', error);
    produtosList.innerHTML = `<tr><td colspan="5" class="loading">Erro ao carregar produtos</td></tr>`;
  }
}

function renderizarProdutos(produtos) {
  if (produtos.length === 0) {
    produtosList.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px;">Nenhum produto cadastrado</td></tr>';
    return;
  }

  produtosList.innerHTML = produtos.map(p => {
    // FIX: só adiciona '...' se a descrição for de fato maior que 50 caracteres
    const descricaoExibida = p.descricao
      ? (p.descricao.length > 50 ? p.descricao.substring(0, 50) + '...' : p.descricao)
      : '-';

    return `
    <tr>
      <td>
        ${p.imagemUrl
          ? `<img src="${p.imagemUrl}" alt="${p.nome}" style="width:48px;height:48px;object-fit:cover;border-radius:6px;" onerror="this.style.display='none'">`
          : `<div style="width:48px;height:48px;border-radius:6px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:20px;">🎂</div>`}
      </td>
      <td><strong>${p.nome}</strong></td>
      <td>${p.precoPorSolicitacao ? 'Sob consulta' : p.preco != null ? `R$ ${parseFloat(p.preco).toFixed(2)}` : '-'}</td>
      <td>${descricaoExibida}</td>
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
  `}).join('');
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
  document.getElementById('produtoImagemAntiga').value = '';
  document.getElementById('produtoImagemPreview').innerHTML = '';
  document.getElementById('produtoBadge').value = '';
  document.getElementById('produtoOrdem').value = '';
  document.getElementById('produtoPrecoSolicitacao').checked = false;
}

// FIX: exposta no window para funcionar nos botões gerados dinamicamente via onclick
window.editarProduto = async function(id) {
  try {
    const produto = await fazerRequisicao(`/api/produtos/${id}`);

    document.getElementById('produtoNome').value = produto.nome || '';
    document.getElementById('produtoPreco').value = produto.preco || '';
    document.getElementById('produtoDescricao').value = produto.descricao || '';
    
    document.getElementById('produtoImagem').value = ''; // Limpa o input file
    document.getElementById('produtoImagemAntiga').value = produto.imagemUrl || '';
    const preview = document.getElementById('produtoImagemPreview');
    if (produto.imagemUrl) {
      preview.innerHTML = `Imagem atual: <a href="${produto.imagemUrl}" target="_blank" style="color:var(--cor-principal);">Ver imagem no Imgur</a>`;
    } else {
      preview.innerHTML = 'Sem imagem cadastrada.';
    }

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

// ================= UPLOAD IMGUR =================
async function uploadImgur(file) {
  const clientId = IMGUR_CLIENT_ID;
  if (!clientId) {
    throw new Error('Imgur Client-ID não configurado. Adicione VITE_IMGUR_CLIENT_ID no arquivo .env');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      'Authorization': `Client-ID ${clientId}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Falha ao fazer upload da imagem no Imgur');
  }

  const data = await response.json();
  return data.data.link;
}

// FIX: Envia payload JSON, compatível com o novo endpoint Spring
async function salvarProduto() {
  const precoPorSolicitacao = document.getElementById('produtoPrecoSolicitacao').checked;
  const precoValor = document.getElementById('produtoPreco').value;
  const imagemInput = document.getElementById('produtoImagem');
  
  try {
    let imagemUrl = document.getElementById('produtoImagemAntiga').value;

    if (imagemInput.files && imagemInput.files.length > 0) {
      const file = imagemInput.files[0];
      const tamanhoMaximoMB = 20; // Limite padrão do Imgur para imagens
      
      if (file.size > tamanhoMaximoMB * 1024 * 1024) {
        mostrarAlerta('Arquivo Muito Grande', `O arquivo selecionado é muito pesado. O limite suportado é de ${tamanhoMaximoMB}MB. Por favor, comprima a imagem e tente novamente.`);
        return; // Impede o envio
      }
      
      imagemUrl = await uploadImgur(file);
    }

    const payload = {
      nome: document.getElementById('produtoNome').value,
      descricao: document.getElementById('produtoDescricao').value,
      preco: (!precoPorSolicitacao && precoValor) ? parseFloat(precoValor) : null,
      precoPorSolicitacao: precoPorSolicitacao,
      imagemUrl: imagemUrl,
      badge: document.getElementById('produtoBadge').value,
      badgeClass: '',
      ordemExibicao: parseInt(document.getElementById('produtoOrdem').value) || 0
    };

    if (estadoEdicao.tipoProduto === 'novo') {
      await fazerRequisicao('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      await fazerRequisicao(`/api/produtos/${estadoEdicao.idProduto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    mostrarAlerta('Sucesso!', estadoEdicao.tipoProduto === 'novo' ? 'Produto criado com sucesso!' : 'Produto atualizado com sucesso!');
    fecharFormularioProduto();
    await carregarProdutos();
  } catch (error) {
    console.error('Erro:', error);
    mostrarAlerta('Erro', 'Erro ao salvar produto: ' + error.message);
  }
}

// FIX: exposta no window para funcionar nos botões gerados dinamicamente via onclick
window.deletarProduto = function(id) {
  deleteCallback = async () => {
    try {
      await fazerDelete(`/api/produtos/${id}`);
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
    const categorias = await fazerRequisicao('/api/categorias');
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
  estadoEdicao.idCategoria = null;
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

// FIX: exposta no window para funcionar nos botões gerados dinamicamente via onclick
window.editarCategoria = async function(id) {
  try {
    const categoria = await fazerRequisicao(`/api/categorias/${id}`);

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
    if (!estadoEdicao.idCategoria) {
      await fazerRequisicao('/api/categorias', {
        method: 'POST',
        body: JSON.stringify(dados)
      });
    } else {
      await fazerRequisicao(`/api/categorias/${estadoEdicao.idCategoria}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
      });
    }

    alert(!estadoEdicao.idCategoria ? 'Categoria criada com sucesso!' : 'Categoria atualizada com sucesso!');
    fecharFormularioCategoria();
    carregarCategorias();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao salvar categoria: ' + error.message);
  }
}

// FIX: exposta no window para funcionar nos botões gerados dinamicamente via onclick
window.deletarCategoria = function(id) {
  deleteCallback = async () => {
    try {
      await fazerDelete(`/api/categorias/${id}`);
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

modalConfirm.addEventListener('click', (e) => {
  if (e.target === modalConfirm) {
    fecharModal();
  }
});

// ================= MODAL DE ALERTA ================= 

function mostrarAlerta(titulo, mensagem) {
  document.getElementById('modalAlertTitle').textContent = titulo;
  document.getElementById('modalAlertMsg').textContent = mensagem;
  modalAlert.style.display = 'flex';
}

function fecharAlerta() {
  modalAlert.style.display = 'none';
}

if(modalAlert) {
  modalAlert.addEventListener('click', (e) => {
    if (e.target === modalAlert) {
      fecharAlerta();
    }
  });
}