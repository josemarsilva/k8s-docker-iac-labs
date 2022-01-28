`kubernetes-docker-rancherdesktop-labs/README.md` - Template Git Project

## 1. Introdução

Este repositório contém os artefatos do projeto / laboratório de avaliação  **kubernetes-docker-rancherdesktop-labs** organizado conforme o índice de conteúdo abaixo:

##### Índice de conteúdo  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.4. Diagrama de Mapa Mental (Mind Map Diagram)](#24-diagrama-de-mapa-mental-mind-map-diagram)
  * [2.8. Notas de atenção e Avisos (Notice and information)](#28-notas-de-atenção-e-avisos-notice-and-information)
  * [2.9. Glossário de Termos (Glossary)](#29-glossário-de-termos-glossary)
- [3. Projeto / Laboratório](#3-projeto--laboratório)
  * [LAB-01: Install WSL, Rancher Desktop and command line with nerdctl](#lab-01)
  * [LAB-02: Basic Docker Commands](#lab-02)
  * [LAB-03: Windows Client MongoDB Studio 3T connect database](#lab-03)
  * [LAB-04: Docker Images vs Containers](#lab-04)
  * [LAB-05: Basic Kubernetes Commands](#lab-05)
  * [LAB-06: Kubernetes, Python, Flask e MongoDB](#lab-06)
  * [LAB-07: Kubernetes Self Healing, application health check and resources limits](#lab-07)
  * [LAB-08: Kubernetes IDE Lens](#lab-08)

- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](./doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](./doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](./doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop.png) 


### 2.8. Notas de atenção e Avisos (Notice and information)

*  Deixo aqui o registro e agradecimento de que este material foi inspirado e baseado na "Iniciativa Kubernetes" provida pelo canal do Youtube [Fabrício Veronez Kubedev](https://www.youtube.com/channel/UCUy0NlW6WlVFj8V3xhXegYQ)
* A idéia de construir um material documentado que eu pudesse usar como referência inicial sobre Kubernetes e Devops, seja para um projeto ou para outro laboratório, evoluindo ou especializando (abstração vs especialização) que permitisse evoluir constantemente o aprendizado


### 2.9. Glossário de Termos (Glossary)

De uma forma geral, vamos tentar <ins>definir</ins> e <ins>caracterizar</ins> alguns dos termos utilizados neste projeto para permitir uma melhor compreensão e entendimento:

| Termo       | Significado                     |
| :---------- | :------------------------------ |
| `nerdctl`   | programa em linha de comando do Rancher Desktop que equivale ao `kubectl` ou `docker`. |


## 3. Projeto / Laboratório

### [LAB-01](./md/README-install-wsl-rancherdesktop-windows.md)
Install WSL, Rancher Desktop and command line with nerdctl

### [LAB-02](./md/README-basic-docker-commands.md)
Basic Docker Commands


### [LAB-03](./md/README-install-windows-client-mongodb-studio3t.md)
Windows Client MongoDB Studio 3T connect database

### [LAB-04](./md/README-docker-images-containers.md)
Docker Images vs Containers

### [LAB-05](./md/README-basic-kubernetes-commands.md)
Basic Kubernetes Commands

### [LAB-06](./md/README-kubernetes-python-flask-mongodb.md)
Kubernetes, Python, Flask e MongoDB

### [LAB-07](./md/README-kubernetes-selfhealing-healthcheck-resourceslimits.md)
Kubernetes Self Healing, application health check and resources limits

### [LAB-08](./md/README-install-windows-client-kubernetes-ide-lens.md)
Kubernetes IDE Lens


## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
* [Canal do Fabrício Veronez KubeDev no Youtube](https://www.youtube.com/channel/UCUy0NlW6WlVFj8V3xhXegYQ)