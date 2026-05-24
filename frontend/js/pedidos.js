// ─── CONFIGURAÇÕES ────────────────────────────────────────────────────────────
import { fazerRequisicao } from './config.js';

// ─── ESTADO GLOBAL ────────────────────────────────────────────────────────────

/** @type {{ id: number, descricao: string, precoBase: number }[]} */
let tamanhos = [];

/** @type {{ id: number, nome: string, opcoes: { id: number, nome: string, precoExtra: number }[] }[]} */
let gruposOpcoes = [];

let isSubmitting = false;

// ─── UTILITÁRIOS ──────────────────────────────────────────────────────────────

const formatarMoeda = (valor) =>
  `R$ ${parseFloat(valor || 0).toFixed(2).replace('.', ',')}`;

async function api(rota, opcoes = {}) {
  return fazerRequisicao(rota, opcoes);
}

// ─── FEEDBACK VISUAL ─────────────────────────────────────────────────────────

function exibirToast(tipo, mensagem) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      zIndex: '9999',
    });
    document.body.appendChild(container);
  }

  const icones = { success: '✓', error: '✕', info: 'ℹ' };
  const cores  = { success: '#2e7d32', error: '#c62828', info: '#1565c0' };

  const toast = document.createElement('div');
  toast.setAttribute('role', 'alert');
  Object.assign(toast.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: '#fff',
    border: `1.5px solid ${cores[tipo]}`,
    borderRadius: '10px',
    padding: '0.75rem 1.25rem',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    fontSize: '14px',
    maxWidth: '320px',
    opacity: '0',
    transform: 'translateY(8px)',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
  });

  toast.innerHTML = `
    <span style="font-size:18px;color:${cores[tipo]};font-weight:700;">${icones[tipo]}</span>
    <span style="color:#222;line-height:1.4;">${mensagem}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.addEventListener('transitionend', () => toast.remove());
  }, 4000);
}

function setLoading(ativo, mensagem = 'Carregando...') {
  let overlay = document.getElementById('loading-overlay');

  if (ativo) {
    if (overlay) return;

    overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(255,255,255,0.75)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      zIndex: '1000',
      fontSize: '15px',
      color: '#555',
    });
    overlay.innerHTML = `
      <div class="spinner" aria-hidden="true"></div>
      <span>${mensagem}</span>
    `;
    document.body.appendChild(overlay);
    injetarEstiloSpinner();
  } else {
    overlay?.remove();
  }
}

function injetarEstiloSpinner() {
  if (document.getElementById('spinner-style')) return;
  const style = document.createElement('style');
  style.id = 'spinner-style';
  style.textContent = `
    .spinner {
      width: 36px; height: 36px;
      border: 3px solid #eee;
      border-top-color: #c0617c;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(style);
}

// ─── VALIDAÇÃO INLINE ─────────────────────────────────────────────────────────

function setErroCampo(campo, mensagem) {
  campo.style.borderColor = '';
  const erroAnterior = campo.parentElement?.querySelector('[data-erro]');
  erroAnterior?.remove();

  if (mensagem) {
    campo.style.borderColor = '#c62828';
    const span = document.createElement('span');
    span.setAttribute('data-erro', '');
    span.setAttribute('role', 'alert');
    Object.assign(span.style, {
      display: 'block',
      fontSize: '12px',
      color: '#c62828',
      marginTop: '4px',
    });
    span.textContent = mensagem;
    campo.insertAdjacentElement('afterend', span);
  } else {
    campo.style.borderColor = '#2e7d32';
  }
}

// ─── BOTÃO PEDIR ──────────────────────────────────────────────────────────────

/**
 * FIX: desabilita o botão "Pedir via WhatsApp" enquanto os dados ainda não
 * foram carregados do backend. Assim o usuário não consegue enviar um pedido
 * com selects vazios ou sem preço caso o Koyeb esteja hibernando.
 */
function setBtnPedirCarregando(ativo) {
  const btn = document.getElementById('btnPedir');
  if (!btn) return;

  if (ativo) {
    btn.disabled = true;
    btn.setAttribute('data-loading', '');
    btn.innerHTML = '<i class="lni lni-spinner-arrow" style="animation:spin 0.7s linear infinite;display:inline-block;"></i> Carregando opções...';
  } else {
    btn.disabled = false;
    btn.removeAttribute('data-loading');
    btn.innerHTML = '<i class="lni lni-whatsapp"></i> Pedir via WhatsApp';
  }
}

