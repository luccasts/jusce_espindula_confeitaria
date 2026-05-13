// =====================================================
//   PEDIDOS.JS — Jusce Confeitaria
//   Script exclusivo da página de pedidos
// =====================================================

// ================= DADOS DA API =================
let tamanhos = [];
let gruposOpcoes = [];
let pricesCache = {}; // { groupId_optionId: price }

// ================= CARREGA DADOS DO BACKEND =================
async function carregarDadosDoPedido() {
  try {
    // Carrega tamanhos
    tamanhos = await fazerRequisicao('/tamanhos');
    console.log('✓ Tamanhos carregados:', tamanhos.length);
    
    // Carrega grupos de opções
    gruposOpcoes = await fazerRequisicao('/grupos-opcoes');
    console.log('✓ Grupos de opções carregados:', gruposOpcoes.length);
    
    // Para cada grupo, carrega as opções
    for (const grupo of gruposOpcoes) {
      const opcoes = await fazerRequisicao(`/grupos-opcoes/${grupo.id}/opcoes`);
      grupo.opcoes = opcoes;
      
      // Cache os preços
      opcoes.forEach(op => {
        pricesCache[`${grupo.id}_${op.id}`] = op.precoExtra || 0;
      });
    }
    
    preencherFormulario();
    console.log('✓ Dados do pedido carregados com sucesso');
  } catch (erro) {
    console.error('✗ Erro ao carregar dados:', erro);
    alert('Erro ao carregar dados do formulário. Tente recarregar a página.');
  }
}

// ================= PREENCHE O FORMULÁRIO =================
function preencherFormulario() {
  // Preenche tamanhos (radio buttons)
  const tamanhosContainer = document.querySelector('[data-tamanhos-container]') || document.getElementById('tamanhosContainer');
  if (tamanhosContainer && tamanhos.length > 0) {
    tamanhosContainer.innerHTML = '';
    tamanhos.forEach(t => {
      const label = document.createElement('label');
      label.className = 'option-label';
      label.innerHTML = `
        <input type="radio" name="kilo" value="${t.precoBase}" data-tamanho-id="${t.id}" data-tamanho-preco="${t.precoBase}">
        <span>${t.descricao} - R$ ${parseFloat(t.precoBase).toFixed(2).replace('.', ',')}</span>
      `;
      tamanhosContainer.appendChild(label);
    });
  }
  
  // Preenche grupos de opções (selects)
  gruposOpcoes.forEach(grupo => {
    const selectId = grupo.nome.toLowerCase().replace(/\s+/g, '') || `opcoes_${grupo.id}`;
    const select = document.getElementById(selectId);
    
    if (select) {
      select.innerHTML = '<option value="">Selecione...</option>';
      (grupo.opcoes || []).forEach(opcao => {
        const option = document.createElement('option');
        option.value = opcao.nome;
        option.setAttribute('data-opcao-id', opcao.id);
        option.setAttribute('data-preco-extra', opcao.precoExtra || 0);
        option.textContent = opcao.precoExtra > 0 
          ? `${opcao.nome} (+R$ ${parseFloat(opcao.precoExtra).toFixed(2).replace('.', ',')})`
          : opcao.nome;
        select.appendChild(option);
      });
    }
  });
  
  // Adiciona event listeners para atualizar resumo
  document.querySelectorAll('select, input[type="radio"]').forEach(el => {
    el.addEventListener('change', atualizarResumo);
  });
  
  atualizarResumo();
}

// ================= CALCULA TOTAL =================
function calcularTotal() {
  let total = 0;
  
  // Preço do tamanho
  const kiloSel = document.querySelector('input[name="kilo"]:checked');
  if (kiloSel) {
    total += parseFloat(kiloSel.value || 0);
  }
  
  // Adiciona preços extras das opções selecionadas
  document.querySelectorAll('select').forEach(select => {
    const opcaoSelecionada = select.options[select.selectedIndex];
    if (opcaoSelecionada && opcaoSelecionada.value) {
      const precoExtra = parseFloat(opcaoSelecionada.getAttribute('data-preco-extra') || 0);
      total += precoExtra;
    }
  });
  
  return total;
}

// ================= ATUALIZA RESUMO =================

