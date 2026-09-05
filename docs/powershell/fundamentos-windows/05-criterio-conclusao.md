---
description: ...
---

# Critério de Conclusão: Diagnosticando um Problema de Serviço/Permissão

> Parte 5 de 5 — Módulo "Fundamentos de Windows para PowerShell". Checkpoint prático para validar o domínio dos tópicos anteriores (NTFS, serviços, usuários/grupos, rede).

---

## 5. Checkpoint: Diagnosticando um Problema de Serviço/Permissão

O objetivo deste módulo é considerado atingido quando for possível **diagnosticar um problema simples de serviço ou permissão, tanto pela GUI quanto pelo terminal**, sem consultar referência.

### 5.1 Cenário de prática sugerido: serviço parado

**Pela GUI:**
1. Abrir `services.msc`.
2. Localizar um serviço específico (ex.: Spooler de Impressão) e verificar seu status.
3. Se estiver parado, iniciar manualmente e observar se o status muda para "Em execução".
4. Verificar, em Propriedades, qual é o tipo de inicialização configurado — isso explica se o serviço deveria ter iniciado sozinho no boot ou não.

**Pelo terminal:**
```powershell
Get-Service -Name "Spooler"      # verifica o status atual
Start-Service -Name "Spooler"    # inicia o serviço, se estiver parado
Get-Service -Name "Spooler"      # confirma que o status mudou
```

### 5.2 Cenário de prática sugerido: problema de permissão em pasta

**Pela GUI:**
1. Criar uma pasta de teste e, nas Propriedades → Segurança, remover a permissão de Leitura de um usuário específico (ou de "Usuários" em geral).
2. Tentar acessar essa pasta logado como esse usuário e observar o erro de acesso negado.
3. Reverter a alteração, restaurando a permissão, e confirmar que o acesso volta a funcionar.

**Pelo terminal (usando o cmdlet equivalente a `icacls`, comando clássico de linha de comando para ACLs):**
```powershell
icacls "C:\caminho\da\pasta"                                  # exibe as permissões atuais da pasta
icacls "C:\caminho\da\pasta" /grant usuario:R                 # concede permissão de leitura a um usuário
icacls "C:\caminho\da\pasta" /remove usuario                  # remove as permissões específicas daquele usuário
```

### 5.3 Critério final de autoavaliação

Depois de praticar os dois cenários acima, o critério de conclusão do módulo é atingido quando for possível, **sem consultar este guia**:

1. Explicar, em voz alta, o que significa um serviço estar como "Manual" versus "Automático".
2. Diagnosticar se uma pasta inacessível é um problema de permissão NTFS, de permissão de compartilhamento, ou de ambos — usando o raciocínio da parte 1 (NTFS).
3. Alternar entre GUI e terminal para resolver o mesmo problema, escolhendo a ferramenta mais rápida para cada situação.

---

!!! resumo "Resumo Mental"

```
    Checkpoint -> diagnosticar serviço/permissão pela GUI E pelo terminal, sem consultar referência
    Cenário 1 -> serviço parado: services.msc / Get-Service + Start-Service
    Cenário 2 -> permissão de pasta: Propriedades > Segurança / icacls
    Autoavaliação -> explicar Manual vs Automático; distinguir NTFS vs compartilhamento; escolher GUI ou terminal conforme a situação
```

## Próximos passos sugeridos de estudo

1. Sintaxe e conceitos básicos do PowerShell propriamente dito: cmdlets, pipeline de objetos, variáveis.
2. Gerenciamento de Active Directory via PowerShell (módulo `ActiveDirectory`).
3. Firewall do Windows e regras de entrada/saída (`wf.msc`, `Get-NetFirewallRule`).
4. Event Viewer (`eventvwr.msc`) como equivalente Windows ao `journalctl`/`dmesg` do Linux.
