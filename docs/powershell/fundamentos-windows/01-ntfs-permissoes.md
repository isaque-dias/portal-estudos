# Sistema de Arquivos e Permissões NTFS

> Parte 1 de 5 — Módulo "Fundamentos de Windows para PowerShell". Cobre o conceito geral de sistema de arquivos, o sistema de arquivos NTFS e seu modelo de permissões.

---

## 1. O Que É um Sistema de Arquivos

### 1.1 O problema que um sistema de arquivos resolve

Um disco (HDD ou SSD), fisicamente, é só uma grande sequência de espaços onde é possível gravar dados binários — não existe, no hardware em si, o conceito de "pasta" ou "arquivo chamado foto.jpg". Se cada programa gravasse dados diretamente nesse espaço bruto, do seu próprio jeito, seria impossível para outro programa (ou para o próprio usuário) saber onde um arquivo começa, onde termina, qual é o nome dele, ou sequer que ele existe.

Um **sistema de arquivos (filesystem)** é a camada de software, geralmente parte do sistema operacional, que resolve esse problema: ele define **como os dados são organizados, nomeados, localizados e recuperados** dentro do espaço bruto de um disco. É a "linguagem comum" que transforma uma sequência de bits em algo que faz sentido para humanos e programas — pastas, arquivos, nomes, tamanhos, datas.

### 1.2 O que um sistema de arquivos precisa controlar

Independentemente do sistema operacional ou da implementação específica, todo sistema de arquivos precisa resolver os mesmos problemas básicos:

| Responsabilidade   | O que envolve                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Estrutura de nomes | Permitir organizar dados em pastas/diretórios, com nomes legíveis para humanos                                     |
| Alocação de espaço | Decidir em quais blocos físicos do disco cada arquivo é gravado, e controlar quais blocos estão livres ou ocupados |
| Metadados          | Guardar informações sobre cada arquivo: tamanho, datas de criação/modificação, dono, permissões                    |
| Localização        | Permitir encontrar rapidamente onde um arquivo específico está gravado, sem precisar varrer o disco inteiro        |
| Integridade        | Manter a consistência dos dados mesmo diante de falhas, como quedas de energia durante uma gravação                |

### 1.3 Por que existem vários sistemas de arquivos diferentes

Assim como existem várias distros Linux ou vários shells, existem vários sistemas de arquivos, porque cada um faz escolhas de design diferentes — mais desempenho, mais segurança, compatibilidade com sistemas antigos, suporte a discos muito grandes, etc. Alguns exemplos, para dar noção de que esse é um conceito mais amplo do que "o sistema de arquivos do Windows":

| Sistema de arquivos | Usado principalmente em                                       |
| ------------------- | ------------------------------------------------------------- |
| NTFS                | Windows (padrão desde o Windows NT)                           |
| FAT32 / exFAT       | Pendrives, cartões de memória, compatibilidade entre sistemas |
| ext4, Btrfs, XFS    | Linux                                                         |
| APFS                | macOS                                                         |

Ou seja: **"sistema de arquivos" é o conceito geral** (a categoria); **NTFS é uma implementação específica** desse conceito, criada e mantida pela Microsoft para o Windows — da mesma forma que "linguagem de programação" é o conceito geral e "Python" é uma implementação específica dele.

### 1.4 O que acontece, na prática, quando um arquivo é salvo

Para tornar o conceito mais concreto, um resumo simplificado do que o sistema de arquivos faz nos bastidores ao salvar um arquivo novo:

1. Localiza blocos livres no disco, com espaço suficiente para o conteúdo.
2. Grava o conteúdo real do arquivo nesses blocos.
3. Cria um registro de **metadados** (nome, tamanho, data, localização dos blocos usados) em uma estrutura de controle própria do sistema de arquivos.
4. Atualiza a estrutura de diretórios, para que aquele nome de arquivo apareça na pasta correspondente.

Isso explica, por exemplo, por que apagar um arquivo costuma ser muito mais rápido do que copiá-lo: apagar, na maioria dos sistemas de arquivos, só remove o registro de metadados e marca os blocos como livres novamente — sem necessariamente sobrescrever o conteúdo antigo de imediato (o que também é parte do motivo pelo qual, tecnicamente, é possível recuperar arquivos "apagados" recentemente com ferramentas especializadas).

