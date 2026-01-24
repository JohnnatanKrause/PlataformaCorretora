# 📌 Planejamento do Projeto — PEX III 

## 🎯 Visão Geral

 Este documento organiza o cronograma, entregáveis e orientações do **Projeto de Extensão III (PEX III)** para a **Plataforma Corretora**. 
 Serve como guia operacional para execução, registro acadêmico e preparação do relatório final. 
 
 ---
 
 ## 🎯 Objetivos e Escopo do MVP 
 
 - **Objetivo:** disponibilizar um site simples para divulgação de imóveis com contato direto e métricas básicas. 
 - **Escopo do MVP:** 
 - Listagem de imóveis 
 - Busca por tipo/cidade/faixa de preço 
 - Página de detalhe - Botão de WhatsApp 
 - Coleta de acessos e cliques 
 - **Fora de escopo (nesta fase):** 
 - CRM completo 
 - Autenticação avançada de usuários 
 - Pagamentos online 
 - Integrações externas complexas 
 
 --- 

## 📈 Plano de Métricas

- **Acessos totais:** visitantes e sessões.

- **Imóveis mais vistos:** eventos de visualização de detalhe.

- **Cliques em contato:** eventos de clique no botão WhatsApp.

- **Origem de tráfego:** orgânico, social, direto.

- **Conversão básica:** cliques/visitas.

## 📑 Orientações Acadêmicas (PEX III)

- **Termo de autorização (PDF oficial):** preencher com dados da corretora, coletar assinatura, anexar ao relatório final.

- **Carta de apresentação (PDF oficial):** usar modelo da faculdade, anexar junto ao termo e relatório.

- **Relatório final:** seguir roteiro da faculdade; usar este planejamento como base.

- **Evidências:** manter prints, links de commits e registros de reuniões no repositório.

## ✅ Boas Práticas

- **LGPD:** não publicar dados pessoais sensíveis; usar imagens autorizadas.

- **Acessibilidade:** textos alternativos, contraste adequado, navegação por teclado.

- **Versionamento:** commits pequenos e descritivos; tags para marcos (v0.1 MVP).

- **SEO básico:** títulos descritivos, meta description, semântica HTML.

## 📋 Checklist de Entrega

- Estrutura criada e versionada.

- MVP funcional (listagem, busca, detalhe, contato).

- Métricas instaladas e validadas.

- Termo e carta (PDFs oficiais) anexados.

- Relatório final compilado conforme roteiro.

## 📂 Estrutura de Pastas


PlataformaCorretora/
│
├── README.md                         # Apresentação e resumo do projeto
├── index.html                        # Página na raiz redirecionadora
│
├── /docs                             # Documentação acadêmica
│   │
│   ├── planejamento.md               # Guia em Markdown do cronograma e etapas detalhadas
│   ├── relatorio_extensao.md         # Guia em Markdown da estrutura do relatório final
│   ├── termo_autorizacao.md          # Guia em Markdown para uso do termo oficial
│   ├── roteiro_pex.pdf               # Documento oficial de roteiro (PDF)
│   ├── carta_apresentacao.pdf        # Documento oficial carta de apresentação (PDF)
│   └── termo_autorizacao.pdf         # Documento oficial para assinatura da corretora (PDF)
│
├── /src                              # Código da plataforma
│   │
│   ├── index.html                    # Página inicial
│   ├── imoveis.json                  # Base inicial de imóveis
│   ├── script.js                     # Lógica da busca e cadastros
│   └── style.css                     # Estilos
│   
└── /assets                           # Imagens e ícones
    │
    ├── logos/                        # aqui ficam os logos da Karina
    │   ├── kr-logo-principal.png
    │   ├── kr-favicon.png
    │   ├── logo1.png
    │   ├── logo2.png...
    │   └── ...
    └── imagens/                      # Pasta para armazenar imagens dos imóveis e figuras
        ├── estrutura-projeto.png     # Imagem da estrutura usada no README
        ├── grand-hudson/             # Fotos do Grand Hudson
        │   ├── ap14/
        │   │   ├── principal.jpg
        │   │   ├── 01.jpg
        │   │   ├── 02.jpg
        │   │   └── ...
        │   └── ap29/
        │       ├── principal.jpg
        │       ├── 01.jpg
        │       ├── 02.jpg
        │       └── ...
        ├── abraham-lincoln/            # Fotos do Abrahan Linconl
        │   ├── ap203/
        │   │   ├── principal.jpg
        │   │   ├── 01.jpg
        │   │   ├── 02.jpg
        │   │   └── ...
        │   └── ap905/
        │       ├── principal.jpg
        │       ├── 01.jpg
        │       ├── 02.jpg
        │       └── ...
        ├── palladium/                   # Fotos do Palladium
        │   ├── ap801/
        │   │   ├── principal.jpg
        │   │   ├── 01.jpg
        │   │   ├── 02.jpg
        │   │   └── ...
        │   └── ap1101/
        │       ├── principal.jpg
        │       ├── 01.jpg
        │       ├── 02.jpg
        │       └── ...        
        ├── ilhas-do-lago/                 # Fotos do Ilhas do Lago
        │   └── apF24/
        │       ├── principal.jpg
        │       ├── 01.jpg
        │       ├── 02.jpg
        │       └── ...
        ├── casa-jardim-americas/          # Fotos da casa no jardim americas
        │   └── amiricas50/
        │       ├── principal.jpg
        │       ├── 01.jpg
        │       ├── 02.jpg
        │       └── ...
        └── terreno-avenida-brasil/        # Fotos do Terreno na Av Brasil
        │   └── avbrasil3000/
        │       ├── principal.jpg
        │       ├── 01.jpg
        │       ├── 02.jpg
        │       └── ...

