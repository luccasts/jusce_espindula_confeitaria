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

// ===== LOGIN ADMIN =====

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    // usuário e senha do administrador
    const adminUser = "admin";
    const adminPass = "1234";

    if(usuario === adminUser && senha === adminPass){

      // cria sessão
      sessionStorage.setItem("adminLogado", "true");

      // redireciona para o painel
      window.location.href = "dashboard.html";

    } else {

      erro.textContent = "Usuário ou senha incorretos.";

    }

  });

}

// ===== PROTEÇÃO DO DASHBOARD =====

if (window.location.pathname.includes("dashboard.html")) {

  const logado = sessionStorage.getItem("adminLogado");

  if (logado !== "true") {
    window.location.href = "admin.html";
  }

  const logout = document.getElementById("logout");

  if (logout) {
    logout.addEventListener("click", function () {
      sessionStorage.removeItem("adminLogado");
      window.location.href = "admin.html";
    });
  }

}

// ================= CARRINHO =================

function adicionarCarrinho(nome, descricao, imagem) {

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push({
    nome: nome,
    descricao: descricao,
    imagem: imagem
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  alert("Produto adicionado ao carrinho!");
}

// ===== LOGIN V2 =====
(function () {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const btn     = document.getElementById('btnEntrar');
  const errorEl = document.getElementById('erro');
  const togglePw = document.getElementById('togglePassword');
  const senhaInput = document.getElementById('senha');
  const eyeIcon    = document.getElementById('eyeIcon');

  const SVG_EYE_OPEN = `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>`;

  const SVG_EYE_OFF = `
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
             a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4
             c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19
             m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>`;

  // Toggle mostrar/ocultar senha
  togglePw.addEventListener('click', function () {
    const isHidden = senhaInput.type === 'password';
    senhaInput.type = isHidden ? 'text' : 'password';
    eyeIcon.innerHTML = isHidden ? SVG_EYE_OFF : SVG_EYE_OPEN;
    togglePw.setAttribute('aria-label', isHidden ? 'Ocultar senha' : 'Mostrar senha');
  });

  // Submit com estado de loading
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.classList.remove('show');

    const usuario = document.getElementById('usuario').value.trim();
    const senha   = senhaInput.value;

    if (!usuario || !senha) {
      errorEl.textContent = 'Preencha todos os campos.';
      errorEl.classList.add('show');
      return;
    }

    btn.classList.add('loading');
    btn.disabled = true;

    // --- Substitua este bloco pela sua lógica real de autenticação ---
    setTimeout(function () {
      btn.classList.remove('loading');
      btn.disabled = false;

      // Exemplo: credenciais corretas
      if (usuario === 'admin' && senha === 'jusce2026') {
        window.location.href = 'admin.html';
      } else {
        errorEl.textContent = 'Usuário ou senha incorretos. Tente novamente.';
        errorEl.classList.add('show');
        senhaInput.value = '';
        senhaInput.focus();
      }
    }, 1500);
    // ----------------------------------------------------------------
  });
})();