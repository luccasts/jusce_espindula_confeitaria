import { fazerRequisicao } from './config.js';

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

    navOverlay.addEventListener("click", closeMenu);

    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
    });

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

// FIX: exposta no window — chamada por onclick no index.html (módulo ES não expõe automaticamente)
window.abrirMontador = function() {
  document.getElementById("montadorOverlay").classList.add("active");
};

window.fecharMontador = function() {
  document.getElementById("montadorOverlay").classList.remove("active");
};

window.selecionar = function(botao) {
  const grupo = botao.parentElement;
  const botoes = grupo.querySelectorAll("button");
  botoes.forEach(btn => btn.classList.remove("selected"));
  botao.classList.add("selected");
};

// ===== PROTEÇÃO DO DASHBOARD =====
if (window.location.pathname.includes("dashboard.html")) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    window.location.href = "admin.html";
  }
}

// ================= CARRINHO =================
// (mantido para compatibilidade, não usado ativamente)
function adicionarCarrinho(nome, descricao, imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push({ nome, descricao, imagem });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
}

// ================= LOGIN =================
(function () {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const btn = document.getElementById('btnEntrar');
  const errorEl = document.getElementById('erro');
  const senhaInput = document.getElementById('senha');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    errorEl.classList.remove('show');

    const email = document.getElementById('usuario').value.trim();
    const senha = senhaInput.value;

    if (!email || !senha) {
      errorEl.textContent = 'Por favor, preencha todos os campos.';
      errorEl.classList.add('show');
      return;
    }

    btn.classList.add('loading');
    btn.disabled = true;

    try {
      const data = await fazerRequisicao('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, senha: senha })
      });

      if (data && data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("adminLogado", "true");
        window.location.href = 'dashboard.html';
      } else {
        errorEl.textContent = 'Resposta inválida do servidor.';
        errorEl.classList.add('show');
      }

    } catch (erro) {
      console.error("Falha na autenticação:", erro);
      errorEl.textContent = 'E-mail ou senha incorretos. Tente novamente.';
      errorEl.classList.add('show');
      senhaInput.value = '';
      senhaInput.focus();
    } finally {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });
})();