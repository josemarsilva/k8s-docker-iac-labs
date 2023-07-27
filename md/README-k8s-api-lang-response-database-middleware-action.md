`k8s-docker-iac-labs/md/README-k8s-api-lang-response-database-middleware-action.md` Kubernetes - API - Lang - Response - Database - Middleware - Action
## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-10: Kubernetes - API - Lang - Response - Database - Middleware - Action** abaixo do projeto [k8s-docker-iac-labs](../README.md). Este laboratório consiste em:
* Explorar os recursos e funcionalidades na construção de API - Application Proogramming Interface dentro da infraestrutura do Kubernetes:
  * **lang**: Linguagem de programação:
    * `Node`; 
    * `Python`; 
    * `GoLang`;
  * **response**: Tipo da resposta (na perspectiva de transação) que podem ser:
    * `sync`: síncrona, a resposta imediata; 
    * `async` assíncrona, o chamado irá invocar um novo processo que executará a ação desejada
  * **database**: Persistência em banco de dados: 
    * `MongoDB`
    * `MySQL`
    * `PostgreSQL`
    * `MSSQL`
    * `CouchDB`
  * **middleware**: Message Queue ou Data Streaming:
    * `Kafka`
    * `RabbitMQ`
  * **action**: Action or distributed transaction:
    * `response`
    * `relay`
    * `pool`
    * `callback`
    * `publish`
    * `subscribe`
  * **options**: Options
    * `local-workload`
  * **method**: Method of API:
    * `get`;  `post`;  `put`;  `patch`; `delete`;

