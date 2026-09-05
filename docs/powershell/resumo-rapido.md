# 📘 Anotações — Fundamentos de Windows + PowerShell

> Conceito curto + sintaxe + macete/pegadinha, pra copiar direto pro caderno.

---

## 1. Sistema de Arquivos e NTFS

- **Sistema de arquivos** = camada de software que organiza dados no disco bruto (nomes, pastas, metadados, localização). É um **conceito geral**.
- **NTFS** = a implementação específica da Microsoft desse conceito (equivalente ao ext4 no Linux).
- Windows organiza por **unidades** (`C:`, `D:`) — não existe raiz única como o `/` do Linux.

!!! tip "Macete" 
  
    Apagar um arquivo é rápido porque só remove o registro de metadados e libera o bloco — não apaga o conteúdo na hora. É por isso que dá pra recuperar arquivo "apagado" recente com ferramenta especializada.

**Permissões NTFS (ACL, não `rwx`):**

| Permissão | Efeito |
| --- | --- |
| Leitura | ver conteúdo |
| Gravação | modificar |
| Leitura e Execução | ler + rodar programas |
| Modificar | ler + gravar + apagar |
| Controle Total | tudo, inclusive mudar permissão de outros |

!!! warning "PEGADINHA 01 — Deny sempre vence:"
  
    Se o usuário está em vários grupos e **um único grupo** tem um Deny explícito numa permissão, esse Deny bloqueia o acesso — mesmo que outros grupos dele tenham Allow. Não é "soma" de permissões.

!!! warning "PEGADINHA 02 — Compartilhamento (Share) x NTFS são camadas diferentes:"

    Quando uma pasta é compartilhada na rede, existem dois níveis de permissão rodando ao mesmo tempo (Share + NTFS). **A mais restritiva sempre vence.**

> Ex.: Share = Controle Total, NTFS = Leitura → resultado final pela rede = Leitura.

- **Herança:** subpasta nova herda permissão da pasta pai por padrão.
- Ver permissões: botão direito → Propriedades → aba **Segurança**.

---

## 2. Serviços do Windows e Gerenciador de Tarefas

- **Serviço** = programa que roda em segundo plano, sem interface, independente de usuário logado. Equivalente a **daemon** (Linux) ou *unit* do systemd.
- Console: `services.msc`

| Tipo de inicialização | Comportamento |
| --- | --- |
| Automático | inicia com o Windows |
| Automático (Atrasado) | inicia um pouco depois do boot |
| Manual | só inicia quando solicitado |
| Desabilitado | não inicia nem manualmente |

**PowerShell (padrão Verbo-Substantivo, já aparece aqui):**

```powershell
Get-Service                    # lista/consulta serviços
Get-Service -Name "Spooler"
Start-Service -Name "Spooler"
Stop-Service -Name "Spooler"
Restart-Service -Name "Spooler"
```

**Macete:** Gerenciador de Tarefas (`Ctrl+Shift+Esc`) ≠ `services.msc`. O Gerenciador mostra tudo em tempo real (processos, desempenho, inicialização, usuários) — é mais parecido com `htop`/`ps` do Linux. `services.msc` é só sobre serviços configurados.

**Matar processo travado:**

```powershell
Get-Process -Name "nome_do_processo"
Stop-Process -Name "nome_do_processo"    # equivalente ao "Finalizar Tarefa" / kill
```

---

## 3. Usuários, Grupos e Active Directory

- **Usuário local** = só existe naquela máquina. Gerenciar: `lusrmgr.msc` ou:
  
  ```powershell
  Get-LocalUser
  New-LocalUser -Name "tecnico" -NoPassword
  ```
  
- **Grupo local** = coleção de usuários pra dar permissão em massa.
  
  ```powershell
  Get-LocalGroup
  Get-LocalGroupMember -Group "Administradores"
  Add-LocalGroupMember -Group "Administradores" -Member "tecnico"
  ```
  

**Problema que o AD resolve:** sem centralização, trocar senha de 1 funcionário = mexer em cada máquina que ele usa, uma por uma. Não escala.

**Active Directory — conceitos-chave:**

| Conceito | O que é |
| --- | --- |
| Domínio | conjunto de máquinas/usuários/recursos gerenciados centralmente |
| Controlador de Domínio (DC) | servidor que hospeda o banco do AD |
| Usuário de domínio | reconhecido em **qualquer** máquina do domínio |
| OU (Unidade Organizacional) | organização hierárquica pra aplicar políticas |
| GPO | conjunto de configurações aplicadas automaticamente (ex.: bloqueio de tela) |

**Macete de prova/entrevista:** a diferença central usuário local x domínio é **onde fica armazenado** (SAM local x banco do AD) e **onde é reconhecido** (só ali x rede inteira).

**Boa prática:** mesmo numa máquina de domínio, mantenha a conta local de Administrador com senha forte, só pra emergência/recuperação — uso do dia a dia é via conta de domínio.

---

## 4. Rede Básica no Windows

