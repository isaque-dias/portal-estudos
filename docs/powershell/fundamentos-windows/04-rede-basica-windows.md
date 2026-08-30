# Rede Básica no Windows (ipconfig, Adaptadores, DNS)

> Parte 4 de 5 — Módulo "Fundamentos de Windows para PowerShell". Cobre configuração de rede via ipconfig, adaptadores de rede e DNS.

---

## 4. Rede Básica no Windows (`ipconfig`, Adaptadores, DNS)

### 4.1 `ipconfig` — Visualizando a configuração de rede

O comando `ipconfig`, disponível tanto no Prompt de Comando quanto no PowerShell, mostra a configuração de rede atual da máquina.

```powershell
ipconfig                # mostra um resumo: IP, máscara de sub-rede, gateway, por adaptador
ipconfig /all            # mostra informações completas: MAC address, servidores DNS, tipo de conexão, DHCP habilitado ou não
```

Saída resumida de exemplo:

```
Adaptador Ethernet:
   Endereço IPv4. . . . . . . . . . . . . : 192.168.1.45
   Máscara de Sub-rede . . . . . . . . . . : 255.255.255.0
   Gateway Padrão. . . . . . . . . . . . . : 192.168.1.1
```

### 4.2 Renovando e liberando um endereço IP (DHCP)

Quando a máquina obtém seu IP automaticamente via **DHCP**, dois comandos são úteis para forçar uma nova solicitação de endereço:

```powershell
ipconfig /release        # libera o endereço IP atual
ipconfig /renew          # solicita um novo endereço IP ao servidor DHCP
```

Esse par de comandos é o primeiro passo clássico de diagnóstico quando uma máquina perde conectividade de rede sem motivo aparente.

### 4.3 Adaptadores de rede

Um **adaptador de rede** representa uma interface de conexão — física (placa Ethernet, Wi-Fi) ou virtual (VPN, adaptador de uma VM). Uma mesma máquina pode ter múltiplos adaptadores simultaneamente, cada um com sua própria configuração.

Visualização pela GUI: **Painel de Controle → Central de Rede e Compartilhamento → Alterar configurações do adaptador**, ou de forma mais moderna em **Configurações → Rede e Internet**.

Pelo PowerShell:

```powershell
Get-NetAdapter                          # lista todos os adaptadores de rede e seu status
Get-NetIPConfiguration                  # mostra a configuração IP de cada adaptador (equivalente mais moderno ao ipconfig)
Disable-NetAdapter -Name "Ethernet"     # desabilita um adaptador específico
Enable-NetAdapter -Name "Ethernet"      # reabilita um adaptador específico
```

### 4.4 DNS no Windows

O **DNS (Domain Name System)** é o serviço responsável por traduzir nomes (como `google.com`) em endereços IP. A máquina Windows consulta os servidores DNS configurados (manualmente, ou recebidos automaticamente via DHCP) sempre que precisa resolver um nome.

```powershell
nslookup google.com                 # consulta manualmente qual IP corresponde a um domínio
ipconfig /displaydns                 # mostra o cache local de resoluções DNS já feitas
ipconfig /flushdns                   # limpa o cache DNS local — útil quando um site mudou de IP recentemente e a máquina ainda está usando um endereço antigo em cache
```

### 4.5 Testando conectividade básica

```powershell
ping 8.8.8.8              # testa se há conectividade até um IP específico (nesse caso, um servidor DNS público do Google)
ping google.com           # testa conectividade E resolução de nome ao mesmo tempo
tracert google.com        # mostra o caminho (saltos de rede) até o destino, útil para identificar em qual ponto a conexão está falhando
```

**Lógica de diagnóstico com esses dois testes combinados**: se `ping 8.8.8.8` funciona mas `ping google.com` falha, o problema provavelmente está na resolução DNS, não na conectividade de rede em si — essa é uma das distinções de diagnóstico mais úteis do dia a dia.

---

## Resumo mental

```
ipconfig -> mostra configuração de rede; /all traz detalhes completos
/release e /renew -> forçam nova solicitação DHCP
Adaptador de rede -> cada interface de conexão (física ou virtual)
DNS -> traduz nomes em IP; nslookup consulta manualmente; ipconfig /flushdns limpa cache
ping + tracert -> testam conectividade e o caminho até o destino
ping por IP funciona mas por nome falha -> problema é DNS, não conectividade
```
