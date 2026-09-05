---
description: ...
---

# Exercício: 20 Consultas em um Banco de Exemplo

> Parte 4 de 5 — Módulo 1.1 "Fundamentos absolutos" (SQL). Roteiro prático de 20 consultas para fixar SELECT, WHERE, ORDER BY, LIMIT e os operadores lógicos/de comparação.

---

## 4. Exercício: 20 Consultas em um Banco de Exemplo

### 4.1 Sobre o banco de exemplo

Este exercício é pensado para ser praticado em um banco de dados de exemplo amplamente usado para aprendizado: **Chinook** (uma loja de mídia digital, com tabelas como `artists`, `albums`, `tracks`, `customers`, `invoices`, `employees`) ou **Northwind** (uma distribuidora, com tabelas como `products`, `customers`, `orders`, `employees`, `categories`). Ambos são gratuitos e amplamente disponíveis para importação em PostgreSQL, MySQL ou SQLite.

As consultas abaixo estão descritas de forma que funcionem conceitualmente em qualquer um dos dois bancos — ajuste os nomes exatos de tabela/coluna conforme a versão do banco usada (eles variam ligeiramente entre versões e entre Chinook/Northwind).

### 4.2 As 20 consultas propostas

Este é um roteiro de prática — as consultas devem ser **escritas e testadas por você**, sem respostas prontas aqui, para que o exercício cumpra seu papel de fixação.

1. Liste todas as colunas de todos os clientes.
2. Liste apenas o nome e o e-mail (ou campos equivalentes) de todos os clientes.
3. Liste todos os produtos (ou faixas/músicas) com preço acima de um valor específico.
4. Liste todos os clientes de um único país específico.
5. Liste todos os clientes, ordenados por nome em ordem alfabética.
6. Liste os 10 produtos mais caros (ordenados do maior para o menor preço, com `LIMIT`).
7. Liste os 5 clientes cadastrados mais recentemente (se houver uma coluna de data).
8. Liste todos os pedidos (ou faturas) feitos em um intervalo de datas específico, usando `BETWEEN`.
9. Liste todos os produtos com preço entre dois valores específicos.
10. Liste todos os clientes cujo nome comece com uma letra específica, usando `LIKE`.
11. Liste todos os clientes cujo e-mail termine com um domínio específico (ex.: `%@gmail.com`).
12. Liste todos os clientes de três países específicos, usando `IN`.
13. Liste todos os produtos que **não** pertencem a uma lista de categorias específicas, usando `NOT IN`.
14. Liste todos os clientes de uma cidade específica **e** que estejam marcados como ativos (ou equivalente), usando `AND`.
15. Liste todos os clientes de duas cidades diferentes, usando `OR`.
16. Combine `AND` e `OR` com parênteses para listar clientes de duas cidades específicas, mas apenas os ativos.
17. Liste os 5 produtos mais baratos, evitando os de preço zero ou nulo (dica: combine `WHERE` com `ORDER BY` e `LIMIT`).
18. Liste todos os funcionários (se a tabela existir) cujo cargo contenha uma palavra específica, usando `LIKE` com `%`.
19. Liste todos os registros de uma tabela à sua escolha, ordenados por duas colunas diferentes ao mesmo tempo (ex.: por cidade, e dentro de cada cidade, por nome).
20. Escreva uma consulta que combine pelo menos três dos conceitos vistos neste guia ao mesmo tempo (`WHERE` + `ORDER BY` + `LIMIT`, por exemplo), sobre uma tabela de sua escolha.

---

!!! resumo "Resumo Mental"

```
    Exercício -> 20 consultas progressivas, sem respostas prontas, praticadas em Chinook ou Northwind
    Objetivo  -> fixar SELECT, WHERE, ORDER BY, LIMIT e os operadores (AND, OR, IN, BETWEEN, LIKE, NOT)
```