```powershell
ipconfig                # resumo: IP, máscara, gateway
ipconfig /all            # completo: MAC, DNS, DHCP
ipconfig /release        # libera IP atual
ipconfig /renew          # pede novo IP ao DHCP
```

!!! tip "Macete:"

     `/release` + `/renew` é o primeiro passo clássico quando a máquina perde rede sem motivo aparente.

**Adaptadores:**

```powershell
Get-NetAdapter
Get-NetIPConfiguration        # versão moderna do ipconfig
Disable-NetAdapter -Name "Ethernet"
Enable-NetAdapter -Name "Ethernet"
```

**DNS:**

```powershell
nslookup google.com          # nome -> IP
ipconfig /displaydns          # mostra cache DNS
ipconfig /flushdns             # limpa cache (site mudou de IP e ainda pega o antigo)
```

**Diagnóstico:**

```powershell
ping 8.8.8.8          # testa só conectividade
ping google.com       # testa conectividade + DNS
tracert google.com    # mostra o caminho até o destino
```

!!! warning "PEGADINHA 03 - macete de diagnóstico mais importante do módulo:"

    > Se `ping 8.8.8.8` funciona mas `ping google.com` falha → o problema é **DNS**, não a rede em si.

Guardar esse raciocínio — é clássico de suporte/N1.

---

## 5. Checklist de diagnóstico (Windows)

- [ ] Sei checar status de um serviço pela GUI (`services.msc`) e pelo terminal (`Get-Service`).
- [ ] Sei explicar de cabeça a diferença entre inicialização **Manual** e **Automático**.
- [ ] Sei distinguir se uma pasta inacessível é problema de permissão **NTFS**, de **compartilhamento**, ou dos dois.
- [ ] Sei usar `icacls` pra ver/conceder/remover permissão via terminal:
  
  ```powershell
  icacls "C:\caminho"
  icacls "C:\caminho" /grant usuario:R
  icacls "C:\caminho" /remove usuario
  ```
  

---

## 6. O Que É o PowerShell

**A diferença mais importante do módulo inteiro:**

|     | CMD / Bash | PowerShell |
| --- | --- | --- |
| O que passa no pipe | **texto puro** | **objetos estruturados** (.NET) |
| Como filtrar | recortar texto (`grep`, `awk`) | acessar propriedade direto (`Where-Object`) |
| Risco de quebrar | alto (formato do texto muda → script quebra) | baixo (propriedade continua existindo) |

```powershell
Get-ChildItem | Where-Object { $_.Length -gt 1024 }
```

Aqui `Length` já é um dado estruturado do objeto — não precisa "cortar texto" pra achar o tamanho do arquivo.

!!! tip "Macete de entendimento:" 

    Não é "PowerShell é melhor que Bash". São filosofias diferentes — Bash brilha em texto (mundo Unix), PowerShell brilha em objetos (mundo Windows/.NET, AD, serviços).

- **Windows PowerShell** = versão antiga, só Windows.
- **PowerShell 7+ (Core)** = moderno, multiplataforma, open source.

---

## 7. Variáveis, Tipos e Operadores

```powershell
$nome = "Servidor01"      # tipagem dinâmica, sempre começa com $
[int]$porta = 8080         # forçar tipo específico
$nome.GetType()             # ver o tipo
```

!!! warning "PEGADINHA 04 — aspas simples x duplas:"

    ```powershell
    Write-Host "O nome é $nome"    # interpola -> mostra o valor
    Write-Host 'O nome é $nome'    # mostra literalmente "$nome", sem interpolar
    ```

Regra: aspas **duplas** interpolam, aspas **simples** são texto literal puro.

!!! warning "PEGADINHA 05 — comparação não usa `==` nem `>`:"

    No PowerShell `<` e `>` já são redirecionamento (herança de shell), então comparação usa prefixo `-`:

| Operador | Significado |
| --- | --- |
| `-eq` | igual |
| `-ne` | diferente |
| `-gt` / `-lt` | maior / menor |
| `-ge` / `-le` | maior-igual / menor-igual |
| `-and` `-or` `-not` | lógicos |
| `-like` | padrão com curinga (`*`, `?`) — tipo `LIKE` do SQL |
| `-match` | regex |
| `-contains` | coleção contém o valor? |

```powershell
$nome -like "Servidor*"
@("web01","web02","db01") -contains "db01"   # true
```

---

## 8. Condicionais e Loops

```powershell
if ($porta -eq 80) { ... }
elseif ($porta -eq 8080) { ... }
else { ... }
```

**`switch`** = melhor que `elseif` em cadeia quando há muitas comparações pra mesma variável:

```powershell
switch ($status) {
    "Em execução" { Write-Host "Tudo certo" }
    "Parado"      { Write-Host "Precisa iniciar" }
    default       { Write-Host "Desconhecido" }
}
```

`switch -Wildcard` aceita curinga (`"web*"`) — dá pra classificar por prefixo do nome.

**Tabela de qual loop usar (decoreba útil):**

