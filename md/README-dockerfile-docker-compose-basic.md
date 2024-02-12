`k8s-docker-iac-labs/md/README-dockerfile-docker-compose-basic.md` - Dockerfile e Compose file Basics

## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-10: Dockerfile e Docker Compose file Basics** abaixo do projeto [k8s-docker-iac-labs](../README.md). Este laboratório consiste em:
* Explorar os recursos e funcionalidades básicas

##### Table of Contents  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.9. Glossário de Termos (Glossary)](#29-glossário-de-termos-glossary)
- [3. Projeto / Laboratório](#3-projeto--laboratório)
  * [3.1. Pré-Requisitos, Pré-Condições e Premissas](#31-pré-requisitos-pré-condições-e-premissas)
    + [a. Tecnologias e ferramentas](#a-tecnologias-e-ferramentas)
    + [b. Ferramental de apoio](#b-ferramental-de-apoio)
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![DeployDiagram-Context.drawio.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.drawio.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.drawio.png](../doc/uml-diagrams/DeployDiagram-Context.drawio.png) 


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
* Docker or Kubernetes or VirtualBox or On-Premisse infrastructure (Deployment Infraestructure)
* GoLang

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.5. Guia de Estudo

#### a. Docker Compose MySql

[docker-compose-mysql](../src/docker-compose-mysql)

#### b. Docker Compose MySql e GoLang

[docker-compose-mysql](../src/docker-compose-mysql-golang)

#### c. Docker Compose NGINX

[docker-compose-nginx](../src/docker-compose-nginx)

#### d. Docker Compose RabbitMq

[docker-compose-rabbitmq](../src/docker-compose-rabbitmq)

#### e. Dockerfile e GoLang Hello World

[dockerfile-golang-helloworld](../src/dockerfile-golang-helloworld)

#### f. Dockerfile Kafka API Events
[dockerfile-kafka-api-events](../src/dockerfile-kafka-api-events)

#### g. Dockerfile MSSQL API Events
[dockerfile-mssql-api-events](../src/dockerfile-mssql-api-events)

#### h. Dockerfile MySQL API Events
[dockerfile-mysql-api-events](../src/dockerfile-mysql-api-events)

#### i. Dockerfile Postgresql API Events
[dockerfile-postgresql-api-events](../src/dockerfile-postgresql-api-events)

#### j. Dockerfile RabbitMQ API Events
[dockerfile-postgresql-api-events](../src/dockerfile-postgresql-api-events)

#### k. Dockerfile Ubuntu Curl
[dockerfile-ubuntu-curl](../src/dockerfile-ubuntu-curl)

#### l. Dockerfile Ubuntu Curl args
[dockerfile-ubuntu-curl-args](../src/dockerfile-ubuntu-curl-args)


## I - Referências

* Docker, Dockerfile, Docker Compose e Kubernetes
  * https://cursos.alura.com.br/course/kubernetes-pods-services-configmap/task/79669
* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

