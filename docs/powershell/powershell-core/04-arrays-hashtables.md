---
description: ...
---

# Arrays e Hash Tables em PowerShell

> Parte 4 de 7 — Módulo 2 "PowerShell". Cobre criação e manipulação de arrays, e o uso de hash tables (pares chave-valor).

---

## 2.4 Arrays e Hash Tables

### 2.4.1 O que é um array

Um **array** é uma coleção ordenada de valores, acessados por posição (índice). É a estrutura usada sempre que há uma **lista** de itens do mesmo tipo de informação — nomes de servidores, números, arquivos.

```powershell
$servidores = @("web01", "web02", "db01")
```

### 2.4.2 Acessando elementos por índice

Assim como na maioria das linguagens, a contagem de posições começa em **0**.

```powershell
$servidores[0]     # "web01" (primeiro elemento)
$servidores[1]     # "web02"
$servidores[-1]    # "db01" (índice negativo conta a partir do final)
```

### 2.4.3 Propriedades e métodos úteis de um array

```powershell
$servidores.Count               # quantidade de elementos no array
$servidores.Length               # equivalente a .Count para arrays

$servidores += "web03"           # adiciona um elemento ao final (cria um novo array por trás dos panos)
```

**Nota técnica**: arrays no PowerShell têm tamanho fixo por padrão — usar `+=` na prática recria o array inteiro com o novo item incluído. Para adicionar itens com frequência de forma mais eficiente, existe uma estrutura chamada `ArrayList` (ou `List`, do .NET), mais indicada para scripts que crescem uma coleção repetidamente dentro de um loop.

### 2.4.4 Percorrendo um array

```powershell
foreach ($servidor in $servidores) {
    Write-Host "Servidor: $servidor"
}
```

### 2.4.5 Filtrando um array

```powershell
$servidores | Where-Object { $_ -like "web*" }    # retorna só os que começam com "web"
```

O `$_` representa "o item atual" dentro do bloco de filtro — um conceito que aparece com frequência ao trabalhar com pipeline no PowerShell.

### 2.4.6 O que é uma Hash Table

Uma **Hash Table** (também chamada de dicionário em outras linguagens) é uma coleção de pares **chave-valor**: em vez de acessar um item por posição numérica (como no array), acessa-se por um nome (chave) específico.

```powershell
$servidor = @{
    Nome  = "web01"
    IP    = "192.168.1.10"
    Porta = 8080
}
```

### 2.4.7 Acessando valores de uma Hash Table

```powershell
$servidor["Nome"]      # "web01"
$servidor.Nome          # forma alternativa, usando notação de ponto
```

### 2.4.8 Adicionando, modificando e removendo chaves

```powershell
$servidor["Ativo"] = $true          # adiciona uma nova chave
$servidor["Porta"] = 9090            # modifica o valor de uma chave existente
$servidor.Remove("IP")               # remove a chave "IP" da hash table
```

### 2.4.9 Percorrendo uma Hash Table

```powershell
foreach ($chave in $servidor.Keys) {
    Write-Host "$chave -> $($servidor[$chave])"
}
```

`.Keys` retorna todas as chaves; é possível também usar `.Values` para obter só os valores, ou percorrer diretamente com `.GetEnumerator()` para acessar chave e valor ao mesmo tempo em cada iteração.

### 2.4.10 Quando usar array vs Hash Table

| Cenário | Estrutura indicada |
| --- | --- |
| Uma lista simples de itens do mesmo tipo (ex.: nomes de servidores) | Array |
| Dados relacionados sobre um mesmo item, identificados por nome (ex.: nome, IP e porta de um servidor) | Hash Table |
| Uma lista de "objetos" com múltiplos atributos cada (ex.: vários servidores, cada um com nome, IP, porta) | Array de Hash Tables (visto a seguir) |

### 2.4.11 Combinando os dois: array de Hash Tables

Essa combinação é extremamente comum em scripts reais de administração, representando uma lista de itens onde cada item tem múltiplos atributos:

```powershell
$servidores = @(
    @{ Nome = "web01"; IP = "192.168.1.10"; Status = "Em execução" },
    @{ Nome = "web02"; IP = "192.168.1.11"; Status = "Parado" },
    @{ Nome = "db01";  IP = "192.168.1.20"; Status = "Em execução" }
)

foreach ($servidor in $servidores) {
    Write-Host "$($servidor.Nome) ($($servidor.IP)) está $($servidor.Status)"
}
```

Essa estrutura — um array onde cada elemento é uma hash table com os atributos de um item — é a base do exercício prático proposto na próxima parte deste módulo.

---

!!! resumo "Resumo Mental"

```
    Array -> coleção ORDENADA, acessada por posição/índice (começa em 0)
    Hash Table -> coleção de pares CHAVE-VALOR, acessada por nome

    Array: $arr[0], $arr.Count, $arr += item, foreach, Where-Object
    Hash Table: $ht["chave"] ou $ht.chave, $ht.Keys, $ht.Remove("chave")

    Array de Hash Tables -> lista de itens, cada um com múltiplos atributos nomeados (uso muito comum em scripts reais)
```
