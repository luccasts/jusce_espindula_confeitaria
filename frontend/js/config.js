// =====================================================
//   CONFIG.JS — Configuração da API
// =====================================================

const API_BASE_URL = 'http://localhost:8081/api';

// Função genérica para fazer requisições
async function fazerRequisicao(endpoint, opcoes = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const configs = {
    headers: {
      'Content-Type': 'application/json',
      ...opcoes.headers,
    },
    ...opcoes,
  };

  try {
    const response = await fetch(url, configs);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (erro) {
    console.error(`Erro ao chamar ${endpoint}:`, erro);
    throw erro;
  }
}

// Função para testar conexão com o backend
async function testarConexao() {
  try {
    const data = await fazerRequisicao('/ola');
    console.log('✓ Backend conectado:', data.mensagem);
    return true;
  } catch (erro) {
    console.error('✗ Erro ao conectar no backend. Verifique se ele está rodando na porta 8081!');
    return false;
  }
}

// Chamar teste de conexão quando a página carrega
document.addEventListener('DOMContentLoaded', testarConexao);
