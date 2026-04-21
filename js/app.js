const STORAGE_KEYS = {
  usuario: "usuarioPedidoFalta",
  medicamentos: "pf_medicamentos",
  pedidoAtual: "pf_pedido_atual",
  historico: "pf_historico_pedidos"
};

const usuarioLogado = localStorage.getItem(STORAGE_KEYS.usuario);

if (!usuarioLogado) {
  window.location.href = "index.html";
}

const usuarioLogadoNome = document.getElementById("usuarioLogadoNome");
const tituloPagina = document.getElementById("tituloPagina");
const btnSair = document.getElementById("btnSair");
const userAvatar = document.getElementById("userAvatar");

const tabs = document.querySelectorAll(".nav-link");
const tabContents = document.querySelectorAll(".tab-content");

const formMedicamento = document.getElementById("formMedicamento");
const medicamentoIdInput = document.getElementById("medicamentoId");
const nomeMedicamentoInput = document.getElementById("nomeMedicamento");
const dosagemMedicamentoInput = document.getElementById("dosagemMedicamento");
const apresentacaoMedicamentoInput = document.getElementById("apresentacaoMedicamento");
const unidadeMedicamentoInput = document.getElementById("unidadeMedicamento");
const categoriaMedicamentoInput = document.getElementById("categoriaMedicamento");
const btnCancelarEdicaoMedicamento = document.getElementById("btnCancelarEdicaoMedicamento");
const btnCarregarTeste = document.getElementById("btnCarregarTeste");
const buscaMedicamentoInput = document.getElementById("buscaMedicamento");
const listaMedicamentos = document.getElementById("listaMedicamentos");

const medicamentosDatalist = document.getElementById("medicamentosDatalist");
const formItemPedido = document.getElementById("formItemPedido");
const buscaPedidoMedicamento = document.getElementById("buscaPedidoMedicamento");
const quantidadeAtualInput = document.getElementById("quantidadeAtual");
const quantidadePedidaInput = document.getElementById("quantidadePedida");
const observacaoPedidoInput = document.getElementById("observacaoPedido");
const listaItensPedido = document.getElementById("listaItensPedido");
const btnLimparPedido = document.getElementById("btnLimparPedido");
const btnSalvarPedido = document.getElementById("btnSalvarPedido");
const btnExportarPedidoAtual = document.getElementById("btnExportarPedidoAtual");

const listaHistoricoPedidos = document.getElementById("listaHistoricoPedidos");
const totalMedicamentos = document.getElementById("totalMedicamentos");
const totalPedidos = document.getElementById("totalPedidos");
const totalItensAtual = document.getElementById("totalItensAtual");
const ultimosPedidosLista = document.getElementById("ultimosPedidosLista");
const ultimosMedicamentosLista = document.getElementById("ultimosMedicamentosLista");

const modalPedido = document.getElementById("modalPedido");
const conteudoModalPedido = document.getElementById("conteudoModalPedido");
const fecharModal = document.getElementById("fecharModal");

const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

usuarioLogadoNome.textContent = usuarioLogado;
userAvatar.textContent = usuarioLogado.charAt(0).toUpperCase();

function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatarDataHora(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleString("pt-BR");
}

function gerarId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function obterMedicamentos() {
  return getData(STORAGE_KEYS.medicamentos);
}

function obterPedidoAtual() {
  return getData(STORAGE_KEYS.pedidoAtual);
}

function obterHistorico() {
  return getData(STORAGE_KEYS.historico);
}

function salvarPedidoAtual(itens) {
  setData(STORAGE_KEYS.pedidoAtual, itens);
}

function montarNomeMedicamento(medicamento) {
  return [medicamento.nome, medicamento.dosagem].filter(Boolean).join(" ").trim();
}

function preencherDatalistMedicamentos() {
  const medicamentos = obterMedicamentos();
  medicamentosDatalist.innerHTML = "";

  medicamentos.forEach((med) => {
    const option = document.createElement("option");
    option.value = montarNomeMedicamento(med);
    medicamentosDatalist.appendChild(option);
  });
}

