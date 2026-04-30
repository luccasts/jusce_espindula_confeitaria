// =====================================================
//   PEDIDOS.JS — Jusce Confeitaria
//   Script exclusivo da página de pedidos
// =====================================================

// Atualiza o resumo sempre que algo mudar
document.querySelectorAll('select, input[type="radio"]').forEach(el => {
  el.addEventListener('change', atualizarResumo);
});

function atualizarResumo() {
  const kiloSel    = document.querySelector('input[name="kilo"]:checked');
  const tipoMassa  = document.getElementById('tipoMassa').value;
  const saborMassa = document.getElementById('saborMassa').value;
  const recheio    = document.getElementById('recheio').value;
  const adicional  = document.getElementById('adicional').value;

  const itemsDiv = document.getElementById('summaryItems');
  const totalEl  = document.getElementById('totalDisplay');

  let html    = '';
  let temItem = false;

  // Linha de kilo
  if (kiloSel) {
    temItem = true;
    html += `
      <div class="summary-row">
        <div class="summary-row-left">
          <span class="summary-dot"></span>
          <span class="summary-row-name">${kiloSel.value} Kilo${kiloSel.value > 1 ? 's' : ''} de Bolo</span>
        </div>
        <span class="summary-row-price">R$ XX,XX</span>
      </div>`;
  }

  // Detalhes da massa / recheio / adicional
  if (tipoMassa || saborMassa || recheio || adicional) {
    temItem = true;
    html += `<div class="summary-detail-group">`;
    if (tipoMassa)  html += `<div class="summary-detail"><i class="lni lni-arrow-right"></i> Massa: ${tipoMassa}</div>`;
    if (saborMassa) html += `<div class="summary-detail"><i class="lni lni-arrow-right"></i> Sabor: ${saborMassa}</div>`;
    if (recheio)    html += `<div class="summary-detail"><i class="lni lni-arrow-right"></i> Recheio: ${recheio}</div>`;
    html += `</div>`;

    if (adicional) {
      html += `
        <div class="summary-row">
          <div class="summary-row-left">
            <span class="summary-dot accent"></span>
            <span class="summary-row-name">Adicional: ${adicional}</span>
          </div>
          <span class="summary-row-price">R$ XX,XX</span>
        </div>`;
    }
  }

  itemsDiv.innerHTML = temItem
    ? html
    : '<p class="summary-empty">Nenhum item selecionado ainda.</p>';

  totalEl.textContent = 'R$ XX,XX';
}

function enviarPedido() {
  const kiloSel    = document.querySelector('input[name="kilo"]:checked');
  const tipoMassa  = document.getElementById('tipoMassa').value;
  const saborMassa = document.getElementById('saborMassa').value;
  const recheio    = document.getElementById('recheio').value;
  const adicional  = document.getElementById('adicional').value;
  const obs        = document.getElementById('observacoes').value;

  if (!kiloSel)   { alert('Por favor, selecione o tamanho do bolo.');  return; }
  if (!tipoMassa) { alert('Por favor, escolha o tipo de massa.');       return; }
  if (!recheio)   { alert('Por favor, escolha um recheio.');            return; }

  let msg = `🎂 *Olá, Jusce! Gostaria de fazer um pedido:*\n\n`;
  msg += `• *Tamanho:* ${kiloSel.value} kilo${kiloSel.value > 1 ? 's' : ''} de bolo\n`;
  msg += `• *Massa:* ${tipoMassa}\n`;
  if (saborMassa) msg += `• *Sabor da massa:* ${saborMassa}\n`;
  msg += `• *Recheio:* ${recheio}\n`;
  if (adicional)  msg += `• *Adicional:* ${adicional}\n`;
  if (obs.trim()) msg += `\n📝 *Observações:* ${obs.trim()}\n`;
  msg += `\nAguardo confirmação e valor! 😊`;

  const url = `https://wa.me/5575988373099?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}