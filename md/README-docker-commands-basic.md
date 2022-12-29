`k8s-docker-iac-labs/md/README-docker-commands-basic.md` - Kubernetes, Docker e Rancher Desktop - LAB-02 - Basic Commands using Docker on RanckerDesktop

## 1. Introdução

Este documento contém os artefatos dolaboratório **LAB-02 - Docker Commands using Docker on RanckerDesktop** abaixo do projeto [k8s-docker-iac-labs](../README.md). Este laboratório consiste em:
* Explorar os comandos básicos do _Docker_ no Rancher Desktop

##### Table of Contents  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.4. Diagrama de Mapa Mental (Mind Map Diagram)](#24-diagrama-de-mapa-mental-mind-map-diagram)
  * [2.9. Glossário de Termos (Glossary)](#29-glossário-de-termos-glossary)
- [3. Projeto](#3-projeto)
  * [3.1. Pré-Requisitos, Pré-Condições e Premissas](#31-pré-requisitos-pré-condições-e-premissas)
    + [a. Tecnologias e ferramentas](#a-tecnologias-e-ferramentas)
    + [b. Ferramental de apoio](#b-ferramental-de-apoio)
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
    + [a. Download do binário de uma imagem](#a-download-do-binário-de-uma-imagem)
    + [b. Executar um container baseado em uma imagem](#b-executar-um-container-baseado-em-uma-imagem)
    + [c. Listar os container](#c-listar-os-container)
    + [d. Remover um container](#d-remover-um-container)
    + [e. Executar um container em modo interativo](#e-executar-um-container-em-modo-interativo)
    + [f. Executar um container em modo deamon (background ou segundo plano)](#f-executar-um-container-em-modo-deamon-background-ou-segundo-plano)
    + [g. Executar um container passando variáveis de parâmetros](#g-executar-um-container-passando-variáveis-de-parâmetros)
    + [h. Inspecionar um container](#h-inspecionar-um-container)
    + [i. Executar um comando dentro do container opcionalmente de forma iterativa](#i-executar-um-comando-dentro-do-container-opcionalmente-de-forma-iterativa)
    + [j. Parar, reiniciar e remover a execução de um container](j-parar-reiniciar-e-remover-a-execução-de-um-container)
    + [k. Logs de execução de um container](k-logs-de-execução-de-um-container)

- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker.png) 



### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-basic-docker-commands.png) 


### 2.8. Notas de atenção e Avisos (Notice and information)

* n/a


### 2.9. Glossário de Termos (Glossary)

De uma forma geral, vamos tentar <ins>definir</ins> e <ins>caracterizar</ins> alguns dos termos utilizados neste projeto para permitir uma melhor compreensão e entendimento:

| Termo       | Significado                     |
| :---------- | :------------------------------ |
| `nerdctl`   | programa em linha de comando do Rancher Desktop que equivale ao comando `docker`. |


## 3. Projeto

### 3.1. Pré-Requisitos, Pré-Condições e Premissas

#### a. Tecnologias e ferramentas

* Windows OnPrimasse
* WSL - Windows Subsystem for Linux
* Rancher Desktop for Windows
* [LAB-02 Install WSL Rancher Desktop on Windows](README-install-wsl-rancherdesktop-windows.md) instalado, concluído e disponível

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)

### 3.5. Guia de Estudo

#### a. Download do binário de uma imagem

* baixar imagem para o local

```cmd
C:\> nerdctl image pull nginx
     :
C:\> nerdctl image pull alpine
     :
C:\> nerdctl image pull httpd
     :
C:\> nerdctl image pull hello-world
     :
```

* listar imagens

```cmd
C:\> nerdctl image ls
REPOSITORY     TAG       IMAGE ID        CREATED              PLATFORM       SIZE
alpine         latest    21a3deaa0d32    About an hour ago    linux/amd64    5.9 MiB
hello-world    latest    975f4b14f326    47 minutes ago       linux/amd64    20.0 KiB
httpd          latest    0954cc1af252    About an hour ago    linux/amd64    150.1 MiB
nginx          latest    0d17b565c37b    5 days ago           linux/amd64    149.1 MiB
ubuntu         latest    b5a61709a9a4    17 minutes ago       linux/amd64    77.9 MiB
```

#### b. Executar um container baseado em uma imagem

* executar container (baixar se necessário)

```cmd
C:\> nerdctl container run hello-world
        :
For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

#### c. Listar os container 

* listar containers em execução: resultado esperado nenhum em execução

```cmd
C:\> nerdctl container ls
CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES
```

* listar containers todos: resultado todos containers que já foram executados

```cmd
C:\> nerdctl container ls -a
CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES
f572180e6ce8    docker.io/library/hello-world:latest    "/hello"       3 minutes ago     Exited (0) 3 minutes ago       
```

#### d. Remover um container 

* Remover um containers executado: resultado esperado ele não deve mais aparecer no list

```cmd
C:\> nerdctl container rm f572180e6ce8
```

* Executar um container, nomeando-lhe com um nome e logo em seguida a sua execução remove-lo automaticamente

```cmd
* executar container atribuindo-lhe um nome

```cmd
C:\> nerdctl container run --name meucontainer --rm hello-world
        :
For more examples and ideas, visit:
 https://docs.docker.com/get-started/

C:\> nerdctl container ls -a
CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES
```

#### e. Executar um container em modo interativo

* Baixar (primeira vez) e executar a imagem do Ubuntu, em modo interativo. E ao iniciar, executar o programa Bash para interagir com o Linux do container, executando comandos basicos

```cmd
C:\> nerdctl container run -it ubuntu /bin/bash
root@e050dbf808fa:/# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 02:05 pts/0    00:00:00 /bin/bash
root        10     1  0 02:05 pts/0    00:00:00 ps -ef
root@e050dbf808fa:/# exit
exit
```

#### f. Executar um container em modo deamon (background ou segundo plano)

* Execute o nginx em modo deamon

```cmd
C:\> nerdctl container run -d nginx
```

* Antes que você possa acessar o nginx será necessário fazer o _port bind_ 

* Execute o nginx em modo deamon fazendo o _port bind_ entre a porta externa 8080

```cmd
C:\> nerdctl container run -d -p 8080:80 nginx
```

* Removendo os containers (se estiverem rodando precisa ser forçado)

```cmd
C:\> nerdctl container ls
CONTAINER ID    IMAGE                             COMMAND                   CREATED               STATUS    PORTS                   NAMES
38974b71e745    docker.io/library/nginx:latest    "/docker-entrypoint.…"    About a minute ago    Up        0.0.0.0:8080->80/tcp
5553e4c31a53    docker.io/library/nginx:latest    "/docker-entrypoint.…"    15 minutes ago        Up
```


#### g. Executar um container passando variáveis de parâmetros

* Pergunta: Como saber quais as variáveis de ambientes são requeridas ou opcionais na execução de uma imagem?
  * _Resposta_: Consultando a página do fornecedor (fabricante) no repositório de imagens, por exemplo no **Docker Hub**
    * Supondo a imagem do banco de dados NoSQL **MongoDB**
    * Página do fornecedor (fabricante) do produto **MongoDB** no **Docker Hub**:  `https://hub.docker.com/_/mongo`
    * Na seção `Environment Variables` serão listadas as variáveis de ambientes: `MONGO_INITDB_ROOT_USERNAME` e `MONGO_INITDB_ROOT_PASSWORD`

* Executar um container baseada na imagem do **MongoDB**, fazendo o bind da porta 27017:27017

```cmd
C:\> nerdctl container ls
CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES

C:\> nerdctl container run -d -p "27017:27017" -e MONGO_INITDB_ROOT_USERNAME=mongouser -e MONGO_INITDB_ROOT_PASSWORD=mongopwd mongo

C:\> nerdctl container ls
CONTAINER ID    IMAGE                             COMMAND                   CREATED           STATUS    PORTS                       NAMES
33014e5f7186    docker.io/library/mongo:latest    "docker-entrypoint.s…"    51 seconds ago    Up        0.0.0.0:27017->27017/tcp
```

#### h. Inspecionar um container

* Ao inspecionar um container podemos ter acesso aos detalhes de configurações tais como imagens base do container `"Image"`, argumentos de criação, elementos de redes, estados, etc

```cmd
C:\> nerdctl container inspect 33014e5f7186
 directory" id=e65cdcbc3de9c1f9faa98b12bd3196e5ae91e2ba30591a7b40616b8d41cfc3bf
[
    {
        "Id": "e65cdcbc3de9c1f9faa98b12bd3196e5ae91e2ba30591a7b40616b8d41cfc3bf",
        "Created": "2022-01-21T00:59:37.2734749Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "mongod"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Pid": 19279,
            "ExitCode": 0,
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "docker.io/library/mongo:latest",
        "ResolvConfPath": "/var/lib/nerdctl/dbb19c5e/containers/default/e65cdcbc3de9c1f9faa98b12bd3196e5ae91e2ba30591a7b40616b8d41cfc3bf/resolv.conf",
        "HostnamePath": "/var/lib/nerdctl/dbb19c5e/containers/default/e65cdcbc3de9c1f9faa98b12bd3196e5ae91e2ba30591a7b40616b8d41cfc3bf/hostname",
        "LogPath": "/var/lib/nerdctl/dbb19c5e/containers/default/e65cdcbc3de9c1f9faa98b12bd3196e5ae91e2ba30591a7b40616b8d41cfc3bf/e65cdcbc3de9c1f9faa98b12bd3196e5ae91e2ba30591a7b40616b8d41cfc3bf-json.log",
        "Name": "",
        "Driver": "overlayfs",
        "Platform": "linux",
        "AppArmorProfile": "",
        "NetworkSettings": null
    }
]
```

#### i. Executar um comando dentro do container opcionalmente de forma iterativa

* Executar um conjunto de comandos de forma iterativa

```cmd
C:\> nerdctl container exec -it e65cdcbc3de9 /bin/bash
root@e65cdcbc3de9:/# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
mongodb      1     0  0 01:07 ?        00:00:26 mongod --auth --bind_ip_all
root      1160     0  1 01:58 pts/0    00:00:00 /bin/bash
root      1169  1160  0 01:59 pts/0    00:00:00 ps -ef
```

#### j. Parar, reiniciar e remover a execução de um container

* Para a execução

```cmd
C:\> nerdctl container stop e65cdcbc3de9
```

* Reiniciar a execução

```cmd
C:\> nerdctl container ls -a
CONTAINER ID    IMAGE                              COMMAND                   CREATED              STATUS                      PORTS                       NAMES
  :                           :                           :                     :
e65cdcbc3de9    docker.io/library/mongo:latest     "docker-entrypoint.s…"    About an hour ago    Exited (0) 3 minutes ago    0.0.0.0:27017->27017/tcp
  :                           :                           :                     :

C:\> nerdctl container start e65cdcbc3de9

C:\> nerdctl container ls -a
  :                           :                           :                     :
e65cdcbc3de9    docker.io/library/mongo:latest     "docker-entrypoint.s…"    About an hour ago    Up         0.0.0.0:27017->27017/tcp
  :                           :                           :                     :
```

* Remover um container opcionalmente de forma forçada se ele ainda estiver em execução

```cmd
C:\> nerdctl container rm -f e65cdcbc3de9
```

#### k. Logs de execução de um container

* Pode-se listar os logs, as últimas n linhas `-n`, maracação por data-e-hora `-t` ou de forma contínua `-f`

```cmd
C:\> nerdctl container run -d -p 8080:80 nginx

C:\> nerdctl container logs -n 3 6cb3b8b2aa0f 
2022/01/21 02:20:54 [notice] 1#1: start worker process 35
2022/01/21 02:20:54 [notice] 1#1: start worker process 36
2022/01/21 02:20:54 [notice] 1#1: start worker process 37

C:\> nerdctl container logs -t -f 6cb3b8b2aa0f 
          :                    :         :       :       :             :
2022-01-21T02:20:54.32637Z 2022/01/21 02:20:54 [notice] 1#1: start worker process 38
2022-01-21T02:20:54.3267492Z 2022/01/21 02:20:54 [notice] 1#1: start worker process 39
          :                    :         :       :       :             :
```


## I - Referências

* Docker
  * [INICIATIVA KUBERNETES - Aula 1 - Containers e Docker Simplificados](https://www.youtube.com/watch?v=lKxuO--0ypM)
* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
