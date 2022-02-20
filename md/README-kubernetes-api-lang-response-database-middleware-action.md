`kubernetes-docker-rancherdesktop-labs/md/README-kubernetes-api-lang-response-database-middleware-action.md` Kubernetes - API - Response - Database - Middleware - Action
## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-10: Kubernetes - API - Response - Database - Middleware - Action** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
* Explorar os recursos e funcionalidades na construção de API - Application Proogramming Interface dentro da infraestrutura do Kubernetes:
  * **Response**: Tipo da resposta (na perspectiva de transação) que podem ser:
    * `sync`: síncrona, a resposta imediata; `async` assíncrona, o chamado irá invocar um novo processo que executará a ação desejada
  * **lang**: Linguagem de programação:
    * `Node`; `Python`; `GoLang`;
  * **Database**: Persistência em banco de dados: 
    * `MongoDB`; `MySQL`; `PostgreSQL`;  `MSSQL`;
  * **Middleware**: Message Queue ou Data Streaming:
    *  `kafka`; `rabbitmq`;
  * **Action**: Action or distributed transaction:
    * `get`;  `post`;  `put`;  `patch`;
    * `relay`; `pool`;  `callback`;
    * `publish`;  `subscribe`;

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

![UseCaseDiagram-kubernetes-api.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes-api.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-install-wsl-rancherdesktop-windows.png) 


### 2.6. Diagrama de Pacotes Classes (Packages and Class Class Diagram)

![ClassDiagram-Context.png](../doc/uml-diagrams/ClassDiagram-Context.png) 


### 2.7. Diagrama de Sequencia (Sequence Diagram)

* A seguir, as imagens em diagramas de sequencia do comportamento das API's no que diz respeito à resposta: a) Síncrona; b) Assíncrona. E no que diz respeito a ação: a) relay; b) poll; c) callback 

![SequenceDiagram-api.png](../doc/uml-diagrams/SequenceDiagram-api-SynchronousRequestAcknowledge.png)

![SequenceDiagram-api.png](../doc/uml-diagrams/SequenceDiagram-api-SynchronousRequestAcknowledgeCallback.png)

![SequenceDiagram-api.png](../doc/uml-diagrams/SequenceDiagram-api-SynchronousRequestAcknowledgePoll.png)

![SequenceDiagram-api.png](../doc/uml-diagrams/SequenceDiagram-api-SynchronousRequestAcknowledgeRelayCallback.png)

![SequenceDiagram-api.png](../doc/uml-diagrams/SequenceDiagram-api-SynchronousRequestResponse.png)

### 2.8. Notas de atenção e Avisos (Notice and information)

*  n/a


### 2.9. Glossário de Termos (Glossary)

De uma forma geral, vamos tentar <ins>definir</ins> e <ins>caracterizar</ins> alguns dos termos utilizados neste projeto para permitir uma melhor compreensão e entendimento:

| Termo       | Significado                     |
| :---------- | :------------------------------ |
| `nerdctl`   | programa em linha de comando do Rancher Desktop que equivale ao `kubectl` ou `docker`. |


## 3. Projeto / Laboratório

### 3.1. Pré-Requisitos, Pré-Condições e Premissas

#### a. Tecnologias e ferramentas

* Windows OnPrimasse
* WSL - Windows Subsystem for Linux
* Rancher Desktop for Windows
  * [LAB-02 Install WSL Rancher Desktop on Windows](README-install-wsl-rancherdesktop-windows.md) instalado, concluído e disponível
* Docker or Kubernetes or VirtualBox or On-Premisse infrastructure (Deployment Infraestructure)
* Cloud infrastructure: AWS or GPC or OracleCloud or Azure
* Python 3.x (3.8 recommended)
* venv
* NodeJS (Development, Build and Deploy)
* GoLang
* Databases: MongoDB, MySQL, PostgreSQL, MSSQL, Oracle
* Middleware: Kafka, RabbitMQ
* Tools: JMeter, Curl

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.3. Guia de Implantação, Configuração e Instalação


## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

