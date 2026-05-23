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

(function () {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const btn = document.getElementById('btnEntrar');
  const errorEl = document.getElementById('erro');
  const senhaInput = document.getElementById('senha');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    errorEl.classList.remove('show'); // Esconde erros anteriores

    // Captura os valores dos inputs
    const email = document.getElementById('usuario').value.trim();
    const senha = senhaInput.value;

    // Validação básica no frontend
    if (!email || !senha) {
      errorEl.textContent = 'Por favor, preencha todos os campos.';
      errorEl.classList.add('show');
      return;
    }

    // Ativa o estado visual de carregamento no botão
    btn.classList.add('loading');
    btn.disabled = true;

    try {
      // Chamando a SUA função genérica do config.js
      // Ela já configura os Headers e faz o .json() automaticamente se der certo
      const data = await fazerRequisicao('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, senha: senha })
      });

      // Se a requisição foi bem-sucedida, a função retorna o JSON com o Token
      if (data && data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("adminLogado", "true");

        // Redireciona para o painel de controle administrativo
        window.location.href = 'dashboard.html';
      } else {
        errorEl.textContent = 'Resposta inválida do servidor.';
        errorEl.classList.add('show');
      }

    } catch (erro) {
      // Como a sua função fazerRequisicao dá um 'throw erro' caso o status não seja OK (ex: 401),
      // o código cai direto aqui no catch.
      console.error("Falha na autenticação:", erro);
      
      errorEl.textContent = 'E-mail ou senha incorretos. Tente novamente.';
      errorEl.classList.add('show');
      
      // Limpa o campo de senha para uma nova tentativa
      senhaInput.value = '';
      senhaInput.focus();
    } finally {
      // Restaura o botão para o estado normal, independentemente de ter dado certo ou errado
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });
})();