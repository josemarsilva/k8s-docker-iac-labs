`k8s-docker-iac-labs/md/README-install-dockerdesktop-wsl2-windows.md` - Docker Desktop e WSL 2 - LAB-35 - Instalação _On Premise_ do Docker Desktop e WSL 2

## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-35 - Instalação _On Premise_ do Docker Desktop e WSL 2** abaixo do projeto [k8s-docker-iac-labs](../README.md). Este laboratório consiste em:
* Obter os binários e instalar o Rancher Desktop em ambiente Windows
* Explorar os recursos e funcionalidades básicas do Rancher Desktop

##### Table of Contents  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.4. Diagrama de Mapa Mental (Mind Map Diagram)](#24-diagrama-de-mapa-mental-mind-map-diagram)
  * [2.9. Glossário de Termos (Glossary)](#29-glossário-de-termos-glossary)
- [3. Projeto / Laboratório](#3-projeto--laboratório)
  * [3.1. Pré-Requisitos, Pré-Condições e Premissas](#31-pré-requisitos-pré-condições-e-premissas)
    + [a. Tecnologias e ferramentas](#a-tecnologias-e-ferramentas)
    + [b. Ferramental de apoio](#b-ferramental-de-apoio)
  * [3.3. Guia de Implantação, Configuração e Instalação](#33-guia-de-implantação-configuração-e-instalação)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.drawio.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker.drawio.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-install-wsl-rancherdesktop-windows.png) 


### 2.8. Notas de atenção e Avisos (Notice and information)

* n/a

### 2.9. Glossário de Termos (Glossary)

De uma forma geral, vamos tentar <ins>definir</ins> e <ins>caracterizar</ins> alguns dos termos utilizados neste projeto para permitir uma melhor compreensão e entendimento:

| Termo       | Significado                     |
| :---------- | :------------------------------ |
| ` `         | . |


## 3. Projeto / Laboratório

### 3.1. Pré-Requisitos, Pré-Condições e Premissas

#### a. Tecnologias e ferramentas

* Windows _On Premise_
* WSL 2 - Windows Subsystem for Linux 2
* Docker Desktop for Windows 11

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.3. Guia de Implantação, Configuração e Instalação

#### a. Instalando Docker Desktop for Windows no Windows 11

* No Windows: faça o download dos binários do Docker Desktop for Windows 11
  * Clique na opção de instalar ou baixar os binários de instalação do site oficial do fabricante do [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)


* Execute o binário de instalação do Docker Desktop, dando sequencia aos passos intermediários até o final da instalação

![screenshot-docker-desktop.png](../doc/screenshots/screenshot-docker-desktop.png) 

* Faça o login `Sign in` em sua conta Docker Hub

![screenshot-docker-desktop-sigin.png](../doc/screenshots/screenshot-docker-desktop-sigin.png) 


* Abra o _Docker Desktop_ e navegue até a opção `Settings`

![screenshot-docker-desktop-config-resource-wsl-integration.png](../doc/screenshots/screenshot-docker-desktop-config-resource-wsl-integration.png) 



* Teste a execução do Docker Desktop com um container chamado `hello-world`:

```cmd
>docker container run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
c1ec31eb5944: Pull complete
Digest: sha256:4bd78111b6914a99dbc560e6a20eab57ff6655aea4a80c50b0c5491968cbc2e6
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
:
```

* Liste todos os containers que estão em execução ou os que já terminaram

```cmd
>docker ps -a
CONTAINER ID   IMAGE         COMMAND    CREATED              STATUS                          PORTS     NAMES
30e2d2b6bff7   hello-world   "/hello"   About a minute ago   Exited (0) About a minute ago             quirky_beaver
```


#### b. Instalar WSL 2 - Windows for Linux Subsystem 2 - distribuição Ubuntu 20.04

* Consulte documentação Oficial do fornecedor e documentações adicionais
  * [Documentação Oficial do Fornecedor](https://learn.microsoft.com/pt-br/windows/wsl/install)

* No prompt de comando do Windows: **Instale o WSL** - Windows Subsystem for Linux

```cmd
> wsl --install
```

* No prompt de comando do Windows: **Lista as distribuições** válidas que podem ser instaladas

```cmd
> wsl --list --online

A seguir está uma lista de distribuições válidas que podem ser instaladas.
Instale usando "wsl --install -d <Distro>".

NAME                                   FRIENDLY NAME
Ubuntu                                 Ubuntu
Debian                                 Debian GNU/Linux
kali-linux                             Kali Linux Rolling
Ubuntu-18.04                           Ubuntu 18.04 LTS
Ubuntu-20.04                           Ubuntu 20.04 LTS
Ubuntu-22.04                           Ubuntu 22.04 LTS
OracleLinux_7_9                        Oracle Linux 7.9
OracleLinux_8_7                        Oracle Linux 8.7
OracleLinux_9_1                        Oracle Linux 9.1
openSUSE-Leap-15.5                     openSUSE Leap 15.5
SUSE-Linux-Enterprise-Server-15-SP4    SUSE Linux Enterprise Server 15 SP4
SUSE-Linux-Enterprise-15-SP5           SUSE Linux Enterprise 15 SP5
openSUSE-Tumbleweed                    openSUSE Tumbleweed
```

* No prompt de comando do Windows: **Instale a distribuição** do Linux Ubuntu-20.04 no subsystem

```cmd
> wsl --install -d Ubuntu-20.04
Instalando: Ubuntu 20.04 LTS
Ubuntu 20.04 LTS já foi instalado.
Iniciando Ubuntu 20.04 LTS...
Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username:
root@LP1764:~#
```

* No prompt de comando do Windows: **Defina a versão 2** para a imagem do Linux Ubuntu-20.04

```cmd
> wsl --set-default-version 2
Para informações sobre as principais diferenças com o WSL 2, visite https://aka.ms/wsl2

A operação foi concluída com êxito.

>wsl --install -d Ubuntu-20.04
Ubuntu 20.04 LTS já está instalado.
Iniciando Ubuntu 20.04 LTS...
root@LP1764:~#
```

* No prompt de comando do Windows: **Liste as versões** de imagens instaladas

```cmd
> wsl --list --verbose
  NAME                   STATE           VERSION
* docker-desktop         Running         2
  Ubuntu-20.04           Stopped         2
  docker-desktop-data    Running         2
```

#### c. Instalar Kubernetes no Docker Desktop

* Consulte documentação Oficial do fornecedor e documentações adicionais
  * [Documentação Oficial do Fornecedor](https://docs.docker.com/desktop/kubernetes/)

* Abra o _Docker Desktop_ e navegue até a opção `Settings` e **instalar e habilitar** o Kubernetes

![screenshot-docker-desktop-install-enable-kubernetes.png](../doc/screenshots/screenshot-docker-desktop-install-enable-kubernetes.png) 


* Teste a execução do Kubernetes:

```cmd
```



## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
* WSL - Windows Subsystem for Linux
  * [Sobre configuração WSL e modos de instalação de Docker no Windows](https://www.youtube.com/watch?v=O0HqVNkzY1Q)
  * [Guia rápido do WSL2 + Docker](https://github.com/codeedu/wsl2-docker-quickstart)
* Ferramentas e acessórios:
  * [Configurando o melhor ambiente de desenvolvimento](https://youtu.be/O0HqVNkzY1Q)
