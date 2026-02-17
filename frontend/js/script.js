
// Função para testar se o back está respondendo
async function testarConexao() {
    try {
        const response = await fetch('http://127.0.0.1:8081/api/ola');
        const data = await response.json();
        console.log("Resposta do Backend:", data.mensagem);
    } catch (error) {
        console.error("Erro ao conectar no backend. Verifique se ele está rodando na porta 8081!");
    }
}
testarConexao();   