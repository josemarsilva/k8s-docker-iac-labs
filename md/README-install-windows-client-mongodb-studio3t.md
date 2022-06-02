`k8s-docker-iac-labs/md/README-install-windows-client-mongodb-studio3t.md` - Kubernetes, Docker e Rancher Desktop - Windows Client MongoDB Studio 3T connect database
## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-03: Windows Client MongoDB** abaixo do projeto [k8s-docker-iac-labs](../README.md). Este laboratório consiste em:
* Obter os binários e instalar o Studio 3T no Windows
* Executar um container baseado na imagem do MongoDB
* Conectar Studio 3T no Windows com MongoDB

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
    + [a. Obter os binários e instalar o Studio 3T no Windows](#a-obter-os-binários-e-instalar-o-studio-3t-no-windows)
    + [b. Executar um container baseado na imagem do MongoDB](#b-executar-um-container-baseado-na-imagem-do-mongodb)
    + [c. Conectar Studio 3T no Windows com MongoDB](#c-conectar-studio-3t-no-windows-com-mongodb)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 

### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop-mongodb-studio3t.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-install-windows-client-mongodb-studio3t.png) 


### 2.8. Notas de atenção e Avisos (Notice and information)

* n/a

### 2.9. Glossário de Termos (Glossary)

De uma forma geral, vamos tentar <ins>definir</ins> e <ins>caracterizar</ins> alguns dos termos utilizados neste projeto para permitir uma melhor compreensão e entendimento:

| Termo       | Significado                     |
| :---------- | :------------------------------ |
| `nerdctl`   | programa em linha de comando do Rancher Desktop que equivale ao comando `docker`. |


## 3. Projeto / Laboratório

### 3.1. Pré-Requisitos, Pré-Condições e Premissas

#### a. Tecnologias e ferramentas

* Windows OnPrimasse
* WSL - Windows Subsystem for Linux
* Rancher Desktop for Windows
* [LAB-01 Install WSL Rancher Desktop on Windows](README-install-wsl-rancherdesktop-windows.md) instalado, concluído e disponível


#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.5. Guia de Estudo

#### a. Obter os binários e instalar o Studio 3T no Windows

* [Download do binário e instalação de Studio 3T for Windows](https://studio3t.com/download/)


#### b. Executar um container baseado na imagem do MongoDB

* Executar um container baseada na imagem do **MongoDB**, fazendo o bind da porta 27017:27017

```cmd
C:\> nerdctl container ls
CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES

C:\> nerdctl container run -d -p "27017:27017" -e MONGO_INITDB_ROOT_USERNAME=mongouser -e MONGO_INITDB_ROOT_PASSWORD=mongopwd mongo

C:\> nerdctl container ls
CONTAINER ID    IMAGE                             COMMAND                   CREATED           STATUS    PORTS                       NAMES
e65cdcbc3de9    docker.io/library/mongo:latest    "docker-entrypoint.s…"    18 seconds ago    Up        0.0.0.0:27017->27017/tcp
```

#### c. Conectar Studio 3T no Windows com MongoDB

* Criar/Configurar uma nova conexão a partir do Studio 3T com o MongoDB local na porta 27017

```cmd
Studio 3T Ultimate for MongoDB :: (menu) File >> New
    (button) New Connection
        (field) Connection name: mongo-local-container
        (aba) Server
            (field) Server: localhost
            (field) Port: 27017
        (aba) Authentication
            (field) User name: mongouser
            (field) Password: mongopwd
            (field) Authentication DB: admin
        (button) Save
```


* Testar a conexão e conectar

![Screenshot Studio 3T connectando no MongoDB](../doc/screenshots/screenshot-mongodb-studio3t.png) 


* Explorar os _databases_ e _collections_ da base de dados **MongoDB**

![Screenshot Dicionário de banco de dados e collections](../doc/screenshots/screenshot-mongodb-studio3t-databases-collections.png) 




## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

