" " 
Planejamento do projeto — PEX III (planejamento.md)
Visão geral do projeto
Este documento organiza o cronograma, entregáveis e orientações do PEX III para a Plataforma Corretora. Serve como guia operacional para execução, registro acadêmico e preparação do relatório final.

Objetivos e escopo do MVP
Objetivo: disponibilizar um site simples para divulgação de imóveis com contato direto e métricas básicas.

Escopo do MVP: listagem de imóveis, busca por tipo/cidade/faixa de preço, página de detalhe, botão de WhatsApp, coleta de acessos e cliques.

Fora de escopo (nesta fase): CRM completo, autenticação de usuários, pagamentos, integrações avançadas.

Estrutura de pastas (resumo)
plaintext
PlataformaCorretora/
├── README.md
├── docs/
│   ├── planejamento.md
│   ├── termo_autorizacao.md
│   ├── carta_apresentacao.md
│   └── relatorio_extensao.md
├── src/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── imoveis.json
└── assets/
    └── imagens/
Cronograma semanal e entregáveis
Semana 1 — Análise e alinhamento
Entregáveis:

Levantamento inicial: necessidades da corretora (canais, tipos de imóveis, cidades, faixas de preço).

Definição do escopo do MVP: funcionalidades mínimas e critérios de aceite.

Registro de contexto: breve justificativa acadêmica (problema, público, impacto).

Evidências para relatório: ata/nota de reunião, checklist de requisitos, print do repositório inicial.

Semana 2 — Planejamento técnico e estrutura
Entregáveis:

Arquitetura simples: fluxo de páginas, dados do imoveis.json.

Estrutura criada: pastas e arquivos vazios (docs/src/assets).

Plano de métricas: o que medir e onde instalar (Analytics).

Evidências: commits com mensagem clara, versão inicial do planejamento.md.

Semana 3 — Desenvolvimento do MVP (listagem e busca)
Entregáveis:

index.html: grid de cards com imagem, título, preço e cidade.

style.css: layout responsivo básico.

script.js: leitura do imoveis.json, filtros por tipo/cidade/preço.

Evidências: prints da listagem e dos filtros funcionando.

Semana 4 — Detalhe do imóvel e contato
Entregáveis:

Página de detalhe: renderização dinâmica (código, descrição, galeria).

WhatsApp: botão com mensagem pré-preenchida (código do imóvel).

Acessibilidade mínima: alt nas imagens, contraste, foco visível.

Evidências: vídeo curto ou prints do fluxo de contato.

Semana 5 — Métricas e validação
Entregáveis:

Google Analytics: instalação e verificação de eventos (visualização de detalhe, clique em WhatsApp).

Checklist de SEO básico: título, meta description, URLs legíveis.

Evidências: captura de painel de métricas (período de teste).

Semana 6 — Testes com a corretora e ajustes
Entregáveis:

Teste guiado: roteiro de navegação e feedback.

Correções: melhorias de usabilidade e conteúdo.

Evidências: registro de feedback e lista de ajustes aplicados.

Semana 7 — Documentação final e anexos
Entregáveis:

Relatório final (docs/relatorio_extensao.md → base para PDF): introdução, desenvolvimento, resultados, conclusão.

Anexos: termo de autorização assinado (PDF), carta de apresentação (PDF), prints e métricas.

Evidências: versão final no repositório e checklist concluído.

Estrutura dos dados (imoveis.json)
json
[
  {
    "codigo": "IMV001",
    "tipo": "Apartamento",
    "cidade": "Londrina",
    "preco": 350000,
    "descricao": "Apartamento 2 quartos, 1 vaga, próximo ao centro.",
    "imagem": "assets/imagens/apto1.jpg",
    "destaque": true
  },
  {
    "codigo": "IMV002",
    "tipo": "Casa",
    "cidade": "Cascavel",
    "preco": 480000,
    "descricao": "Casa térrea 3 quartos, quintal amplo.",
    "imagem": "assets/imagens/casa1.jpg",
    "destaque": false
  }
]
Plano de métricas
Acessos totais: visitantes e sessões.

Imóveis mais vistos: eventos de visualização de detalhe.

Cliques em contato: eventos de clique no botão WhatsApp.

Origem de tráfego: orgânico, social, direto.

Conversão básica: cliques/visitas.

Orientações acadêmicas (PEX III)
Termo de autorização (PDF oficial): preencher com dados da corretora, coletar assinatura, anexar ao relatório final.

Carta de apresentação (PDF oficial): usar o modelo da faculdade, anexar junto ao termo e relatório.

Relatório final: seguir roteiro da faculdade; usar este planejamento como base para capítulos e anexos.

Evidências: manter prints, links de commits e registros de reuniões no repositório.

Boas práticas e conformidade
LGPD (geral): não publicar dados pessoais sensíveis; evitar nomes/telefones reais nos exemplos; usar imagens autorizadas.

Acessibilidade: textos alternativos, contraste adequado, navegação por teclado.

Versionamento: commits pequenos e descritivos; mensagens claras; tags para marcos (v0.1 MVP).

SEO básico: títulos descritivos, meta description, semântica HTML.

Checklist de entrega
Estrutura criada e versionada.

MVP funcional (listagem, busca, detalhe, contato).

Métricas instaladas e validadas.

Termo e carta (PDFs oficiais) anexados.

Relatório final compilado conforme roteiro.


PlataformaCorretora/
│
├── README.md                      # Apresentação e resumo do projeto
│
├── /docs                          # Documentação acadêmica
│   ├── planejamento.md             # Cronograma e etapas detalhadas (guia em Markdown)
│   ├── relatorio_extensao.md       # Estrutura do relatório final (guia em Markdown)
│   ├── termo_autorizacao.md        # Guia em Markdown para uso do termo oficial
│   ├── carta_apresentacao.md       # Guia em Markdown para uso da carta oficial
│   ├── roteiro_pex.pdf             # Roteiro oficial fornecido pela faculdade
│   ├── carta_apresentacao.pdf      # Documento oficial de apresentação (PDF)
│   └── termo_autorizacao.pdf       # Documento oficial para assinatura da corretora (PDF)
│
├── /src                           # Código da plataforma
│   ├── index.html                  # Página inicial
│   ├── style.css                   # Estilos
│   ├── script.js                   # Lógica da busca e cadastros
│   └── imoveis.json                # Base inicial de imóveis
│
└── /assets                        # Imagens e ícones
    └── imagens/                    # Pasta para armazenar imagens dos imóveis e figuras
        └── estrutura-projeto.png   # Imagem da estrutura usada no README
