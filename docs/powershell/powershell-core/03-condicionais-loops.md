---
description: ...
---

# Condicionais (if/switch) e Loops (for/foreach/while) em PowerShell

> Parte 3 de 7 — Módulo 2 "PowerShell". Cobre estruturas de decisão (if, switch) e estruturas de repetição (for, foreach, while).

---

## 2.3 Condicionais e Loops

### 2.3.1 `if` / `elseif` / `else`

Estrutura básica de decisão, executando um bloco de código apenas se uma condição for verdadeira.

```powershell
$porta = 8080

if ($porta -eq 80) {
    Write-Host "Porta HTTP padrão"
} elseif ($porta -eq 8080) {
    Write-Host "Porta HTTP alternativa"
} else {
    Write-Host "Porta não reconhecida"
}
```

### 2.3.2 `switch` — Alternativa ao `if` com muitas condições

Quando há muitas comparações possíveis para a mesma variável, o `switch` é mais legível do que uma longa cadeia de `elseif`.

```powershell
$status = "Parado"

switch ($status) {
    "Em execução" { Write-Host "Tudo certo" }
    "Parado"      { Write-Host "Serviço precisa ser iniciado" }
    "Pausado"     { Write-Host "Serviço está pausado" }
    default       { Write-Host "Status desconhecido" }
}
```

O bloco `default` funciona como o `else` do `if` — executa quando nenhum dos casos anteriores corresponde.

### 2.3.3 `switch` com curingas e condições

O `switch` do PowerShell é mais poderoso do que o de muitas outras linguagens: aceita curingas e até expressões dentro dos próprios casos.

```powershell
$nome = "web01"

switch -Wildcard ($nome) {
    "web*" { Write-Host "Servidor web" }
    "db*"  { Write-Host "Servidor de banco de dados" }
    default { Write-Host "Tipo de servidor desconhecido" }
}
```

### 2.3.4 `for` — Repetição com contador

Usado quando o número de repetições é conhecido ou controlado por um contador explícito.

```powershell
for ($i = 1; $i -le 5; $i++) {
    Write-Host "Iteração número $i"
}
```

A estrutura tem três partes, separadas por `;`: valor inicial (`$i = 1`), condição de continuidade (`$i -le 5`), e o que acontece a cada volta (`$i++`, que incrementa `$i` em 1).

### 2.3.5 `foreach` — Percorrendo uma coleção

Usado para executar um bloco de código para **cada item** de uma coleção (array, lista, resultado de um cmdlet), sem precisar controlar um contador manualmente.

```powershell
$servidores = @("web01", "web02", "db01")

foreach ($servidor in $servidores) {
    Write-Host "Verificando: $servidor"
}
```

Essa é a estrutura de loop mais usada no dia a dia de scripts de administração, já que a maior parte das tarefas envolve processar uma lista de itens (servidores, arquivos, usuários) um por um.

### 2.3.6 `while` — Repetição enquanto uma condição for verdadeira

Repete o bloco **enquanto** a condição continuar sendo verdadeira, sem número de repetições pré-definido.

```powershell
$tentativas = 0

while ($tentativas -lt 3) {
    Write-Host "Tentativa número $($tentativas + 1)"
    $tentativas++
}
```

**Cuidado com loops infinitos**: se a condição nunca se tornar falsa (por exemplo, esquecer de incrementar a variável de controle dentro do loop), o `while` roda para sempre — é um erro comum ao começar a usar essa estrutura.

### 2.3.7 `do-while` — Executa pelo menos uma vez

Variante do `while` onde o bloco é executado **antes** de a condição ser checada pela primeira vez — garantindo que o código rode ao menos uma vez, mesmo que a condição já comece falsa.

```powershell
$numero = 10

do {
    Write-Host "Valor atual: $numero"
    $numero--
} while ($numero -gt 5)
```

### 2.3.8 `break` e `continue`

| Palavra-chave | Efeito |
| --- | --- |
| `break` | Interrompe o loop imediatamente, saindo dele por completo |
| `continue` | Pula o restante da iteração atual e vai direto para a próxima |

```powershell
foreach ($servidor in $servidores) {
    if ($servidor -eq "db01") {
        continue   # pula "db01" e segue para o próximo item
    }
    Write-Host "Processando: $servidor"
}
```

### 2.3.9 Quando usar cada estrutura de repetição

| Estrutura | Melhor para |
| --- | --- |
| `for` | Repetição com contador numérico explícito, quantidade conhecida |
| `foreach` | Percorrer cada item de uma coleção (o mais comum em scripts de administração) |
| `while` | Repetir enquanto uma condição durar, sem quantidade fixa conhecida de antemão |
| `do-while` | Igual ao `while`, mas quando o bloco precisa rodar ao menos uma vez, sempre |

---

!!! resumo "Resumo Mental"

```
    if / elseif / else -> decisão simples, condição por condição
    switch              -> alternativa mais legível quando há muitas comparações para a mesma variável

    for      -> repetição com contador explícito
    foreach  -> percorre cada item de uma coleção (o mais usado em scripts de administração)
    while    -> repete enquanto a condição for verdadeira
    do-while -> igual ao while, mas roda pelo menos uma vez sempre

    break    -> sai do loop imediatamente
    continue -> pula para a próxima iteração
```
