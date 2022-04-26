`kubernetes-docker-rancherdesktop-labs/md/README-install-cloud-docker-kubernetes.md` - LAB-13 - Instalação em infraestrutura _Cloud_ do Docker e Kubernetes

## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-13 - Instalação em infraestrutura _Cloud_ do Docker e Kubernetes** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
* Obter os binários do Docker e Kubernetes em ambiente Cloud
* Explorar os recursos e funcionalidades básicas do Docker e Kubernetes em ambiente Cloud

##### Table of Contents  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.4. Diagrama de Mapa Mental (Mind Map Diagram)](#24-diagrama-de-mapa-mental-mind-map-diagram)
- [3. Projeto / Laboratório](#3-projeto--laboratório)
  * [3.1. Pré-Requisitos, Pré-Condições e Premissas](#31-pré-requisitos-pré-condições-e-premissas)
    + [a. Tecnologias e ferramentas](#a-tecnologias-e-ferramentas)
    + [b. Ferramental de apoio](#b-ferramental-de-apoio)
  * [3.3. Guia de Implantação, Configuração e Instalação](#33-guia-de-implantação-configuração-e-instalação)
    + [3.3.1. Install and configure Docker and Kubernetes (Minikube) on Cloud AWS](#331-install-and-configure-docker-and-kubernetes-minikube-on-cloud-aws)
    + [3.3.2. Install and configure Docker and Kubernetes (Minikube) on Cloud GCP](#332-install-and-configure-docker-and-kubernetes-minikube-on-cloud-gcp)
    + [3.3.3. Install and configure Docker and Kubernetes (Minikube) on Cloud Azure](#333-install-and-configure-docker-and-kubernetes-minikube-on-cloud-azure)
    + [3.3.4. Install and configure Docker and Kubernetes (Minikube) on Cloud Digital Ocean](#334-install-and-configure-docker-and-kubernetes-minikube-on-cloud-digital-ocean)
    + [3.3.5. Install and configure Docker and Kubernetes (Minikube) on Cloud Oracle Cloud](#335-install-and-configure-docker-and-kubernetes-minikube-on-cloud-oracle-cloud)
- [I - Referências](#i---referências)


## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-install-docker-kubernetes-on-cloud-infrastructure.png) 


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
* Cloud infrastructure: AWS or GPC or OracleCloud or Azure or Digital Ocean
  * Valid Account: AWS or GCP or Azure or Digital Ocean

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.3. Guia de Implantação, Configuração e Instalação

### 3.3.1. Install and configure Docker and Kubernetes (Minikube) on Cloud AWS

### 3.3.1.1. Passo 1: Criar uma nova instância de máquina EC2 com Linux

* **Objetivo**: Criar uma máquina virtual no serviço EC2 com sistema operacional Linux Ubuntu 20.04, 


* Em `AWS :: Console Homepage` escolher a opção de menu `Services >> Compute >> EC2`
* Em `AWS :: Services >> Compute >> EC2` clicar no link `Instances` para mostrar a lista de instâncias executando
* Em `AWS :: Services >> Compute >> EC2 >> Instances` clicar no botão `Launch Instance` para acessar formulário do fluxo de criação de instâncias
* Em `AWS :: ... >> Launch an Instances` preencher as seguintes informações:
  * Nome e Tag / Nome: `kubernetes-minikube`
  * Application and OS Images: `Ubuntu Server 20.04 LTS (HVM), SSD Volume Type` / `64 bits` / FreeTierEligible
  * Instance Type: `t2.medium`
  * Key pair(login): __informar seu key pair para a região__
  * Network settings / Allow traffic SSH: `Anywhere 0.0.0.0/0`
  * Configure storage: __aceitar defaults__
  * Avanced details: __aceitar defaults__
  * Clicar no botão `Launch Instance` e aguardar o retorno esperado `Êxito`
  * Observar o resultado esperado `Success`
* Em `AWS :: Services >> Compute >> EC2 >> Instances`
  * Observar a lista de instancias criadas, dentre elas a sua instância recém criada: Name = `kubernetes-minikube`; Id da Instância = `i-02b...`; Instance status = `Running`; Public IPv4 DNS: `ec2-54-173-121-129.compute-1.amazonaws.com`; Public IPv4 DNS = `54.173.121.129`
  * Na aba `Segurança` clique sobre o Security Group `sg-02...-launch-wizard-...` criado para configurá-lo para nosso propósito
    * Em `AWS :: Compute >> EC2 >> Security Group >> sg-02...-launch-wizard-...` clique no botão superior direito `Actions >> Edit inbound rules`
    * Em `AWS :: Compute >> EC2 >> Security Group >> sg-02...-launch-wizard-... >> Edit inbound rules` configurar
      * clique `Add rule` e adicionar regra: Type = `SSH`; Source = `My IP`  
      * clique `Add rule` e adicionar regra: Type = `HTTP`; Source = `Anywhere IPv4`  
      * clique `Add rule` e adicionar regra: Type = `HTTPS`; Source = `Anywhere IPv4`  
      * clique `Add rule` e adicionar regra: Type = `Custom TCP`; PortRange = `30000 - 32767`; Source = `Anywhere IPv4`  


### 3.3.1.2. Passo 2: Instalar Docker

* **Objetivo**: Instalar o Docker na instância criada

* Conectar-se à instancia recem criada `ssh -i "aws-key-pair-us-east-1.pem" ubuntu@ec2-54-173-121-129.compute-1.amazonaws.com`
* Instalar atualizações do sistema operacional e o Docker

```sh
$ sudo apt update
$ sudo apt install docker.io -y
$ sudo docker ps
```

### 3.3.1.3. Passo 2: Instalar Kubernetes (minikube)

* **Objetivo**: Instalar o Kubernetes (minikube) e suas dependências na instância criada

* Instalar pré-requisitos do minikube com o método de gerenciador de pacotes. [Documentação](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)

```sh
$ sudo apt-get install conntrack
$ sudo apt-get update
$ sudo apt-get install -y apt-transport-https ca-certificates curl
```

* Download the Google Cloud public signing key:

```sh
$ sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
$ echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
$ sudo apt-get update
$ sudo apt-get install -y kubectl
```

* Instalar minikube com o método de gerenciador de pacotes. [Documentação](https://www.linuxtechi.com/how-to-install-minikube-on-ubuntu/)

```sh
$ sudo apt update -y
$ sudo apt upgrade -y
$ sudo apt install -y curl wget apt-transport-https
$ wget https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
$ sudo cp minikube-linux-amd64 /usr/local/bin/minikube
$ sudo chmod +x /usr/local/bin/minikube
$ minikube version
minikube version: v1.25.2
commit: 362d5fdc0a3dbee389b3d3f1034e8023e72bd3a7

$ curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
$ chmod +x kubectl
$ sudo mv kubectl /usr/local/bin/
```

* Check se o kubectl (client) está funcionando

```sh
$ sudo kubectl version -o yaml
clientVersion:
  buildDate: "2022-04-14T08:49:13Z"
  compiler: gc
  :
```

* Iniciar o minikube (server) sem driver

```sh
$ sudo minikube start --driver=none
$ minikube start --addons=ingress --cpus=2 --cni=flannel --install-addons=true --kubernetes-version=stable --memory=6g
😄  minikube v1.25.2 on Ubuntu 20.04 (xen/amd64)
✨  Using the none driver based on user configuration
👍  Starting control plane node minikube in cluster minikube
:                     :
```

* Check minikube client/server agora está respondendo ao kubectl

```sh
$ sudo kubectl version -o yaml
clientVersion:
  buildDate: "2022-04-14T08:49:13Z"
  compiler: gc
     :
serverVersion:
  buildDate: "2022-01-25T21:19:12Z"
  compiler: gc
  gitCommit: 816c97ab8cff8a1c72eccca1026f7820e93e0d25
  gitTreeState: clean
  gitVersion: v1.23.3
  goVersion: go1.17.6
  major: "1"
  minor: "23"
  platform: linux/amd64
```

* Conferir as imagens dockers que subiram. 

```sh
$ docker ps
CONTAINER ID   IMAGE                                     COMMAND                  ...
6a96bf4a0d15   a4ca41631cc7                              "/coredns -conf /etc…"    :
d923d871de50   gcr.io/k8s-minikube/storage-provisioner   "/storage-provisioner"    :
53f95f5f68a5   k8s.gcr.io/pause:3.6                      "/pause"                  :
1f9ccfdcb98b   9b7cc9982109                              "/usr/local/bin/kube…"    :
7673a35a885c   k8s.gcr.io/pause:3.6                      "/pause"                  :
7b1254b32c33   k8s.gcr.io/pause:3.6                      "/pause"                  :
0ae861a0e3b8   25f8c7f3da61                              "etcd --advertise-cl…"    :
56300d0f10fb   99a3486be4f2                              "kube-scheduler --au…"    :
cea7b8b6388c   f40be0088a83                              "kube-apiserver --ad…"    :
18331db0e56a   b07520cd7ab7                              "kube-controller-man…"    :
e472d0d0cc8f   k8s.gcr.io/pause:3.6                      "/pause"                  :
3b80057fd632   k8s.gcr.io/pause:3.6                      "/pause"                  :
1514f48d2f77   k8s.gcr.io/pause:3.6                      "/pause"                  :
003b9261403b   k8s.gcr.io/pause:3.6                      "/pause"                  :
```

* Check Docker esta funcionando OK

```sh
$ sudo docker run -it alpine
sudo docker run -it alpine
Unable to find image 'alpine:latest' locally
latest: Pulling from library/alpine
df9b9388f04a: Pull complete
Digest: sha256:4edbd2beb5f78b1014028f4fbb99f3237d9561100b6881aabbf5acce2c4f9454
Status: Downloaded newer image for alpine:latest
/ # exit
```

* Check Kubernete esta funcionando OK

```sh
$ sudo kubectl get pods
No resources found in default namespace.

$ sudo kubectl run --image ubuntu:20.04 ubuntu-20-04
pod/ubuntu-20-04 created

$ sudo kubectl get pods
sudo kubectl get pods
NAME           READY   STATUS             RESTARTS      AGE
ubuntu-20-04   0/1     CrashLoopBackOff   4 (47s ago)   2m18s

$ sudo kubectl describe pod ubuntu-20-04
Name:         ubuntu-20-04
Namespace:    default
   :            :

$ sudo kubectl delete pod ubuntu-20-04
pod "ubuntu-20-04" deleted
```


### 3.3.2. Install and configure Docker and Kubernetes (Minikube) on Cloud GCP

* n/a - the future comes faster than you think


### 3.3.3. Install and configure Docker and Kubernetes (Minikube) on Cloud Azure

* n/a - the future comes faster than you think


### 3.3.4. Install and configure Docker and Kubernetes (Minikube) on Cloud Digital Ocean

* n/a - the future comes faster than you think


### 3.3.5. Install and configure Docker and Kubernetes (Minikube) on Cloud Oracle Cloud

* n/a - the future comes faster than you think


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
