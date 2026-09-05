---
description: ...
---

# Usuários Locais, Grupos e Conceito de Active Directory

> Parte 3 de 5 — Módulo "Fundamentos de Windows para PowerShell". Cobre usuários e grupos locais, e o conceito de Active Directory como solução centralizada.

---

## 3. Usuários Locais, Grupos e o Conceito de Active Directory

### 3.1 Usuários locais

Um **usuário local** existe apenas na máquina onde foi criado — suas credenciais e permissões não são reconhecidas por nenhuma outra máquina na rede. É o modelo padrão em computadores domésticos e notebooks não integrados a uma empresa.

Gerenciamento pela GUI: **Configurações → Contas**, ou o console mais avançado `lusrmgr.msc` (Usuários e Grupos Locais), disponível nas edições Pro/Enterprise do Windows.

Pelo PowerShell:

```powershell
Get-LocalUser                              # lista usuários locais
New-LocalUser -Name "tecnico" -NoPassword  # cria um novo usuário local (exemplo simplificado)
```

### 3.2 Grupos locais

Um **grupo** é uma coleção de usuários, usada para atribuir permissões a vários usuários de uma vez, em vez de configurar cada um individualmente. Grupos locais padrão importantes:

| Grupo | Função |
| --- | --- |
| Administradores | Controle total sobre a máquina local |
| Usuários | Permissões padrão, sem privilégios administrativos |
| Usuários de Área de Trabalho Remota | Permissão para conectar via Área de Trabalho Remota (RDP) |

```powershell
Get-LocalGroup                                          # lista grupos locais
Get-LocalGroupMember -Group "Administradores"            # lista membros de um grupo específico
Add-LocalGroupMember -Group "Administradores" -Member "tecnico"  # adiciona um usuário a um grupo
```

### 3.3 O problema que o Active Directory resolve

Usuários e grupos **locais** funcionam bem para uma única máquina, mas não escalam para um ambiente com dezenas, centenas ou milhares de computadores. Sem uma solução centralizada, cada máquina teria sua própria lista separada de usuários — trocar a senha de um funcionário significaria fazer isso manualmente em cada computador que ele usa.

### 3.4 O que é o Active Directory (AD)

**Active Directory** é o serviço de diretório da Microsoft, responsável por centralizar a gestão de usuários, grupos, computadores e políticas de segurança em uma rede corporativa inteira, a partir de um ou mais servidores especializados (**controladores de domínio**).

Conceitos-chave:

| Conceito | Significado |
| --- | --- |
| Domínio | O conjunto de máquinas, usuários e recursos gerenciados centralmente pelo AD |
| Controlador de Domínio (DC) | O servidor que hospeda o banco de dados do AD e responde às autenticações |
| Usuário de domínio | Uma conta reconhecida em toda a rede, não apenas em uma máquina — permite logar em qualquer computador ingressado no domínio |
| Unidade Organizacional (OU) | Uma forma de organizar usuários/computadores em uma estrutura hierárquica, facilitando aplicação de políticas |
| GPO (Group Policy Object) | Um conjunto de configurações aplicadas automaticamente a usuários/computadores dentro do domínio (ex.: forçar bloqueio de tela após X minutos) |

### 3.5 Usuário local vs usuário de domínio

| Característica | Usuário local | Usuário de domínio |
| --- | --- | --- |
| Onde é reconhecido | Apenas na máquina onde foi criado | Em qualquer máquina ingressada no domínio |
| Onde fica armazenado | No banco de contas local da própria máquina (SAM) | No banco de dados central do Active Directory |
| Gerenciamento | Individual, máquina por máquina | Centralizado, a partir do controlador de domínio |
| Escala prática | Poucos computadores, uso doméstico/pequeno | Ambientes corporativos de qualquer tamanho |

**Nota prática**: mesmo em uma máquina ingressada em um domínio, ainda existe uma conta local de Administrador — é uma boa prática de segurança que essa conta local permaneça com senha forte e uso restrito a situações de recuperação, já que o uso do dia a dia deve ocorrer via conta de domínio.

---

!!! resumo "Resumo Mental"

```
    Usuário local -> só existe na máquina onde foi criado
    Grupo -> coleção de usuários, para atribuir permissão em conjunto
    AD -> centraliza usuários/grupos/políticas para toda uma rede corporativa
    Domínio / DC / OU / GPO -> conceitos-chave do Active Directory
    Usuário local vs domínio -> escopo de reconhecimento e onde fica armazenado é a diferença central
```
