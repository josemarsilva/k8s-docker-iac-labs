`kubernetes-docker-rancherdesktop-labs/md/README-docker-images-containers.md` - Kubernetes, Docker e Rancher Desktop - Imagens and Containers Docker
## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-04: Imagens Docker** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
* Conceituar
* Explorar os recursos e funcionalidades básicas do Rancher Desktop

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
    + [a. Conceito de Imagens vs Container Docker](#a-conceito-de-imagens-vs-container-docker)
    + [b. Docker Commit](#b-docker-commit)
    + [c. Dockerfile](#c-dockerfile)
    + [d. Docker Image History](#d-docker-image-history)
    + [e. Principais elementos da sintaxe do Dockerfile](#e-principais-elementos-da-sintaxe-do-dockerfile)


- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 

### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-docker-images-containers.png) 


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

#### a. Conceito de Imagens vs Container Docker

* Imagens são criadas em um sistema de sobreposição de camadas
* Imagens utilizam tecnologia de Overlay filesystems
* Permite combinação de sobreposições de camadas de leitura sobrepostas
* Container é uma sobreposição de uma camada de leitura/escrita sobre as camadas anteriores

![Sistema de sobreposição de imagens de filesystems](../doc/screenshots/screenshot-images-containers-overlay-filesystem-technology.png) 

* Há basicamente 2 formas de se criar uma imagem:
  * **Docker Commit**: a partir de uma imagem base, faz-se todas as alterações (sobreposições) e no final salva a imagem, o que pode tornar mais difícil de reproduzir, automatizar e versionar
  * **Dockerfile**: segue uma "receita de bolo" para criar uma imagem


#### b. Docker Commit

* Para criar uma imagem através do **Docker Commit**, executar um container a partir de uma imagem inicial do Ubuntu, instalar o utilitário `curl` e salvar o container como uma nova imagem

```cmd
C:\> nerdctl container run -it ubuntu /bin/bash
root@2ac5701eb05e:/# apt-get update
Get:1 http://security.ubuntu.com/ubuntu focal-security InRelease [114 kB]
 :
Reading package lists... Done

root@2ac5701eb05e:/# apt-get install curl -y
Reading package lists... Done
 :
done.

root@2ac5701eb05e:/# curl
curl: try 'curl --help' or 'curl --manual' for more information
root@2ac5701eb05e:/# exit

C:\> nerdctl container ls -la
CONTAINER ID    IMAGE                              COMMAND        CREATED          STATUS                       PORTS    NAMES
2ac5701eb05e    docker.io/library/ubuntu:latest    "/bin/bash"    4 minutes ago    Exited (2) 30 seconds ago 

C:\> nerdctl container commit 2ac5701eb05e ubuntu-curl-docker-commit
sha256:4b221c47b1dce3b6c3998330bb02ee26406d1d48ec44e65f14ef2e5fbd5432c5

C:\> nerdctl image ls
nerdctl image ls
REPOSITORY                   TAG       IMAGE ID        CREATED          PLATFORM       SIZE
    :                         :            :               :                :            :
ubuntu-curl-docker-commit    latest    fec2e2c8d528    2 minutes ago    linux/amd64    126.8 MiB
ubuntu                       latest    b5a61709a9a4    2 days ago       linux/amd64    77.9 MiB
    :                         :            :               :                :            :
```

* A partir da nova imagem criada `ubuntu-curl-docker-commit` pode-se executar um container baseado nesta imagem que virá alem do SO Ubuntu atualizado com o Curl instalado e passando como parâmetro de execução buscar a página do Google

```cmd
C:\> nerdctl container run ubuntu-curl-docker-commit curl http://www.google.com 
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0<!doctype html><html itemscope="" itemtype="http://schema.org/WebPage" lang="pt-BR"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
   :
```

#### c. Dockerfile

* Utilizando um editor de texto de sua preferência, lembrando que VSCode ajuda com sintaxe crie um arquivo com a "receita de bolo" equivalente ao que foi feito com Docker Commit, isto é uma imagem baseada no Ubuntu com o sistema operacional atualizado e com a ferramenta curl instalada
* Agora para organizar o repositório do projeto/laboratório, vamos assumir como padrão que os códigos ficarão abaixo de `./src/<nome-do-projeto-laboratório>`. Ex: `./src/lab-dockerfile`

```cmd
C:\> cd src
C:\src> md lab-dockerfile
C:\src> cd lab-dockerfile
C:\src\lab-dockerfile> 
```

* Utilizando o editor de texto (VSCode) crie o arquivo `.\src\lab-dockerfile\Dockerfile` com o seguinte conteúdo

```txt
FROM ubuntu
RUN apt-get update
RUN apt-get install curl -y
```

* Execute a sua receita

```cmd
C:\src\lab-dockerfile> nerdctl image build -t ubuntu-curl-dockerfile . 
[+] Building 43.2s (7/7) FINISHED
      :
cc2326d9fa)...done
```

* Liste as imagens disponíveis

```cmd
C:\src\lab-dockerfile> nerdctl image ls
REPOSITORY                   TAG       IMAGE ID        CREATED           PLATFORM       SIZE
     :                         :            :               :                :
ubuntu-curl-docker-commit    latest    fec2e2c8d528    33 minutes ago    linux/amd64    126.8 MiB
ubuntu-curl-dockerfile       latest    0feea6c17695    2 minutes ago     linux/amd64    126.8 MiB
ubuntu                       latest    b5a61709a9a4    2 days ago        linux/amd64    77.9 MiB
     :                         :            :               :                :
```

* A partir da nova imagem criada `ubuntu-curl-dockerfile` pode-se executar um container baseado nesta imagem que virá alem do SO Ubuntu atualizado com o Curl instalado e passando como parâmetro de execução buscar a página do Google

```cmd
C:\src\lab-dockerfile>  nerdctl container run ubuntu-curl-dockerfile curl http://www.google.com 
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0<!doctype html><html itemscope="" itemtype="http://schema.org/WebPage" lang="pt-BR"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
   :
```


#### d. Docker Image History

* **NÃO É** possível detalhar o histórico das camadas sobre uma imagem no `nerdctl`. Este comando ainda não foi implementado!

```cmd
C:\src\lab-dockerfile> nerdctl image history ubuntu-curl-dockerfile
```

* Para reconstruir a imagem

```cmd
C:\src\lab-dockerfile> nerdctl image build -t ubuntu-curl-dockerfile . 
[+] Building 43.2s (7/7) FINISHED
      :
cc2326d9fa)...done
```

#### e. Principais elementos da sintaxe do Dockerfile

```cmd
FROM        <imagem base>
RUN         <comando-executar>
LABEL       <labels-de-metadados-adicionados>
CMD         <define-comando-ou-parametros-padroes>
EXPOSE      <define-port-binding>
ARG         <argumentos-utilizados-no-processo-de-construcao>
ENV         <variaveis-de-ambiente>
ADD         <copia-arquivos-remoto-adicionando-ao-sistema>
COPY        <copia-arquivos-adicionado-ao-sistema>
ENTRYPOINT  <ajuda-configurar-container-que-pode-ser-executado>
VOLUME      <volumes-de-arquivos>
WORKDIR     <diretorio-corrente>
```




## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

* [INICIATIVA KUBERNETES - Aula 1 - Containers e Docker Simplificados](https://www.youtube.com/watch?v=lKxuO--0ypM)
