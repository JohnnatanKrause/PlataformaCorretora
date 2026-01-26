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
            const container = document.getElementById("detalhes-imovel");

            // Galeria de fotos com Swiper
            let fotos = [];
            if (unidadeEncontrada?.fotos?.length > 0) {
                fotos = unidadeEncontrada.fotos;
            } else if (dados.fotos?.length > 0) {
                fotos = dados.fotos;
            }

            let galeria = "";
            if (fotos.length > 0) {
                galeria = `
                  <div class="swiper">
                    <div class="swiper-wrapper">
                      ${fotos.map(foto => `
                        <div class="swiper-slide">
                          <img src="${foto}" alt="${dados.nome}">
                        </div>
                      `).join("")}
                    </div>
                    <!-- Botões de navegação -->
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                    <!-- Paginação -->
                    <div class="swiper-pagination"></div>
                  </div>
                `;
            }

            // Monta referência completa para WhatsApp
            const referencia = `${codigo} - ${dados.tipo_imovel} ${dados.nome} ${unidadeEncontrada ? "AP " + unidadeEncontrada.numero : (dados.numero ? "Nº " + dados.numero : "")}`;

            // Renderização dos detalhes com layout em duas colunas
            container.innerHTML = `
              <div class="detalhes-container">
                <div class="galeria-wrapper">
                  ${galeria}
                </div>

                <div class="info-wrapper">
                  <h2>${dados.nome}</h2>
                  <p><strong>Tipo:</strong> ${dados.tipo_imovel}</p>                
                  <p><strong>Objetivo:</strong> ${dados.objetivo}</p>
                  <p><strong>Área útil:</strong> ${(unidadeEncontrada?.area_util ?? dados.area_util) ?? "-"} m²</p>
                  <p><strong>Investimento:</strong> 💰 R$ ${(
                    unidadeEncontrada?.preco ??
                    dados.preco ??
                    dados.preco_venda ??
                    dados.valor_aluguel ??
                    0
                ).toLocaleString("pt-BR")
                }</p>

                  <p><strong>Localização:</strong> ${dados.endereco ?? ""}, ${dados.numero ?? ""}, ${unidadeEncontrada ? "- AP " + unidadeEncontrada.numero : ""} ${dados.bairro ? dados.bairro + " - " : ""} ${dados.cidade}/${dados.estado} </p>
                  <p><strong>Quartos:</strong> 🛏️ ${(unidadeEncontrada?.quartos ?? dados.quartos) ?? "-"}</p>
                  <p><strong>Banheiros:</strong> 🚿 ${(unidadeEncontrada?.banheiros ?? dados.banheiros) ?? "-"}</p>
                  <p><strong>Vagas:</strong> 🚗 ${(unidadeEncontrada?.vagas ?? dados.vagas) ?? "-"}</p>
                  
                  ${dados.condominio ? `<p><strong>Condomínio:</strong> R$ ${dados.condominio}</p>` : ""}
                  <p>${unidadeEncontrada?.descricao ?? dados.descricao}</p>

                  <a class="btn-whatsapp" 
   href="${dados.contato.whatsapp}?text=${encodeURIComponent(
     "Olá, vim do site e tenho interesse no imóvel " + referencia + 
     ". Veja os detalhes aqui: " + window.location.href
   )}" 
   target="_blank">Falar no WhatsApp</a>


                  ${dados.video ? `
                    <a class="btn-video" href="${dados.video}" target="_blank">
                      🎥 Tour Online
                    </a>
                  ` : ""}
                </div>
              </div>
            `;

            // Inicializa o Swiper (depois que o HTML foi inserido)
            if (fotos.length > 0) {
                new Swiper('.swiper', {
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            }
        } else {
            document.getElementById("detalhes-imovel").innerHTML = "<p>Imóvel não encontrado.</p>";
        }
    });