// ─── CARREGAMENTO DE DADOS ────────────────────────────────────────────────────

async function carregarDadosDoPedido() {
  setLoading(true, 'Carregando opções do pedido...');

  // FIX: desabilita o botão imediatamente enquanto carrega
  setBtnPedirCarregando(true);

  try {
    [tamanhos, gruposOpcoes] = await Promise.all([
      api('/api/tamanhos'),
      api('/api/grupos-opcoes'),
    ]);

    await Promise.all(
      gruposOpcoes.map(async (grupo) => {
        grupo.opcoes = await api(`/api/grupos-opcoes/${grupo.id}/opcoes`);
      })
    );

    preencherFormulario();

    // FIX: só habilita o botão após carregamento bem-sucedido
    setBtnPedirCarregando(false);
  } catch (erro) {
    console.error('Erro ao carregar dados do pedido:', erro);
    exibirToast('error', 'Não foi possível carregar o formulário. Verifique sua conexão e recarregue a página.');

    // Mantém o botão desabilitado e mostra erro
    const btn = document.getElementById('btnPedir');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="lni lni-warning"></i> Erro ao carregar — recarregue a página';
    }
  } finally {
    setLoading(false);
  }
}

// ─── PREENCHIMENTO DO FORMULÁRIO ──────────────────────────────────────────────

function preencherFormulario() {
  preencherTamanhos();
  preencherGruposOpcoes();
  registrarEventos();
  atualizarResumo();
}

function preencherTamanhos() {
  const container = document.getElementById('kiloGrid');
  if (!container || !tamanhos.length) return;

  container.innerHTML = '';
  tamanhos.forEach((t) => {
    const label = document.createElement('label');
    label.className = 'kilo-card';
    label.innerHTML = `
      <input
        type="radio"
        name="kilo"
        value="${t.precoBase}"
        data-tamanho-id="${t.id}"
        aria-label="${t.descricao} — ${formatarMoeda(t.precoBase)}"
      >
      <span class="kilo-dot"></span>
      <span class="kilo-label">${t.descricao}</span>
      <span class="kilo-price">${formatarMoeda(t.precoBase)}</span>
    `;
    container.appendChild(label);
  });
}

function preencherGruposOpcoes() {
  /**
   * FIX: mapeamento por ID do grupo (vindo do banco) em vez do nome.
   * Isso torna o código imune a renomeações de grupos no banco de dados.
   *
   * Como descobrir os IDs:
   *   GET /api/grupos-opcoes  →  retorna array com { id, nome, ... }
   *   Os IDs do V2__initial_data.sql são: 1, 2, 3, 4 (na ordem de inserção)
   *
   * Se mudar no banco, basta atualizar os números abaixo — sem tocar no resto.
   */
  const mapaGrupoParaSelect = {
    1: 'tipoMassa',   // "Tipo de Massa"
    2: 'saborMassa',  // "Sabor da Massa"
    3: 'recheio',     // "Recheio"
    4: 'adicional',   // "Adicionais"
  };

  gruposOpcoes.forEach((grupo) => {
    const selectId = mapaGrupoParaSelect[grupo.id];
    const select = selectId ? document.getElementById(selectId) : null;

    if (!select) {
      console.warn(`Select não encontrado para o grupo id=${grupo.id} ("${grupo.nome}")`);
      return;
    }

    select.innerHTML = '<option value="">— Selecione —</option>';

    (grupo.opcoes ?? []).forEach((opcao) => {
      const option = document.createElement('option');
      option.value = opcao.nome;
      option.dataset.opcaoId = opcao.id;
      option.dataset.precoExtra = opcao.precoExtra ?? 0;
      option.textContent =
        opcao.precoExtra > 0
          ? `${opcao.nome} (+${formatarMoeda(opcao.precoExtra)})`
          : opcao.nome;
      select.appendChild(option);
    });
  });
}

function registrarEventos() {
  document.querySelectorAll('select, input[type="radio"]').forEach((el) => {
    el.addEventListener('change', atualizarResumo);
  });

  ['tipoMassa', 'recheio'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', () => {
      if (!el.value) {
        setErroCampo(el, 'Este campo é obrigatório.');
      } else {
        setErroCampo(el, null);
      }
    });
  });

  document.querySelectorAll('input[name="kilo"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const container = document.getElementById('kiloGrid');
      const erroAnterior = container?.parentElement?.querySelector('[data-erro]');
      erroAnterior?.remove();
    });
  });
}

