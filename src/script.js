// Função para gerar código único de unidade
function gerarCodigoUnico(imovelCodigo, unidadeNumero) {
    return `${imovelCodigo}-${unidadeNumero}`;
}

// Carrega o JSON e renderiza os cards resumidos
fetch("imoveis.json")
    .then(response => response.json())
    .then(imoveis => {
        const container = document.getElementById("imoveis-container");

        imoveis.forEach(imovel => {
            const dados = imovel.dados_publicos;

            // Caso o imóvel tenha várias unidades (ex: edifício com apartamentos)
            if (dados.unidades && dados.unidades.length > 0) {
                dados.unidades.forEach(unidade => {
                    const codigoUnico = gerarCodigoUnico(imovel.codigo, unidade.numero);

                    const card = document.createElement("div");
                    card.classList.add("card");

                    card.innerHTML = `
            <a href="imovel.html?codigo=${codigoUnico}" class="card-link">
              <img src="${dados.imagem}" alt="${dados.nome}">
              <h2>${dados.nome} - ${unidade.numero}</h2>
              <p><strong>Preço:</strong> R$ ${unidade.preco.toLocaleString("pt-BR")}</p>
              <p><strong>Cidade:</strong> ${dados.cidade}/${dados.estado} - ${dados.bairro ?? ""}</p>
              <p><strong>Quartos:</strong> ${unidade.quartos ?? "-"} | <strong>Banheiros:</strong> ${unidade.banheiros ?? "-"}</p>
              <p><strong>Área útil:</strong> ${unidade.area_util ?? "-"} m²</p>
              <p><strong>Vagas:</strong> ${unidade.vagas ?? "-"}</p>
            </a>
          `;

                    container.appendChild(card);
                });
            } else {
                // Imóveis sem unidades (casas, terrenos, etc.)
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
          <a href="imovel.html?codigo=${imovel.codigo}" class="card-link">
            <img src="${dados.imagem}" alt="${dados.nome}">
            <h2>${dados.nome} ${dados.numero ? "- " + dados.numero : ""}</h2>
            <p><strong>Preço:</strong> R$ ${dados.preco.toLocaleString("pt-BR")}</p>
            <p><strong>Cidade:</strong> ${dados.cidade}/${dados.estado} - ${dados.bairro ?? ""}</p>
            <p><strong>Quartos:</strong> ${dados.quartos ?? "-"} | <strong>Banheiros:</strong> ${dados.banheiros ?? "-"}</p>
            <p><strong>Área útil:</strong> ${dados.area_util ?? "-"} m²</p>
            <p><strong>Vagas:</strong> ${dados.vagas ?? "-"}</p>
          </a>
        `;

                container.appendChild(card);
            }
        });
    });