function identificarCategoria(nome) {
  const texto = nome.toUpperCase();

  if (texto.includes("MASCARA") || texto.includes("TERMOMETRO")) {
    return "Material";
  }

  if (
    texto.includes("COLIRIO") ||
    texto.includes("SOL OFT") ||
    texto.includes("LUB. OFT") ||
    texto.includes("BIMATOPROSTA") ||
    texto.includes("DORZOLAMIDA") ||
    texto.includes("LATANOPROSTA")
  ) {
    return "Oftálmico";
  }

  if (
    texto.includes("CREME") ||
    texto.includes("POMADA") ||
    texto.includes("TOPICO") ||
    texto.includes("TÓPICO") ||
    texto.includes("CREM VAG")
  ) {
    return "Dermatológico";
  }

  if (
    texto.includes("XPE") ||
    texto.includes("GOTAS") ||
    texto.includes("SPRAY") ||
    texto.includes("AER") ||
    texto.includes("30ML") ||
    texto.includes("50ML") ||
    texto.includes("70ML") ||
    texto.includes("100ML") ||
    texto.includes("120ML") ||
    texto.includes("150ML") ||
    texto.includes("200ML") ||
    texto.includes("240ML") ||
    texto.includes("400ML")
  ) {
    return "Líquido";
  }

  if (texto.includes("INJETAVEL") || texto.includes("INJETÁVEL")) {
    return "Injetável";
  }

  if (
    texto.includes("CAPS") ||
    texto.includes("CPS") ||
    texto.includes("COMP") ||
    texto.includes("CP") ||
    texto.includes("DRG") ||
    texto.includes("C/10") ||
    texto.includes("C/12") ||
    texto.includes("C/14") ||
    texto.includes("C/15") ||
    texto.includes("C/20") ||
    texto.includes("C/21") ||
    texto.includes("C/24") ||
    texto.includes("C/28") ||
    texto.includes("C/30") ||
    texto.includes("C/50") ||
    texto.includes("C/60") ||
    texto.includes("1ENV") ||
    texto.includes("ENV")
  ) {
    return "Sólido Oral";
  }

  if (texto.includes("SUPOSITÓRIO") || texto.includes("SUPOSITORIO")) {
    return "Supositório";
  }

  return "Medicamento";
}

function identificarApresentacao(nome) {
  const texto = nome.toUpperCase();

  if (texto.includes("CREME")) return "Creme";
  if (texto.includes("POMADA")) return "Pomada";
  if (texto.includes("XPE")) return "Xarope";
  if (texto.includes("GOTAS")) return "Gotas";
  if (texto.includes("SPRAY")) return "Spray";
  if (texto.includes("AER")) return "Aerossol";
  if (texto.includes("INJETAVEL") || texto.includes("INJETÁVEL")) return "Injetável";
  if (texto.includes("COLIRIO") || texto.includes("SOL OFT") || texto.includes("LUB. OFT")) return "Colírio";
  if (texto.includes("SUPOSITÓRIO") || texto.includes("SUPOSITORIO")) return "Supositório";
  if (texto.includes("CAPS") || texto.includes("CPS")) return "Cápsulas";
  if (texto.includes("COMP") || texto.includes(" CP")) return "Comprimidos";
  if (texto.includes("DRG")) return "Drágeas";
  if (texto.includes("ENV")) return "Envelope";
  if (texto.includes("FR")) return "Frasco";

  return "";
}

function identificarUnidade(nome) {
  const texto = nome.toUpperCase();

  if (
    texto.includes("C/10") ||
    texto.includes("C/12") ||
    texto.includes("C/14") ||
    texto.includes("C/15") ||
    texto.includes("C/20") ||
    texto.includes("C/21") ||
    texto.includes("C/24") ||
    texto.includes("C/28") ||
    texto.includes("C/30") ||
    texto.includes("C/50") ||
    texto.includes("C/60") ||
    texto.includes("CAPS") ||
    texto.includes("CPS") ||
    texto.includes("COMP") ||
    texto.includes("CP") ||
    texto.includes("DRG")
  ) {
    return "Caixa";
  }

  if (
    texto.includes("100ML") ||
    texto.includes("120ML") ||
    texto.includes("150ML") ||
    texto.includes("200ML") ||
    texto.includes("240ML") ||
    texto.includes("400ML") ||
    texto.includes("50ML") ||
    texto.includes("70ML") ||
    texto.includes("30ML") ||
    texto.includes("15ML") ||
    texto.includes("10ML") ||
    texto.includes("5ML") ||
    texto.includes("3ML")
  ) {
    return "Frasco";
  }

  if (texto.includes("1ENV") || texto.includes("ENV")) {
    return "Envelope";
  }

  if (texto.includes("MASCARA")) {
    return "Caixa";
  }

  if (texto.includes("TERMOMETRO")) {
    return "Unidade";
  }

  return "";
}

