`k8s-docker-iac-labs/md/README-terraform-basic.md` - Terraform Basic

## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-14: Terraform Basic** abaixo do projeto [k8s-docker-iac-labs](../README.md). Este laboratório consiste em:
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
    + [3.3.6. Configure Backend AWS S3](#336-configure-backend-aws-s3)
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
    + [3.5.1. Provisionar AWS EC2 Instance](#351-provisionar-aws-ec2-instance)
    + [3.5.2. Alterar infraestrutura provisionada AWS EC2 Instance](#352-alterar-infraestrutura-provisionada-aws-ec2-instance)
    + [3.5.3. Destruir infraestrutura provisionada AWS EC2 Instance](#353-destruir-infraestrutura-provisionada-aws-ec2-instance)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.drawio.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.drawio.png)

### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.drawio.png](../doc/uml-diagrams/DeployDiagram-Context-terraform-aws.drawio.png)

### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-basic-terraform.png) 


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
terraform.tfstate
.terraform
.terraform.lock.hcl
  :
```


#### 3.3.5. Create/configure AWS Credential Access Key on AWS CLI

* **Objetivo**: Create/configure AWS Credential Access Key on AWS CLI - [Terraform Tutorial - AWS](https://learn.hashicorp.com/tutorials/terraform/aws-build?in=terraform/aws-get-started) usando a [documentação de referência do provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance)

* **Passo 1**: Criar AWS Credential Access Key
  * Em `AWS :: Console Home` clique no menu de opção `AWS :: Security, Identity & Compliance >> IAM` para acessar _IAM Dashboard_
  * Em `AWS :: Security, Identity & Compliance >> IAM` clique na opção de menu lateral esquerdo `Users`
  * Em `AWS :: >> IAM >> Users` clique `Add users`
  * Em `AWS :: >> IAM >> Users >> Create users` preencha os campos e clique repetidas vezes em `Next` até o botão `Create`
	* User name: `terraform-user`
	* Enable console access: `Não`
	* Add users to group: `Administrator Access`
  * Em `AWS :: >> IAM >> Users` clique no link do usuário criado para ter acesso aos detalhes do usuário
  * Em `AWS :: >> Users >> <usuario-crido>` clique na aba `Security Credentials`
  * Em `AWS :: >> Users >> <usuario-crido> >> (aba) Security Credentials` clique no botão `create access key`
  * Em `AWS :: >> Users >> <usuario-crido> >> Create access key` preencha os campos e clique repetidas vezes em `Next` até o botão `Create`
  * Em `AWS :: >> Users >> <usuario-crido> >> Create access key >> Access Key best prectices & alternatives` preencha os campos e clique repetidas vezes em `Next` até o botão `Create access key`
	* Alternative: `Command Line Interface (CLI)`
	* I understand ...: `Sim`
  * Em `AWS :: >> Users >> <usuario-crido> >> Create access key >> Retrieve access key` obtenha as informações de `Access key` e `Secret access key` para configurar em sua aplicação CLI

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


#### 3.3.6. Configure Backend AWS S3

* **Objetivo**: Configurar Backend AWS S3 para armazenar os arquivos de estados da infraestrutura

* **Passo 1**: Criar Bucket S3 
  * Em `AWS :: Console Home` clique no menu de opção `AWS :: Storage >> S3` para acessar _Amazon S3 > Buckets_
  * Em `AWS :: Storage >> S3` clique no botão `Create bucket`
  * Em `AWS :: Storage >> S3 >> Create bucket` preencha os campos do formulário e clique em `Create`
	* Bucket name: `terraform-s3-backend-josemarsilva`
	* Object Ownership: `ACLs disabled (recommended)`
	* Bucket Versioning: `Disable`
  * Em `Create Access Key (dialog box)` clique `Show access key` e copie as informações 



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

* **Passo 4**: Inicializar _Terraform working configuration directory_

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
       :
  Enter a value: yes
      :
aws_instance.app_server: Creating...
      :
aws_instance.app_server: Creating...
aws_instance.app_server: Creation complete after 42s [id=i-070d892298c08ee2b]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
      :
```


#### 3.5.2. Alterar infraestrutura provisionada AWS EC2 Instance

* **Pré-requisitos**:
  * Terraform CLI installed no [Windows](#331-instalar-terraform-para-windows) e/ou no [Linux](#332-instalar-terraform-para-linux)
  * Passo anterior [Provisionar AWS EC2 Instance](#351-provisionar-aws-ec2-instance)

* **Passo 1**: Modificar/Editar arquivo `main.tf` com _Terraform configuration file_ da infraestrutura a ser disponibilizada na AWS. Substituir (comentar/descomentar) a informação da imagem aim do recurso de: `ami-0f9fc25dd2506cf6d` para `ami-0022f774911c1d690`

```sh
$ pwd # /src/terraform-basic/terraform-aws
$ vim main.tf
  :
  # ami           = "ami-0f9fc25dd2506cf6d"
  ami           = "ami-0022f774911c1d690"
  :
```

* **Passo 2**: _Apply_ (aplicar) as mudanças da configuração contida no _Terraform configuration file_
  * Observar que o Terraform pela ordem irá: a) fazer o refresh do status da infraestrutura; b)  destruir a infraestrutura anterior e recriá-la

```sh
$ terraform apply
  :
aws_instance.app_server: Refreshing state... [id=i-0612d15eea02d4cba]
  :
  # aws_instance.app_server must be replaced
  -/+ resource "aws_instance" "app_server" {
    ~ ami                                  = "ami-0f9fc25dd2506cf6d" -> "ami-0022f774911c1d690" # forces replacement
  :
Plan: 1 to add, 0 to change, 1 to destroy.
  : 
aws_instance.app_server: Destroying... [id=i-0612d15eea02d4cba]
aws_instance.app_server: Destruction complete after 2m34s
aws_instance.app_server: Creating...
aws_instance.app_server: Creation complete after 52s [id=i-09a12205d2aba1159]
  : 
Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
  : 
```

#### 3.5.3. Destruir infraestrutura provisionada AWS EC2 Instance

* **Pré-requisitos**:
  * Terraform CLI installed no [Windows](#331-instalar-terraform-para-windows) e/ou no [Linux](#332-instalar-terraform-para-linux)
  * Passo anterior [Provisionar AWS EC2 Instance](#351-provisionar-aws-ec2-instance)

* **Passo 1**: Criar infraestrutura do Terraform

```sh
$ pwd # ./src/terraform-basic/terraform-aws
$ terraform destroy
  :
Plan: 0 to add, 0 to change, 1 to destroy.
  :
```

#### 3.5.4. Definir Input Variables

* **Pré-requisitos**:
  * Terraform CLI installed no [Windows](#331-instalar-terraform-para-windows) e/ou no [Linux](#332-instalar-terraform-para-linux)

* **Passo 1**: Criar/editar arquivo `main.tf` com _Terraform configuration file_ da infraestrutura a ser provisionada. Criar/editar arquivo `variables.tf` com as variáveis de referências a serem substituídas durante a execução. 

```sh
$ pwd # ./src/terraform-basic/terraform-aws-variables
$ cat main.tf
  :
  resource "aws_instance" "app_server" {
    ami           = var.instance_ami
  :
  tags = {
    Name = var.instance_name
  :

$ cat variables.tf
  :
variable "instance_name" {
  default     = "ExampleAppServerInstance"
  :
variable "instance_ami" {
  :
  default     = "ami-0f9fc25dd2506cf6d"
  :
```

* **Passo 2**: Inicializar _Terraform working configuration directory_

```sh
$ # pwd - current directory ./src/terraform-basic/terraform-aws-variables
$ terraform init
      :
Terraform has been successfully initialized!
```

* **Passo 3**: _Apply_ (aplicar) a configuração contida no _Terraform configuration file_
  * Observar que no plano de execução, alguns valores serão "(known after apply)"

```sh
$ # pwd - current directory ./src/terraform-basic/terraform-aws-variables
$ terraform apply
```


#### 3.5.4. Definir Input Variables

* **Pré-requisitos**:
  * Terraform CLI installed no [Windows](#331-instalar-terraform-para-windows) e/ou no [Linux](#332-instalar-terraform-para-linux)

* **Passo 1**: Criar/editar arquivo `main.tf` com _Terraform configuration file_ da infraestrutura a ser provisionada. Criar/editar arquivo `variables.tf` com as variáveis de referências a serem substituídas durante a execução. 

```sh
$ pwd # ./src/terraform-basic/terraform-aws-variables
$ cat main.tf
  :
  resource "aws_instance" "app_server" {
    ami           = var.instance_ami
  :
  tags = {
    Name = var.instance_name
  :

$ cat variables.tf
  :
variable "instance_name" {
  default     = "ExampleAppServerInstance"
  :
variable "instance_ami" {
  :
  default     = "ami-0f9fc25dd2506cf6d"
  :
```

* **Passo 2**: Inicializar _Terraform working configuration directory_

```sh
$ # pwd - current directory ./src/terraform-basic/terraform-aws-variables
$ terraform init
      :
Terraform has been successfully initialized!
```

* **Passo 3**: _Apply_ (aplicar) a configuração contida no _Terraform configuration file_
  * Observar que no plano de execução, alguns valores serão "(known after apply)"

```sh
$ # pwd - current directory ./src/terraform-basic/terraform-aws-variables
$ terraform apply
```

#### 3.5.5. Query Data with Outputs

* **Pré-requisitos**:
  * Terraform CLI installed no [Windows](#331-instalar-terraform-para-windows) e/ou no [Linux](#332-instalar-terraform-para-linux)

* **Passo 1**: Criar/editar arquivo `main.tf` com _Terraform configuration file_ da infraestrutura a ser provisionada. Criar/editar arquivo `variables.tf` com as variáveis de referências a serem substituídas durante a execução. Criar/editar arquivo `output.tf` com as variáveis de referências a serem extraídas. 

```sh
$ pwd # ./src/terraform-basic/terraform-aws-variables-outputs
$ cat main.tf

$ cat variables.tf

$ cat outputs.tf
  :
output "instance_id" {
  value       = aws_instance.app_server.id
  :
output "instance_public_ip" {
  value       = aws_instance.app_server.public_ip
  :
```

* **Passo 2**: Inicializar _Terraform working configuration directory_

```sh
$ pwd # ./src/terraform-basic/terraform-aws-variables-outputs
$ terraform init
      :
Terraform has been successfully initialized!
```

* **Passo 3**: _Apply_ (aplicar) a configuração contida no _Terraform configuration file_
  * Observar que no plano de execução, alguns valores serão "(known after apply)"
  * Observar que ao final as variávies existentes no arquivo `outputs.tf` são apresentadas

```sh
$ pwd # ./src/terraform-basic/terraform-aws-variables-outputs
$ terraform apply
  :
Plan: 1 to add, 0 to change, 0 to destroy.
Changes to Outputs:
  + instance_id        = (known after apply)
  + instance_public_ip = (known after apply)
  :
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
Outputs:
instance_id = "i-05719e0c0b0aaf005"
instance_public_ip = "34.217.0.246"
 :
```

* **Passo 4**: Posterior a execução é possível usar o comando do Terraform para mostrar as variávies

```sh
$ pwd # ./src/terraform-basic/terraform-aws-variables-outputs
$ terraform output
instance_id = "i-05719e0c0b0aaf005"
instance_public_ip = "34.217.0.246"
```


#### 3.5.99. Provisionar Docker container nginx

* **Pré-requisitos**:
  * Terraform CLI installed no [Windows](#331-instalar-terraform-para-windows) e/ou no [Linux](#332-instalar-terraform-para-linux)
  * Docker installed

* **Passo 1**: Criar/editar arquivo `main.tf` com _Terraform configuration file_ da infraestrutura a ser disponibilizada no Docker

```sh
$ # pwd - current directory ./src/terraform-basic/terraform-docker
$ cat main.tf
```

* **Passo 2**: Inicializar _Terraform working configuration directory_

```sh
$ # pwd - current directory ./src/terraform-basic/terraform-aws-variables
$ terraform init
      :
Terraform has been successfully initialized!
```

* **Passo 3**: _Plan_ (planejar) a configuração contida no _Terraform configuration file_

```sh
$ # pwd - current directory ./src/terraform-basic/terraform-docker
$ terraform plan
       :
```



## I - Referências

* Terraform
  * [Terraform Turorial - Official HashiCorp](https://learn.hashicorp.com/terraform?utm_source=terraform_io)
  * [Terraform Best Practices](https://www.terraform-best-practices.com/v/ptbr/)
  * [Terraform em 10 Minutos // Dicionário do Programador](https://www.youtube.com/watch?v=0EAjJe8aPkc)
  * [O que é Terraform?](https://www.youtube.com/watch?v=t2hTtdCILXI)
* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
  