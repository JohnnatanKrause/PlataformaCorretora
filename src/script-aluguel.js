async function carregarAluguel() {
  try {
    const response = await fetch("imoveis.json");
    const imoveis = await response.json();

    const listaAluguel = document.getElementById("lista-aluguel");
    listaAluguel.innerHTML = "";

    imoveis
      .filter(imovel => imovel.dados_publicos.objetivo === "Aluguel")
      .forEach(imovel => {
        const dados = imovel.dados_publicos;
        const card = document.createElement("div");
        card.classList.add("card-imovel");

        card.innerHTML = `
          <img src="${dados.imagem}" alt="${dados.nome}">
          <h3>${dados.nome}</h3>
          <p>${dados.bairro} - ${dados.cidade}/${dados.estado}</p>
          <p>${dados.descricao}</p>
          <p><strong>Aluguel: R$ ${dados.valor_aluguel.toLocaleString("pt-BR")}</strong></p>
          <a href="${dados.contato.whatsapp}" target="_blank">📲 Falar com Karina</a>
        `;
        listaAluguel.appendChild(card);
      });
  } catch (error) {
    console.error("Erro ao carregar imóveis de aluguel:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarAluguel);
