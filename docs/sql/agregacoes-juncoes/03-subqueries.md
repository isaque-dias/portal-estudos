---
description: ...
---

# Subqueries Simples e Correlacionadas

> Parte 3 de 5 — Módulo 1.2 "Agregações e junções" (SQL). Cobre subqueries no WHERE, IN, EXISTS, subqueries correlacionadas e subqueries no FROM.

---

## 3. Subqueries Simples e Correlacionadas

### 3.1 O que é uma subquery

Uma **subquery** (subconsulta) é uma consulta `SELECT` escrita **dentro** de outra consulta, usada para calcular um valor ou um conjunto de valores que a consulta externa vai utilizar.

### 3.2 Subquery simples (não correlacionada)

Uma subquery é considerada **simples** quando pode ser executada **de forma independente**, sem depender de nada da consulta externa — ela é calculada uma única vez.

```sql
SELECT nome, preco
FROM produtos
WHERE preco > (SELECT AVG(preco) FROM produtos);
```

Aqui, a subquery `(SELECT AVG(preco) FROM produtos)` calcula o preço médio de todos os produtos **uma única vez**, e a consulta externa usa esse valor fixo para filtrar quais produtos ficam acima da média.

### 3.3 Subquery com `IN`

```sql
SELECT nome
FROM clientes
WHERE id IN (SELECT cliente_id FROM pedidos WHERE valor > 200);
```

Essa consulta responde: "quais clientes têm pelo menos um pedido acima de 200?" — a subquery gera uma lista de `cliente_id`s, e a consulta externa filtra os clientes que aparecem nessa lista.

### 3.4 Subquery correlacionada

Uma subquery é **correlacionada** quando ela **depende de valores da consulta externa** para ser calculada — ela não pode ser executada de forma isolada, porque referencia uma coluna da linha que está sendo avaliada na consulta de fora. Isso significa que, conceitualmente, a subquery é reavaliada **para cada linha** da consulta externa.

```sql
SELECT c.nome
FROM clientes c
WHERE EXISTS (
    SELECT 1
    FROM pedidos p
    WHERE p.cliente_id = c.id AND p.valor > 200
);
```

Aqui, a subquery interna referencia `c.id`, que vem da consulta externa (o cliente sendo avaliado na linha atual) — por isso ela é correlacionada. Para cada cliente, a subquery verifica se existe algum pedido correspondente acima de 200.

### 3.5 `EXISTS` vs `IN`

Ambos podem resolver problemas parecidos, mas com uma diferença de abordagem:

| Aspecto | `IN` | `EXISTS` |
| --- | --- | --- |
| O que verifica | Se um valor está presente em uma lista retornada pela subquery | Se a subquery retorna **pelo menos uma linha** (não importa o conteúdo) |
| Tipo de subquery | Geralmente simples (não correlacionada) | Geralmente correlacionada |
| Comportamento com `NULL` na subquery | Pode se comportar de forma inesperada se a subquery retornar `NULL` | Não sofre esse problema, porque não compara valores diretamente |

### 3.6 Subquery no `FROM` (tabela derivada)

Uma subquery também pode aparecer no lugar de uma tabela, dentro do `FROM` — nesse caso, o resultado da subquery é tratado como se fosse uma tabela temporária.

```sql
SELECT cidade, total_clientes
FROM (
    SELECT cidade, COUNT(*) AS total_clientes
    FROM clientes
    GROUP BY cidade
) AS resumo_por_cidade
WHERE total_clientes > 10;
```

Isso é equivalente, nesse caso específico, a usar `GROUP BY` com `HAVING` diretamente — mas subqueries no `FROM` se tornam necessárias em cenários mais complexos, onde é preciso agregar um resultado e depois aplicar operações adicionais sobre esse resultado já agregado.

---

!!! resumo "Resumo Mental"

```
    Subquery simples        -> calculada uma vez, independente da consulta externa
    Subquery correlacionada -> depende de uma coluna da consulta externa, reavaliada por linha
    EXISTS -> verifica se a subquery retorna alguma linha (comum em correlacionadas)
    IN     -> verifica se um valor está numa lista retornada pela subquery
    Subquery no FROM -> tratada como tabela temporária, útil para agregar e depois operar sobre o resultado
```
