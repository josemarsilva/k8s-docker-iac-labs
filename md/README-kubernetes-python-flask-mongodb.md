`kubernetes-docker-rancherdesktop-labs/md/README-kubernetes-python-flask-mongodb.md` - Kubernetes, Docker e Rancher Desktop - LAB-06 - Kubernetes, Python, Flask e MongoDB on RanckerDesktop

## 1. Introdução

Este documento contém os artefatos dolaboratório **LAB-06 - Kubernetes, Python, Flask e MongoDB on RanckerDesktop** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
* Explorar os comandos básicos do _Kubernetes_ no Rancher Desktop

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
  * [3.2. Guia do Desenvolvedor e Administrador](#32-guia-do-desenvolvedor-e-administrador)
  * [3.3. Guia de Implantação, Configuração e Instalação](#33-guia-de-implantação-configuração-e-instalação)
  * [3.4. Guia de Demonstração e Teste](#34-guia-de-demonstração-e-teste)
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
(#i-service-clusterip-nodeport-and-loadbalancer)

- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop-python-flask-mongo.png) 



### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-kubernetes-python-flask-mongodb.png) 


### 2.8. Notas de atenção e Avisos (Notice and information)

*  Deixo aqui o registro e agradecimento de que este material foi inspirado e baseado na "Iniciativa Kubernetes" provida pelo canal do Youtube [Fabrício Veronez Kubedev](https://www.youtube.com/channel/UCUy0NlW6WlVFj8V3xhXegYQ)
* A idéia de construir um material documentado que eu pudesse usar como referência inicial sobre Kubernetes e Devops, seja para um projeto ou para outro laboratório, evoluindo ou especializando (abstração vs especialização) que permitisse evoluir constantemente o aprendizado


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
* [LAB-02 Install WSL Rancher Desktop on Windows](README-install-wsl-rancherdesktop-windows.md) instalado, concluído e disponível
* Python 3.x (3.8 recommended) 
* venv

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.2. Guia do Desenvolvedor e Administrador

#### a. Executando a aplicação Python, Flask e MongoDB em um Container

* Criar/Configurar o arquivo `Dockerfile` com a especificação da imagem do container
* Construir _Build_ a sua imagem com base na especificação da aplicação
* Carregar _Push_ da imagem no Docker Hub container registry
* Configurar/alterar _Tag_ da imagem no Docker Hub container registry: `latest`

```cmd
C:\src\kubernetes-python-flask-mongodb> TYPE Dockerfile
C:\src\kubernetes-python-flask-mongodb> nerdctl image build -t josemarsilva/rotten-potatoes:v1 .
      :
unpacking docker.io/josemarsilva/rotten-potatoes:v1 (sha256:)...done

C:\src\kubernetes-python-flask-mongodb> nerdctl image ls
REPOSITORY                            TAG       IMAGE ID        CREATED          PLATFORM       SIZE
    :                                 :             :              :                :
josemarsilva/rotten-potatoes          v1        ace3e9bb8bc2    7 minutes ago    linux/amd64    217.1 MiB
    :                                 :             :              :                :

C:\src\kubernetes-python-flask-mongodb> nerdctl push josemarsilva/rotten-potatoes:v1

C:\src\kubernetes-python-flask-mongodb> nerdctl tag josemarsilva/rotten-potatoes:v1 josemarsilva/rotten-potatoes:latest

C:\src\kubernetes-python-flask-mongodb> nerdctl image ls
REPOSITORY                            TAG       IMAGE ID        CREATED           PLATFORM       SIZE
    :                                 :             :              :                :
josemarsilva/rotten-potatoes          latest    ace3e9bb8bc2    16 seconds ago    linux/amd64    217.1 MiB
josemarsilva/rotten-potatoes          v1        ace3e9bb8bc2    16 minutes ago    linux/amd64    217.1 MiB
    :                                 :             :              :                :

C:\src\kubernetes-python-flask-mongodb> nerdctl push josemarsilva/rotten-potatoes:latest
```

* Criar/Configurar `deployment-service-python-flask-mongodb.yaml`
* Aplicar a configuração `deployment-service-python-flask-mongodb.yaml`

```cmd
C:\src\kubernetes-basic> type deployment-service-python-flask-mongodb.yaml

C:\src\kubernetes-basic> kubectl apply -f deployment-service-python-flask-mongodb.yaml
deployment.apps/mongodb created
service/mongodb created
deployment.apps/web-app-py-flask created
service/web-app-py-flask created

C:\src\kubernetes-basic> kubectl get all
NAME                                  READY   STATUS              RESTARTS   AGE
  :                                    :         :                :           :
pod/mongodb-89dddc46-4vjps            0/1     ContainerCreating   0          39s
pod/web-app-py-flask-7478c6f8f7-v6rpr   1/1     Running   0          6m49s
  :                                    :         :                :           :

NAME                       TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
  :                          :              :             :              :            :
service/mongodb            ClusterIP   10.43.118.10    <none>        27017/TCP        6m49s
service/web-app-py-flask   NodePort    10.43.228.35    <none>        3000:30001/TCP   45s
  :                          :              :             :              :            :

NAME                               READY   UP-TO-DATE   AVAILABLE   AGE
  :                                :       :            :           :
deployment.apps/mongodb            1/1     1            1           6m49s
deployment.apps/web-app-py-flask   1/1     1            1           6m49s
  :                                :       :            :           :


NAME                                          DESIRED   CURRENT   READY   AGE
  :                                           :         :         :         :
replicaset.apps/mongodb-89dddc46              1         1         1       6m49s
replicaset.apps/web-app-py-flask-7478c6f8f7   1         1         1       6m49s
  :                                           :         :         :         :

```

#### b. Editar/alterar a aplicação Python e gerar uma nova versão

* Criar/Configurar o arquivo `Dockerfile` com a especificação da imagem do container
* Construir _Build_ a sua imagem com base na especificação da aplicação
* Carregar _Push_ da imagem no Docker Hub container registry
* Configurar/alterar _Tag_ da imagem no Docker Hub container registry: `latest`

```cmd
C:\src\kubernetes-python-flask-mongodb> TYPE Dockerfile.
C:\src\kubernetes-python-flask-mongodb> nerdctl image build -t josemarsilva/rotten-potatoes:v1 .
      :
unpacking docker.io/josemarsilva/rotten-potatoes:v1 (sha256:)...done




### 3.3. Guia de Implantação, Configuração e Instalação

#### a. Instalando venv para executar a aplicação local

* Se você desejar executar a aplicação localmente em linha de comando fora do Container Docker / Kubernetes você precisar:
  * [Python instalado em sua maquina](https://www.python.org/downloads/)
  * [Facilita muito se fizer o uso do venv](https://docs.python.org/3/library/venv.html)
  * [Facilita muito se fizer o uso do pip](https://phoenixnap.com/kb/install-pip-windows)

```cmd
C:\src\kubernetes-python-flask-mongodb> python -m venv venv
C:\src\kubernetes-python-flask-mongodb> .\venv\Scripts\activate.bat
(venv) C:\src\kubernetes-python-flask-mongodb> 
```




### 3.5. Guia de Estudo




## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
* [INICIATIVA KUBERNETES - Aula 2 - Desvendando o Kubernetes](https://www.youtube.com/watch?v=ncVLiKv1Xxo&list=WL)
