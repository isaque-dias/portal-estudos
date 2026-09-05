---
description: ...
---

# O Que É um SGBD, Tabelas, Linhas, Colunas, Tipos de Dado

> Parte 1 de 5 — Módulo 1.1 "Fundamentos absolutos" (SQL). Cobre o conceito de SGBD, o modelo relacional, e a estrutura básica de tabelas, linhas, colunas e tipos de dado.

---

## 1. O que é um SGBD, Tabelas, Linhas, Colunas, Tipos de Dado

### 1.1 O que é um SGBD

**SGBD (Sistema Gerenciador de Banco de Dados)** — em inglês, DBMS (*Database Management System*) — é o software responsável por armazenar, organizar, proteger e permitir a consulta a dados de forma estruturada e eficiente. Em vez de guardar informações espalhadas em arquivos de texto ou planilhas soltas, um SGBD organiza tudo em um formato padronizado que pode ser consultado por uma linguagem específica: o **SQL**.

Exemplos de SGBDs relacionais amplamente usados: **PostgreSQL**, **MySQL/MariaDB**, **Oracle Database**, **Microsoft SQL Server**, **SQLite**.

### 1.2 O modelo relacional

A maioria dos SGBDs usados no mercado segue o **modelo relacional**: os dados são organizados em **tabelas**, e essas tabelas podem se relacionar entre si através de valores em comum (esse relacionamento será aprofundado no card sobre `JOIN`s).

### 1.3 Tabelas, linhas e colunas

Uma **tabela** funciona de forma parecida com uma planilha: um conjunto de dados organizados em linhas e colunas, todos sobre o mesmo tipo de "entidade" (ex.: uma tabela de clientes, uma tabela de produtos).

| Conceito | Equivalente em planilha | Significado |
| --- | --- | --- |
| Tabela | A planilha inteira | Um conjunto de dados sobre uma mesma entidade (ex.: `clientes`) |
| Coluna (campo) | Uma coluna da planilha | Um atributo específico daquela entidade (ex.: `nome`, `email`, `data_cadastro`) |
| Linha (registro/row) | Uma linha da planilha | Um item individual daquela entidade (ex.: um cliente específico) |

Exemplo de uma tabela `clientes`:

| id | nome | email | cidade |
| --- | --- | --- | --- |
| 1 | Ana Silva | ana@email.com | Campinas |
| 2 | Bruno Costa | bruno@email.com | São Paulo |
| 3 | Carla Dias | carla@email.com | Curitiba |

Nessa tabela: `id`, `nome`, `email` e `cidade` são as **colunas**; cada linha (Ana, Bruno, Carla) é um **registro**.

### 1.4 Tipos de dados

Cada coluna de uma tabela tem um **tipo de dado** definido, que determina que tipo de valor pode ser armazenado ali e como ele é tratado internamente pelo SGBD.

| Categoria | Exemplos de tipo | Uso típico |
| --- | --- | --- |
| Texto | `VARCHAR(n)`, `TEXT`, `CHAR(n)` | Nomes, e-mails, descrições |
| Números inteiros | `INT`, `SMALLINT`, `BIGINT` | Identificadores, quantidades |
| Números decimais | `DECIMAL`, `NUMERIC`, `FLOAT` | Valores monetários, medidas |
| Data e hora | `DATE`, `TIME`, `TIMESTAMP` | Datas de cadastro, horários de eventos |
| Lógico | `BOOLEAN` | Valores verdadeiro/falso (ex.: `ativo`) |

**Por que o tipo importa**: além de economizar espaço (um `SMALLINT` ocupa menos espaço que um `BIGINT` desnecessário), o tipo de dado também garante integridade — um campo `DATE` recusa receber um texto qualquer, por exemplo, evitando dados inconsistentes na tabela.

### 1.5 Chave primária

Toda tabela bem estruturada tem uma coluna (ou combinação de colunas) que identifica **de forma única** cada linha — chamada de **chave primária (primary key)**. No exemplo da tabela `clientes`, a coluna `id` cumpre esse papel: nenhum outro cliente pode ter o mesmo `id`. Esse conceito será aprofundado no card sobre modelagem de dados e relacionamentos entre tabelas.

---

!!! resumo "Resumo Mental"

```
    SGBD -> software que armazena e organiza dados de forma estruturada (PostgreSQL, MySQL, Oracle...)
    Modelo relacional -> dados organizados em tabelas, que se relacionam por valores em comum
    Tabela -> conjunto de dados sobre uma entidade; colunas = atributos; linhas = registros individuais
    Tipo de dado -> define o que cada coluna pode armazenar (texto, número, data, lógico)
    Chave primária -> coluna que identifica cada linha de forma única
```
