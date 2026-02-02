function criarCard(imovel) {
  const dados = imovel.dados_publicos;

  const descricaoCurta = dados.descricao && dados.descricao.length > 100 
    ? dados.descricao.substring(0, 100) + "..." 
    : (dados.descricao || "");

  return `
    <div class="card" onclick="location.href='imovel.html?codigo=${imovel.codigo}'">
      <div class="card-img">
        <img src="${dados.imagem}" alt="${dados.nome}">
      </div>
      <div class="card-info">
        <h3>${dados.nome || ""}</h3>
        ${dados.cidade ? `<p><strong>Cidade:</strong> ${dados.cidade}</p>` : ""}
        ${dados.bairro ? `<p><strong>Bairro:</strong> ${dados.bairro}</p>` : ""}
        ${dados.estado ? `<p><strong>Estado:</strong> ${dados.estado}</p>` : ""}
        ${dados.area_util ? `<p><strong>Área útil:</strong> ${dados.area_util} m²</p>` : ""}
        ${dados.preco_venda ? `<p><strong>Valor de venda:</strong> ${dados.preco_venda.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>` : ""}
        ${dados.quartos ? `<p><strong>Quartos:</strong> ${dados.quartos}</p>` : ""}
        ${dados.banheiros ? `<p><strong>Banheiros:</strong> ${dados.banheiros}</p>` : ""}
        ${dados.vagas ? `<p><strong>Vagas de garagem:</strong> ${dados.vagas}</p>` : ""}
        ${dados.andar ? `<p><strong>Andar:</strong> ${dados.andar}</p>` : ""}
        ${descricaoCurta ? `<p><strong>Descrição:</strong> ${descricaoCurta}</p>` : ""}
      </div>
    </div>
  `;
}


// Renderiza lista de imóveis de venda
function renderizarVendas(imoveis) {
  const lista = document.getElementById("lista-vendas");
  lista.innerHTML = imoveis
    .filter(imovel => imovel.dados_publicos.objetivo === "Venda")
    .map(criarCard)
    .join("");
}

// Carrega JSON e inicializa
fetch("./imoveis.json")
  .then(res => res.json())
  .then(data => {
    renderizarVendas(data);

    // Filtros padrões de imobiliária
    document.getElementById("filtro-vendas").addEventListener("change", e => {
      let filtrados = [...data].filter(i => i.dados_publicos.objetivo === "Venda");

      switch (e.target.value) {
        case "preco":
          filtrados.sort((a, b) => (a.dados_publicos.preco_venda || 0) - (b.dados_publicos.preco_venda || 0));
          break;
        case "quartos":
          filtrados.sort((a, b) => (a.dados_publicos.quartos || 0) - (b.dados_publicos.quartos || 0));
          break;
        case "banheiros":
          filtrados.sort((a, b) => (a.dados_publicos.banheiros || 0) - (b.dados_publicos.banheiros || 0));
          break;
        case "vagas":
          filtrados.sort((a, b) => (a.dados_publicos.vagas || 0) - (b.dados_publicos.vagas || 0));
          break;
        case "area":
          filtrados.sort((a, b) => (a.dados_publicos.area_util || 0) - (b.dados_publicos.area_util || 0));
          break;
        case "andar":
          filtrados.sort((a, b) => {
            const andarA = parseInt((a.dados_publicos.andar || "").replace(/\D/g, "")) || 0;
            const andarB = parseInt((b.dados_publicos.andar || "").replace(/\D/g, "")) || 0;
            return andarA - andarB;
          });
          break;
        case "bairro":
          filtrados.sort((a, b) => (a.dados_publicos.bairro || "").localeCompare(b.dados_publicos.bairro || ""));
          break;
        case "cidade":
          filtrados.sort((a, b) => (a.dados_publicos.cidade || "").localeCompare(b.dados_publicos.cidade || ""));
          break;
        case "tipo":
          filtrados.sort((a, b) => (a.dados_publicos.tipo_imovel || "").localeCompare(b.dados_publicos.tipo_imovel || ""));
          break;
      }

      renderizarVendas(filtrados);
    });
  })
  .catch(err => console.error("Erro ao carregar imóveis:", err));
