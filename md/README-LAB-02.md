`kubernetes-docker-rancherdesktop-labs/md/README-LAB-01.md` - Kubernetes, Docker e Rancher Desktop - LAB-02 - Basic Commands using Docker on RanckerDesktop

## 1. Introdução

Este documento contém os artefatos dolaboratório **LAB-02 - Basic Commands using Docker on RanckerDesktop** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
* Explorar os comandos básicos do _Docker_ no Rancher Desktop

##### Table of Contents  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.3. Diagrama de BPMN (Business Process Modeling Notation)](#23-diagrama-de-bpmn-business-process-modeling-notation)
  * [2.4. Diagrama de Mapa Mental (Mind Map Diagram)](#24-diagrama-de-mapa-mental-mind-map-diagram)
  * [2.5. Estratégia de Branches (Branch Strategy Workflow)](#25-estratégia-de-branches-branch-strategy-workflow)
  * [2.6. Diagrama de Pacotes Classes (Packages and Class Class Diagram)](#26-diagrama-de-pacotes-classes-packages-and-class-class-diagram)
  * [2.7. Diagrama de Sequencia (Sequence Diagram)](#27-diagrama-de-sequencia-sequence-diagram)
  * [2.8. Notas de atenção e Avisos (Notice and information)](#28-notas-de-atenção-e-avisos-notice-and-information)
  * [2.9. Glossário de Termos (Glossary)](#29-glossário-de-termos-glossary)
- [3. Projeto](#3-projeto)
  * [3.1. Pré-Requisitos, Pré-Condições e Premissas](#31-pré-requisitos-pré-condições-e-premissas)
    + [a. Tecnologias e ferramentas](#a-tecnologias-e-ferramentas)
    + [b. Ferramental de apoio](#b-ferramental-de-apoio)
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
    + [3.5.1. Patterns, Standard, Conventions and Best Practices](#351-patterns-standard-conventions-and-best-practices)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-basic-docker-commands.png) 


### 2.9. Glossário de Termos (Glossary)

De uma forma geral, vamos tentar <ins>definir</ins> e <ins>caracterizar</ins> alguns dos termos utilizados neste projeto para permitir uma melhor compreensão e entendimento:

| Termo       | Significado                     |
| :---------- | :------------------------------ |
| `nerdctl`   | programa em linha de comando do Rancher Desktop que equivale ao `kubectl` ou `docker`. |


## 3. Projeto

### 3.1. Pré-Requisitos, Pré-Condições e Premissas

#### a. Tecnologias e ferramentas

* Windows OnPrimasse
* WSL - Windows Subsystem for Linux
* Rancher Desktop for Windows
* [LAB-01](README-LAB-01.md)

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

#### e. Executar um container em modo deamon (background ou segundo plano)

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





## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
* [INICIATIVA KUBERNETES - Aula 1 - Containers e Docker Simplificados](https://www.youtube.com/watch?v=lKxuO--0ypM)
