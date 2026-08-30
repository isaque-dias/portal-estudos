# Variáveis, Tipos e Operadores em PowerShell

> Parte 2 de 7 — Módulo 2 "PowerShell". Cobre declaração de variáveis, tipagem, e os operadores aritméticos, de comparação e lógicos.

---

## 2.2 Variáveis, Tipos, Operadores

### 2.2.1 Declarando variáveis

No PowerShell, toda variável começa com o símbolo `$`. Não é necessário declarar um tipo explicitamente — o PowerShell infere o tipo automaticamente a partir do valor atribuído (tipagem dinâmica).

```powershell
$nome = "Servidor01"
$porta = 8080
$ativo = $true
```

### 2.2.2 Verificando o tipo de uma variável

```powershell
$nome.GetType()          # mostra o tipo .NET da variável (ex.: System.String)
$porta.GetType().Name    # mostra só o nome do tipo (ex.: Int32)
```

### 2.2.3 Tipos mais comuns

| Tipo | Exemplo | Equivalente conceitual |
| --- | --- | --- |
| `String` | `"texto"` | Texto |
| `Int32` | `42` | Número inteiro |
| `Double` | `3.14` | Número decimal |
| `Boolean` | `$true` / `$false` | Verdadeiro/falso |
| `Array` | `@(1, 2, 3)` | Lista de valores (visto em detalhe na próxima seção) |
| `DateTime` | `Get-Date` | Data e hora |

### 2.2.4 Forçando um tipo específico

É possível declarar explicitamente o tipo de uma variável, o que impede que ela receba um valor de tipo diferente por engano:

```powershell
[int]$porta = 8080
[string]$nome = "Servidor01"

$porta = "não é um número"   # gera erro, porque $porta foi declarada explicitamente como [int]
```

### 2.2.5 Interpolação de strings

Dentro de uma string entre aspas **duplas**, é possível inserir o valor de uma variável diretamente:

```powershell
$nome = "Servidor01"
Write-Host "O nome do servidor é $nome"     # o valor de $nome é inserido no texto
```

**Diferença importante**: aspas simples (`'...'`) tratam tudo como texto literal, sem interpolação — `'O nome é $nome'` exibiria `$nome` como texto, não o valor da variável. Aspas duplas (`"..."`) permitem a interpolação.

### 2.2.6 Operadores aritméticos

| Operador | Função |
| --- | --- |
| `+` | Soma |
| `-` | Subtração |
| `*` | Multiplicação |
| `/` | Divisão |
| `%` | Resto da divisão (módulo) |

```powershell
$total = 10 + 5
$resto = 10 % 3      # resultado: 1
```

### 2.2.7 Operadores de comparação

Diferente de muitas linguagens (que usam `==`, `>`, `<`), o PowerShell usa operadores baseados em texto, prefixados por `-`:

| Operador | Significado |
| --- | --- |
| `-eq` | Igual a (*equal*) |
| `-ne` | Diferente de (*not equal*) |
| `-gt` | Maior que (*greater than*) |
| `-lt` | Menor que (*less than*) |
| `-ge` | Maior ou igual (*greater or equal*) |
| `-le` | Menor ou igual (*less or equal*) |

```powershell
$porta -eq 8080          # verdadeiro se $porta for igual a 8080
$idade -ge 18             # verdadeiro se $idade for maior ou igual a 18
```

**Por que não `==` e `>`**: no PowerShell, os símbolos `<` e `>` já têm outro significado (redirecionamento, herdado da tradição de shells), então operadores de comparação usam essa notação baseada em texto para evitar ambiguidade.

### 2.2.8 Operadores lógicos

| Operador | Significado |
| --- | --- |
| `-and` | E lógico (ambas as condições verdadeiras) |
| `-or` | OU lógico (pelo menos uma condição verdadeira) |
| `-not` (ou `!`) | Negação |

```powershell
if ($ativo -and $porta -eq 8080) {
    Write-Host "Serviço ativo na porta padrão"
}
```

### 2.2.9 Operadores de texto úteis

| Operador | Função |
| --- | --- |
| `-like` | Compara com um padrão usando curingas (`*`, `?`), parecido com o `LIKE` do SQL |
| `-match` | Compara usando expressão regular |
| `-contains` | Verifica se uma coleção contém um valor específico |

```powershell
$nome -like "Servidor*"                  # verdadeiro se $nome começar com "Servidor"
@("web01", "web02", "db01") -contains "db01"   # verdadeiro, porque "db01" está na lista
```

---

## Resumo mental

```
Variável -> sempre começa com $, tipagem dinâmica (ou forçada com [tipo]$nome)
Interpolação -> só funciona com aspas duplas ("$var"), não com aspas simples ('$var')

Aritméticos -> + - * / %
Comparação  -> -eq -ne -gt -lt -ge -le (não usa ==, >, <)
Lógicos     -> -and -or -not
Texto       -> -like (curinga), -match (regex), -contains (coleção)
```
