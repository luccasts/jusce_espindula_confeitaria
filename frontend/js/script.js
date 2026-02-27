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

  // ===== SLIDER =====
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slider-track img");

  if (track && slides.length > 0) {
    let index = 0;

    function proximoSlide() {
      index++;
      if (index >= slides.length) index = 0;
      track.style.transform = `translateX(-${index * 100}vw)`;
    }

    setInterval(proximoSlide, 4000);
  }

  // ===== MENU HAMBURGER =====
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navOverlay = document.getElementById("navOverlay");

  function closeMenu() {
    menuToggle?.classList.remove("active");
    navMenu?.classList.remove("active");
    navOverlay?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function openMenu() {
    menuToggle?.classList.add("active");
    navMenu?.classList.add("active");
    navOverlay?.classList.add("active");
    menuToggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  if (menuToggle && navMenu && navOverlay) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("active");
      if (isOpen) closeMenu();
      else openMenu();
    });

    // fecha clicando fora
    navOverlay.addEventListener("click", closeMenu);

    // fecha ao clicar em um link
    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
    });

    // fecha no ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  } 

  // ===== MOSTRAR / OCULTAR SENHA =====
  const togglePassword = document.getElementById("togglePassword");
  const senhaInput = document.getElementById("senha");

  if (togglePassword && senhaInput) {
    togglePassword.addEventListener("click", function () {
      const type = senhaInput.getAttribute("type") === "password" ? "text" : "password";
      senhaInput.setAttribute("type", type);
    });
  }

});

function abrirMontador() {
  document.getElementById("montadorOverlay").classList.add("active");
}

function fecharMontador() {
  document.getElementById("montadorOverlay").classList.remove("active");
}

function selecionar(botao) {
  const grupo = botao.parentElement;
  const botoes = grupo.querySelectorAll("button");

  botoes.forEach(btn => btn.classList.remove("selected"));
  botao.classList.add("selected");
}