function criarCard(imovel) {
  const dados = imovel.dados_publicos;

  return `
    <div class="card" onclick="location.href='imovel.html?id=${imovel.codigo}'">
      <div class="card-img">
        <img src="${dados.imagem}" alt="${dados.nome}">
      </div>
      <div class="card-info">
        <h3>${dados.nome}</h3>
        <p>${dados.bairro} - ${dados.cidade}/${dados.estado}</p>
        <p>${dados.descricao}</p>
        <p><strong>Preço: ${dados.preco_venda.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }</strong></p>

      </div>
    </div>
  `;
}

fetch("./imoveis.json") // ajuste o caminho se necessário
  .then(res => res.json())
  .then(data => {
    const lista = document.getElementById("lista-vendas");
    lista.innerHTML = data
      .filter(imovel => imovel.dados_publicos.objetivo === "Venda")
      .map(criarCard)
      .join("");
  })
  .catch(err => console.error("Erro ao carregar imóveis:", err));
function renderizarVendas(imoveis) {
  const lista = document.getElementById("lista-vendas");
  lista.innerHTML = imoveis
    .filter(imovel => imovel.dados_publicos.objetivo === "Venda")
    .map(criarCard)
    .join("");
}

fetch("./imoveis.json")
  .then(res => res.json())
  .then(data => {
    renderizarVendas(data);

    document.getElementById("filtro-vendas").addEventListener("change", e => {
      let ordenado = [...data].filter(i => i.dados_publicos.objetivo === "Venda");
      if (e.target.value === "preco") {
        ordenado.sort((a, b) => (a.dados_publicos.preco_venda || 0) - (b.dados_publicos.preco_venda || 0));
      } else if (e.target.value === "quartos") {
        ordenado.sort((a, b) => a.dados_publicos.quartos - b.dados_publicos.quartos);
      } else if (e.target.value === "area") {
        ordenado.sort((a, b) => a.dados_publicos.area_util - b.dados_publicos.area_util);
      }
      renderizarVendas(ordenado);
    });
  });
