---
description: ...
---

# O Que É o PowerShell e Como Ele Difere de um Terminal Comum (CMD/Bash)

> Parte 1 de 7 — Módulo 2 "PowerShell". Cobre o que é o PowerShell, sua filosofia de objetos, e a diferença em relação ao CMD e ao Bash.

---

## 2.1 O Que É o PowerShell

### 2.1.1 Definição

**PowerShell** é o shell e linguagem de scripting da Microsoft, criado para substituir o antigo Prompt de Comando (CMD) como ferramenta principal de automação e administração no Windows. Diferente do CMD, o PowerShell foi projetado desde o início pensando em administração de sistemas em escala — gerenciar centenas de servidores, automatizar tarefas repetitivas, integrar com o Active Directory, com serviços do Windows, e hoje também com a nuvem (Azure).

Hoje existem duas variantes principais:

| Variante | Características |
| --- | --- |
| **Windows PowerShell** | Versão original, vem pré-instalada no Windows, limitada ao próprio Windows |
| **PowerShell (Core/7+)** | Versão moderna, multiplataforma (Windows, Linux, macOS), open source, instalada separadamente |

### 2.1.2 A diferença fundamental: objetos, não texto

Esse é o ponto mais importante para entender o PowerShell, e já foi mencionado brevemente no guia sobre shells: enquanto o **CMD** e o **Bash** trabalham exclusivamente com **texto puro** (tudo que um comando produz é uma sequência de caracteres), o PowerShell trabalha com **objetos estruturados** — os mesmos objetos usados internamente pelo .NET, com propriedades e métodos próprios.

Isso muda completamente a forma de manipular a saída de um comando.

### 2.1.3 Exemplo prático da diferença

No **CMD**, listar arquivos com detalhes retorna texto puro, linha por linha:

```cmd
dir
```

```
06/07/2026  10:15    <DIR>          Documentos
06/07/2026  09:50             1.024 notas.txt
```

Se for necessário filtrar apenas arquivos maiores que 1 KB, seria preciso "recortar" esse texto manualmente, com ferramentas de manipulação de string — um processo frágil, porque depende do formato exato da saída.

No **PowerShell**, o comando equivalente devolve **objetos**, cada um com uma propriedade `Length` (tamanho) já estruturada e utilizável diretamente:

```powershell
Get-ChildItem | Where-Object { $_.Length -gt 1024 }
```

Não há necessidade de "recortar texto" — a propriedade `Length` já existe como um dado estruturado dentro de cada objeto retornado, pronta para ser comparada, ordenada ou filtrada.

### 2.1.4 Por que isso importa na prática

| Aspecto | CMD / Bash (texto) | PowerShell (objetos) |
| --- | --- | --- |
| O que passa entre comandos no pipe | Texto puro | Objetos com propriedades e métodos |
| Como filtrar um dado específico | Recortar texto (`grep`, `awk`, `findstr`) | Acessar a propriedade diretamente (`Where-Object`) |
| Risco de quebra | Alto — se o formato do texto mudar, o script quebra | Baixo — a propriedade continua existindo independente da formatação visual |
| Curva de aprendizado inicial | Mais direta para tarefas simples | Mais verbosa, mas mais previsível em tarefas complexas |

### 2.1.5 PowerShell vs Bash: nem melhor, nem pior — filosofias diferentes

Vale reforçar que isso não é uma questão de qual shell é "superior" — são filosofias de design diferentes, adequadas a contextos diferentes:

- **Bash** é extremamente eficiente para tarefas rápidas de texto, e é o padrão universal em ambientes Linux/Unix, onde a imensa maioria das ferramentas de sistema já produz saída em texto.
- **PowerShell** se destaca em ambientes Windows, onde grande parte da administração (serviços, Active Directory, registro do sistema) já é naturalmente orientada a objetos e propriedades — o PowerShell simplesmente expõe isso diretamente ao invés de forçar tudo a virar texto.

### 2.1.6 Onde o PowerShell é executado

- **Console do PowerShell**: aplicação de terminal dedicada.
- **Windows Terminal**: aplicação moderna da Microsoft, pode hospedar PowerShell, CMD e outros shells em abas.
- **ISE (Integrated Scripting Environment)**: editor mais antigo, específico do Windows PowerShell, hoje considerado legado.
- **VS Code com extensão PowerShell**: ambiente mais moderno e recomendado para escrever scripts maiores, com autocompletar e depuração.

---

!!! resumo "Resumo Mental"

```
    PowerShell -> shell + linguagem de scripting da Microsoft, moderno e multiplataforma (Core/7+)
    Diferença central -> CMD/Bash trabalham com TEXTO; PowerShell trabalha com OBJETOS estruturados
    Vantagem prática -> filtrar/manipular dados via propriedades (Where-Object), sem recortar texto manualmente
    Não é "melhor" que Bash -> são filosofias diferentes, adequadas a ecossistemas diferentes (Unix vs Windows/.NET)
```
