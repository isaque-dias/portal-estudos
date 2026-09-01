# Resumo rápido — Módulos 1.1 e 1.2

Guia de consulta rápida: conceito, sintaxe e principais armadilhas dos módulos de Fundamentos absolutos e Agregações e junções.

## 1. Base (SGBD, tabelas, tipos)

- **SGBD** — programa que guarda e organiza dados (Postgres, MySQL, Oracle, SQL Server, SQLite)
- **Modelo relacional** — dados em tabelas, conectadas por valores em comum (chave)
- **Tabela** = planilha | **Coluna** = atributo | **Linha** = registro
- **Chave primária (PK)** — identifica cada linha de forma única, nunca repete

**Tipos de dado mais usados:**

| Tipo | Uso |
| --- | --- |
| `VARCHAR(n)` / `TEXT` | texto |
| `INT` / `BIGINT` | números inteiros |
| `DECIMAL` / `NUMERIC` | dinheiro, medidas |
| `DATE` / `TIMESTAMP` | datas/horários |
| `BOOLEAN` | verdadeiro/falso |

!!! tip "Macete"
    O tipo certo evita erro (`DATE` recusa texto) e economiza espaço. Não usar `BIGINT` pra tudo por preguiça.

## 2. SELECT, WHERE, ORDER BY, LIMIT

```sql
SELECT nome, email FROM clientes WHERE cidade = 'Campinas' ORDER BY nome DESC LIMIT 5;
```

!!! warning "Pegadinha — duas ordens diferentes"
    | | Ordem |
    | --- | --- |
    | Como você escreve | `SELECT → FROM → WHERE → ORDER BY → LIMIT` |
    | Como o banco executa | `FROM → WHERE → SELECT → ORDER BY → LIMIT` |

    Isso explica por que o `WHERE` roda antes do `SELECT` — ele não conhece um apelido (`AS`) criado no `SELECT`.

- Evite `SELECT *` em consulta de verdade — liste as colunas
- `ORDER BY cidade, nome` — ordena por cidade, empate desempata por nome
- `LIMIT` não é padrão universal: Postgres/MySQL/SQLite usam `LIMIT`; SQL Server usa `TOP`; Oracle usa `ROWNUM`/`FETCH FIRST`

## 3. Operadores (comparação, AND/OR, IN, BETWEEN, LIKE)

**Comparação:** `= <> != > < >= <=`

!!! warning "Pegadinha — misturar AND com OR sem parênteses"
```sql
    -- Ambíguo (perigoso):
    WHERE cidade = 'Campinas' OR cidade = 'São Paulo' AND ativo = TRUE;

    -- Correto e claro:
    WHERE (cidade = 'Campinas' OR cidade = 'São Paulo') AND ativo = TRUE;
```
    `AND` "aperta" antes do `OR` (igual multiplicação antes de soma). Sempre usar parênteses quando misturar os dois.

**IN** — evita `OR` repetido:
```sql
WHERE cidade IN ('Campinas', 'São Paulo', 'Curitiba')
```

**BETWEEN** — intervalo, incluindo os dois limites:
```sql
WHERE preco BETWEEN 50 AND 150
WHERE data_pedido BETWEEN '2026-01-01' AND '2026-01-31'
```

**LIKE** — busca por padrão de texto:

| Curinga | Significado |
| --- | --- |
| `%` | qualquer sequência (até vazia) |
| `_` | exatamente 1 caractere |

```sql
WHERE nome LIKE 'A%'      -- começa com A
WHERE nome LIKE '%Silva'  -- termina com Silva
WHERE nome LIKE '%ana%'   -- contém "ana"
WHERE nome LIKE '_ana'    -- 4 letras, termina em "ana"
```

**NOT** — inverte qualquer operador: `NOT IN`, `NOT LIKE`, `NOT BETWEEN`.

## 4. Agregação — GROUP BY e HAVING

**Funções:** `COUNT()` `SUM()` `AVG()` `MIN()` `MAX()`

Sem `GROUP BY` — resume a tabela inteira em 1 linha. Com `GROUP BY` — resume cada grupo separadamente.

```sql
SELECT cidade, COUNT(*) AS total
FROM clientes
GROUP BY cidade;
```

!!! warning "Pegadinha — regra de ouro do GROUP BY"
    Toda coluna no `SELECT` que não está numa função de agregação precisa estar no `GROUP BY`.
