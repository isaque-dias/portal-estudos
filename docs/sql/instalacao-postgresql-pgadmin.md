---
description: Guia prático de instalação e configuração do PostgreSQL e pgAdmin no Windows 11 e Linux, incluindo criação de usuários.
---

# Guia de Instalação e Configuração: PostgreSQL + pgAdmin (Linux e Windows 11)

> Guia prático cobrindo instalação do PostgreSQL e do pgAdmin no Windows 11 e em distros Linux baseadas em Debian/Ubuntu, criação de um usuário comum, criação de um usuário administrador (evitando o uso do usuário padrão `postgres` no dia a dia), e dicas adicionais de configuração.

---

## 1. Visão Geral

### 1.1 O que cada ferramenta faz

- **PostgreSQL**: o SGBD em si — o motor que armazena, processa e responde às consultas. Roda como um **serviço/processo em segundo plano**, escutando por conexões (porta padrão `5432`).
- **pgAdmin**: uma interface gráfica (cliente) para se conectar ao PostgreSQL, gerenciar bancos, tabelas, usuários e executar consultas sem depender exclusivamente da linha de comando.

**Ponto importante**: pgAdmin não é o banco de dados — é apenas um cliente. É perfeitamente possível ter o PostgreSQL rodando em um servidor Linux sem interface gráfica nenhuma, e usar o pgAdmin de outra máquina (inclusive Windows) para se conectar remotamente a ele.

### 1.2 Sobre o usuário `postgres`

Toda instalação do PostgreSQL cria, por padrão, um **superusuário** chamado `postgres` — equivalente ao `root` do Linux ou ao Administrador do Windows, mas dentro do banco de dados. Usar esse usuário para todo o trabalho do dia a dia não é uma boa prática, pelos mesmos motivos que não se usa `root` para tarefas comuns no Linux: qualquer erro de comando tem alcance total sobre o banco inteiro. Este guia mostra como criar tanto um usuário comum (permissões limitadas a um banco específico) quanto um segundo superusuário administrativo nomeado, para não depender do `postgres` original.

---

## 2. Instalação no Windows 11

### 2.1 Baixando o instalador

1. Acessar o site oficial: `https://www.postgresql.org/download/windows/`.
2. Selecionar o instalador mantido pela EDB (Enterprise DB), que é a distribuição oficial recomendada para Windows.
3. Escolher a versão mais recente estável do PostgreSQL disponível.

### 2.2 Executando o instalador

O instalador do Windows já inclui o PostgreSQL, o pgAdmin, o Stack Builder (ferramenta adicional de extensões) e as bibliotecas de linha de comando, tudo em um único pacote. Durante a instalação:

1. **Diretório de instalação**: o padrão sugerido geralmente é adequado (`C:\Program Files\PostgreSQL\<versão>`).
2. **Seleção de componentes**: manter marcados PostgreSQL Server, pgAdmin 4, Stack Builder e Command Line Tools.
3. **Diretório de dados**: onde os arquivos do banco de dados serão fisicamente armazenados — o padrão também costuma ser adequado, a menos que haja necessidade específica de usar outro disco.
4. **Senha do superusuário `postgres`**: o instalador solicita a definição de uma senha para esse usuário administrativo padrão. Deve ser uma senha forte, guardada em local seguro — ela será necessária para a configuração inicial.
5. **Porta**: `5432` é o padrão, e deve ser mantida a menos que já exista outro serviço usando essa porta na máquina.
6. **Locale**: pode ser mantido o padrão do sistema, ou selecionado explicitamente `Portuguese, Brazil` se for relevante para ordenação de texto e formatação regional dentro do banco.

### 2.3 Verificando se o serviço está rodando

Após a instalação, o PostgreSQL é registrado como um **serviço do Windows** (retomando o conceito visto no guia de fundamentos de Windows), iniciado automaticamente.

```powershell
Get-Service -Name "postgresql*"      # verifica o status do serviço do PostgreSQL
```

Também é possível conferir pelo `services.msc`, procurando por um serviço com nome parecido com `postgresql-x64-<versão>`.

### 2.4 Abrindo o pgAdmin pela primeira vez

O pgAdmin é instalado como um atalho no menu Iniciar. Ao abrir pela primeira vez, ele solicita a criação de uma **senha mestra** (master password) — diferente da senha do PostgreSQL, essa senha protege o próprio pgAdmin localmente, já que ele guarda as credenciais salvas de conexão.