// ================= ATUALIZA RESUMO =================
function atualizarResumo() {
  const kiloSel    = document.querySelector('input[name="kilo"]:checked');
  const tipoMassa  = document.getElementById('tipoMassa')?.value || '';
  const saborMassa = document.getElementById('saborMassa')?.value || '';
  const recheio    = document.getElementById('recheio')?.value || '';
  const adicional  = document.getElementById('adicional')?.value || '';

  const itemsDiv = document.getElementById('summaryItems');
  const totalEl  = document.getElementById('totalDisplay');

  let html    = '';
  let temItem = false;

  // Linha de tamanho
  if (kiloSel) {
    temItem = true;
    const labelTamanho = kiloSel.closest('label')?.textContent?.trim() || kiloSel.value;
    html += `
      <div class="summary-row">
        <div class="summary-row-left">
          <span class="summary-dot"></span>
          <span class="summary-row-name">${labelTamanho}</span>
        </div>
        <span class="summary-row-price">R$ ${parseFloat(kiloSel.value || 0).toFixed(2).replace('.', ',')}</span>
      </div>`;
  }

  // Detalhes das opções selecionadas
  if (tipoMassa || saborMassa || recheio) {
    temItem = true;
    html += `<div class="summary-detail-group">`;
    if (tipoMassa)  html += `<div class="summary-detail"><i class="lni lni-arrow-right"></i> Tipo: ${tipoMassa}</div>`;
    if (saborMassa) html += `<div class="summary-detail"><i class="lni lni-arrow-right"></i> Sabor: ${saborMassa}</div>`;
    if (recheio)    html += `<div class="summary-detail"><i class="lni lni-arrow-right"></i> Recheio: ${recheio}</div>`;
    html += `</div>`;
  }

  // Adicionais com preço
  if (adicional) {
    temItem = true;
    const adicionalSelect = document.getElementById('adicional');
    const opcaoAdicional = adicionalSelect?.options[adicionalSelect.selectedIndex];
    const precoAdicional = parseFloat(opcaoAdicional?.getAttribute('data-preco-extra') || 0);
    
    html += `
      <div class="summary-row">
        <div class="summary-row-left">
          <span class="summary-dot accent"></span>
          <span class="summary-row-name">Adicional: ${adicional}</span>
        </div>
        <span class="summary-row-price">R$ ${precoAdicional.toFixed(2).replace('.', ',')}</span>
      </div>`;
  }

  itemsDiv.innerHTML = temItem
    ? html
    : '<p class="summary-empty">Nenhum item selecionado ainda.</p>';

  // Calcula e exibe o total
  const total = calcularTotal();
  totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// ================= ENVIAR PEDIDO =================
async function enviarPedido() {
  const kiloSel    = document.querySelector('input[name="kilo"]:checked');
  const tipoMassa  = document.getElementById('tipoMassa')?.value || '';
  const saborMassa = document.getElementById('saborMassa')?.value || '';
  const recheio    = document.getElementById('recheio')?.value || '';
  const adicional  = document.getElementById('adicional')?.value || '';
  const obs        = document.getElementById('observacoes')?.value || '';
  const nome       = document.getElementById('nomeCliente')?.value || '';
  const telefone   = document.getElementById('telefoneCliente')?.value || '';

  // Validações
  if (!kiloSel)   { alert('Por favor, selecione o tamanho do bolo.');  return; }
  if (!tipoMassa) { alert('Por favor, escolha o tipo de massa.');       return; }
  if (!recheio)   { alert('Por favor, escolha um recheio.');            return; }
  if (!nome)      { alert('Por favor, digite seu nome.');               return; }
  if (!telefone)  { alert('Por favor, digite seu telefone.');           return; }

  const tamanhoLabel = kiloSel.closest('label')?.textContent?.trim() || kiloSel.value;
  const totalPrice = calcularTotal();

  // Constrói mensagem para WhatsApp
  let msg = `🎂 *Novo Pedido - Jusce Confeitaria*\n\n`;
  msg += `👤 *Nome:* ${nome}\n`;
  msg += `📞 *Telefone:* ${telefone}\n\n`;
  msg += `📋 *Detalhes do Pedido:*\n`;
  msg += `• *Tamanho:* ${tamanhoLabel}\n`;
  msg += `• *Massa:* ${tipoMassa}\n`;
  if (saborMassa) msg += `• *Sabor:* ${saborMassa}\n`;
  msg += `• *Recheio:* ${recheio}\n`;
  if (adicional)  msg += `• *Adicional:* ${adicional}\n`;
  msg += `\n💰 *Total estimado:* R$ ${totalPrice.toFixed(2).replace('.', ',')}\n`;
  if (obs.trim()) msg += `\n📝 *Observações:* ${obs.trim()}\n`;
  msg += `\nAguardo confirmação e detalhes de entrega! 😊`;

  const whatsappUrl = `https://wa.me/5575988373099?text=${encodeURIComponent(msg)}`;

  // Tenta registrar no backend (opcional, não bloqueia)
  const tamanhoId = kiloSel.getAttribute('data-tamanho-id');
  const opcaoIds = [];
  document.querySelectorAll('select').forEach(select => {
    if (select.value) {
      const opcaoSelecionada = select.options[select.selectedIndex];
      const opcaoId = opcaoSelecionada.getAttribute('data-opcao-id');
      if (opcaoId) {
        opcaoIds.push(parseInt(opcaoId));
      }
    }
  });

  const pedido = {
    nomeCliente: nome,
    telefoneCliente: telefone,
    tamanhoId: parseInt(tamanhoId),
    opcaoIds: opcaoIds,
    totalPrice: totalPrice,
    observacoes: obs
  };

  // Registra no banco de dados (em background, sem bloquear)
  fazerRequisicao('/pedidos', {
    method: 'POST',
    body: JSON.stringify(pedido)
  }).then(result => {
    console.log('✓ Pedido registrado no banco:', result);
  }).catch(erro => {
    console.warn('⚠ Pedido não foi registrado no banco (pode estar offline):', erro);
  });

  // Abre WhatsApp imediatamente
  window.open(whatsappUrl, '_blank');

  // Mostra confirmação e limpa formulário após um tempo
  setTimeout(() => {
    alert('✓ Pedido enviado para WhatsApp!\n\nEm breve entraremos em contato para confirmar os detalhes.');
    
    // Limpa o formulário
    document.querySelectorAll('input, select, textarea').forEach(el => {
      if (el.type === 'radio' || el.type === 'checkbox') {
        el.checked = false;
      } else {
        el.value = '';
      }
    });
    
    atualizarResumo();
  }, 500);
}

// ================= INIT =================
document.addEventListener('DOMContentLoaded', carregarDadosDoPedido);