async function carregarVendas() {
  try {
    const response = await fetch("imoveis.json");
    const imoveis = await response.json();

    const listaVendas = document.getElementById("lista-vendas");
    listaVendas.innerHTML = "";

    imoveis
      .filter(imovel => imovel.dados_publicos.objetivo === "Venda")
      .forEach(imovel => {
        const dados = imovel.dados_publicos;
        const card = document.createElement("div");
        card.classList.add("card-imovel");

        card.innerHTML = `
          <img src="${dados.imagem}" alt="${dados.nome}">
          <h3>${dados.nome}</h3>
          <p>${dados.bairro} - ${dados.cidade}/${dados.estado}</p>
          <p>${dados.descricao}</p>
          <p><strong>Preço: R$ ${dados.preco_venda.toLocaleString("pt-BR")}</strong></p>
          <a href="${dados.contato.whatsapp}" target="_blank">📲 Falar com Karina</a>
        `;
        listaVendas.appendChild(card);
      });
  } catch (error) {
    console.error("Erro ao carregar imóveis de venda:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarVendas);
