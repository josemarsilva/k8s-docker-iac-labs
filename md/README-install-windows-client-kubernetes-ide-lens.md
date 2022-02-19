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
    + [b. Configurar o cluster Kubernetes no Lens](#b-configurar-o-cluster-kubernetes-no-lens)
    + [c. Conectar Lens Kubernetes IDE no Windows com cluster Kubernetes](#c-conectar-lens-kubernetes-ide-no-windows-com-cluster-kubernetes)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 

### 2.2. Diagrama de Implantação (Deploy Diagram)

* Contexto da ferramenta Lens IDE para Kubernetes 

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop-lens-ide.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

* Contexto da ferramenta Lens IDE para Kubernetes

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-install-windows-client-kubernetes-ide-lens.png) 


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

#### a. Obter os binários e instalar o Lens Kubernetes IDE

* [Download do binário e instalação de Lens Kubernetes IDE for Windows](https://k8slens.dev/)


#### b. Configurar o cluster Kubernetes no Lens

* Obter o Kubeconfig `´/.kube/config` e adicionar seu conteudo ao `File >> Add cluster`

```cmd
C:\src> TYPE "%USERPROFILE%\.kube\config"
```

#### c. Conectar Lens Kubernetes IDE no Windows com cluster Kubernetes

* Connecte-se ao seu cluster Kubernetes favorito e observe a barra lateral esquerda com os menus de opções
  * ![MindMapDiagram-Context.png](../doc/screenshots/screenshot-kubernetes-ide-lens-a.png) 
  * ![MindMapDiagram-Context.png](../doc/screenshots/screenshot-kubernetes-ide-lens-a.png) 


## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
* Kubernetes IDE
  * [Lens](https://k8slens.dev/)
  * [Introduction to Lens - The Kubernetes IDE](https://www.youtube.com/watch?v=eeDwdVXattc)