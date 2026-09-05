---
description: ...
---

# Critério de Conclusão: Consulta com Filtro Composto sem Consultar Referência

> Parte 5 de 5 — Módulo 1.1 "Fundamentos absolutos" (SQL). Checkpoint prático para validar o domínio de SELECT, WHERE, ORDER BY, LIMIT e operadores lógicos/de comparação.

---

## 5. Critério de Conclusão

O objetivo deste módulo é considerado atingido quando for possível **escrever uma consulta com filtro composto (`WHERE` combinando `AND`/`OR`/`IN`/`BETWEEN`/`LIKE`) sem consultar nenhuma referência** — nem os guias anteriores deste módulo, nem documentação externa.

### 5.1 Sugestão de autoavaliação

Depois de praticar os 20 itens do exercício anterior com consulta livre ao material, feche todo o material de apoio e tente escrever, do zero, uma consulta **original** (não uma das 20 já praticadas) que combine pelo menos dois operadores diferentes dentro de um único `WHERE` — por exemplo, um filtro por intervalo de preço **e** por uma lista de categorias específicas, ordenado por preço.

### 5.2 Teste de fluência

Se a sintaxe sair de forma natural, sem precisar checar como cada operador funciona (a ordem dos parâmetros do `BETWEEN`, a sintaxe exata do `LIKE`, onde colocar os parênteses ao misturar `AND`/`OR`), o critério foi atingido.

Caso contrário, é sinal de que vale revisar especificamente o(s) operador(es) que geraram dúvida, antes de avançar para o próximo módulo (agregações e junções).

---

!!! resumo "Resumo Mental"

```
    Critério -> escrever consulta com filtro composto (WHERE + AND/OR/IN/BETWEEN/LIKE) sem consultar referência
    Teste    -> consulta original, combinando 2+ operadores, sintaxe fluida sem checar documentação
```

## Próximos passos sugeridos de estudo

1. Funções de agregação (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) e `GROUP BY`.
2. `JOIN`s — relacionando dados de múltiplas tabelas (`INNER JOIN`, `LEFT JOIN`).
3. Subconsultas (subqueries) dentro de `WHERE` e `FROM`.
4. Chaves primárias e estrangeiras, e modelagem básica de relacionamento entre tabelas.
