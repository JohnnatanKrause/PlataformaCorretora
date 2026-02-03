let logado = false;

function login() {
    const senha = document.getElementById("senha").value;
    if (senha === "karina123") {
        logado = true;
        document.getElementById("login-container").style.display = "none";
        document.getElementById("admin-container").style.display = "flex";
        document.getElementById("btn-adicionar").style.display = "inline-block";
        document.getElementById("btn-sair").style.display = "inline-block";
        carregarImoveis();
    } else {
        alert("Senha incorreta!");
    }
}

document.getElementById("btn-adicionar").onclick = adicionarImovel;
document.getElementById("btn-sair").onclick = sair;

function sair() {
    logado = false;
    document.getElementById("admin-container").style.display = "none";
    document.getElementById("btn-adicionar").style.display = "none";
    document.getElementById("btn-sair").style.display = "none";
    document.getElementById("login-container").style.display = "flex";
}

function carregarImoveis() {
    fetch("imoveis.json")
        .then(res => res.json())
        .then(imoveis => {
            const container = document.getElementById("admin-container");
            container.innerHTML = "";

            imoveis.forEach(imovel => {
                const dados = imovel.dados_publicos;
                const internos = imovel.dados_internos;

                const card = document.createElement("div");
                card.classList.add("card-admin");

                card.innerHTML = `
          <img src="${dados.imagem}" alt="${dados.nome}" class="card-img">
          <div class="card-body">
            <h2>${dados.nome}</h2>
            <p><strong>Tipo:</strong> ${dados.tipo_imovel}</p>
            <p><strong>Preço:</strong> ${dados.preco_venda ? "R$ " + dados.preco_venda.toLocaleString("pt-BR") : ""}</p>
            <p><strong>Localização:</strong> ${dados.endereco}, ${dados.bairro}, ${dados.cidade}</p>
            <p><strong>Quartos:</strong> ${dados.quartos ?? "-"}</p>
            <p><strong>Banheiros:</strong> ${dados.banheiros ?? "-"}</p>
            <p><strong>Vagas:</strong> ${dados.vagas ?? "-"}</p>
            <p><strong>Proprietário:</strong> ${internos.proprietario}</p>
            <p><strong>Telefone:</strong> ${internos.telefone}</p>
            <div class="acoes">
  <button onclick="editarImovel('${imovel.codigo}')">Editar</button>
  <button onclick="solicitarExclusao('${imovel.codigo}')">Excluir</button>
  <button onclick="location.href='imovel.html?codigo=${imovel.codigo}'">Ver detalhes</button>
</div>

          </div>
        `;
                container.appendChild(card);
            });
        });
}

function editarImovel(codigo) {
    fetch("imoveis.json")
        .then(res => res.json())
        .then(imoveis => {
            const imovel = imoveis.find(i => i.codigo === codigo);
            const container = document.getElementById("admin-container");
            container.innerHTML = `
        <form class="form-edicao">
          <h2>Editar Imóvel ${imovel.codigo} - ${imovel.dados_publicos.nome}</h2>
          <label>Nome: <input type="text" value="${imovel.dados_publicos.nome}" id="editNome"></label>
          <label>Preço Venda: <input type="number" value="${imovel.dados_publicos.preco_venda ?? ""}" id="editPrecoVenda"></label>
          <label>Descrição: <textarea id="editDescricao">${imovel.dados_publicos.descricao}</textarea></label>
          <button type="button" onclick="salvarEdicao('${imovel.codigo}')">Salvar</button>
          <button type="button" onclick="carregarImoveis()">Voltar</button>
        </form>
      `;
        });
}