Depois de aberto, o pgAdmin já detecta automaticamente o servidor local instalado (geralmente listado como "PostgreSQL 
<versão>" na árvore à esquerda) — basta clicar nele e informar a senha do usuário `postgres` definida durante a instalação para conectar.

---

## 3. Instalação no Linux (Debian/Ubuntu)

### 3.1 Instalando o PostgreSQL via `apt`

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

O pacote `postgresql-contrib` inclui extensões adicionais úteis, comumente instaladas junto por padrão.

### 3.2 Verificando a instalação

No Linux, o PostgreSQL é gerenciado como um serviço do systemd (retomando o conceito visto no guia de conceitos do Linux):

```bash
sudo systemctl status postgresql     # verifica se o serviço está ativo
sudo systemctl enable postgresql     # garante que o serviço suba automaticamente no boot
sudo systemctl start postgresql      # inicia o serviço, caso não esteja rodando
```

### 3.3 O usuário `postgres` no Linux

Diferente do Windows, no Linux a instalação do PostgreSQL também cria um **usuário do sistema operacional** chamado `postgres` (separado do usuário do banco de dados de mesmo nome, embora relacionado). Esse usuário do sistema é usado, por padrão, para autenticação local sem senha:

```bash
sudo -i -u postgres      # troca para o usuário de sistema "postgres"
psql                      # abre o terminal interativo do PostgreSQL, já autenticado como esse usuário
```

Ou, em uma única linha:

```bash
sudo -u postgres psql
```

### 3.4 Instalando o pgAdmin no Linux

O pgAdmin no Linux pode ser instalado via repositório oficial dedicado, já que não costuma vir empacotado nos repositórios padrão da distro com a versão mais atualizada:

```bash
# Instala pré-requisitos e a chave do repositório oficial do pgAdmin
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg

# Adiciona o repositório
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'

sudo apt update

# Modo Desktop (aplicativo gráfico local) ou Web (acessado via navegador) — ou ambos
sudo apt install pgadmin4-desktop     # versão como aplicativo de janela
sudo apt install pgadmin4-web         # versão acessada via navegador (útil em servidores sem interface gráfica)
```

**Diferença entre os dois modos**: o modo Desktop abre como um aplicativo de janela comum, próprio para uso em uma máquina com interface gráfica. O modo Web instala o pgAdmin como uma aplicação servida via navegador (geralmente configurada com Apache) — mais adequado quando o PostgreSQL está em um servidor sem interface gráfica, permitindo gerenciar remotamente pelo navegador de outra máquina.

### 3.5 Configuração inicial do modo Web (se optar por essa opção)

```bash
sudo /usr/pgadmin4/bin/setup-web.sh
```

Esse script solicita a criação de um e-mail e senha de acesso ao próprio pgAdmin (separados das credenciais do PostgreSQL), e finaliza informando a URL local onde a interface fica disponível (geralmente `http://localhost/pgadmin4`).

---

## 4. Criando um Usuário Comum

### 4.1 Conceito: Roles no PostgreSQL

No PostgreSQL, tanto "usuários" quanto "grupos" são tecnicamente chamados de **roles** — uma role pode ter permissão de login (comportando-se como um usuário) ou não (comportando-se como um grupo que outras roles podem herdar). Um usuário comum, no dia a dia, é simplesmente uma role com permissão de login e privilégios limitados a bancos/tabelas específicos.

### 4.2 Criando um usuário comum via `psql`

```bash
sudo -u postgres psql     # no Linux, entra no terminal interativo como postgres
```

No Windows, o equivalente é abrir o **SQL Shell (psql)** instalado junto com o PostgreSQL (disponível no menu Iniciar), que solicita usuário, senha e porta interativamente.

Dentro do `psql`:

```sql
-- Cria um novo usuário (role com permissão de login) com senha
CREATE USER tecnico WITH PASSWORD 'senha_forte_aqui';

-- Cria um banco de dados específico para esse usuário utilizar
CREATE DATABASE meubanco OWNER tecnico;

-- Concede todos os privilégios sobre esse banco específico ao usuário
GRANT ALL PRIVILEGES ON DATABASE meubanco TO tecnico;
```

### 4.3 Testando a conexão com o novo usuário

```bash
psql -U tecnico -d meubanco -h localhost -W
```

| Parâmetro | Significado |
| --- | --- |
| `-U` | Usuário de conexão |
| `-d` | Banco de dados a conectar |
| `-h` | Host (endereço do servidor PostgreSQL) |
| `-W` | Força a solicitação de senha |

### 4.4 Criando o mesmo usuário pelo pgAdmin (via GUI)

1. Conectar ao servidor PostgreSQL no pgAdmin (usando as credenciais do `postgres` inicialmente).
2. Na árvore à esquerda, expandir o servidor → botão direito em **Login/Group Roles** → **Create** → **Login/Group Role**.
3. Na aba **General**, definir o nome da role (ex.: `tecnico`).
4. Na aba **Definition**, definir a senha.
5. Na aba **Privileges**, garantir que "Can login?" esteja habilitado (é o que diferencia um usuário de um grupo).
6. Salvar, e depois criar/associar o banco de dados correspondente da mesma forma que pela linha de comando.

---

## 5. Criando um Usuário Administrador (Evitando Usar o `postgres` Padrão)

### 5.1 Por que criar um segundo superusuário

Manter o uso administrativo do dia a dia sob um usuário **nomeado e identificável** (em vez do `postgres` genérico) segue a mesma lógica de boas práticas já vista no card sobre AD: rastreabilidade (saber quem fez o quê) e redução do risco de erros amplos por engano no usuário mais poderoso do sistema. O usuário `postgres` original pode ficar reservado para tarefas de recuperação e configuração inicial, semelhante ao papel do `root` local mencionado no guia de Active Directory.

### 5.2 Criando um novo superusuário

```sql
CREATE USER admin_ti WITH PASSWORD 'senha_bem_forte_aqui' SUPERUSER;
```

A cláusula `SUPERUSER` concede a esse novo usuário exatamente os mesmos privilégios totais do `postgres` original — capacidade de criar/apagar qualquer banco, qualquer usuário, e ignorar qualquer restrição de permissão.

### 5.3 Alternativa mais granular: privilégios administrativos sem `SUPERUSER` total

Em muitos cenários reais, não é necessário conceder superusuário completo — apenas privilégios administrativos específicos, como criar bancos e criar outros usuários, sem o acesso irrestrito de um superusuário:

```sql
CREATE USER admin_ti WITH PASSWORD 'senha_bem_forte_aqui' CREATEDB CREATEROLE;
```

| Cláusula | Permite |
| --- | --- |
| `SUPERUSER` | Controle total, sem exceções — equivalente ao `postgres` |
| `CREATEDB` | Criar novos bancos de dados |
| `CREATEROLE` | Criar e gerenciar outras roles/usuários |
| `LOGIN` | Permite login (incluído por padrão ao usar `CREATE USER`; opcional em `CREATE ROLE`) |

**Recomendação de boa prática**: preferir `CREATEDB` + `CREATEROLE` em vez de `SUPERUSER` sempre que o objetivo for apenas administrar bancos e usuários — reservando `SUPERUSER` só para quando houver necessidade real de contornar qualquer restrição de segurança do sistema (algo raro no dia a dia operacional).

### 5.4 Verificando os privilégios de uma role existente

```sql
\du                     -- lista todas as roles e seus atributos (dentro do psql)
```

Ou, de forma mais estruturada:

```sql
SELECT rolname, rolsuper, rolcreatedb, rolcreaterole
FROM pg_roles;
```

### 5.5 Alterando privilégios de um usuário já existente

```sql
ALTER USER tecnico WITH CREATEDB;         -- concede permissão adicional
ALTER USER admin_ti WITH NOSUPERUSER;      -- remove o privilégio de superusuário, se necessário revogar depois
```

---

## 6. Dicas Adicionais

### 6.1 Autenticação: entendendo o `pg_hba.conf`

O arquivo `pg_hba.conf` controla **quem pode se conectar, de onde, e com qual método de autenticação** — é uma camada de controle separada das permissões internas de cada usuário.

Localização típica:

| Sistema | Caminho comum |
| --- | --- |
| Linux | `/etc/postgresql/<versão>/main/pg_hba.conf` |
| Windows | `C:\Program Files\PostgreSQL\<versão>\data\pg_hba.conf` |

Métodos de autenticação mais comuns encontrados nesse arquivo:

| Método | Comportamento |
| --- | --- |
| `trust` | Permite conexão sem senha (apropriado apenas em ambiente de estudo/local, nunca em produção) |
| `md5` / `scram-sha-256` | Exige senha, com hash criptográfico (`scram-sha-256` é o mais moderno e recomendado) |
| `peer` | No Linux, autentica com base no usuário do sistema operacional logado, sem senha |

Após qualquer alteração nesse arquivo, é necessário recarregar a configuração:

```bash
sudo systemctl reload postgresql        # Linux
```

No Windows, reiniciar o serviço pelo `services.msc` ou via `Restart-Service`.

### 6.2 Alterando a porta padrão

Embora `5432` seja o padrão, é possível alterar a porta no arquivo `postgresql.conf` (mesmo diretório do `pg_hba.conf`), útil quando múltiplas instâncias do PostgreSQL rodam na mesma máquina, ou por preferência de segurança por obscuridade.

### 6.3 Acessando de outra máquina na rede

Por padrão, o PostgreSQL só aceita conexões locais. Para permitir acesso remoto:

1. No `postgresql.conf`, alterar `listen_addresses = 'localhost'` para `listen_addresses = '*'` (ou um IP específico).
2. No `pg_hba.conf`, adicionar uma linha permitindo o IP/faixa de rede desejada.
3. Reiniciar o serviço.
4. Garantir que a porta `5432` esteja liberada no firewall (Firewall do Windows, ou `ufw`/`iptables` no Linux).

### 6.4 Backup rápido de um banco

```bash
pg_dump -U tecnico meubanco > backup_meubanco.sql      # gera um backup em formato texto SQL
psql -U tecnico meubanco < backup_meubanco.sql          # restaura a partir desse backup
```

### 6.5 Conectando o pgAdmin a um servidor remoto

Ao registrar um novo servidor no pgAdmin (botão direito em **Servers** → **Register** → **Server**), a aba **Connection** aceita qualquer IP acessível, não apenas `localhost` — permitindo, por exemplo, gerenciar pelo pgAdmin do Windows um PostgreSQL instalado em uma VM Linux (conectando com o conceito já visto no card de rede de VM: o modo **Bridge** facilita esse cenário, já que a VM fica visível como um dispositivo próprio na rede).

### 6.6 Ferramenta de linha de comando alternativa: `psql` direto, sem pgAdmin

Vale lembrar que tudo o que é feito pela GUI do pgAdmin também pode ser feito via `psql` — o pgAdmin é uma conveniência visual, não uma dependência técnica. Em servidores de produção sem interface gráfica, o `psql` via SSH costuma ser a única (e mais rápida) opção de administração direta.

### 6.7 Cuidado com senhas em texto plano no histórico do shell

Ao usar `psql` com senha diretamente na linha de comando ou em scripts, evitar deixá-la em texto plano no histórico do terminal — usar variáveis de ambiente (`PGPASSWORD`) ou o arquivo `.pgpass` (Linux/macOS) / `%APPDATA%\postgresql\pgpass.conf` (Windows) para armazenar credenciais de forma um pouco mais controlada em scripts de automação.

---

!!! resumo "Resumo Mental"

```
    PostgreSQL -> o SGBD (motor do banco); pgAdmin -> cliente gráfico para gerenciá-lo
    postgres (usuário) -> superusuário padrão; evitar uso diário, criar usuário nomeado específico

    Windows -> instalador único da EDB (PostgreSQL + pgAdmin + ferramentas), serviço gerenciado via services.msc
    Linux   -> apt install postgresql; pgAdmin via repositório oficial (modo Desktop ou Web); serviço via systemctl

    Usuário comum       -> CREATE USER nome WITH PASSWORD 'senha'; GRANT privilégios sobre um banco específico
    Usuário admin       -> CREATE USER nome WITH PASSWORD 'senha' SUPERUSER (ou CREATEDB + CREATEROLE, mais granular)

    pg_hba.conf      -> controla quem pode conectar, de onde, com qual método (trust/md5/scram-sha-256/peer)
    postgresql.conf  -> configurações gerais, incluindo porta e listen_addresses (acesso remoto)
    pg_dump/psql     -> backup e restauração via linha de comando
```