---

## 2. Sistema de Arquivos e Permissões NTFS

### 2.1 O que é o NTFS

**NTFS (New Technology File System)** é o sistema de arquivos padrão do Windows desde o Windows NT, usado hoje em praticamente toda instalação moderna (o antigo FAT32 sobrevive principalmente em pendrives e cartões de memória, por compatibilidade). Assim como o ext4 organiza dados no Linux, o NTFS define como arquivos e pastas são armazenados, indexados e protegidos no disco.

Diferente do Linux, onde tudo existe sob uma única raiz (`/`), o Windows organiza o sistema de arquivos em **unidades** separadas por letra (`C:`, `D:`), cada uma podendo ter seu próprio sistema de arquivos.

### 2.2 O modelo de permissões NTFS

O NTFS usa um modelo bem diferente do `rwx` do Linux: em vez de três categorias fixas (dono/grupo/outros), o NTFS usa **ACLs (Access Control Lists)** — listas onde é possível conceder permissões específicas para qualquer combinação de usuários e grupos, individualmente.

Permissões básicas mais comuns no NTFS:

| Permissão                           | Efeito                                                               |
| ----------------------------------- | -------------------------------------------------------------------- |
| Leitura (Read)                      | Ver o conteúdo do arquivo/pasta                                      |
| Gravação (Write)                    | Modificar o conteúdo                                                 |
| Leitura e Execução (Read & Execute) | Ler e executar arquivos de programa                                  |
| Modificar (Modify)                  | Ler, gravar e apagar                                                 |
| Controle Total (Full Control)       | Todas as permissões, incluindo alterar permissões de outros usuários |

Cada uma dessas permissões pode ser concedida (Allow) ou explicitamente negada (Deny) para qualquer usuário ou grupo específico — o que dá bem mais granularidade do que o modelo de três categorias do Linux, mas também torna mais fácil configurações inconsistentes se não houver organização.

### 2.3 Herança de permissões

Por padrão, uma pasta nova **herda** as permissões da pasta pai. Isso significa que, ao criar uma subpasta, ela normalmente já nasce com as mesmas permissões da pasta onde foi criada, a menos que a herança seja explicitamente quebrada.

### 2.4 Regra de precedência: Deny sempre vence

Quando um usuário pertence a múltiplos grupos com permissões conflitantes sobre o mesmo recurso, a regra do NTFS é: **uma negação explícita (Deny) sempre tem prioridade sobre qualquer permissão concedida (Allow)**, não importa de qual grupo ela venha. Isso é diferente do comportamento intuitivo de "soma de permissões" — um único Deny em qualquer grupo do usuário bloqueia o acesso, mesmo que outros grupos concedam Allow.

### 2.5 Verificando permissões pela GUI

No Explorador de Arquivos: botão direito no arquivo/pasta → **Propriedades** → aba **Segurança**. Ali aparece a lista de usuários/grupos com permissões configuradas, e é possível editar através do botão **Editar** ou acessar configurações mais avançadas em **Avançado**.

### 2.6 Permissões de compartilhamento vs permissões NTFS

Um ponto que gera confusão: quando uma pasta é **compartilhada na rede**, existem **dois níveis de permissão diferentes** sendo aplicados ao mesmo tempo:

- **Permissões de compartilhamento (Share)**: controlam o acesso via rede especificamente.
- **Permissões NTFS**: controlam o acesso ao arquivo no disco, independente de como ele foi acessado (localmente ou pela rede).

Quando os dois níveis existem, **a permissão mais restritiva prevalece**. Por exemplo, se o compartilhamento permite Controle Total, mas o NTFS permite apenas Leitura, o resultado final de acesso pela rede é Leitura.

---

## Resumo mental

```
Sistema de arquivos -> camada de software que organiza dados em um disco bruto (nomes, pastas, metadados, localização)
NTFS -> uma implementação específica de sistema de arquivos, padrão do Windows; permissões via ACL (não rwx)
Herança -> subpasta nova herda permissões da pasta pai, por padrão
Deny sempre vence -> uma negação em qualquer grupo bloqueia o acesso, mesmo com Allow em outro grupo
Compartilhamento + NTFS -> a permissão mais restritiva entre os dois níveis prevalece
```
