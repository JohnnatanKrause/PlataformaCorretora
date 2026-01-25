// script.js

// Função principal para carregar os imóveis
async function carregarImoveis() {
  try {
    // Busca o arquivo JSON
    const response = await fetch("imoveis.json");
    const imoveis = await response.json();

    // Seletores das listas
    const listaAluguel = document.getElementById("lista-aluguel");
    const listaVendas = document.getElementById("lista-vendas");

    // Limpa antes de renderizar
    listaAluguel.innerHTML = "";
    listaVendas.innerHTML = "";

    // Percorre os imóveis
    imoveis.forEach(imovel => {
      const dados = imovel.dados_publicos;

      // Cria o card
      const card = document.createElement("div");
      card.classList.add("card-imovel");

      card.innerHTML = `
        <img src="${dados.imagem}" alt="${dados.nome}">
        <h3>${dados.nome}</h3>
        <p>${dados.bairro} - ${dados.cidade}/${dados.estado}</p>
        <p>${dados.descricao}</p>
        <p><strong>${
          dados.objetivo === "Venda" 
            ? "Preço: R$ " + dados.preco_venda.toLocaleString("pt-BR") 
            : "Aluguel: R$ " + dados.valor_aluguel.toLocaleString("pt-BR")
        }</strong></p>
        <a href="${dados.contato.whatsapp}" target="_blank">📲 Falar com Karina</a>
      `;

      // Distribui conforme objetivo
      if (dados.objetivo === "Aluguel") {
        listaAluguel.appendChild(card);
      } else if (dados.objetivo === "Venda") {
        listaVendas.appendChild(card);
      }
    });
  } catch (error) {
    console.error("Erro ao carregar imóveis:", error);
  }
}

// Executa ao carregar a página
document.addEventListener("DOMContentLoaded", carregarImoveis);
