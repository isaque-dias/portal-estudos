# Serviços do Windows e Gerenciador de Tarefas

> Parte 2 de 5 — Módulo "Fundamentos de Windows para PowerShell". Cobre o que é um serviço, como gerenciá-lo pela GUI e pelo terminal, e o Gerenciador de Tarefas.

---

## 2. Serviços do Windows e Gerenciador de Tarefas

### 2.1 O que é um serviço no Windows

Um **serviço** é um programa que roda em segundo plano, geralmente sem interface gráfica, iniciado automaticamente pelo sistema (ou manualmente) e que continua rodando independentemente de haver algum usuário logado. É o equivalente conceitual a um **daemon** no Linux, ou a uma *unit* gerenciada pelo systemd.

Exemplos de serviços do Windows: **Windows Update**, **Spooler de Impressão (Print Spooler)**, **DHCP Client**, **DNS Client**, **Windows Defender**.

### 2.2 Gerenciando serviços pela GUI

O console **Serviços** (`services.msc`) lista todos os serviços instalados, com colunas mostrando nome, descrição, status (Em execução/Parado) e tipo de inicialização.

| Tipo de inicialização | Comportamento |
| --- | --- |
| Automático | Inicia junto com o Windows |
| Automático (Início Atrasado) | Inicia um pouco depois do boot, para não competir por recursos logo de início |
| Manual | Só inicia quando outro programa/serviço solicita, ou quando iniciado manualmente |
| Desabilitado | Não pode ser iniciado, mesmo manualmente, até ser reabilitado |

Ao clicar com o botão direito em um serviço, é possível **Iniciar**, **Parar**, **Reiniciar** ou acessar **Propriedades** para alterar o tipo de inicialização e configurar comportamento em caso de falha.

### 2.3 Gerenciando serviços pelo terminal

No PowerShell, os comandos seguem o padrão `Verbo-Substantivo`:

```powershell
Get-Service                        # lista todos os serviços e seus status
Get-Service -Name "Spooler"        # consulta um serviço específico pelo nome
Start-Service -Name "Spooler"      # inicia um serviço
Stop-Service -Name "Spooler"       # para um serviço
Restart-Service -Name "Spooler"    # reinicia um serviço
```

### 2.4 Gerenciador de Tarefas (Task Manager)

Diferente do console de Serviços (que gerencia processos de segundo plano configurados como serviço), o **Gerenciador de Tarefas** (`Ctrl + Shift + Esc`, ou `taskmgr`) mostra uma visão mais ampla e em tempo real:

| Aba | O que mostra |
| --- | --- |
| Processos | Aplicativos e processos em execução, com uso de CPU, memória, disco e rede |
| Desempenho | Gráficos de uso de CPU, memória, disco, rede e GPU em tempo real |
| Histórico de Aplicativos | Consumo de recursos por aplicativo, ao longo do tempo |
| Inicializar (Startup) | Programas configurados para iniciar junto com o Windows |
| Usuários | Sessões de usuário ativas na máquina |
| Detalhes | Visão detalhada de processos, incluindo PID — equivalente mais próximo ao `ps`/`htop` do Linux |
| Serviços | Uma visão resumida dos serviços (atalho para o console de Serviços) |

### 2.5 Encerrando um processo travado

Na aba **Processos** (ou **Detalhes**), selecionar o processo problemático e clicar em **Finalizar Tarefa** encerra o processo imediatamente — equivalente ao `kill` no Linux. Vale lembrar que isso encerra o processo sem dar chance de salvar trabalho em andamento, então deve ser usado quando o programa realmente não responde mais.

Pelo PowerShell, o equivalente é:

```powershell
Get-Process -Name "nome_do_processo"     # localiza o processo
Stop-Process -Name "nome_do_processo"    # encerra o processo
```

---

## Resumo mental

```
Serviço -> programa em segundo plano (equivalente a daemon/unit do Linux)
services.msc -> gerencia serviços pela GUI; tipo de inicialização define se sobe sozinho no boot
Get-Service / Start-Service / Stop-Service / Restart-Service -> equivalentes no PowerShell
Gerenciador de Tarefas -> visão em tempo real de processos, desempenho e inicialização
Stop-Process -> equivalente ao "Finalizar Tarefa" via terminal
```
