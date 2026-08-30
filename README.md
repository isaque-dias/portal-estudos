# Portal de Estudos

Este repositório reúne um laboratório de estudos técnicos em formato de documentação estática, com foco em áreas como SQL, PowerShell, infraestrutura e automação. O conteúdo é organizado em módulos, com explicações, exercícios e critérios de conclusão para apoiar a aprendizagem incremental.

## Visão geral

O projeto utiliza MkDocs com a temática Material para gerar um site local de documentação, mantendo o material em Markdown e organizado por tópicos.

O conteúdo atual abrange:

- SQL
  - fundamentos do banco de dados relacional
  - SELECT, filtros, ordenação e limites
  - operadores lógicos e de comparação
  - agregações, GROUP BY, HAVING e JOINs
  - subqueries e exercícios práticos
- PowerShell
  - fundamentos do Windows e administração de sistemas
  - permissões NTFS, serviços, usuários e Active Directory
  - conceitos da linguagem PowerShell, condicionais, loops, arrays e cmdlets

## Estrutura do projeto

```text
.
├── docs/
│   ├── index.md
│   ├── sobre.md
│   ├── sql/
│   │   ├── index.md
│   │   ├── fundamentos-absolutos/
│   │   └── agregacoes-juncoes/
│   ├── powershell/
│   │   ├── index.md
│   │   ├── fundamentos-windows/
│   │   └── powershell-core/
│   └── stylesheets/
│       └── extra.css
├── overrides/
│   └── main.html
├── mkdocs.yml
├── .gitignore
├── README.md
├── venv/
└── site/
```

## Requisitos

- Python 3.9+
- pip
- MkDocs
- MkDocs Material

## Como executar localmente

1. Ative o ambiente virtual do projeto:

```bash
source venv/bin/activate
```

2. Instale as dependências do site, caso ainda não estejam disponíveis:

```bash
pip install mkdocs mkdocs-material
```

3. Inicie o servidor de documentação:

```bash
mkdocs serve
```

4. Acesse no navegador:

```text
http://127.0.0.1:8000
```

## Como gerar o site estático

Para compilar a documentação em HTML:

```bash
mkdocs build
```

A saída será gerada na pasta `site/`.

## Configuração do projeto

A navegação e a aparência do portal são configuradas em [mkdocs.yml](mkdocs.yml). O arquivo define:

- estrutura da navegação
- tema Material
- paleta de cores
- extensões do Markdown
- arquivos de estilo personalizados

## Observações

- O conteúdo foi pensado como material de estudo em evolução.
- O objetivo principal é registrar aprendizados de forma organizada e reutilizável.
- O projeto pode ser expandido com novos módulos conforme novos tópicos forem estudados.

## Licença

Este projeto não possui licença definida até o momento. Se for publicar publicamente, vale revisar a política de licença antes de abrir o repositório para uso externo.
