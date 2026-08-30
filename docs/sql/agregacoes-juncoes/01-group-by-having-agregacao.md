# GROUP BY, HAVING e Funções de Agregação

> Parte 1 de 5 — Módulo 1.2 "Agregações e junções" (SQL). Cobre COUNT/SUM/AVG/MIN/MAX, agrupamento com GROUP BY e filtro de grupos com HAVING.

---

## 1. GROUP BY, HAVING e Funções de Agregação

### 1.1 O que são funções de agregação

Funções de agregação **resumem várias linhas em um único valor**. Em vez de retornar cada linha individualmente, elas calculam algo sobre um conjunto de linhas — uma soma, uma média, uma contagem.

| Função | O que calcula |
| --- | --- |
| `COUNT()` | Quantidade de linhas |
| `SUM()` | Soma dos valores de uma coluna numérica |
| `AVG()` | Média dos valores de uma coluna numérica |
| `MIN()` | Menor valor encontrado |
| `MAX()` | Maior valor encontrado |

### 1.2 Usando funções de agregação sem `GROUP BY`

Sem agrupamento, uma função de agregação resume **a tabela inteira** (ou o resultado do `WHERE`, se houver) em uma única linha de resultado.

```sql
SELECT COUNT(*) FROM clientes;                          -- quantos clientes existem no total
SELECT AVG(preco) FROM produtos;                         -- preço médio de todos os produtos
SELECT MAX(preco), MIN(preco) FROM produtos;              -- o mais caro e o mais barato, na mesma consulta
SELECT SUM(valor) FROM pedidos WHERE status = 'pago';     -- soma de todos os pedidos pagos
```

### 1.3 `GROUP BY` — Agregando por grupos

O `GROUP BY` muda o comportamento da agregação: em vez de resumir a tabela inteira em uma linha, ele **separa as linhas em grupos** (com base em uma ou mais colunas) e aplica a função de agregação **dentro de cada grupo** separadamente.

```sql
SELECT cidade, COUNT(*) AS total_clientes
FROM clientes
GROUP BY cidade;
```

Essa consulta responde: "quantos clientes existem em cada cidade?" — uma linha de resultado por cidade, cada uma com sua própria contagem.

**Regra importante**: toda coluna que aparece no `SELECT` sem estar dentro de uma função de agregação **precisa** aparecer também no `GROUP BY`. Isso porque, dentro de cada grupo, pode haver várias linhas diferentes — o banco de dados não saberia qual valor individual mostrar para uma coluna não agregada e não agrupada.

```sql
-- Válido: cidade está no GROUP BY, COUNT é uma agregação
SELECT cidade, COUNT(*) FROM clientes GROUP BY cidade;

-- Inválido na maioria dos SGBDs: "nome" não está agregado nem no GROUP BY
SELECT cidade, nome, COUNT(*) FROM clientes GROUP BY cidade;
```

### 1.4 Agrupando por mais de uma coluna

```sql
SELECT cidade, ativo, COUNT(*) AS total
FROM clientes
GROUP BY cidade, ativo;
```

Isso cria um grupo para cada **combinação** de cidade e status ativo/inativo — por exemplo, uma linha para "Campinas, ativos", outra para "Campinas, inativos".

### 1.5 `HAVING` — Filtrando grupos (não linhas individuais)

O `HAVING` é parecido com o `WHERE`, mas atua **depois** do agrupamento: filtra quais **grupos** aparecem no resultado final, com base no resultado da agregação.

```sql
SELECT cidade, COUNT(*) AS total_clientes
FROM clientes
GROUP BY cidade
HAVING COUNT(*) > 10;
```

Essa consulta responde: "quais cidades têm mais de 10 clientes?" — o filtro é aplicado **depois** de contar, sobre o resultado da contagem.

### 1.6 Por que `WHERE` não serve para isso

```sql
-- ERRADO: WHERE não pode usar uma função de agregação
SELECT cidade, COUNT(*) FROM clientes WHERE COUNT(*) > 10 GROUP BY cidade;

-- CORRETO: HAVING é a cláusula certa para filtrar com base em agregação
SELECT cidade, COUNT(*) FROM clientes GROUP BY cidade HAVING COUNT(*) > 10;
```

O motivo é a ordem lógica de processamento de uma consulta SQL: `WHERE` é avaliado **antes** do agrupamento acontecer (linha por linha, sobre a tabela original), enquanto `HAVING` é avaliado **depois**, sobre o resultado já agrupado. Nesse ponto, `COUNT(*)` ainda nem existe quando o `WHERE` é processado.

### 1.7 Combinando tudo

```sql
SELECT cidade, COUNT(*) AS total_clientes
FROM clientes
WHERE ativo = TRUE
GROUP BY cidade
HAVING COUNT(*) > 5
ORDER BY total_clientes DESC
LIMIT 10;
```

Ordem lógica de processamento dessa consulta: filtra clientes ativos (`WHERE`) → agrupa por cidade (`GROUP BY`) → mantém só grupos com mais de 5 clientes (`HAVING`) → ordena do maior para o menor (`ORDER BY`) → mostra só os 10 primeiros (`LIMIT`).

---

## Resumo mental

```
Agregação -> COUNT, SUM, AVG, MIN, MAX resumem várias linhas em um valor
GROUP BY  -> separa linhas em grupos antes de agregar; toda coluna não agregada no SELECT precisa estar no GROUP BY
HAVING    -> filtra GRUPOS, depois da agregação (WHERE filtra linhas, antes)
Ordem lógica -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT
```
