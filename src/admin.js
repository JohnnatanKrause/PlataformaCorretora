function login() {
    const senha = document.getElementById("senha").value;
    // senha simples para teste (pode ser trocada por autenticação real)
    if (senha === "karina123") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("admin-container").style.display = "grid";
        carregarImoveis();
    } else {
        alert("Senha incorreta!");
    }
}

function carregarImoveis() {
    fetch("imoveis.json")
        .then(response => response.json())
        .then(imoveis => {
            const container = document.getElementById("admin-container");

            imoveis.forEach(imovel => {
                const dados = imovel.dados_publicos;
                const internos = imovel.dados_internos;

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
        <hr>
        <h3>Dados Internos</h3>
        <p><strong>Proprietário:</strong> ${internos.proprietario}</p>
        <p><strong>Telefone:</strong> ${internos.telefone}</p>
        <p><strong>Email:</strong> ${internos.email}</p>
        <p><strong>Matrícula:</strong> ${internos.matricula}</p>
        <p><strong>Observações:</strong> ${internos.observacoes}</p>
        `;

                container.appendChild(card);
            });
        });
}
