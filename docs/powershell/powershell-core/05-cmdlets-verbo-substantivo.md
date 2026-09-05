---
description: ...
---

# Cmdlets e a Convenção Verbo-Substantivo (Get-, Set-, New-)

> Parte 5 de 7 — Módulo 2 "PowerShell". Cobre o que é um cmdlet, a convenção de nomenclatura Verbo-Substantivo, e os verbos mais comuns.

---

## 2.5 Cmdlets e a Convenção Verbo-Substantivo

### 2.5.1 O que é um cmdlet

**Cmdlet** (pronuncia-se "command-let") é o nome dado aos comandos nativos do PowerShell — pequenos programas especializados, escritos em .NET, que seguem uma convenção de nomenclatura padronizada e sempre trabalham com o modelo de objetos descrito na primeira parte deste módulo.

Diferente de comandos soltos e inconsistentes (como acontece em muitos shells, onde `ls`, `cp`, `grep` não seguem padrão nenhum entre si), todo cmdlet do PowerShell segue exatamente a mesma estrutura de nome.

### 2.5.2 A convenção Verbo-Substantivo

Todo cmdlet é nomeado como `Verbo-Substantivo`, onde:

- O **verbo** descreve a ação a ser realizada.
- O **substantivo** descreve o recurso sobre o qual a ação atua (sempre no singular).

```powershell
Get-Process        # OBTER processos
Get-Service         # OBTER serviços
Start-Service       # INICIAR um serviço
Stop-Process         # PARAR um processo
New-Item             # CRIAR um novo item
Remove-Item          # REMOVER um item
```

Essa padronização é uma das maiores vantagens práticas do PowerShell: uma vez que se aprende os verbos e substantivos mais comuns, fica possível **prever** o nome de um comando sem precisar decorar cada um individualmente.

### 2.5.3 Verbos aprovados mais comuns

A Microsoft mantém uma lista oficial de "verbos aprovados", para manter consistência entre todos os cmdlets — inclusive os criados por terceiros. Os mais usados no dia a dia:

| Verbo | Ação | Exemplo |
| --- | --- | --- |
| `Get` | Obter/consultar informação (não altera nada) | `Get-Process` |
| `Set` | Alterar uma configuração existente | `Set-ExecutionPolicy` |
| `New` | Criar algo novo | `New-Item`, `New-LocalUser` |
| `Remove` | Remover/excluir | `Remove-Item` |
| `Start` | Iniciar um processo/serviço | `Start-Service` |
| `Stop` | Parar um processo/serviço | `Stop-Service` |
| `Restart` | Reiniciar | `Restart-Service` |
| `Enable` | Habilitar | `Enable-NetAdapter` |
| `Disable` | Desabilitar | `Disable-NetAdapter` |
| `Test` | Testar/verificar uma condição, retornando verdadeiro/falso | `Test-Connection`, `Test-Path` |
| `Import` | Importar dados de uma fonte externa | `Import-Csv` |
| `Export` | Exportar dados para uma fonte externa | `Export-Csv` |

### 2.5.4 Listando todos os cmdlets disponíveis

```powershell
Get-Command                          # lista todos os cmdlets, funções e aliases disponíveis
Get-Command -Verb Get                 # lista só os cmdlets que começam com "Get-"
Get-Command -Noun Service              # lista todos os cmdlets relacionados a "Service" (Get-Service, Start-Service, etc.)
```

### 2.5.5 Descobrindo como usar um cmdlet: `Get-Help`

```powershell
Get-Help Get-Process                  # mostra a documentação básica do cmdlet
Get-Help Get-Process -Examples         # mostra exemplos práticos de uso
Get-Help Get-Process -Full             # mostra a documentação completa, com todos os parâmetros
```

Na primeira vez que o PowerShell é configurado em uma máquina, pode ser necessário rodar `Update-Help` (com privilégios administrativos) para baixar a documentação completa dos cmdlets instalados.

### 2.5.6 Parâmetros de um cmdlet

Cmdlets recebem informações adicionais através de **parâmetros**, sempre prefixados por `-`:

```powershell
Get-Process -Name "notepad"                    # parâmetro -Name filtra pelo nome do processo
Get-Service -Name "Spooler" -ComputerName "PC01" # múltiplos parâmetros na mesma chamada
```

### 2.5.7 Aliases (atalhos para cmdlets)

Para agilizar o uso interativo, o PowerShell inclui **aliases** — nomes curtos que apontam para cmdlets completos, muitos deles reaproveitando nomes familiares de outros shells:

```powershell
ls      # alias para Get-ChildItem
dir     # também alias para Get-ChildItem
cd      # alias para Set-Location
cat     # alias para Get-Content
```

**Boa prática para scripts**: embora aliases sejam convenientes no uso interativo do dia a dia, é recomendado usar o **nome completo do cmdlet** (`Get-ChildItem`, não `ls`) ao escrever scripts que serão salvos e reutilizados — isso torna o código mais legível para outras pessoas (ou para você mesmo, meses depois) e evita depender de aliases que podem não existir em todo ambiente.

### 2.5.8 Descobrindo o alias de um cmdlet (ou vice-versa)

```powershell
Get-Alias -Definition "Get-ChildItem"    # descobre quais aliases apontam para esse cmdlet
Get-Command ls                            # descobre para qual cmdlet um alias aponta
```

---

!!! resumo "Resumo Mental"

```
    Cmdlet -> comando nativo do PowerShell, sempre no formato Verbo-Substantivo
    Verbo  -> a ação (Get, Set, New, Remove, Start, Stop, Test...)
    Substantivo -> o recurso, sempre no singular (Process, Service, Item...)

    Get-Command -> lista/descobre cmdlets disponíveis
    Get-Help    -> mostra documentação e exemplos de um cmdlet
    Alias       -> atalho curto para um cmdlet (ls = Get-ChildItem); evitar em scripts, usar em uso interativo
```
