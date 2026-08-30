# Exercício: Script que Percorre um Array de Servidores e Imprime Status Simulado

> Parte 6 de 7 — Módulo 2 "PowerShell". Exercício prático combinando array, loop, condicional e Hash Table.

---

## 2.6 Exercício Prático

### 2.6.1 Objetivo

Escrever um script em PowerShell que **percorra um array contendo nomes de servidores** e, para cada um, **imprima um status simulado** — sem se conectar a nenhum servidor real, apenas simulando o comportamento para praticar as estruturas vistas até aqui.

### 2.6.2 Requisitos do exercício

O script deve combinar, no mínimo, os seguintes elementos vistos neste módulo:

1. Um **array** contendo pelo menos 5 nomes de servidores fictícios (ex.: `"web01"`, `"web02"`, `"db01"`, `"db02"`, `"cache01"`).
2. Um **loop `foreach`** percorrendo esse array.
3. Uma forma de **simular um status** para cada servidor — pode ser algo simples como alternar entre valores fixos, usar uma função que gera um número aleatório (`Get-Random`) para decidir o status, ou associar cada servidor a um status pré-definido usando uma Hash Table.
4. Uma estrutura **condicional (`if` ou `switch`)** que reaja de forma diferente dependendo do status simulado — por exemplo, imprimir uma mensagem diferente para "Em execução" e para "Parado".

### 2.6.3 Sugestão de estrutura (sem resolver o exercício por completo)

Um roteiro possível para pensar a construção do script, sem entregar a solução pronta:

1. Comece definindo o array de nomes de servidores.
2. Decida como o status será simulado — a forma mais simples é usar `Get-Random` para sortear entre algumas opções de status a cada iteração do loop.
3. Dentro do `foreach`, guarde o status sorteado em uma variável.
4. Use um `if`/`elseif`/`else` (ou `switch`) para decidir o que imprimir com base nesse status.
5. Use `Write-Host` para exibir o resultado de cada servidor, incluindo tanto o nome quanto o status simulado na mensagem.

### 2.6.4 Ideia de evolução do exercício (opcional)

Depois de fazer a versão básica funcionar, algumas formas de aprofundar a prática, combinando com os tópicos já vistos:

- Trocar o array simples de nomes por um **array de Hash Tables**, onde cada servidor já vem com um IP fixo além do nome, e incluir o IP na mensagem impressa.
- Contar, ao final do loop, quantos servidores ficaram com cada status (usando uma variável acumuladora dentro do loop).
- Usar `-like` para simular uma verificação adicional, como "se o nome do servidor começa com `web`, tratar como servidor de aplicação; se começa com `db`, tratar como servidor de banco".

---

## Resumo mental

```
Exercício -> array de nomes de servidores + foreach + status simulado + if/switch reagindo ao status
Ferramentas envolvidas -> array, foreach, Get-Random (opcional), if/elseif/else ou switch, Write-Host
Evolução opcional -> array de Hash Tables, contagem por status, filtro com -like
```
