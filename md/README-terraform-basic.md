`kubernetes-docker-rancherdesktop-labs/md/README-terraform-basic.md` - Terraform Basic

## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-14: Terraform Basic** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
* Explorar os recursos e funcionalidades básicas 

##### Table of Contents  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.4. Diagrama de Mapa Mental (Mind Map Diagram)](#24-diagrama-de-mapa-mental-mind-map-diagram)
  * [2.9. Glossário de Termos (Glossary)](#29-glossário-de-termos-glossary)
- [3. Projeto / Laboratório](#3-projeto--laboratório)
  * [3.1. Pré-Requisitos, Pré-Condições e Premissas](#31-pré-requisitos-pré-condições-e-premissas)
    + [a. Tecnologias e ferramentas](#a-tecnologias-e-ferramentas)
    + [b. Ferramental de apoio](#b-ferramental-de-apoio)
  * [3.3. Guia de Implantação, Configuração e Instalação](#33-guia-de-implantação-configuração-e-instalação)
    + [3.3.1. Instalar Terraform para Windows](#331-instalar-terraform-para-windows)
    + [3.3.2. Instalar Terraform para Linux](#332-instalar-terraform-para-linux)
    + [3.3.3. Instalar Terraform em container Docker](#333-instalar-terraform-em-container-docker)
    + [3.3.4. Configurar .gitignore](#334-configurar-gitignore)
    + [3.3.5. Create/Configure AWS credential access key on AWS CLI](#335-createconfigure-aws-credential-access-key-on-aws-cli)
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
    + [3.5.1. Provisionar AWS EC2 Instance](#351-provisionar-aws-ec2-instance)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png)

### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-Context-terraform-aws.png)

### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-basic-terraform.png) 


### 2.9. Glossário de Termos (Glossary)

De uma forma geral, vamos tentar <ins>definir</ins> e <ins>caracterizar</ins> alguns dos termos utilizados neste projeto para permitir uma melhor compreensão e entendimento:

| Termo       | Significado                     |
| :---------- | :------------------------------ |
| `nerdctl`   | programa em linha de comando do Rancher Desktop que equivale ao `docker`. |


## 3. Projeto / Laboratório

### 3.1. Pré-Requisitos, Pré-Condições e Premissas

#### a. Tecnologias e ferramentas

* Windows OnPrimesse
* WSL - Windows Subsystem for Linux
* Rancher Desktop for Windows
* Docker or Kubernetes or VirtualBox or On-Premisse infrastructure (Deployment Infraestructure)
* Cloud infrastructure: AWS or GPC or OracleCloud or Azure
  * AWS CLI installed (version 2.x)
  * AWS Credential Access Key

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.3. Guia de Implantação, Configuração e Instalação

#### 3.3.1. Instalar Terraform para Windows

* **Objetivo**: Download e instalação dos binários instalação Terraform para Windows

* Windows Amd64 binary download from https://www.terraform.io/downloads
* Unzip downloaded file `terraform_1.1.9_windows_amd64.zip`
  * Add sub-directory to system path - Configurações >> Sobre >> Configurações relacionadas >> Configurações avançadas de sistema >> botão Variável de ambiente >> Variáveis de usuários >> Path
  * Verify installation

```cmd
C:\> terraform -v
Terraform v1.1.9
on windows_amd64
```


#### 3.3.2. Instalar Terraform para Linux

* **Objetivo**: Download e instalação dos binários instalação Terraform para Linux

* Linux Amd64 binary download from https://www.terraform.io/downloads
* Unzip downloaded file `terraform_1.1.9_windows_amd64.zip`
  * Add sub-directory to system path - 
  * Verify installation

```sh
$ unzip terraform_1.1.9_linux_amd64.zip
$ sudo mv terraform /usr/local/bin
$ terraform -v
Terraform v1.1.9
on linux_amd64
$ touch ~/.bashrc
$ terraform -install-autocomplete
```


#### 3.3.3. Instalar Terraform em container Docker

* **Objetivo**: Download (pull) e instalação dos binários do Terraform em um container

* **Passo 1**: Consultar a documentação da(s) imagen(s) disponíveis no Dockerhub:
  * [Terraform](https://hub.docker.com/r/hashicorp/terraform) is an infrastructure as code (IaC) tool that allows you to build, change, and version infrastructure safely and efficiently. This includes low-level components such as compute instances, storage, and networking, as well as high-level components such as DNS entries, SaaS features, etc. Terraform can manage both existing service providers and custom in-house solutions.
  * [The terraform-k8s](https://hub.docker.com/r/hashicorp/terraform-k8s) binary includes first-class integrations between Terraform and Kubernetes. The project encapsulates multiple use cases, including a Terraform Cloud Operator that synchronizes a Kubernetes Workspace (Custom Resource) to a Terraform Cloud Workspace. This README will present a basic overview of each use case, but for full documentation please reference the Terraform Cloud website.

* **Passo 2**: Baixar (pull) da imagem do Terraform em um container Docker

```sh
$ docker pull hashicorp/terraform
```

* **Passo 3**: Invocar o Help pela command line interface

```sh
$ docker container run -it hashicorp/terraform
Usage: terraform [global options] <subcommand> [args]
  :
The available commands for execution are listed below.
  :
```


#### 3.3.4. Configurar .gitignore

* **Objetivo**: Configurar o arquivo `.gitignore` para ignorar os arquivos temprários do terraform

```sh
$ vi .gitignore
  :
# Terraform
infra/.terraform*
infra/terraform*
  :
```


#### 3.3.5. Create/configure AWS Credential Access Key on AWS CLI

* **Objetivo**: Create/configure AWS Credential Access Key on AWS CLI - [Terraform Tutorial - AWS](https://learn.hashicorp.com/tutorials/terraform/aws-build?in=terraform/aws-get-started) usando a [documentação de referência do provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance)

* **Passo 1**: Criar AWS Credential Access Key
  * Em `AWS :: Console Home` clique no menu de opção `AWS :: Security, Identity & Compliance >> IAM` para acessar _IAM Dashboard_
  * Em `AWS :: Security, Identity & Compliance >> IAM` clique na opção de menu lateral esquerdo ``
  * Em `AWS :: Security, Identity & Compliance >> IAM >> Your Security Credentials (form) >> Access Key` clique `Create New Access Key`
  * Em `Create Access Key (dialog box)` clique `Show access key` e copie as informações 

* **Passo 2**: Configurar o profile AWS CLI em Linux com a _access key_ obtida no passo anterior

```sh
$ aws configure --profile lab-infra-as-code-aws-root
AWS Access Key ID [None]: ABCDEFGHIJKLMNOPQRST
AWS Secret Access Key [None]: ***************************
Default region name [None]: 
Default output format [None]: 

$ aws configure list-profiles
default
lab-infra-as-code-aws-root

$ aws configure list
      Name  Value                       Type                     Location
      ----  --------------------------  -----------------------  -----------------------------------------
   profile  lab-infra-as-code-aws-root  env                       ['AWS_PROFILE', 'AWS_DEFAULT_PROFILE']
access_key  ********M6PN                shared-credentials-file
secret_key  ********Ogkk                shared-credentials-file
    region  us-east-1                   config-file             ~/.aws/config
```


* **Passo 3**: Configurar o default AWS CLI em Windows com a _access key_ obtida no passo anterior

```cmd
C:\> aws configure 
AWS Access Key ID [None]: ABCDEFGHIJKLMNOPQRST
AWS Secret Access Key [None]: ***************************
Default region name [None]: us-east-1
Default output format [None]: 
```


### 3.5. Guia de Estudo

#### 3.5.1. Provisionar AWS EC2 Instance

* **Pré-requisitos**:
  * Terraform CLI installed no [Windows](#331-instalar-terraform-para-windows) e/ou no [Linux](#332-instalar-terraform-para-linux)
  * AWS CLI installed
  * [AWS Credential Access Key configured on AWS CLI](#334-createconfigure-aws-credential-access-key-on-aws-cli)

* **Passo 1**: Criar infraestrutura do Terraform

```sh
$ cd ./src/terraform-basic
$ mkdir terraform-aws
$ cd ./src/terraform-basic/terraform-aws
```

* **Passo 2**: Setup da credencial AWS CLI Access Key

```sh
$ export AWS_ACCESS_KEY_ID="ABCDEFGHIJKLMNOPQRST"
$ export AWS_SECRET_ACCESS_KEY="***************************"
$ export AWS_DEFAULT_REGION="us-east-1"
```

* **Passo 3**: Criar/Editar arquivo `main.tf` com _Terraform configuration file_ da infraestrutura a ser disponibilizada na AWS

```sh
$ # pwd - current directory ./src/terraform-basic/terraform-aws
$ cat main.tf
```

* **Passo 4**: Initialize Terraform working configuration directory

```sh
$ # pwd - current directory ./src/terraform-basic/terraform-aws
$ terraform init
      :
Initializing the backend...
Initializing provider plugins...
- Finding hashicorp/aws versions matching "~> 3.27"...
- Installing hashicorp/aws v3.75.1...
- Installed hashicorp/aws v3.75.1 (signed by HashiCorp)
      :
Terraform has been successfully initialized!
      :
```

* **Passo 5**: _Apply_ (aplicar) a configuração contida no _Terraform configuration file_

```sh
$ # pwd - current directory ./src/terraform-basic/terraform-aws
$ terraform apply
       :
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create
Terraform will perform the following actions:
  + resource "aws_instance" "app_server" {
       :
Plan: 1 to add, 0 to change, 0 to destroy.
Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.
  Enter a value: yes
      :
aws_instance.app_server: Creating...
      :
aws_instance.app_server: Creating...
aws_instance.app_server: Creation complete after 42s [id=i-070d892298c08ee2b]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
      :
```

#### 3.5.2. Destruir infraestrutura provisionada AWS EC2 Instance

* **Pré-requisitos**:
  * Terraform CLI installed no [Windows](#331-instalar-terraform-para-windows) e/ou no [Linux](#332-instalar-terraform-para-linux)
  * AWS CLI installed
  * [AWS Credential Access Key configured on AWS CLI](#334-createconfigure-aws-credential-access-key-on-aws-cli)

* **Passo 1**: Criar infraestrutura do Terraform

```sh
$ cd ./src/terraform-basic
$ mkdir terraform-aws
$ cd mkdir terraform-aws
```


## I - Referências

* Terraform
* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
  