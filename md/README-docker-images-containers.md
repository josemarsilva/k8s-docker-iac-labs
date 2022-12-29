`k8s-docker-iac-labs/md/README-docker-images-containers.md` - Kubernetes, Docker e Rancher Desktop - Imagens and Containers Docker
## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-04: Imagens Docker** abaixo do projeto [k8s-docker-iac-labs](../README.md). Este laboratório consiste em:
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
    + [f.  Dockerfile aplicação exemplo NodeJS Web](#f-dockerfile-aplicação-exemplo-nodejs-web)
    + [g. Dockerfile aplicação exemplo NodeJS Web e MongoDB](#g-dockerfile-aplicação-exemplo-nodejs-web-e-mongodb)
    + [h. Registrar (upload) imagem no repositório Docker Hub](#h-registrar-upload-imagem-no-repositório-docker-hub)
    + [i. Boas práticas construção de imagens Docker](#i-boas-práticas-construção-de-imagens-docker)
    + [j. Container com argumentos em linha de comando](#j-container-com-argumentos-em-linha-de-comando)
    + [k. Multi stage build](#k-multi-stage-build)
    + [l. Docker Registry](#l-docker-registry)


- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

* Caso de Uso - Infraestrutura Kubernetes/Docker

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 

* Caso de Uso - Aplicações NodeJs de Conversão de Temperatura e API Cadastro de Produto

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-node-web-api-app.png) 

* Caso de Uso - Aplicações GoLang Hello Wold
![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-golang-helloworld.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

* Implantação container aplicação NodeJS - Conversão Temperatura

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-nodejs.png)

* Implantação container aplicação NodeJS e MongoDB - API Produtos

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-nodejs-mongo.png)

* Implantação container aplicação GoLang - Hello World

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-golang.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-docker-images-containers.png) 


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
* NodeJS (Development, Build and Deploy)
* GoLang


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
* Agora para organizar o repositório do projeto/laboratório, vamos assumir como padrão que os códigos ficarão abaixo de `./src/<nome-do-projeto-laboratório>`. Ex: `./src/dockerfile-ubuntu-curl`

```cmd
C:\> cd src
C:\src> md dockerfile-ubuntu-curl
C:\src> cd dockerfile-ubuntu-curl
C:\src\dockerfile-ubuntu-curl> 
```

* Utilizando o editor de texto (VSCode) crie o arquivo `.\src\dockerfile-ubuntu-curl\Dockerfile` com o seguinte conteúdo

```txt
FROM ubuntu
RUN apt-get update
RUN apt-get install curl -y
```

* Execute a sua receita

```cmd
C:\src\dockerfile-ubuntu-curl> nerdctl image build -t ubuntu-curl-dockerfile . 
[+] Building 43.2s (7/7) FINISHED
      :
cc2326d9fa)...done
```

* Liste as imagens disponíveis

```cmd
C:\src\dockerfile-ubuntu-curl> nerdctl image ls
REPOSITORY                   TAG       IMAGE ID        CREATED           PLATFORM       SIZE
     :                         :            :               :                :
ubuntu-curl-docker-commit    latest    fec2e2c8d528    33 minutes ago    linux/amd64    126.8 MiB
ubuntu-curl-dockerfile       latest    0feea6c17695    2 minutes ago     linux/amd64    126.8 MiB
ubuntu                       latest    b5a61709a9a4    2 days ago        linux/amd64    77.9 MiB
     :                         :            :               :                :
```

* A partir da nova imagem criada `ubuntu-curl-dockerfile` pode-se executar um container baseado nesta imagem que virá alem do SO Ubuntu atualizado com o Curl instalado e passando como parâmetro de execução buscar a página do Google

```cmd
C:\src\dockerfile-ubuntu-curl>  nerdctl container run ubuntu-curl-dockerfile curl http://www.google.com 
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0<!doctype html><html itemscope="" itemtype="http://schema.org/WebPage" lang="pt-BR"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
   :
```


#### d. Docker Image History

* **NÃO É** possível detalhar o histórico das camadas sobre uma imagem no `nerdctl`. Este comando ainda não foi implementado!

```cmd
C:\src\dockerfile-ubuntu-curl> nerdctl image history ubuntu-curl-dockerfile
```

* Para reconstruir a imagem

```cmd
C:\src\dockerfile-ubuntu-curl> nerdctl image build -t ubuntu-curl-dockerfile . 
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


#### f. Dockerfile aplicação exemplo NodeJS Web

* Explorar a aplicação NodeJS Web Conversão Temperatura
  * Instalar pacote de dependências
  * Executar a aplicação manualmente
  * Explorar a aplicação

```cmd
C:\src> cd node-conversao-temperatura
C:\src\node-conversao-temperatura> npm install
C:\src\node-conversao-temperatura> node server.js
  Servidor rodando na porta 8080
     :
```

![screenshot-nodejs-conversao-temperatura.png](../doc/screenshots/screenshot-nodejs-conversao-temperatura.png) 

* Configurar e executar uma imagem montada pelo Dockerfile para esta aplicacao
  * Consultar no Docker Hub o registry oficial do fabricante a imagem base: https://hub.docker.com/_/node
  * Editar/Configurar arquivo Dockerfile
  * Construir imagem com Dockerfile
  * Executar imagem

```cmd
C:\src> cd node-conversao-temperatura
C:\src\node-conversao-temperatura> TYPE Dockerfile
C:\src\node-conversao-temperatura> nerdctl image build -t josemarsilva/conversao-temperatura:v1 .
    :
unpacking docker.io/josemarsilva/conversao-temperatura:v1 (sha256:)...done

C:\src\node-conversao-temperatura> nerdctl image ls
REPOSITORY                            TAG       IMAGE ID        CREATED          PLATFORM       SIZE
    :                                  :          :                :               :            :
josemarsilva/conversao-temperatura    v1        c56df81725c0    50 seconds ago    linux/amd64    1.1 GiB
    :                                  :          :                :               :            :

C:\src\node-conversao-temperatura> nerdctl container run -d -p 8080:8080 josemarsilva/conversao-temperatura:v1

C:\src\node-conversao-temperatura> nerdctl container ls
CONTAINER ID    IMAGE                                              COMMAND                   CREATED          STATUS    PORTS                     NAMES
    :             :                                                    :                         :
2d9854f79941    docker.io/josemarsilva/conversao-temperatura:v1    "docker-entrypoint.s…"    9 seconds ago    Up        0.0.0.0:8080->8080/tcp
    :             :                                                    :                         :
```

* Explorar a aplicação `http://localhost:8080/api-docs/`

#### g. Dockerfile aplicação exemplo NodeJS Web e MongoDB


* Explorar a aplicação NodeJS Web API Produto
  * Instalar pacote de dependências
  * Executar a aplicação manualmente container do MongoDB
  * Executar a aplicação manualmente container da API produto
  * Explorar a aplicação
  * Construir imagem com Dockerfile
  * Executar imagem


* Executando container MongoDB

```cmd
C:\src> cd node-mongo-api-produto
C:\src\node-mongo-api-produto> nerdctl container run -d -p "27017:27017" -e MONGO_INITDB_ROOT_USERNAME=mongouser -e MONGO_INITDB_ROOT_PASSWORD=mongopwd mongo

C:\src\node-mongo-api-produto> nerdctl container ls
CONTAINER ID    IMAGE                             COMMAND                   CREATED           STATUS    PORTS                       NAMES
8ff9a3d7f985    docker.io/library/mongo:latest    "docker-entrypoint.s…"    15 seconds ago    Up        0.0.0.0:27017->27017/tcp

```

* Executando container API Produto

```cmd
C:\src\node-mongo-api-produto> npm install
C:\src\node-mongo-api-produto> node server.js
  Servidor rodando na porta 8080
     :
```

* Explorar a aplicação `http://localhost:8080/api-docs/`

![screenshot-nodejs-api-produto.png](../doc/screenshots/screenshot-nodejs-api-produto.png) 

* Construindo imagem Dockerfile

```cmd
C:\src\node-mongo-api-produto> nerdctl image build -t josemarsilva/api-produto:v1 .
unpacking docker.io/josemarsilva/api-produto:v1 (sha256:9979811d23a917b7467161341b28a7ea12f8d679907e61ae5449a7464f5205f7)...done

C:\src\node-mongo-api-produto> nerdctl image ls
REPOSITORY                            TAG       IMAGE ID        CREATED               PLATFORM       SIZE
    :                         :           :                :                 :           :
josemarsilva/api-produto              v1        9979811d23a9    About a minute ago    linux/amd64    278.6 MiB
josemarsilva/conversao-temperatura    latest    e25deb92730e    3 minutes ago         linux/amd64    1.1 GiB
    :                         :           :                :                 :           :

C:\src\node-mongo-api-produto> nerdctl run -d -p 8080:8080 josemarsilva/api-produto:v1

C:\src\node-mongo-api-produto> nerdctl container ls
CONTAINER ID    IMAGE                                             COMMAND                   CREATED           STATUS    PORTS                       NAMES
     :           :                                                   :                          :             :           :
21e4fcca022a    docker.io/josemarsilva/api-produto:v1             "docker-entrypoint.s…"    10 seconds ago    Up        0.0.0.0:8080->8080/tcp
8ff9a3d7f985    docker.io/library/mongo:latest                    "docker-entrypoint.s…"    55 minutes ago    Up        0.0.0.0:27017->27017/tcp
a925aa680032    docker.io/library/conversao-temperatura:latest    "docker-entrypoint.s…"    42 minutes ago    Up        0.0.0.0:8080->8080/tcp
     :           :                                                   :                          :             :           :
```

* Explorar a aplicação `http://localhost:8080/api-docs/`


#### h. Registrar (upload) imagem no repositório Docker Hub

```cmd
REPOSITORY                            TAG       IMAGE ID        CREATED          PLATFORM       SIZE
    :                                  :           :                :                 :           :
josemarsilva/api-produto              v1        9979811d23a9    3 minutes ago    linux/amd64    278.6 MiB
josemarsilva/conversao-temperatura    latest    e25deb92730e    5 minutes ago    linux/amd64    1.1 GiB
    :                                  :           :                :                 :           :

```

#### i. Boas práticas construção de imagens Docker

* Nomeando sua imagem Docker
  * Exemplos:
    * `<namespace>/<repository>:<tags>`
    * `fabricioveronez/api-conversao:v1`
  * Exceção:
    * `ubuntu:20.10` quando proprietário oficial é o próprio Docker não tem namespace
* Dar preferência a usar imagens oficiais
* Sempre especifique tags na imagem
  * Tageamento das imagens: `latest` é a imagem mais atual
* Cada container conter apenas um processo
  * Evitar perder escalabilidade e granularidade
  * Ex: não montar um container com NodeJS + MongoDB + MySQL + RabbitMQ + Kafka
* Aproveitamento das camadas
  * Evitar `COPY . .`
  * Utilizar mais de um passo de `COPY` para aproveitar o cache
  * Use o dockerignore.
* COPY vs ADD
  * Melhor prática: utilize de preferência o `COPY`
* ENTRYPOINT vs CMD
  * ENTRYPOINT é imutável, não é possível sobrescrever
  * O uso combinado de ENTRYPOINT e CMD é interessante


#### j. Container com argumentos em linha de comando

* Configurar Dockerfile para imagem ubuntu onde a versão do SO é passada como parâmetro

```cmd
C:\src> cd dockerfile-ubuntu-curl-args
C:\src\dockerfile-ubuntu-curl-args> Code Dockerfile
```

* Criar a imagem especificando a versão do ubuntu

```cmd
C:\src\dockerfile-ubuntu-curl-args> nerdctl image build -t josemarsilva/ubuntu-arg:v1 --build-arg TAG="18.04" .
```

* Criar a imagem usando a ultima versao `latest`

```cmd
C:\src\dockerfile-ubuntu-curl-args> nerdctl image build -t josemarsilva/ubuntu-arg:v1 .
```


#### k. Multi stage build

* Tipos de lingaugens de programação:
  * Compiladas
  * Interpretadas
  * Just in Time: linguagem intermediária + interpretador

* Explorar a aplicação Hello Wold em GoLang

```cmd
C:\src> cd dockerfile-golang-helloworld
C:\src\dockerfile-golang-helloworld> Code main.go
```

* Executar HelloWorld pela linha de comando

```cmd
C:\src\dockerfile-golang-helloworld> go run main.go
Hello World !!!
```

* Configurar Dockerfile para imagem GoLang de Hello World

```cmd
C:\src\dockerfile-golang-helloworld> COPY /Y Dockerfile-full-sdk-image Dockerfile
        1 arquivo(s) copiado(s).
C:\src\dockerfile-golang-helloworld> TYPE Dockerfile
C:\src\dockerfile-golang-helloworld> nerdctl build -t josemarsilva/golang-helloworld:v1 .
unpacking docker.io/josemarsilva/golang-helloworld:v1 (sha256:4a6d47c218b194d6fb88e6065bf2380265ccc3e45ed674d987c3244907c029f0)...done

C:\src\dockerfile-golang-helloworld> nerdctl image ls
REPOSITORY                       TAG       IMAGE ID        CREATED               PLATFORM       SIZE
     :                            :          :              :                     :
josemarsilva/golang-helloworld    v1     4a6d47c218b1    15 seconds ago    linux/amd64    702.1 MiB
     :                            :          :              :                     :

```

* Porem a imagem de 702 MB contém todo o SDK para compilar o GoLang, agora vamos usar uma imagem alpine que é mais leve e tem somente o _run-time_
* Multi stage permite compilar a imagem com um pacote de build e no momento do deploy final usar uma imagem reduzida como base somente com o Run-time

```cmd
C:\src\dockerfile-golang-helloworld> COPY /Y Dockerfile-alpine Dockerfile
        1 arquivo(s) copiado(s).
C:\src\dockerfile-golang-helloworld> TYPE Dockerfile
C:\src\dockerfile-golang-helloworld> nerdctl build -t josemarsilva/golang-helloworld:alpine .
unpacking docker.io/josemarsilva/golang-helloworld:alpine (sha256:12a2e06a9bc43fde273bf8a386595d1b6daaba7c5f164529ca0f5dd037c930c8)...done

C:\src\dockerfile-golang-helloworld> nerdctl image ls
REPOSITORY                       TAG       IMAGE ID        CREATED               PLATFORM       SIZE
     :                            :          :              :                     :
josemarsilva/golang-helloworld    alpine    12a2e06a9bc4    26 seconds ago    linux/amd64    7.5 MiB
josemarsilva/golang-helloworld    v1        4a6d47c218b1    11 minutes ago    linux/amd64    702.1 MiB
     :                            :          :              :                     :
```

* Agora é possível observar que a imagem ficou com 7.5 MB

```cmd
C:\src\dockerfile-golang-helloworld> nerdctl container run josemarsilva/golang-helloworld:v1
Hello World !!!

C:\src\dockerfile-golang-helloworld> nerdctl container run josemarsilva/golang-helloworld:alpine
Hello World !!!

```

#### l. Docker Registry

* O serviço de registry mais utilizado e conhecido é o [Docker Hub](https://hub.docker.com/)
* Há outros serviços de registry disponíveis:
  * Docker Hub
  * Elastic Container Registry - AWS
  * Azure Container Registry - Azure
  * Google Container - Google
  * Harbor - User Custom
* No Docker Hub o identificador de seu login é o seu namespace para nomenlatura de repoistorios


* Efetue o login no servico do Docher Hub

```cmd
C:\src> nerdctl login -u josemarsilva
Enter Password:
Login Succeeded
```

* Localize a imagem armazenada localmente: josemarsilva/conversao-temperatura:v1

```cmd
C:\src> nerdctl image ls
REPOSITORY                            TAG       IMAGE ID        CREATED              PLATFORM       SIZE
     :                                 :           :                :                   :
josemarsilva/conversao-temperatura    v1        c56df81725c0    13 minutes ago       linux/amd64    1.1 GiB
```

* Fazer upload da imagem local para o Registry Repository do Docker Hub `josemarsilva/conversao-temperatura:v1`

```cmd
C:\src> nerdctl push josemarsilva/conversao-temperatura:v1
```

* É uma boa prática marcar a tag `latest` com a última versão do aplicativo. Isto pode ser feito sem necessidade de ser reconstruir _build_ o aplicativo.

```cmd
C:\src> nerdctl tag josemarsilva/conversao-temperatura:v1 josemarsilva/conversao-temperatura:latest
C:\src> nerdctl image ls
REPOSITORY                            TAG       IMAGE ID        CREATED              PLATFORM       SIZE
    :                                  :           :                 :                    :
josemarsilva/conversao-temperatura    latest    c56df81725c0    21 seconds ago       linux/amd64    1.1 GiB
josemarsilva/conversao-temperatura    v1        c56df81725c0    23 minutes ago       linux/amd64    1.1 GiB
    :                                  :           :                 :                    :

C:\src> nerdctl push josemarsilva/conversao-temperatura:latest
```

* Consulte o site [Docker Hub](https://hub.docker.com/) e localize a imagem que você acabou de enviar

![screenshot-docker-hub-a.png](../doc/screenshots/screenshot-docker-hub-a.png) 

![screenshot-docker-hub-b.png](../doc/screenshots/screenshot-docker-hub-b.png) 


## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

* [INICIATIVA KUBERNETES - Aula 1 - Containers e Docker Simplificados](https://www.youtube.com/watch?v=lKxuO--0ypM)