// ─── RESUMO E TOTAL ───────────────────────────────────────────────────────────

function calcularTotal() {
  let total = 0;

  const kiloSel = document.querySelector('input[name="kilo"]:checked');
  if (kiloSel) total += parseFloat(kiloSel.value) || 0;

  document.querySelectorAll('select').forEach((select) => {
    const opcao = select.options[select.selectedIndex];
    if (opcao?.value) {
      total += parseFloat(opcao.dataset.precoExtra) || 0;
    }
  });

  return total;
}

function atualizarResumo() {
  const kiloSel    = document.querySelector('input[name="kilo"]:checked');
  const tipoMassa  = document.getElementById('tipoMassa')?.value  ?? '';
  const saborMassa = document.getElementById('saborMassa')?.value ?? '';
  const recheio    = document.getElementById('recheio')?.value    ?? '';
  const adicional  = document.getElementById('adicional')?.value  ?? '';

  const itemsDiv = document.getElementById('summaryItems');
  const totalEl  = document.getElementById('totalDisplay');

  if (!itemsDiv || !totalEl) return;

  let html    = '';
  let temItem = false;

  if (kiloSel) {
    temItem = true;
    const labelTamanho = kiloSel.closest('label')?.querySelector('.kilo-label')?.textContent?.trim() ?? kiloSel.value;
    html += `
      <div class="summary-row">
        <div class="summary-row-left">
          <span class="summary-dot"></span>
          <span class="summary-row-name">${labelTamanho}</span>
        </div>
        <span class="summary-row-price">${formatarMoeda(kiloSel.value)}</span>
      </div>`;
  }

  if (tipoMassa || saborMassa || recheio) {
    temItem = true;
    html += `<div class="summary-detail-group">`;
    if (tipoMassa)  html += `<div class="summary-detail"><i class="lni lni-arrow-right" aria-hidden="true"></i> Tipo: ${tipoMassa}</div>`;
    if (saborMassa) html += `<div class="summary-detail"><i class="lni lni-arrow-right" aria-hidden="true"></i> Sabor: ${saborMassa}</div>`;
    if (recheio)    html += `<div class="summary-detail"><i class="lni lni-arrow-right" aria-hidden="true"></i> Recheio: ${recheio}</div>`;
    html += `</div>`;
  }

  if (adicional) {
    temItem = true;
    const adicionalSelect = document.getElementById('adicional');
    const opcaoAdicional  = adicionalSelect?.options[adicionalSelect.selectedIndex];
    const precoAdicional  = parseFloat(opcaoAdicional?.dataset.precoExtra ?? 0);

    html += `
      <div class="summary-row">
        <div class="summary-row-left">
          <span class="summary-dot accent"></span>
          <span class="summary-row-name">Adicional: ${adicional}</span>
        </div>
        <span class="summary-row-price">${formatarMoeda(precoAdicional)}</span>
      </div>`;
  }

  itemsDiv.innerHTML = temItem
    ? html
    : '<p class="summary-empty">Nenhum item selecionado ainda.</p>';

  totalEl.textContent = formatarMoeda(calcularTotal());
}

// ─── VALIDAÇÃO DO PEDIDO ──────────────────────────────────────────────────────

function validarPedido() {
  let valido = true;

  const kiloSel = document.querySelector('input[name="kilo"]:checked');
  if (!kiloSel) {
    valido = false;
    const container = document.getElementById('kiloGrid');
    if (container) {
      container.parentElement?.querySelector('[data-erro]')?.remove();
      const span = document.createElement('span');
      span.setAttribute('data-erro', '');
      span.setAttribute('role', 'alert');
      Object.assign(span.style, { display: 'block', fontSize: '12px', color: '#c62828', marginTop: '4px' });
      span.textContent = 'Selecione o tamanho do bolo.';
      container.insertAdjacentElement('afterend', span);
    }
  }

  const camposObrigatorios = [
    { id: 'tipoMassa', label: 'Escolha o tipo de massa.' },
    { id: 'recheio',   label: 'Escolha um recheio.'      },
  ];

  camposObrigatorios.forEach(({ id, label }) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.value) {
      setErroCampo(el, label);
      valido = false;
    } else {
      setErroCampo(el, null);
    }
  });

  return valido;
}