```sql
    -- Errado: "nome" não está agregado nem agrupado
    SELECT cidade, nome, COUNT(*) FROM clientes GROUP BY cidade;

    -- Certo
    SELECT cidade, COUNT(*) FROM clientes GROUP BY cidade;
```

!!! warning "Pegadinha — WHERE não filtra agregação, HAVING sim"
```sql
    -- Errado
    SELECT cidade, COUNT(*) FROM clientes WHERE COUNT(*) > 10 GROUP BY cidade;

    -- Certo
    SELECT cidade, COUNT(*) FROM clientes GROUP BY cidade HAVING COUNT(*) > 10;
```
    Motivo: `WHERE` roda antes de agrupar (linha por linha), `HAVING` roda depois (sobre o grupo já pronto). Quando o `WHERE` age, o `COUNT(*)` ainda nem existe.

**Ordem lógica completa:** `WHERE → GROUP BY → HAVING → ORDER BY → LIMIT`

## 5. JOINs — INNER, LEFT, RIGHT, FULL, CROSS

**Por que existe:** dados relacionados ficam em tabelas separadas (`pedidos` guarda só `cliente_id`, não o nome do cliente).

Exemplo mental fixo:


| JOIN | O que faz | Bruno (sem pedido) aparece? |
| --- | --- | --- |
| `INNER JOIN` | só o que casa nos dois lados | Não |
| `LEFT JOIN` | tudo da esquerda, casando ou não | Sim, com `NULL` |
| `RIGHT JOIN` | tudo da direita | Equivalente a inverter tabelas + LEFT |
| `FULL JOIN` | tudo dos dois lados | Sim (e órfãos da outra tabela também) |
| `CROSS JOIN` | todas as combinações possíveis (sem condição) | Não se aplica — produto cartesiano |

!!! tip "Macete de decoreba"
    `LEFT JOIN` = "quero tudo da tabela da esquerda, mesmo sem correspondência". Se não tiver match, vem `NULL`.

!!! warning "Pegadinha"
    `RIGHT JOIN` quase ninguém usa — na prática dá pra sempre reescrever como `LEFT JOIN` invertendo a ordem das tabelas. Manter o hábito de usar sempre `LEFT`.

    MySQL não tem `FULL JOIN` nativo — precisa simular com `LEFT JOIN` + `RIGHT JOIN` + `UNION`.

## 6. Subqueries (simples x correlacionada)

**Simples** — roda sozinha, uma vez só, independente da consulta de fora:
```sql
WHERE preco > (SELECT AVG(preco) FROM produtos)
```

**Correlacionada** — depende de uma coluna da consulta de fora, roda de novo pra cada linha:
```sql
WHERE EXISTS (
    SELECT 1 FROM pedidos p
    WHERE p.cliente_id = c.id AND p.valor > 200
)
```

**IN vs EXISTS:**

| | `IN` | `EXISTS` |
| --- | --- | --- |
| Verifica | se o valor está numa lista | se a subquery retorna alguma linha |
| Tipo comum | simples | correlacionada |
| Problema com `NULL` | pode dar resultado estranho | não tem esse problema |

!!! tip "Macete"
    Se a subquery devolver `NULL` misturado numa lista usada com `IN`, o comportamento pode ser inesperado — prefira `EXISTS` quando estiver checando "existe ou não existe" um registro relacionado.

**Subquery no FROM** trata o resultado como tabela temporária. Útil quando precisa agregar e depois filtrar/operar em cima do resultado já agregado.

## Checklist de fluência

- [ ] Escrevo um `WHERE` combinando 2+ operadores (`AND`/`OR`/`IN`/`BETWEEN`/`LIKE`) sem consultar nada
- [ ] Sei explicar de cabeça a diferença entre `INNER JOIN` e `LEFT JOIN`, com exemplo próprio
- [ ] Sei por que `HAVING` existe e `WHERE` não serve pra filtrar agregação
- [ ] Sei quando uma subquery é correlacionada (ela referencia coluna de fora)

## Próximos assuntos

1. Chaves primárias e estrangeiras (integridade dos relacionamentos)
2. Índices e performance de JOIN/agregação
3. `UNION` e `UNION ALL`
4. Window functions (evolução do `GROUP BY`)