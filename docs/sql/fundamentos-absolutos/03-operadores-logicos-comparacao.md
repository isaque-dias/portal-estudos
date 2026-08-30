# Operadores Lógicos e de Comparação (AND, OR, IN, BETWEEN, LIKE)

> Parte 3 de 5 — Módulo 1.1 "Fundamentos absolutos" (SQL). Cobre operadores de comparação, combinação lógica de condições, e os operadores IN, BETWEEN, LIKE e NOT.

---

## 3. Operadores Lógicos e de Comparação (`AND`, `OR`, `IN`, `BETWEEN`, `LIKE`)

### 3.1 Operadores de comparação básicos

| Operador | Significado |
| --- | --- |
| `=` | Igual a |
| `<>` ou `!=` | Diferente de |
| `>` | Maior que |
| `<` | Menor que |
| `>=` | Maior ou igual a |
| `<=` | Menor ou igual a |

```sql
SELECT nome FROM clientes WHERE id > 10;
SELECT produto, preco FROM produtos WHERE preco <= 100;
```

### 3.2 `AND` e `OR` — Combinando condições

```sql
SELECT nome FROM clientes WHERE cidade = 'Campinas' AND ativo = TRUE;
SELECT nome FROM clientes WHERE cidade = 'Campinas' OR cidade = 'São Paulo';
```

- `AND` exige que **todas** as condições sejam verdadeiras.
- `OR` exige que **pelo menos uma** das condições seja verdadeira.

**Cuidado com a combinação de `AND` e `OR` na mesma consulta**: assim como em matemática, é importante usar parênteses para deixar explícita a ordem de avaliação, evitando resultados inesperados.

```sql
-- Sem parênteses, a intenção fica ambígua para quem lê a consulta:
SELECT * FROM clientes WHERE cidade = 'Campinas' OR cidade = 'São Paulo' AND ativo = TRUE;

-- Com parênteses, a intenção fica clara: só clientes ativos, de uma dessas duas cidades:
SELECT * FROM clientes WHERE (cidade = 'Campinas' OR cidade = 'São Paulo') AND ativo = TRUE;
```

### 3.3 `IN` — Comparando com uma lista de valores

Evita repetir `OR` várias vezes quando se quer comparar uma coluna com vários valores possíveis.

```sql
-- Estas duas consultas são equivalentes:
SELECT nome FROM clientes WHERE cidade = 'Campinas' OR cidade = 'São Paulo' OR cidade = 'Curitiba';
SELECT nome FROM clientes WHERE cidade IN ('Campinas', 'São Paulo', 'Curitiba');
```

### 3.4 `BETWEEN` — Comparando com um intervalo

Verifica se um valor está dentro de um intervalo (incluindo os dois limites).

```sql
SELECT nome, preco FROM produtos WHERE preco BETWEEN 50 AND 150;

-- Também funciona com datas:
SELECT * FROM pedidos WHERE data_pedido BETWEEN '2026-01-01' AND '2026-01-31';
```

### 3.5 `LIKE` — Comparando padrões de texto

Usado para buscas parciais em campos de texto, com dois curingas especiais:

| Curinga | Significado |
| --- | --- |
| `%` | Qualquer sequência de caracteres (inclusive vazia) |
| `_` | Exatamente um caractere qualquer |

```sql
SELECT nome FROM clientes WHERE nome LIKE 'A%';        -- nomes que começam com "A"
SELECT nome FROM clientes WHERE nome LIKE '%Silva';     -- nomes que terminam com "Silva"
SELECT nome FROM clientes WHERE nome LIKE '%ana%';      -- nomes que contêm "ana" em qualquer posição
SELECT nome FROM clientes WHERE nome LIKE '_ana';       -- exatamente 4 letras, terminando em "ana"
```

### 3.6 `NOT` — Negando uma condição

Pode ser combinado com qualquer um dos operadores anteriores para inverter o resultado.

```sql
SELECT nome FROM clientes WHERE cidade NOT IN ('Campinas', 'São Paulo');
SELECT nome FROM clientes WHERE nome NOT LIKE 'A%';
SELECT * FROM produtos WHERE preco NOT BETWEEN 50 AND 150;
```

---

## Resumo mental

```
Comparação  -> =, <>/!=, >, <, >=, <=
AND / OR    -> combina condições (todas / pelo menos uma) — use parênteses ao misturar os dois
IN          -> compara com uma lista de valores
BETWEEN     -> compara com um intervalo (incluindo os limites)
LIKE        -> busca padrão de texto (% = qualquer sequência, _ = um caractere)
NOT         -> inverte qualquer uma das condições acima
```
