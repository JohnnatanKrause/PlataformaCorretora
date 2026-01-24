" " 
// Carrega o JSON e renderiza os cards
fetch("imoveis.json")
  .then(response => response.json())
  .then(imoveis => {
    const container = document.getElementById("imoveis-container");

    imoveis.forEach(imovel => {
      const dados = imovel.dados_publicos;

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${dados.imagem}" alt="${dados.nome}">
        <h2>${dados.nome}</h2>
        <p><strong>Tipo:</strong> ${dados.tipo_imovel} | <strong>Objetivo:</strong> ${dados.objetivo}</p>
        <p><strong>Cidade:</strong> ${dados.cidade}/${dados.estado}</p>
        <p><strong>Área útil:</strong> ${dados.area_util ?? "-"} m²</p>
        <p><strong>Quartos:</strong> ${dados.quartos ?? "-"} | <strong>Banheiros:</strong> ${dados.banheiros ?? "-"}</p>
        <p><strong>Vagas:</strong> ${dados.vagas ?? "-"} ${dados.garagens ? "(Garagens: " + dados.garagens.join(", ") + ")" : ""}</p>
        <p><strong>Preço:</strong> R$ ${dados.preco.toLocaleString("pt-BR")}</p>
        ${dados.condominio ? `<p><strong>Condomínio:</strong> R$ ${dados.condominio}</p>` : ""}
        <p>${dados.descricao}</p>
        <a class="btn-whatsapp" href="${dados.contato.whatsapp}" target="_blank">Falar no WhatsApp</a>
      `;

      container.appendChild(card);
    });
  });