function extrairDosagem(nome) {
  const match = nome.match(/(\d+[.,]?\d*(?:\/\d+[.,]?\d*)?\s?(MGML|MG|G|ML|UI|FCC|%))/i);
  return match ? match[0].trim() : "";
}

function limparNomeBase(nome) {
  return nome
    .replace(/\s+C\/\d+\b/gi, "")
    .replace(/\b\d+[.,]?\d*(?:\/\d+[.,]?\d*)?\s?(MGML|MG|G|ML|UI|FCC|%)\b/gi, "")
    .replace(/\b(CAPS|CPS|COMP|CP|DRG|ENV|XPE|GOTAS|CREME|POMADA|SPRAY|AER|COLIRIO|SOL OFT|LUB\. OFT|INJETAVEL|INJETÁVEL)\b/gi, "")
    .replace(/\bFRX\d+ML\+SER\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function renderMedicamentos() {
  const medicamentos = obterMedicamentos();
  const termo = buscaMedicamentoInput.value.trim().toLowerCase();

  const filtrados = medicamentos.filter((med) => {
    const texto = `
      ${med.nome}
      ${med.dosagem}
      ${med.apresentacao}
      ${med.unidade}
      ${med.categoria}
      ${med.nomeOriginal || ""}
    `.toLowerCase();

    return texto.includes(termo);
  });

  listaMedicamentos.innerHTML = "";

  if (!filtrados.length) {
    listaMedicamentos.innerHTML = `
      <tr>
        <td colspan="6">Nenhum medicamento encontrado.</td>
      </tr>
    `;
    preencherResumo();
    preencherDatalistMedicamentos();
    return;
  }

  filtrados.forEach((med) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${med.nome || "-"}</td>
      <td>${med.dosagem || "-"}</td>
      <td>${med.apresentacao || "-"}</td>
      <td>${med.unidade || "-"}</td>
      <td>${med.categoria || "-"}</td>
      <td class="actions-cell">
        <button class="action-btn edit" onclick="editarMedicamento(${med.id})">Editar</button>
        <button class="action-btn delete" onclick="excluirMedicamento(${med.id})">Excluir</button>
      </td>
    `;
    listaMedicamentos.appendChild(tr);
  });

  preencherResumo();
  preencherDatalistMedicamentos();
}

function limparFormularioMedicamento() {
  medicamentoIdInput.value = "";
  nomeMedicamentoInput.value = "";
  dosagemMedicamentoInput.value = "";
  apresentacaoMedicamentoInput.value = "";
  unidadeMedicamentoInput.value = "";
  categoriaMedicamentoInput.value = "";
}

formMedicamento.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = nomeMedicamentoInput.value.trim();
  const dosagem = dosagemMedicamentoInput.value.trim();
  const apresentacao = apresentacaoMedicamentoInput.value.trim();
  const unidade = unidadeMedicamentoInput.value.trim();
  const categoria = categoriaMedicamentoInput.value.trim();

  if (!nome) {
    alert("Informe o nome do medicamento.");
    return;
  }

  const medicamentos = obterMedicamentos();
  const idEdicao = Number(medicamentoIdInput.value);

  if (idEdicao) {
    const indice = medicamentos.findIndex((med) => med.id === idEdicao);

    if (indice !== -1) {
      medicamentos[indice] = {
        ...medicamentos[indice],
        nome,
        dosagem,
        apresentacao,
        unidade,
        categoria
      };
    }
  } else {
    medicamentos.unshift({
      id: gerarId(),
      nome,
      dosagem,
      apresentacao,
      unidade,
      categoria,
      criadoEm: new Date().toISOString()
    });
  }

  setData(STORAGE_KEYS.medicamentos, medicamentos);
  limparFormularioMedicamento();
  renderMedicamentos();
});

btnCancelarEdicaoMedicamento.addEventListener("click", limparFormularioMedicamento);
buscaMedicamentoInput.addEventListener("input", renderMedicamentos);

window.editarMedicamento = function (id) {
  const medicamentos = obterMedicamentos();
  const medicamento = medicamentos.find((med) => med.id === id);

  if (!medicamento) return;

  medicamentoIdInput.value = medicamento.id;
  nomeMedicamentoInput.value = medicamento.nome || "";
  dosagemMedicamentoInput.value = medicamento.dosagem || "";
  apresentacaoMedicamentoInput.value = medicamento.apresentacao || "";
  unidadeMedicamentoInput.value = medicamento.unidade || "";
  categoriaMedicamentoInput.value = medicamento.categoria || "";

  ativarTab("medicamentos");
  nomeMedicamentoInput.focus();
};

window.excluirMedicamento = function (id) {
  const confirmar = window.confirm("Deseja excluir este medicamento?");
  if (!confirmar) return;

  const medicamentos = obterMedicamentos().filter((med) => med.id !== id);
  setData(STORAGE_KEYS.medicamentos, medicamentos);
  renderMedicamentos();
  renderPedidoAtual();
};

function carregarMedicamentosTeste() {
  const listaInicial = [
    "ACALENTUS MELATONINA GOTAS MAXINUTRI",
    "ALUMIMEC 100ML",
    "AMORA MIURA FORTLIFE 1000MG 60 CPS (VIT E+B6+MAG)",
    "BACLOFEN 10MG C/20",
    "BELSPAN COMPOSTO C/20",
    "BENEUM 300MG C/30",
    "BIMATOPROSTA 0,3MG 3ML",
    "BIOFORZAN MORANGO 400ML",
    "BISOPROLOL 1,25MG C/30",
    "BISOPROLOL 2,5MG C/30",
    "BUTACID 200MG C/20",
    "CALCIUM MAXX ARTRO 60COMP MAXINUTRI",
    "CINARIZINA 75MG C/30",
    "CIPROFLOXACINO 500MG C/14",
    "CONACORT CREME",
    "CONACORT POMADA",
    "CONDROFLAN ULTRA 30CAPS",
    "CYSTEX 24 DRG",
    "DESVENLAFAXINA 50MG",
    "DEXASON 4MG C/10",
    "DEXASON XPE 100ML",
    "DILTIAZEM 30MG C/50",
    "DIVALPROATO 500MG C/30",
    "DROPROPIZINA 1,5MG XPE PED FRX120ML+SER",
    "ESOMEPRAZOL 40MG C/28 RANBAXY",
    "ESPIRONOLACTONA 100MG C/30",
    "FLAVONID TÓPICO 200G",
    "FLOMICIN 200MG C/4 ENV",
    "GASTROGEL FRESH 150ML",
    "GEROVITAL C/30",
    "GLICLAZIDA 60MG C/60",
    "HEMOPROCT 50MG 30G",
    "HIDROXIZINA XPE 100ML",
    "HYSTIN XPE 120ML",
    "IMECALCIO 1250MG C/60",
    "ITRACONAZOL 100MG C/15",
    "LACTITOL 200ML",
    "LATOLISE 10.000 FCC ALU 30CP",
    "LEVANLODIPINO 2,5MG C/60",
    "LINOFEME C/21",
    "MASSAGEOL AER 120ML",
    "MELOXICAM INJETAVEL",
    "METFORMINA 850MG C/30",
    "METOPROLOL 50MG C/30",
    "METREXATO 2,5MG C/24",
    "NASONEW SPRAY 50ML",
    "NEOSORO ADT",
    "CEFALEXINA 500MG C/10",
    "NOCICLIN 0,03MG 0,15MG 21COMP",
    "OSELTAMIVIR 75MG",
    "OSTEOFIX D 1500+200UI VITAMINA D 60COMP",
    "OSTEOFIX D 1250+200UI C/60",
    "PETIVIT BC 240ML",
    "QUETIAPINA 25MG C/30",
    "RESFRILIV HORTELÃ E GENGIBRE",
    "ROSUVASTATINA 10MG C/30",
    "SEAKALM 260MG C/20",
    "SEAKALM XPE 100ML",
    "SILIMARINA 300MG C/30",
    "SIMETICONA 75MG 10ML",
    "SINVASTATINA 10MG C/30",
    "SITAGLIPTINA 25MG C/30",
    "SOBRAL 30ML",
    "SOYNATI 150MG C/30",
    "STOMALIV ABACAXI",
    "SULFATO FERROSO FRAMBROESA XPE 100ML",
    "SULFERBEL 250MG 50COMP",
    "SUPOSITÓRIO GLICERINA ADT",
    "TERMOMETRO CLON DIG BRANCO G-TECH",
    "TOTAL VITA AZ POLIVIT 60CAPS",
    "TOTAL VITA MULHER AZ POLIVIT 60CAPS",
    "TOTALVITA HAIR POLIVIT 60/CAPS",
    "VALSARTANA+HIDRO 160/12,5MG C/30",
    "VARFARINA 5MG C/30 TEUTO",
    "VENAFLON 450/50MG C/60",
    "VENLAFAXINA 37,5MG C/30",
    "VILDAGLIP+ METFORMINA 50/1000MG 60COMP",
    "VILDAGLIPTINA 50MG C/30",
    "VITAMINA KIDS D3 400UI 10ML",
    "ÁCIDO MEFENAMICO 500MG C/24",
    "ATORVASTATINA 40MG C/30",
    "BIOLAGRIMA LUB. OFT 0,15% 10ML",
    "BROMETO DE IPRATROPIO TEUTO",
    "CLONAZEPAM GOTAS TEUTO",
    "EQUILIBRISSE 420MG 10COMP",
    "FOSFOMICINA TROMETAMOL 1ENV",
    "PAROXETINA 20MG C/30 GEOLAB",
    "IBUPROFENO 50MG 30ML (TUTTI-FRUTTI)",
    "MATHERLLY LACT C/30",
    "NARIDRIN 15ML GTS PED",
    "PHITOSS XPE 100ML",
    "RESFEGRIPE SINUS 500MG COM 24COMP VER",
    "RISPERIDONA 1MG C/30",
    "RISPERIDONA 2MG C/30",
    "TANDENE C/30",
    "TININ CREM VAG",
    "TORSILAX C/200",
    "VENOCEL 100MG C/30 CAPS",
    "MASCARA AZUL C/50",
    "MASCARA ROSA C/50",
    "LOSARTANA 50MG C/30",
    "AXETILCEFUROXIMA 250MG 50ML",
    "AXETILCEFUROXIMA 250MG 70ML",
    "MEMANTINA 10MG C/30",
    "CLORTALIDONA 25MG C/60",
    "DORILEN GOTAS",
    "DORZOLAMIDA 20MGML 5ML SOL OFT",
    "LACTITOL 120ML",
    "LATANOPROSTA COLIRIO",
    "REPOFLOR 100MG 12CAPS"
  ];

  const medicamentosIniciais = listaInicial.map((item, index) => ({
    id: Date.now() + index,
    nome: limparNomeBase(item) || item,
    dosagem: extrairDosagem(item),
    apresentacao: identificarApresentacao(item),
    unidade: identificarUnidade(item),
    categoria: identificarCategoria(item),
    nomeOriginal: item,
    criadoEm: new Date().toISOString()
  }));

  setData(STORAGE_KEYS.medicamentos, medicamentosIniciais);
  salvarPedidoAtual([]);
  setData(STORAGE_KEYS.historico, []);

  renderMedicamentos();
  renderPedidoAtual();
  renderHistorico();
  preencherDatalistMedicamentos();
  preencherResumo();

  alert("Medicamentos de teste carregados com sucesso.");
}

btnCarregarTeste.addEventListener("click", carregarMedicamentosTeste);

formItemPedido.addEventListener("submit", (event) => {
  event.preventDefault();

  const nomeDigitado = buscaPedidoMedicamento.value.trim();
  const quantidadeAtual = Number(quantidadeAtualInput.value);
  const quantidadePedida = Number(quantidadePedidaInput.value);
  const observacao = observacaoPedidoInput.value.trim();

  if (!nomeDigitado) {
    alert("Selecione um medicamento.");
    return;
  }

  if (quantidadePedida <= 0) {
    alert("A quantidade pedida deve ser maior que zero.");
    return;
  }

  const itens = obterPedidoAtual();

  itens.push({
    id: gerarId(),
    medicamento: nomeDigitado,
    quantidadeAtual,
    quantidadePedida,
    observacao
  });

  salvarPedidoAtual(itens);
  formItemPedido.reset();
  renderPedidoAtual();
});

function renderPedidoAtual() {
  const itens = obterPedidoAtual();
  listaItensPedido.innerHTML = "";

  if (!itens.length) {
    listaItensPedido.innerHTML = `
      <tr>
        <td colspan="5">Nenhum item adicionado ao pedido.</td>
      </tr>
    `;
    preencherResumo();
    return;
  }

  itens.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.medicamento}</td>
      <td>${item.quantidadeAtual}</td>
      <td>${item.quantidadePedida}</td>
      <td>${item.observacao || "-"}</td>
      <td class="actions-cell">
        <button class="action-btn delete" onclick="removerItemPedido(${item.id})">Remover</button>
      </td>
    `;
    listaItensPedido.appendChild(tr);
  });

  preencherResumo();
}

window.removerItemPedido = function (id) {
  const itens = obterPedidoAtual().filter((item) => item.id !== id);
  salvarPedidoAtual(itens);
  renderPedidoAtual();
};

btnLimparPedido.addEventListener("click", () => {
  const confirmar = window.confirm("Deseja limpar o pedido atual?");
  if (!confirmar) return;

  salvarPedidoAtual([]);
  renderPedidoAtual();
});

btnSalvarPedido.addEventListener("click", () => {
  const itens = obterPedidoAtual();

  if (!itens.length) {
    alert("Adicione pelo menos um item antes de salvar.");
    return;
  }

  const historico = obterHistorico();

  const pedido = {
    id: gerarId(),
    data: new Date().toISOString(),
    usuario: usuarioLogado,
    itens
  };

  historico.unshift(pedido);
  setData(STORAGE_KEYS.historico, historico);
  salvarPedidoAtual([]);
  renderPedidoAtual();
  renderHistorico();
  preencherResumo();

  alert("Pedido salvo com sucesso.");
});

btnExportarPedidoAtual.addEventListener("click", () => {
  const itens = obterPedidoAtual();

  if (!itens.length) {
    alert("Não há itens no pedido atual.");
    return;
  }

  exportarPedidoPDF({
    id: "atual",
    data: new Date().toISOString(),
    usuario: usuarioLogado,
    itens
  });
});

function renderHistorico() {
  const historico = obterHistorico();
  listaHistoricoPedidos.innerHTML = "";

  if (!historico.length) {
    listaHistoricoPedidos.innerHTML = `
      <tr>
        <td colspan="4">Nenhum pedido salvo ainda.</td>
      </tr>
    `;
    preencherResumo();
    return;
  }

  historico.forEach((pedido) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatarDataHora(pedido.data)}</td>
      <td>${pedido.usuario}</td>
      <td>${pedido.itens.length}</td>
      <td class="actions-cell">
        <button class="action-btn view" onclick="visualizarPedido(${pedido.id})">Visualizar</button>
        <button class="action-btn pdf" onclick="exportarPedidoHistorico(${pedido.id})">PDF</button>
        <button class="action-btn delete" onclick="excluirPedido(${pedido.id})">Excluir</button>
      </td>
    `;
    listaHistoricoPedidos.appendChild(tr);
  });

  preencherResumo();
}

window.visualizarPedido = function (id) {
  const pedido = obterHistorico().find((item) => item.id === id);
  if (!pedido) return;

  conteudoModalPedido.innerHTML = `
    <div class="simple-item" style="margin-bottom: 14px;">
      <strong>Responsável:</strong> ${pedido.usuario}<br>
      <strong>Data:</strong> ${formatarDataHora(pedido.data)}<br>
      <strong>Total de itens:</strong> <span class="badge">${pedido.itens.length}</span>
    </div>

    <div class="modal-pedido-lista">
      ${pedido.itens.map((item) => `
        <div class="simple-item">
          <strong>${item.medicamento}</strong>
          <span>Qtd. atual: ${item.quantidadeAtual}</span><br>
          <span>Qtd. pedida: ${item.quantidadePedida}</span><br>
          <span>Observação: ${item.observacao || "-"}</span>
        </div>
      `).join("")}
    </div>
  `;

  modalPedido.classList.add("show");
};

window.exportarPedidoHistorico = function (id) {
  const pedido = obterHistorico().find((item) => item.id === id);
  if (!pedido) return;

  exportarPedidoPDF(pedido);
};

window.excluirPedido = function (id) {
  const confirmar = window.confirm("Deseja excluir este pedido?");
  if (!confirmar) return;

  const historico = obterHistorico().filter((pedido) => pedido.id !== id);
  setData(STORAGE_KEYS.historico, historico);
  renderHistorico();
};

fecharModal.addEventListener("click", () => {
  modalPedido.classList.remove("show");
});

modalPedido.addEventListener("click", (event) => {
  if (event.target === modalPedido) {
    modalPedido.classList.remove("show");
  }
});

function preencherResumo() {
  const medicamentos = obterMedicamentos();
  const historico = obterHistorico();
  const itens = obterPedidoAtual();

  totalMedicamentos.textContent = medicamentos.length;
  totalPedidos.textContent = historico.length;
  totalItensAtual.textContent = itens.length;

  if (historico.length) {
    ultimosPedidosLista.className = "list-box";
    ultimosPedidosLista.innerHTML = historico
      .slice(0, 5)
      .map((pedido) => `
        <div class="simple-item">
          <strong>${formatarDataHora(pedido.data)}</strong>
          <span>${pedido.usuario} • ${pedido.itens.length} item(ns)</span>
        </div>
      `)
      .join("");
  } else {
    ultimosPedidosLista.className = "list-box empty-box";
    ultimosPedidosLista.innerHTML = "Nenhum pedido cadastrado ainda.";
  }

  if (medicamentos.length) {
    ultimosMedicamentosLista.className = "list-box";
    ultimosMedicamentosLista.innerHTML = medicamentos
      .slice(0, 5)
      .map((med) => `
        <div class="simple-item">
          <strong>${montarNomeMedicamento(med)}</strong>
          <span>${med.categoria || "-"} • ${med.unidade || "-"}</span>
        </div>
      `)
      .join("");
  } else {
    ultimosMedicamentosLista.className = "list-box empty-box";
    ultimosMedicamentosLista.innerHTML = "Nenhum medicamento cadastrado ainda.";
  }
}

function ativarTab(tab) {
  tabs.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });

  tabContents.forEach((section) => {
    section.classList.toggle("active", section.id === `tab-${tab}`);
  });

  const mapaTitulos = {
    inicio: "Painel",
    medicamentos: "Medicamentos",
    "novo-pedido": "Novo Pedido",
    historico: "Histórico"
  };

  tituloPagina.textContent = mapaTitulos[tab] || "Painel";

  if (window.innerWidth <= 860) {
    fecharMenuMobile();
  }
}

tabs.forEach((btn) => {
  btn.addEventListener("click", () => ativarTab(btn.dataset.tab));
});

btnSair.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEYS.usuario);
  window.location.href = "index.html";
});

menuOpen.addEventListener("click", () => {
  sidebar.classList.add("open");
  overlay.classList.add("show");
});

function fecharMenuMobile() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}

menuClose.addEventListener("click", fecharMenuMobile);
overlay.addEventListener("click", fecharMenuMobile);

function exportarPedidoPDF(pedido) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Pedido de Falta Geral", 14, 18);

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Data: ${formatarDataHora(pedido.data)}`, 14, 38);
  doc.text(`Responsável: ${pedido.usuario}`, 14, 45);
  doc.text(`Total de itens: ${pedido.itens.length}`, 14, 52);

  let y = 65;

  pedido.itens.forEach((item, index) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, y - 6, 182, 28, 4, 4, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${index + 1}. ${item.medicamento}`, 18, y + 1);

    doc.setFont("helvetica", "normal");
    doc.text(`Qtd. atual: ${item.quantidadeAtual}`, 18, y + 9);
    doc.text(`Qtd. pedida: ${item.quantidadePedida}`, 70, y + 9);
    doc.text(`Observação: ${item.observacao || "-"}`, 18, y + 17);

    y += 34;
  });

  doc.save(`pedido-falta-${String(pedido.id).replace(/\s+/g, "-")}.pdf`);
}

(function iniciar() {
  renderMedicamentos();
  renderPedidoAtual();
  renderHistorico();
  preencherDatalistMedicamentos();
  ativarTab("inicio");
})();