// =====================================================
//   CONFIG.JS — Configuração da API
// =====================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8081';

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
    headers: headers,
  };

  try {
    const response = await fetch(url, configs);

    if (!response.ok) {
      // Tenta ler o corpo JSON para capturar a mensagem de erro do backend
      // (ex: GlobalExceptionHandler devolve { mensagem: "Já existe uma categoria..." })
      let mensagemErro = `Erro ${response.status}: ${response.statusText}`;
      try {
        const corpo = await response.json();
        if (corpo && corpo.mensagem) {
          mensagemErro = corpo.mensagem;
        }
      } catch (_) {
        // Corpo não é JSON — mantém a mensagem genérica
      }
      throw new Error(mensagemErro);
    }

    return await response.json();
  } catch (erro) {
    console.error(`Erro ao chamar ${endpoint}:`, erro);
    throw erro;
  }
} 

export { fazerRequisicao };