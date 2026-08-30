# Critério de Conclusão: Escrever um Script com Loop + Condicional sem Copiar de Exemplo

> Parte 7 de 7 — Módulo 2 "PowerShell". Checkpoint prático para validar o domínio de variáveis, loops, condicionais, arrays/hash tables e cmdlets.

---

## 2.7 Critério de Conclusão

O objetivo deste módulo é considerado atingido quando for possível **escrever, do zero, um script combinando pelo menos um loop e uma estrutura condicional, sem copiar ou adaptar diretamente de nenhum exemplo já visto** — nem deste módulo, nem de qualquer outra referência.

### 2.7.1 Sugestão de autoavaliação

Depois de completar o exercício da parte anterior (array de servidores com status simulado), feche todo o material de apoio deste módulo e proponha para si mesmo um cenário **diferente** do exercício já feito — por exemplo:

- Um script que percorre uma lista de números e classifica cada um como par ou ímpar.
- Um script que percorre uma lista de arquivos (nomes fictícios, sem acessar o disco de verdade) e separa os que têm extensão `.log` dos que têm extensão `.txt`.
- Um script que simula tentativas de conexão, usando um `while` que para assim que uma tentativa simulada "der certo" (ou após um número máximo de tentativas).

### 2.7.2 Teste de fluência

O critério é considerado atingido quando, ao escrever esse novo script:

1. A sintaxe de `$variavel`, do loop escolhido (`foreach`, `for` ou `while`) e da condicional (`if` ou `switch`) sair sem precisar consultar a sintaxe exata.
2. For possível explicar, em voz alta, por que aquele tipo de loop específico foi escolhido para aquele cenário (por exemplo, `foreach` porque há uma coleção conhecida de itens a percorrer, ou `while` porque a quantidade de repetições depende de uma condição, não de um número fixo).
3. O script rodar (ou, ao menos, estiver sintaticamente correto) sem erros básicos de digitação de sintaxe.

### 2.7.3 Sinal de que ainda vale revisar

Se, ao tentar escrever esse script novo, for necessário voltar e conferir a sintaxe exata do `foreach`, a forma de comparar valores (`-eq`, `-gt`, etc.) ou como declarar um array, vale revisar as partes correspondentes deste módulo antes de seguir para tópicos mais avançados de PowerShell (como funções, módulos e manipulação de arquivos).

---

## Resumo mental

```
Critério -> escrever script com loop + condicional, do zero, sem copiar de exemplo
Teste    -> cenário novo e diferente do exercício já feito; sintaxe fluida; saber justificar a escolha do loop
```

## Próximos passos sugeridos de estudo

1. Funções em PowerShell (`function Nome-Funcao { ... }`), parâmetros e retorno de valores.
2. Manipulação de arquivos e pastas via cmdlets (`Get-ChildItem`, `Get-Content`, `Export-Csv`).
3. Tratamento de erros (`try`/`catch`/`finally`) para scripts mais robustos.
4. Módulos do PowerShell — incluindo o módulo `ActiveDirectory`, conectando com o conteúdo já visto sobre Active Directory.
