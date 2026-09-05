---
description: ...
---

# Exercício: Relatório que Cruza 3 Tabelas com Agregação

> Parte 4 de 5 — Módulo 1.2 "Agregações e junções" (SQL). Exercício prático combinando JOIN de múltiplas tabelas com agregação, em Chinook ou Northwind.

---

## 4. Exercício: Relatório que Cruza 3 Tabelas com Agregação

### 4.1 Contexto do exercício

Usando o mesmo banco de exemplo sugerido no módulo anterior (**Chinook** ou **Northwind**), o objetivo é construir um relatório único que combine **três tabelas relacionadas**, aplicando agregação sobre o resultado combinado.

### 4.2 Proposta de relatório (Chinook)

Monte uma consulta que responda: **"Para cada cliente, qual o valor total gasto e quantas faturas (invoices) ele possui, mas mostrando também o nome do funcionário (employee/support rep) responsável por aquele cliente?"**

Isso envolve, no mínimo, três tabelas: `customers`, `invoices` e `employees` (o vínculo entre cliente e funcionário geralmente existe através de uma coluna como `support_rep_id` em `customers`, apontando para `employees`).

### 4.3 Proposta de relatório (Northwind)

Monte uma consulta que responda: **"Para cada categoria de produto, qual a quantidade total vendida e o valor total de vendas, mostrando também o nome do fornecedor (supplier) de cada produto envolvido?"**

Isso envolve, no mínimo, três tabelas: `categories`, `products` e `order_details` (ou `suppliers`, dependendo de qual terceira tabela for escolhida para completar o cruzamento).

### 4.4 Passos sugeridos para construir a consulta (sem resolver por você)

1. Identifique as colunas de chave que conectam as três tabelas entre si (geralmente `id`s referenciados por colunas do tipo `algo_id`).
2. Comece com um `INNER JOIN` simples entre as duas primeiras tabelas, e confira se o resultado faz sentido antes de adicionar a terceira.
3. Adicione o `JOIN` com a terceira tabela.
4. Só depois de confirmar que o cruzamento das três tabelas está correto (sem agregação ainda), adicione o `GROUP BY` e a função de agregação necessária.
5. Se algum grupo precisar ser filtrado com base no resultado agregado (ex.: "só clientes que gastaram mais de X"), use `HAVING` — não `WHERE`.
6. Ordene o resultado de forma que a informação mais relevante apareça primeiro (ex.: maior valor total primeiro).

---

!!! resumo "Resumo Mental"


```
    Exercício -> relatório cruzando 3 tabelas + agregação, em Chinook ou Northwind
    Passos    -> identificar chaves -> JOIN de 2 tabelas -> validar -> JOIN da 3ª -> só então GROUP BY/agregação -> HAVING se precisar filtrar -> ORDER BY
```
