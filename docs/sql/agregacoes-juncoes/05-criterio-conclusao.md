# Critério de Conclusão: Explicar a Diferença entre INNER e LEFT JOIN

> Parte 5 de 5 — Módulo 1.2 "Agregações e junções" (SQL). Checkpoint prático para validar o domínio de agregação, JOINs e subqueries.

---

## 5. Critério de Conclusão

O objetivo deste módulo é considerado atingido quando for possível **explicar em voz alta, com um exemplo próprio, a diferença entre `INNER JOIN` e `LEFT JOIN`**, sem consultar nenhum material de referência.

### 5.1 Roteiro sugerido para a explicação em voz alta

1. Descreva duas tabelas simples relacionadas (pode reaproveitar o exemplo de `clientes` e `pedidos` usado no módulo de JOINs, ou criar um novo).
2. Aponte um caso onde uma linha de uma das tabelas **não tem correspondência** na outra (ex.: um cliente sem nenhum pedido).
3. Explique o que aconteceria com esse caso específico ao usar `INNER JOIN` (ele desaparece do resultado).
4. Explique o que aconteceria com esse mesmo caso ao usar `LEFT JOIN` (ele aparece, com `NULL` nas colunas da outra tabela).
5. Se essa explicação sair de forma fluida, sem hesitar ou precisar checar a definição, o critério foi atingido.

### 5.2 Sinal de que ainda vale revisar

Se, ao tentar montar a explicação, for necessário parar para lembrar qual dos dois JOINs "mantém tudo" e qual "só mantém o que casa", vale revisar a seção de JOINs antes de seguir adiante — essa é exatamente a distinção que o critério testa.

---

## Resumo mental

```
Critério -> explicar em voz alta, com exemplo próprio, a diferença entre INNER JOIN e LEFT JOIN
Teste    -> descrever 2 tabelas com uma linha sem correspondência, e mostrar o que cada JOIN faz com ela
```

## Próximos passos sugeridos de estudo

1. Chaves primárias e estrangeiras, e como elas garantem a integridade dos relacionamentos usados em JOINs.
2. Índices e como eles afetam a performance de consultas com JOIN e agregação.
3. `UNION` e `UNION ALL` para combinar resultados de consultas diferentes.
4. Funções de janela (`window functions`) como evolução natural depois de dominar agregação e `GROUP BY`.