// ─── MONTAGEM DA MENSAGEM WHATSAPP ────────────────────────────────────────────

function montarMensagemWhatsApp({ tamanhoLabel, tipoMassa, saborMassa, recheio, adicional, totalPrice, obs }) {
  const linhas = [
    `🎂 *Novo Pedido — Jusce Confeitaria*`,
    ``,
    `📋 *Detalhes do Pedido:*`,
    `• *Tamanho:* ${tamanhoLabel}`,
    `• *Massa:* ${tipoMassa}`,
    saborMassa ? `• *Sabor:* ${saborMassa}` : null,
    `• *Recheio:* ${recheio}`,
    adicional   ? `• *Adicional:* ${adicional}` : null,
    ``,
    `💰 *Total estimado:* ${formatarMoeda(totalPrice)}`,
    obs?.trim() ? `\n📝 *Observações:* ${obs.trim()}` : null,
    ``,
    `Aguardo confirmação e detalhes de entrega!`,
  ];

  return linhas.filter((l) => l !== null).join('\n');
}

// ─── ENVIO DO PEDIDO ─────────────────────────────────────────────────────────

async function enviarPedido() {
  if (isSubmitting) return;

  if (!validarPedido()) {
    document.querySelector('[data-erro]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const kiloSel    = document.querySelector('input[name="kilo"]:checked');
  const tipoMassa  = document.getElementById('tipoMassa')?.value  ?? '';
  const saborMassa = document.getElementById('saborMassa')?.value ?? '';
  const recheio    = document.getElementById('recheio')?.value    ?? '';
  const adicional  = document.getElementById('adicional')?.value  ?? '';
  const obs        = document.getElementById('observacoes')?.value ?? '';

  const tamanhoLabel = kiloSel.closest('label')?.querySelector('.kilo-label')?.textContent?.trim() ?? kiloSel.value;
  const tamanhoId    = parseInt(kiloSel.dataset.tamanhoId, 10);
  const totalPrice   = calcularTotal();

  const opcaoIds = [];
  document.querySelectorAll('select').forEach((select) => {
    if (select.value) {
      const opcaoId = parseInt(select.options[select.selectedIndex].dataset.opcaoId, 10);
      if (!isNaN(opcaoId)) opcaoIds.push(opcaoId);
    }
  });

  isSubmitting = true;
  const btnEnviar = document.getElementById('btnPedir');
  if (btnEnviar) {
    btnEnviar.disabled    = true;
    btnEnviar.textContent = 'Enviando...';
  }

  try {
    const pedido = {
      tamanhoId:   isNaN(tamanhoId) ? null : tamanhoId,
      opcaoIds,
      totalPrice,
      observacoes: obs,
    };

    api('/api/pedidos', { method: 'POST', body: JSON.stringify(pedido) })
      .then((result) => console.log('Pedido registrado no banco:', result))
      .catch((erro)  => console.warn('Pedido não registrado no banco:', erro));

    const mensagem = montarMensagemWhatsApp({
      tamanhoLabel, tipoMassa, saborMassa,
      recheio, adicional, totalPrice, obs,
    });
    window.open(`https://wa.me/5575988373099?text=${encodeURIComponent(mensagem)}`, '_blank');

    exibirToast('success', 'Pedido enviado! Verifique seu WhatsApp para confirmar.');
    limparFormulario();

  } finally {
    isSubmitting = false;
    if (btnEnviar) {
      btnEnviar.disabled    = false;
      btnEnviar.innerHTML   = '<i class="lni lni-whatsapp"></i> Pedir via WhatsApp';
    }
  }
}

// ─── LIMPEZA DO FORMULÁRIO ────────────────────────────────────────────────────

function limparFormulario() {
  document.querySelectorAll('input, select, textarea').forEach((el) => {
    if (el.type === 'radio' || el.type === 'checkbox') {
      el.checked = false;
    } else {
      el.value = '';
    }
    el.style.borderColor = '';
  });

  document.querySelectorAll('[data-erro]').forEach((el) => el.remove());
  atualizarResumo();
}

// ─── EXPOR enviarPedido para o onclick do HTML ────────────────────────────────
window.enviarPedido = enviarPedido;

// ─── INIT ─────────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', carregarDadosDoPedido);
} else {
  carregarDadosDoPedido();
}