function salvarEdicao(codigo) {
    const alteracao = {
        codigo: codigo,
        nome: document.getElementById("editNome").value,
        preco_venda: document.getElementById("editPrecoVenda").value,
        descricao: document.getElementById("editDescricao").value,
    };
    const mensagem = `Solicitação de alteração\n${JSON.stringify(alteracao, null, 2)}`;
    const url = `https://wa.me/5545988213899?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

function adicionarImovel() {
    const container = document.getElementById("admin-container");
    container.innerHTML = `
    <form class="form-adicao">
      <h2>Novo Imóvel</h2>
      <label>Tipo: <input type="text" id="novoTipo"></label>
      <label>Objetivo: <input type="text" id="novoObjetivo" value="Venda"></label>
      <label>Nome: <input type="text" id="novoNome"></label>
      <label>Cidade: <input type="text" id="novoCidade"></label>
      <label>Estado: <input type="text" id="novoEstado"></label>
      <label>Bairro: <input type="text" id="novoBairro"></label>
      <label>Endereço: <input type="text" id="novoEndereco"></label>
      <label>Número: <input type="text" id="novoNumero"></label>
      <label>Andar: <input type="text" id="novoAndar"></label>
      <label>Imagem principal: <input type="text" id="novoImagem"></label>
      <label>Área útil: <input type="number" id="novoArea"></label>
      <label>Quartos: <input type="number" id="novoQuartos"></label>
      <label>Banheiros: <input type="number" id="novoBanheiros"></label>
      <label>Vagas: <input type="number" id="novoVagas"></label>
      <label>Garagens (separadas por vírgula): <input type="text" id="novoGaragens"></label>
      <label>Preço Venda: <input type="number" id="novoPrecoVenda"></label>
      <label>Condomínio: <input type="number" id="novoCondominio"></label>
      <label>IPTU: <input type="number" id="novoIptu"></label>
      <label>Descrição: <textarea id="novoDescricao"></textarea></label>
      <h3>Dados Internos</h3>
      <label>Proprietário: <input type="text" id="novoProprietario"></label>
      <label>Telefone: <input type="text" id="novoTelefone"></label>
      <label>Email: <input type="email" id="novoEmail"></label>
      <label>Observações: <textarea id="novoObservacoes"></textarea></label>
      <button type="button" onclick="salvarNovo()">Salvar</button>
      <button type="button" onclick="carregarImoveis()">Voltar</button>
    </form>
  `;
}
function salvarNovo() {
    const novo = {
        dados_publicos: {
            tipo_imovel: document.getElementById("novoTipo").value,
            objetivo: document.getElementById("novoObjetivo").value,
            nome: document.getElementById("novoNome").value,
            cidade: document.getElementById("novoCidade").value,
            estado: document.getElementById("novoEstado").value,
            bairro: document.getElementById("novoBairro").value,
            endereco: document.getElementById("novoEndereco").value,
            numero: document.getElementById("novoNumero").value,
            andar: document.getElementById("novoAndar").value,
            imagem: document.getElementById("novoImagem").value,
            area_util: document.getElementById("novoArea").value,
            quartos: document.getElementById("novoQuartos").value,
            banheiros: document.getElementById("novoBanheiros").value,
            vagas: document.getElementById("novoVagas").value,
            garagens: document.getElementById("novoGaragens").value.split(","),
            preco_venda: document.getElementById("novoPrecoVenda").value,
            condominio: document.getElementById("novoCondominio").value,
            iptu: document.getElementById("novoIptu").value,
            descricao: document.getElementById("novoDescricao").value
        },
        dados_internos: {
            proprietario: document.getElementById("novoProprietario").value,
            telefone: document.getElementById("novoTelefone").value,
            email: document.getElementById("novoEmail").value,
            observacoes: document.getElementById("novoObservacoes").value
        }
    };

    const mensagem = `Solicitação de novo cadastro\n${JSON.stringify(novo, null, 2)}`;
    const url = `https://wa.me/5545988213899?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

function solicitarExclusao(codigo) {
    const mensagem = `Solicitação de exclusão de cadastro\nImóvel código: ${codigo}`;
    const url = `https://wa.me/5545988213899?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

function verDetalhes(codigo) {
    fetch("imoveis.json")
        .then(res => res.json())
        .then(imoveis => {
            const imovel = imoveis.find(i => i.codigo === codigo);
            const dados = imovel.dados_publicos;
            const internos = imovel.dados_internos;

            const container = document.getElementById("admin-container");
            container.innerHTML = `
        <div class="card-admin" style="max-width:800px; margin:auto;">
          <img src="${dados.imagem}" alt="${dados.nome}" style="width:100%; height:300px; object-fit:cover; border-radius:8px;">
          <div class="card-body">
            <h2>${dados.nome} (${imovel.codigo})</h2>
            <p><strong>Tipo:</strong> ${dados.tipo_imovel}</p>
            <p><strong>Objetivo:</strong> ${dados.objetivo}</p>
            <p><strong>Área útil:</strong> ${dados.area_util} m²</p>
            <p><strong>Preço Venda:</strong> R$ ${dados.preco_venda.toLocaleString("pt-BR")}</p>
            <p><strong>Localização:</strong> ${dados.endereco}, ${dados.numero} - ${dados.bairro}, ${dados.cidade}/${dados.estado}</p>
            <p><strong>Quartos:</strong> ${dados.quartos}</p>
            <p><strong>Banheiros:</strong> ${dados.banheiros}</p>
            <p><strong>Vagas:</strong> ${dados.vagas}</p>
            <p><strong>Garagens:</strong> ${dados.garagens.join(", ")}</p>
            <p><strong>Condomínio:</strong> R$ ${dados.condominio}</p>
            <p><strong>IPTU:</strong> R$ ${dados.iptu}</p>
            <p><strong>Descrição:</strong> ${dados.descricao}</p>
            <hr>
            <h3>Dados Internos</h3>
            <p><strong>Proprietário:</strong> ${internos.proprietario}</p>
            <p><strong>Telefone:</strong> ${internos.telefone}</p>
            <p><strong>Email:</strong> ${internos.email}</p>
            <p><strong>Observações:</strong> ${internos.observacoes}</p>
            <button type="button" onclick="carregarImoveis()">Voltar</button>
          </div>
        </div>
      `;
        });
}

