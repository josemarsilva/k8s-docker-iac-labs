`kubernetes-docker-rancherdesktop-labs/md/README-LAB-01.md` - Kubernetes, Docker e Rancher Desktop - LAB-01 - Instalação da infraestrutura _OnPremisse_ do RanckerDesktop

## 1. Introdução

Este documento contém os artefatos dolaboratório **LAB-01: Instalação da infraestrutura _OnPremisse_ do RanckerDesktop** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
* Obter os binários e instalar o Rancher Desktop em ambiente Windows
* Explorar os recursos e funcionalidades básicas do Rancher Desktop

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
  * [3.2. Guia do Desenvolvedor e Administrador](#32-guia-do-desenvolvedor-e-administrador)
  * [3.3. Guia de Implantação, Configuração e Instalação](#33-guia-de-implantação-configuração-e-instalação)
    + [a. Instalando/Clonando este repositório no ambiente](#a-instalando-clonando-este-repositório-no-ambiente)
    + [b. Instalando NodeJS (em Linux Ubuntu)](#b-instalando-nodejs--em-linux-ubuntu-)
    + [c. Instalando Docker e Docker Composer (em Linux Ubuntu)](#c-instalando-docker-e-docker-composer--em-linux-ubuntu-)
    + [d. Instalando JMeter](#d-instalando-jmeter)
  * [3.4. Guia de Demonstração e Teste](#34-guia-de-demonstração-e-teste)
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
    + [3.5.1. Patterns, Standard, Conventions and Best Practices](#351-patterns-standard-conventions-and-best-practices)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](./doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](./doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop.png) 


### 2.3. Diagrama de BPMN (Business Process Modeling Notation)

*  n/a


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop.png) 


### 2.5. Estratégia de Branches (Branch Strategy Workflow)

*  n/a


### 2.6. Diagrama de Pacotes Classes (Packages and Class Class Diagram)

*  n/a


### 2.7. Diagrama de Sequencia (Sequence Diagram)

*  n/a


### 2.8. Notas de atenção e Avisos (Notice and information)

*  n/a


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

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)

### 3.2. Guia do Desenvolvedor e Administrador

* n/a

### 3.3. Guia de Implantação, Configuração e Instalação

#### a. Instalar WSL - Windows for Linux Subsystem

* No Windows: Instale o WSL - Windows Subsystem for Linux

```cmd
C:\githome> wsl --install
```

* Em caso de dúvida consulte a [documentação](https://docs.microsoft.com/pt-br/windows/wsl/install)

#### b. Instalando Rancher Desktop for Windows

* No Windows: faça o download dos binários do Rancher Desktop for Windows
  * Clique na opção de instalar ou baixar os binários de instalação do site oficial do fabricante do [Rancher Desktop](https://rancherdesktop.io/)


* No Windows: Continue o procedimento de instalação do Rancher Desktop
  * Utilize este vídeo [tutorial de instalação](https://www.youtube.com/watch?v=suz9No_FHSo&t=635s)

* No Windows: Comece a se acostumar que o programa client que implementa as linhas de comandos para o Rancher Destop é o `nerdctl` e não mais os programas `kubectl` e `docker`

* No Windows: Baixe algumas imagens para iniciar

```cmd
C:\> nerdctl image pull nginx
     :
C:\> nerdctl image pull alpine
     :
C:\> nerdctl image pull httpd
     :
C:\> nerdctl image pull hello-world
     :
C:\> nerdctl image ls
REPOSITORY     TAG       IMAGE ID        CREATED           PLATFORM       SIZE
alpine         latest    21a3deaa0d32    25 minutes ago    linux/amd64    5.9 MiB
hello-world    latest    975f4b14f326    39 seconds ago    linux/amd64    20.0 KiB
httpd          latest    0954cc1af252    24 minutes ago    linux/amd64    150.1 MiB
nginx          latest    0d17b565c37b    5 days ago        linux/amd64    149.1 MiB
```

#### c. Screenshot do Rancher Desktop for Windows

![screenshot-rancher-desktop.png](../doc/screenshots/screenshot-rancher-desktop.png) 


### 3.4. Guia de Demonstração e Teste

* n/a


### 3.5. Guia de Estudo

* n/a


## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