| Estrutura | Quando usar |
| --- | --- |
| `for` | contador numérico, quantidade conhecida |
| `foreach` | percorrer cada item de uma coleção — **o mais usado no dia a dia** |
| `while` | repete enquanto condição for verdadeira, quantidade não conhecida |
| `do-while` | igual `while`, mas roda **pelo menos 1 vez** sempre |

```powershell
foreach ($servidor in $servidores) {
    Write-Host "Verificando: $servidor"
}
```

!!! warning "PEGADINHA clássica:"

     `while` sem incrementar a variável de controle dentro do loop = **loop infinito**. Sempre conferir se a condição realmente muda a cada volta.

`break` = sai do loop todo. `continue` = pula só a iteração atual e segue.

---

## 9. Arrays e Hash Tables

**Array** = lista ordenada, acessa por índice (começa em **0**):

```powershell
$servidores = @("web01", "web02", "db01")
$servidores[0]     # "web01"
$servidores[-1]    # "db01" (índice negativo = a partir do fim)
$servidores.Count
$servidores += "web03"
```

**Nota técnica pra guardar:** array no PowerShell tem tamanho fixo — `+=` na real **recria o array inteiro**. Se for crescer uma lista com frequência dentro de loop, usar `ArrayList`/`List` do .NET em vez de array puro.

**Hash Table** = pares chave-valor, acessa por **nome**, não por posição:

```powershell
$servidor = @{ Nome = "web01"; IP = "192.168.1.10"; Porta = 8080 }
$servidor["Nome"]      # ou $servidor.Nome
$servidor["Ativo"] = $true      # adiciona
$servidor.Remove("IP")           # remove
```

**Quando usar qual:**

| Cenário | Estrutura |
| --- | --- |
| Lista simples do mesmo tipo (nomes de servidor) | Array |
| Dados relacionados de 1 item (nome+IP+porta) | Hash Table |
| Lista de itens, cada um com vários atributos | Array de Hash Tables |

!!! tip "Macete — combinação mais usada em script real:"

    ```powershell
    $servidores = @(
        @{ Nome = "web01"; IP = "192.168.1.10"; Status = "Em execução" },
        @{ Nome = "db01";  IP = "192.168.1.20"; Status = "Parado" }
    )
    foreach ($s in $servidores) {
        Write-Host "$($s.Nome) ($($s.IP)) está $($s.Status)"
    }
    ```

---

## 10. Cmdlets e a Convenção Verbo-Substantivo

**A sacada mais útil do módulo pra decorar comando:** todo cmdlet é `Verbo-Substantivo` (singular). Aprendendo os verbos, dá pra **adivinhar** o comando sem decorar cada um.

| Verbo | Ação |
| --- | --- |
| `Get` | consultar (não altera nada) |
| `Set` | alterar configuração existente |
| `New` | criar |
| `Remove` | excluir |
| `Start` / `Stop` / `Restart` | controlar processo/serviço |
| `Enable` / `Disable` | habilitar/desabilitar |
| `Test` | verificar condição (retorna true/false) |
| `Import` / `Export` | trocar dados com fonte externa |

```powershell
Get-Command                    # lista tudo
Get-Command -Verb Get           # só os "Get-"
Get-Command -Noun Service        # tudo relacionado a "Service"

Get-Help Get-Process -Examples   # exemplos de uso
Get-Help Get-Process -Full        # documentação completa
```

**Boa prática — aliases só no dia a dia, nunca em script salvo:**

```powershell
ls    # = Get-ChildItem
dir   # = Get-ChildItem
cd    # = Set-Location
cat   # = Get-Content
```

Em script pra guardar/reusar, sempre escrever o nome completo (`Get-ChildItem`) — mais legível e não depende do alias existir em todo ambiente.

---

## Checklist de fluência (PowerShell)

- [ ] Consigo declarar variável, usar interpolação certa (aspas duplas) sem pensar.
- [ ] Sei todos os operadores de comparação (`-eq`, `-gt`...) sem confundir com `==`/`>`.
- [ ] Sei escolher entre `for`, `foreach`, `while` e justificar a escolha em voz alta.
- [ ] Sei diferenciar Array de Hash Table na hora de montar uma estrutura de dados.
- [ ] Consigo adivinhar o nome de um cmdlet pela lógica Verbo-Substantivo.
- [ ] Escrevo um script novo (loop + condicional) sem copiar de exemplo.

---

## Próximos assuntos (depois deste módulo)

**Windows:**

1. Firewall do Windows (`wf.msc`, `Get-NetFirewallRule`).
2. Event Viewer (`eventvwr.msc`) — equivalente ao `journalctl`/`dmesg` do Linux.

**PowerShell:**

1. Funções (`function Nome-Funcao { ... }`), parâmetros e retorno.
2. Manipulação de arquivos (`Get-ChildItem`, `Get-Content`, `Export-Csv`).
3. Tratamento de erros (`try`/`catch`/`finally`).
4. Módulo `ActiveDirectory` via PowerShell.