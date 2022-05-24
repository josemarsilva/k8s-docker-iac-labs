`kubernetes-docker-rancherdesktop-labs/md/README-k8s-nodejs-http-echo.md` - Kubernetes, Docker e Rancher Desktop - LAB-07 - Kubernetes http echo

## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-07 - Kubernetes http echo** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
* Explorar os comandos básicos do _Kubernetes_ no Rancher Desktop

##### Table of Contents  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.3. Diagrama de BPMN (Business Process Modeling Notation)](#23-diagrama-de-bpmn-business-process-modeling-notation)
  * [2.4. Diagrama de Mapa Mental (Mind Map Diagram)](#24-diagrama-de-mapa-mental-mind-map-diagram)
  * [2.9. Glossário de Termos (Glossary)](#29-glossário-de-termos-glossary)
- [3. Projeto](#3-projeto)
  * [3.1. Pré-Requisitos, Pré-Condições e Premissas](#31-pré-requisitos-pré-condições-e-premissas)
    + [a. Tecnologias e ferramentas](#a-tecnologias-e-ferramentas)
    + [b. Ferramental de apoio](#b-ferramental-de-apoio)
    + [c. Instalando bibliotecas e configurando ambiente NodeJS](c-instalando-bibliotecas-e-configurando-ambiente-nodejs)
  * [3.2. Guia do Desenvolvedor e Administrador](#32-guia-do-desenvolvedor-e-administrador)
    + [3.2.1. Construir projeto NodeJS HTTP echo](#321-construir-projeto-nodejs-http-echo)
      - [3.2.1.01. Inicializar projeto NodeJS http echo](#32101-inicializar-projeto-nodejs-http-echo)
      - [3.2.1.02. Desenvolver entry-point da aplicação e view de apresentação básica](#32102-desenvolver-entry-point-da-aplica%C3%A7%C3%A3o-e-view-de-apresenta%C3%A7%C3%A3o-b%C3%A1sica)
      - [3.2.1.03. Executar e testar aplicação](#32103-executar-e-testar-aplica%C3%A7%C3%A3o)


- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

* Contexto do gerenciamento da aplicação NodeJS desenvolvida com biblioteca Express e Swagger para testes no Kubernetes

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes-ops.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

* Contexto da aplicação NodeJS desenvolvida com biblioteca Express e Swagger para testes no Kubernetes

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-node-express-swagger-k8s.png) 


### 2.3. Diagrama de BPMN (Business Process Modeling Notation)

* Contexto da aplicação NodeJS desenvolvida com biblioteca Express e Swagger para testes no Kubernetes

![BpmnDiagram-kubernetes-self-healing.png](../doc/bpmn-diagrams/BpmnDiagram-kubernetes-self-healing.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-kubernetes-docker-rancherdesktop-selfhealing-healthcheck-resourceslimits.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-selfhealing-healthcheck-resourceslimits.png) 


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
* NodeJS (Development, Build and Deploy)
  * Libraries and Enviroment: express, swagger

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.2. Guia do Desenvolvedor e Administrador

#### 3.2.1. Construir projeto NodeJS HTTP echo

##### 3.2.1.01. Inicializar projeto NodeJS http echo

* Inicializando um projeto NodeJS (em ambientes Windows)

```cmd
C:\src\node-http-echo> npm init
  :
package name: (http-echo) node-http-echo
version: (1.0.0)
description: Kubernetes - Node HTTP echo
entry point: (index.js) server.js
test command:
git repository: https://github.com/josemarsilva/kubernetes-docker-rancherdesktop-labs.git
keywords: node http nodemon
author: Josemar Furegatti de Abreu Silva
license: (ISC)
  :
```

* Instalar as dependências por linha de comando ou Editar `package.json` e adicionar e revisar as dependências requeridas em ` ... "dependencies": { ...`
  * https://www.npmjs.com/package/nodemon

```cmd
C:\src\node-http-echo> npm install
```

##### 3.2.1.02. Desenvolver entry-point da aplicação e view de apresentação básica

* No entry-point `server.js` instanciar o servidor Express, criar e configurar as rotas de mapeamento da aplicação. Implementar as rotas mais simples
* Criar/editar o arquivo `web.config`

```cmd
C:\src\node-http-echo> TYPE server.js
C:\src\node-http-echo> TYPE web.config
```

#### 3.2.1.03. Executar e testar aplicação

* Execute sua aplicação e acesse pelo browser. Observe que a aplicação retornará diversas informações da requisição HTTP feita.

```cmd
C:\src\node> node server
Initializing Server on 0.0.0.0:3000
Server running on 0.0.0.0:3000
```

![screenshot-nodejs-http-echo.png](../doc/screenshots/screenshot-nodejs-http-echo.png) 


## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
* [INICIATIVA KUBERNETES - Boas práticas de deploy + dúvidas sobre o KubeDev.io](https://www.youtube.com/watch?v=YFUrhekwH64)