##### Table of Contents  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.4. Diagrama de Mapa Mental (Mind Map Diagram)](#24-diagrama-de-mapa-mental-mind-map-diagram)
  * [2.6. Diagrama de Pacotes Classes (Packages and Class Class Diagram)](#26-diagrama-de-pacotes-classes-packages-and-class-class-diagram)
  * [2.7. Diagrama de Sequencia (Sequence Diagram)](#27-diagrama-de-sequencia-sequence-diagram)
  * [2.8. Notas de atenção e Avisos (Notice and information)](#28-notas-de-atenção-e-avisos-notice-and-information)
  * [2.9. Glossário de Termos (Glossary)](#29-glossário-de-termos-glossary)
- [3. Projeto / Laboratório](#3-projeto--laboratório)
  * [3.1. Pré-Requisitos, Pré-Condições e Premissas](#31-pré-requisitos-pré-condições-e-premissas)
    + [a. Tecnologias e ferramentas](#a-tecnologias-e-ferramentas)
    + [b. Ferramental de apoio](#b-ferramental-de-apoio)
  * [3.2. Guia do Desenvolvedor e Administrador](#32-guia-do-desenvolvedor-e-administrador)
  * [3.3. Guia de Implantação, Configuração e Instalação](#33-guia-de-implantação-configuração-e-instalação)
  * [3.4. Guia de Demonstração e Teste](#34-guia-de-demonstração-e-teste)
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
- [I - Referências](#i---referências)



## 2. Documentação

![FreeStyleDiagram-api-lang-response-database-middleware-action.png](../doc/uml-diagrams/FreeStyleDiagram-api-lang-response-database-middleware-action.png) 

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

* Contexto do desenvolvimento da aplicação NodeJS para Kubernetes

![UseCaseDiagram-kubernetes-dev-node.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes-dev-node.png) 

* Contexto do desenvolvimento da aplicação NodeJS para Kubernetes

![UseCaseDiagram-kubernetes-dev-node-api.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes-dev-node-api.png) 

* Contexto do gerenciamento da aplicação NodeJS para Kubernetes

![UseCaseDiagram-kubernetes-api.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes-api.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-kubernetes-docker-nodejs-database-middleware.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-nodejs-database-middleware.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-kubernetes-docker-api-lang-response-database-middleware-action.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-api-lang-response-database-middleware-action.png) 


### 2.6. Diagrama de Pacotes Classes (Packages and Class Class Diagram)

![ClassDiagram-PhysicalDataModel-api.png](../doc/uml-diagrams/ClassDiagram-PhysicalDataModel-api.png) 


### 2.7. Diagrama de Sequencia (Sequence Diagram)

* A seguir, as imagens em diagramas de sequencia do comportamento das API's ...
  * ... no que diz respeito à resposta: 
    * `sync`: Síncrona
    * `async`: Assíncrona
  * ... no que diz respeito a ação: 
    * `response` (acknowledgement)
    * `callback`
    * `poll`
    * `relay`

![SequenceDiagram-api.png](../doc/uml-diagrams/SequenceDiagram-api-SynchronousRequestAcknowledge.png)

![SequenceDiagram-api.png](../doc/uml-diagrams/SequenceDiagram-api-AsynchronousRequestAcknowledgeCallback.png)

![SequenceDiagram-api.png](../doc/uml-diagrams/SequenceDiagram-api-SynchronousRequestAcknowledgePoll.png)

![SequenceDiagram-api.png](../doc/uml-diagrams/SequenceDiagram-api-AsynchronousRequestAcknowledgeRelayCallback.png)

![SequenceDiagram-api.png](../doc/uml-diagrams/SequenceDiagram-api-SynchronousRequestResponse.png)

### 2.8. Notas de atenção e Avisos (Notice and information)

*  n/a


### 2.9. Glossário de Termos (Glossary)

De uma forma geral, vamos tentar <ins>definir</ins> e <ins>caracterizar</ins> alguns dos termos utilizados neste projeto para permitir uma melhor compreensão e entendimento:

| Termo       | Significado                     |
| :---------- | :------------------------------ |
| `nerdctl`   | programa em linha de comando do Rancher Desktop que equivale ao `docker`. |


## 3. Projeto / Laboratório

### 3.1. Pré-Requisitos, Pré-Condições e Premissas

#### a. Tecnologias e ferramentas

* Windows OnPrimasse
* WSL - Windows Subsystem for Linux
* Rancher Desktop for Windows
  * [LAB-02 Install WSL Rancher Desktop on Windows](README-install-wsl-rancherdesktop-windows.md) instalado, concluído e disponível
* Docker or Kubernetes or VirtualBox or On-Premisse infrastructure (Deployment Infraestructure)
* Cloud infrastructure: AWS or GPC or OracleCloud or Azure
* Programming Language / Libraries:
  * Python 3.x (3.8 recommended) / venv
  * NodeJS (Development, Build and Deploy)
  * GoLang
* Databases: MongoDB, MySQL, PostgreSQL, MSSQL, Oracle, CoachDB, Redis
* Middleware: Kafka, RabbitMQ
* Tools: JMeter, Curl

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.3. Guia de Implantação, Configuração e Instalação

#### 3.2.1. Development a Node.js application for Kubernetes

#### 3.2.1.1. INIT ambiente Node.js e INSTALL dependências

#### 3.2.1.2. DEVELOP entry-point, health-check, ready-to-serve para k8s

#### 3.2.1.3. DEVELOP applications features

#### 3.2.1.4. SWAGGER api-doc documentation

* **API's de Exemplos**: endpoint chamado e payload seguindo o formato padrão: `api` + `language` + `response` + `database` + `middleware` + `action`
  * `/api-node-sync---response`: API em Node.js, resposta síncrona, não persiste informação em banco de dados, não estimula serviços de middleware e ação esperada é responder (acknowledge) o requisição 
  * `/api-node-sync-mongodb--response`: API em Node.js, resposta síncrona, persiste informação em banco de dados mongoDB, não estimula serviços de middleware e ação esperada é responder (acknowledge) o requisição 
  * `/api-node-sync-couchdb--response`: API em Node.js, resposta síncrona, persiste informação em banco de dados mongoDB, não estimula serviços de middleware e ação esperada é responder (acknowledge) o requisição 

* **Payload de Exemplos**: conteúdo do corpo da requisição em formato JSON

```json
{
  "params": {
    "lang": "node",
    "response": "sync",
    "database": null,
    "middleware": null,
    "action": "response",
    "options": [
      {
        "local-workload": []
      }
    ],
    "route_next_index": 0,
    "route_table": [
      "[POST]http://localhost:3000/node-sync-mongodb--response",
      "[POST]http://localhost:3000/node-sync-postgresql--response",
      "[POST]http://localhost:3000/node-sync-mssql--response",
      "[POST]http://localhost:3000/node-sync-coachdb--response",
      "[POST]http://localhost:3000/node-sync-redis--response"
    ],
    "options_table": [
      {
        "local-workload": []
      }
    ],
    "info": {
      "key": "12345",
      "data": "bla ble bli blo blu"
    }
  }
}
```

#### 3.2.1.5. BUILD and REGISTRY docker image

#### 3.2.1.4.01. BUILD/REGISTRY Docker image MSSQL SQLServer initialized for api events application

* _Passo-#01_: CONFIGURE (Criar/editar/configurar) o `Dockerfile` e demais arquivos de scripts de inicialização: `setup.sql`, `run-initialization.sh` e `setup.sql`

```cmd
C:\..\k8s-docker-iac-labs> cd src
C:\..\k8s-docker-iac-labs\src> cd dockerfile-mssql-api-events
C:\..\dockerfile-mssql-api-events> TYPE Dockerfile
C:\..\dockerfile-mssql-api-events> TYPE entrypoint.sh
C:\..\dockerfile-mssql-api-events> TYPE import-data.sh
C:\..\dockerfile-mssql-api-events> TYPE setup.sql
C:\..\dockerfile-mssql-api-events> TYPE tbl_api_tags.csv
```

* _Passo-#02_: BUILD (construir) a imagem Docker inicializada para a aplicação com nome `josemarsilva/mssql-api-events:v1`

```cmd
C:\..\docker-mssql-api-events> nerdctl image build -t josemarsilva/mssql-api-events:v1 .
```

* _Passo-#03_: RUN (Rodar/Executar) um novo container manualmente com a imagem inicializada

```cmd
C:\..\docker-mssql-api-events> nerdctl container run --name mssql-api-events -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=StrongPassword@12345" -p 1433:1433 -d josemarsilva/mssql-api-events:v1

C:\..\docker-mssql-api-events> nerdctl container ls
CONTAINER ID    IMAGE                                         COMMAND                   CREATED           STATUS    PORTS                     NAMES
dc80785f74ff    docker.io/josemarsilva/mssql-api-events:v1    "/opt/mssql/bin/perm…"    10 seconds ago    Up        0.0.0.0:1433->1433/tcp    mssql-api-events
```

* _Passo-#04_: TEST (Testar) o novo container criado

```cmd
C:\..\docker-mssql-api-events> nerdctl container exec -it mssql-api-events /bin/bash
mssql@dc80785f74ff:/app$ ls -la
total 16
drwxr-xr-x 1 mssql root 4096 Feb 22 23:36 .
drwxr-xr-x 1 root  root 4096 Feb 22 23:38 ..
-rwxrwxrwx 1 root  root  196 Feb 22 22:31 run-initialization.sh
-rwxrwxrwx 1 root  root  342 Feb 22 23:13 setup.sql
mssql@dc80785f74ff:/app$ exit
exit

C:\..\docker-mssql-api-events> nerdctl container exec -it mssql-api-events /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P yourStrong(!)Password
1> SELECT GETDATE()
2> GO

-----------------------
2022-02-22 23:41:28.087

(1 rows affected)
```

* _Passo-#05_: STOP/KILL/DELETAR (Parar/Matar/Remover) o novo container criado

```cmd
C:\..\docker-mssql-api-events> nerdctl container stop  mssql-api-events
C:\..\docker-mssql-api-events> nerdctl container kill  mssql-api-events
C:\..\docker-mssql-api-events> nerdctl container rm -f mssql-api-events
```

```cmd
C:\..\docker-mssql-api> nerdctl image ls
REPOSITORY                                                             TAG       IMAGE ID        CREATED               PLATFORM       SIZE
        :                                                              :            :              :
```



#### 3.2.1.5. SWAGGER api-doc

#### 3.2.1.6. TEST development


## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

