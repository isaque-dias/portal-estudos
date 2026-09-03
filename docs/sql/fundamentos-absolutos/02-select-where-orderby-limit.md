# SELECT, WHERE, ORDER BY, LIMIT

> Parte 2 de 5 — Módulo 1.1 "Fundamentos absolutos" (SQL). Cobre os comandos básicos de consulta: seleção de colunas, filtro de linhas, ordenação e limite de resultados.

---

## 2. SELECT, WHERE, ORDER BY, LIMIT

### 2.1 `SELECT` — Escolhendo o que consultar

O comando `SELECT` é o ponto de partida de qualquer consulta: define **quais colunas** devem ser retornadas.

```sql
SELECT nome, email FROM clientes;
```

Para retornar todas as colunas de uma vez, usa-se `*`:

```sql
SELECT * FROM clientes;
```

**Boa prática**: embora `SELECT *` seja útil para explorar rapidamente uma tabela desconhecida, em consultas usadas de verdade (relatórios, aplicações) é preferível listar explicitamente as colunas necessárias — isso deixa claro o que a consulta espera obter e evita trazer dados desnecessários.

### 2.2 `WHERE` — Filtrando linhas

O `WHERE` define uma condição que cada linha precisa satisfazer para ser incluída no resultado.

```sql
SELECT nome, email FROM clientes WHERE cidade = 'Campinas';
```

Isso retorna apenas os clientes cuja coluna `cidade` seja exatamente `'Campinas'`. Valores de texto em SQL vão entre aspas simples.

### 2.3 `ORDER BY` — Ordenando o resultado

Define a ordem em que as linhas do resultado aparecem, com base em uma ou mais colunas.

```sql
SELECT nome, cidade FROM clientes ORDER BY nome;              -- ordem alfabética crescente (padrão)
SELECT nome, cidade FROM clientes ORDER BY nome DESC;         -- ordem decrescente
SELECT nome, cidade FROM clientes ORDER BY cidade, nome;      -- ordena por cidade, e dentro de cada cidade, por nome
```

| Palavra-chave | Significado |
| --- | --- |
| `ASC` | Ordem crescente (é o padrão — pode ser omitida) |
| `DESC` | Ordem decrescente |

### 2.4 `LIMIT` — Limitando a quantidade de resultados

Restringe quantas linhas o resultado deve conter, útil para consultas exploratórias em tabelas grandes, ou para obter apenas os "top N" resultados.

```sql
SELECT nome FROM clientes LIMIT 5;                       -- retorna só as primeiras 5 linhas
SELECT nome FROM clientes ORDER BY nome DESC LIMIT 3;    -- os 3 últimos em ordem alfabética
```

**Nota sobre portabilidade**: `LIMIT` é o padrão em PostgreSQL, MySQL e SQLite. O SQL Server usa uma sintaxe diferente (`TOP`), e o Oracle tradicionalmente usa `ROWNUM` ou `FETCH FIRST` — vale ter em mente ao migrar consultas entre diferentes SGBDs.


### 2.5 Ordem de leitura recomendada de uma consulta

Embora a ordem em que as cláusulas são **escritas** seja sempre `SELECT` → `FROM` → `WHERE` → `ORDER BY` → `LIMIT`, o banco de dados internamente processa essa consulta em uma ordem lógica diferente: primeiro filtra as linhas (`WHERE`), depois seleciona as colunas (`SELECT`), depois ordena (`ORDER BY`), e por fim aplica o limite (`LIMIT`). Entender essa ordem lógica ajuda a raciocinar sobre consultas mais complexas mais adiante.

---

## Resumo mental

```
SELECT   -> escolhe quais colunas retornar
WHERE    -> filtra quais linhas entram no resultado
ORDER BY -> define a ordem do resultado (ASC padrão, DESC decrescente)
LIMIT    -> restringe a quantidade de linhas retornadas

Ordem escrita:  SELECT -> FROM -> WHERE -> ORDER BY -> LIMIT
Ordem lógica:   FROM -> WHERE -> SELECT -> ORDER BY -> LIMIT
```
