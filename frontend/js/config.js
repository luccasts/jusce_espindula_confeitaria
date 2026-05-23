// =====================================================
//   CONFIG.JS — Configuração da API
// =====================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Função genérica para fazer requisições
async function fazerRequisicao(endpoint, opcoes = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 1. Recupera o token que foi salvo no momento do login
  const token = sessionStorage.getItem("token");

  // 2. Prepara os cabeçalhos padrão
  const headers = {
    'Content-Type': 'application/json',
    ...opcoes.headers,
  };

  // 3. Se o token existir, adiciona o cabeçalho Authorization exigido pelo Spring Boot
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const configs = {
    ...opcoes,
    headers: headers, // Aplica os cabeçalhos atualizados
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
