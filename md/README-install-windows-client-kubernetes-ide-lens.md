`kubernetes-docker-rancherdesktop-labs/md/README-install-windows-client-kubernetes-ide-lens.md` - LAB-08 - Kubernetes IDE
## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-08 - Kubernetes IDE** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
* Obter os binários e instalar o Lens Kubernetes IDE
* Executar/Iniciar o cluster Kubernetes
* Conectar Lens Kubernetes IDE Windows com seu cluster Kubernetes

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
    + [a. Obter os binários e instalar o Lens Kubernetes IDE](#a-obter-os-binários-e-instalar-o-lens-kubernetes-no-windows)
    + [b. Executar/Iniciar o cluster Kubernetes](#b-executar-iniciar-o-cluster-kubernetes)
    + [c. Conectar Lens Kubernetes IDE no Windows com cluster Kubernetes](#c-conectar-lens-kubernetes-ide-no-windows-com-cluster-kubernetes)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 

### 2.2. Diagrama de Implantação (Deploy Diagram)

* Contexto do Kubernetes

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop-mongodb-studio3t.png) 

* Contexto da ferramenta Lens IDE para Kubernetes 

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop-lens-ide.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-install-windows-client-mongodb-studio3t.png) 


### 2.8. Notas de atenção e Avisos (Notice and information)

*  Deixo aqui o registro e agradecimento de que este material foi inspirado e baseado na "Iniciativa Kubernetes" provida pelo canal do Youtube [Fabrício Veronez Kubedev](https://www.youtube.com/channel/UCUy0NlW6WlVFj8V3xhXegYQ)
* A idéia de construir um material documentado que eu pudesse usar como referência inicial sobre Kubernetes e Devops, seja para um projeto ou para outro laboratório, evoluindo ou especializando (abstração vs especialização) que permitisse evoluir constantemente o aprendizado


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
* [LAB-01 Install WSL Rancher Desktop on Windows](README-install-wsl-rancherdesktop-windows.md) instalado, concluído e disponível


#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.5. Guia de Estudo

#### a. Obter os binários e instalar o Lens Kubernetes IDE

* [Download do binário e instalação de Lens Kubernetes IDE for Windows](https://k8slens.dev/)


#### b. Executar/Iniciar o cluster Kubernetes

* Executar ou iniciar o cluster Kubernetes, pelo nerdctl get status temos certeza de que o cluster está funcionando

```cmd
C:\src\kubernetes-ide-lens> nerdctl get all
      :
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

