`kubernetes-docker-rancherdesktop-labs/md/README-golang-basic.md` - Go Language Basic Programming

## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-12: GoLang Basic Programming** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
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
    + [a. Fundamentos Importantes da lingaguem GoLang](#35a-fundamentos-importantes-da-linguagem-golang)
    + [b. Desenvolvimento Web Server GoLang](#35b-desenvolvimento-webserver-golang)
    + [c. Conectar banco de dados com GoLang](#35c-conectar-banco-de-dados-golang)
    + [d. Construir aplicação Web CRUD](#35d-construir-uma-aplicação-web-crud-com-database)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-golang-helloworld.png) 

### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop-golang.png) 


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
* Docker or Kubernetes or VirtualBox or On-Premisse infrastructure (Deployment Infraestructure)
* GoLang

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.5. Guia de Estudo

#### 3.5.a. Fundamentos importantes da linguagem GoLang

* [Homepage Oficial -  The Go Programming Language](https://go.dev/) contém informações, tutoriais e download
* Primeira linha do arquivo contem o `package` que é o identificador do pacote, equivale ao namespace de contexto. 
* Existe um pacote principal chamado `main` o _start-point_ de uma aplicação é uma função que tenha o mesmo nome do package. Ex: `package main  ... function main() { ... }`
* GoLang usa um módulo 

```cmd
C:\> go mod init golang-basic
C:\> dir go.mod
```

* Exercício no. 1: Construa uma aplicação em GoLang para dar hello

```cmd
C:\> type main.go
C:\> go run main.go 
Hello Go world!
```

* O comando `go run ...` eu estou apenas executando (interpretando) a aplicação 
* O comando `go build ...` constrói o binário (.exe) 
* O comando `go help` apresenta o help

* GoLang reclama se você declarar uma variável e não utilizar
* GoLang usa notação := para declarar e = para atribuir. Ex: `x := "valor"` e `x = "valor2"`
* GoLang é uma linguagem fortemente tipada

* Exercício no. 2: Construa uma aplicação em GoLang para dar hello

```cmd
C:\> type variables.go
C:\> go run variables.go 
Hello Go variables declaration and use World!
```


#### 3.5.b. Desenvolvimento Web Server GoLang

* GoLang usa o comando `import` para importar bibliotecas. A biblioteca `net/http` fornece as funções de web-server
* Com poucas linhas constrói-se um webserver em GoLang, a biblioteca http implementa o servidor que fica ouvindo as requisições `http.ListenAndServ` e também é possível tratar rotas com `http.HandleFunc()`
* Exercício no. 3: Construa um servidor web que responda na porta 8081 com uma homepage em `/` e no caminho `/doc`.  Observe o resultado com o browser acessando `http://localhost:8081` e `http://localhost:8081/doc`

```cmd
C:\> type http-server.go
C:\> go run http-server.go
```


#### 3.5.c. Conectar banco de dados GoLang

* GoLang permite que uma função retorne mais de um valor. Ex: `db, er := sql.Open()`
* A função `log.Fatal()` apresenta a exceção
* Sua função precisa retornar vazio `nil` para indicar que foi executada com sucesso

* Exercício no. 4: Inicie um container com MSSQL Server e crie uma tabela onde sua aplicação GoLang irá inserir registros. Consulte documentação [Dockerhub MSSQL Server](https://hub.docker.com/_/microsoft-mssql-server) se necessário.

```cmd
C:\> nerdctl container run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=StrongPassword@123" -p 1433:1433 --name mssqlserver -d mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04
```

```cmd
C:\> nerdctl container ls
CONTAINER ID    IMAGE                                                    COMMAND                   CREATED          STATUS    PORTS                     NAMES
d0be22a2eaa6    mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04    "/opt/mssql/bin/perm…"    5 minutes ago    Up        0.0.0.0:1433->1433/tcp    mssqlserver
```

```cmd
C:\> nerdctl container exec -it mssqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P StrongPassword@123
```

```sqlcmd
CREATE DATABASE test
GO
USE test
GO
CREATE TABLE products ( id INT NOT NULL IDENTITY(1,1),  code VARCHAR(30) NOT NULL, description VARCHAR(255), price MONEY, PRIMARY KEY (id) )
GO
```

* Exercício no. 5: Construa uma aplicação que insere alguns registros na base de dados e em seguida consulte os registros para ter certeza que foram incluídos. Não se esqueça de importar os drivers de database se forem necessários. Consulte documentação https://go.dev/doc/database/querying

```cmd
C:\> type database.go
C:\> go get github.com/denisenkom/go-mssqldb
C:\> go run database.go
```

```sqlcmd
USE test
GO
SELECT DB_NAME();  
GO
SELECT * FROM tabela
```

* Observar o resultado esperado: deverão ser apresentadas tantas linhas quantas as vezes que foi executada a aplicação, pois ela faz insert na base de dados e não apaga. Porém, se o container do MSSQL for finalizado, a tabela e toda base de dados será descartada.

#### 3.5.d. Construir uma aplicação web CRUD com database

* Baseado em https://medium.com/baixada-nerd/criando-um-crud-simples-em-go-3640d3618a67 Construir uma aplicação web que responda na homepage `127.0.0.1:8081/`as opções: \[C\]reate, \[R\]etrieve all, \[U\]pdate e \[D\]elete com a base de dados MSSQL

* Exercício no. 5: Construa uma aplicação que insere alguns registros na base de dados e em seguida consulte os registros para ter certeza que foram incluídos. Não se esqueça de importar os drivers de database se forem necessários. Consulte documentação https://go.dev/doc/database/querying

```cmd
C:\> type http-server-crud-json-database-mssql
C:\> go run http-server-crud-json-database-mssql
```

* Abra a home page e navegue pelo criar, listar, alterar e remover
```browser
http://127.0.0.1:8081/
```


## I - Referências

* GoLang
  * [https://go.dev]
  * [O segredo da Go Lang: A linguagem que revolucionou o mercado](https://www.youtube.com/watch?v=gXb3Uwk-mEQ)
  * https://tour.golang.org/welcome/1
  * https://gobyexample.com/
  * https://www.casadocodigo.com.br/products/livro-google-go
* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

