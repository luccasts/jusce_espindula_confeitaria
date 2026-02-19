
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

document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-track img");

    let index = 0;

    function proximoSlide() {
        index++;
        if (index >= slides.length) {
            index = 0;
        }

        track.style.transform = `translateX(-${index * 100}vw)`;
    }

    setInterval(proximoSlide, 4000);

});
