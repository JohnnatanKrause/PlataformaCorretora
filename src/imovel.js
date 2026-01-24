// Pega o código da URL (ex: ?codigo=IMV003-801 ou ?codigo=IMV005)
const urlParams = new URLSearchParams(window.location.search);
const codigo = urlParams.get("codigo");

fetch("imoveis.json")
    .then(response => response.json())
    .then(imoveis => {
        let imovelEncontrado = null;
        let unidadeEncontrada = null;

        // Percorre todos os imóveis
        imoveis.forEach(imovel => {
            const dados = imovel.dados_publicos;

            // Caso seja um imóvel com várias unidades (ex: edifício)
            if (dados.unidades && dados.unidades.length > 0) {
                dados.unidades.forEach(unidade => {
                    const codigoUnico = `${imovel.codigo}-${unidade.numero}`;
                    if (codigoUnico === codigo) {
                        imovelEncontrado = imovel;
                        unidadeEncontrada = unidade;
                    }
                });
            } else {
                // Caso seja um imóvel simples (casa, terreno, etc.)
                if (imovel.codigo === codigo) {
                    imovelEncontrado = imovel;
                }
            }
        });

        if (imovelEncontrado) {
            const dados = imovelEncontrado.dados_publicos;
            const container = document.getElementById("detalhes");

            // Galeria de fotos
            let galeria = "";
            if (unidadeEncontrada && unidadeEncontrada.fotos && unidadeEncontrada.fotos.length > 0) {
                galeria = `<div class="galeria">` +
                    unidadeEncontrada.fotos.map(foto => `<img src="${foto}" alt="${dados.nome}">`).join("") +
                    `</div>`;
            } else if (dados.fotos && dados.fotos.length > 0) {
                galeria = `<div class="galeria">` +
                    dados.fotos.map(foto => `<img src="${foto}" alt="${dados.nome}">`).join("") +
                    `</div>`;
            }

            // Monta referência completa para WhatsApp
            const referencia = `${codigo} - ${dados.tipo_imovel} ${dados.nome} ${unidadeEncontrada ? "AP " + unidadeEncontrada.numero : (dados.numero ? "Nº " + dados.numero : "")}`;

            // Renderização dos detalhes
            container.innerHTML = `
        <h2>${dados.nome} ${unidadeEncontrada ? "- AP " + unidadeEncontrada.numero : (dados.numero ? "- Nº " + dados.numero : "")}</h2>
        <img src="${dados.imagem}" alt="${dados.nome}" class="principal">
        <p><strong>Tipo:</strong> ${dados.tipo_imovel} | <strong>Objetivo:</strong> ${dados.objetivo}</p>
        <p><strong>Cidade:</strong> ${dados.cidade}/${dados.estado} - ${dados.bairro ?? ""}</p>
        <p><strong>Área útil:</strong> ${(unidadeEncontrada?.area_util ?? dados.area_util) ?? "-"} m²</p>
        <p><strong>Quartos:</strong> ${(unidadeEncontrada?.quartos ?? dados.quartos) ?? "-"} | <strong>Banheiros:</strong> ${(unidadeEncontrada?.banheiros ?? dados.banheiros) ?? "-"}</p>
        <p><strong>Vagas:</strong> ${(unidadeEncontrada?.vagas ?? dados.vagas) ?? "-"}</p>
        <p><strong>Preço:</strong> R$ ${(unidadeEncontrada?.preco ?? dados.preco).toLocaleString("pt-BR")}</p>
        ${dados.condominio ? `<p><strong>Condomínio:</strong> R$ ${dados.condominio}</p>` : ""}
        <p>${unidadeEncontrada?.descricao ?? dados.descricao}</p>
        ${galeria}
        <a class="btn-whatsapp" 
           href="${dados.contato.whatsapp}?text=${encodeURIComponent("Olá vim do site e tenho interesse no imóvel " + referencia)}" 
           target="_blank">Falar no WhatsApp</a>
      `;
        } else {
            document.getElementById("detalhes").innerHTML = "<p>Imóvel não encontrado.</p>";
        }
    });
