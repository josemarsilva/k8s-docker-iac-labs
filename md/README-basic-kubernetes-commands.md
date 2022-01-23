`kubernetes-docker-rancherdesktop-labs/md/README-basic-kubernetes-commands.md` - Kubernetes, Docker e Rancher Desktop - LAB-05 - Basic Commands using Kubernetes on RanckerDesktop

## 1. Introdução

Este documento contém os artefatos dolaboratório **LAB-05 - Basic Commands using Kubernetes on RanckerDesktop** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
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
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
    + [a. Conceitos, definições e visão geral](#a-conceitos-definições-e-visão-geral)
    + [b. Arquivo Yaml com manifesto do Kubernetes](#b-arquivo-yaml-com-manifesto-do-kubernetes)
    + [c. Deploy / Undeploy de aplicações e kubectl](#c-deploy-undeployde-aplicações-e-kubectl)
    + [d. Label / Selector](#d-label-selector)
    + [e. Replica Set](#e-replica-set)
    + [f. Gerenciamento de versão](#f-gerenciamento-de-versão)
    + [g. Deployment](#g-deployment)
    + [h. Rollout history of deployment](#h-rollout-history-of-deployment)
    + [i. Service: ClusterIP, NodePort and LoadBalancer](#i-service-clusterip-nodeport-and-loadbalancer)

- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop.png) 



### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-basic-kubernetes-commands.png) 


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

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)

### 3.5. Guia de Estudo

#### a. Conceitos, definições e visão geral

* Onde seria o melhor local para obter informações como estas: conceitos, definições e visão geral sobre o produto? Quem sabe na documentação oficial. [Kubernetes Documentação Oficial](https://kubernetes.io/docs/concepts/overview/)
* Um **Cluster Kubernetes** conjunto de servidores de processamento de aplicações containerizadas
* Componentes camada de gerenciamento: [kube-apiserver](https://kubernetes.io/docs/concepts/overview/components/#kube-apiserver), [etcd](https://kubernetes.io/docs/concepts/overview/components/#etcd), [kube-scheduler](https://kubernetes.io/docs/concepts/overview/components/#kube-scheduler), [cloud-controller-manager](https://kubernetes.io/docs/concepts/overview/components/#cloud-controller-manager)
* Componentes camada de nós: [kubelet](https://kubernetes.io/docs/concepts/overview/components/#kubelet), [kube-proxy](https://kubernetes.io/docs/concepts/overview/components/#kube-proxy),  
* Na documentação oficial tem um conjunto de [tutoriais interativo](https://kubernetes.io/docs/tutorials/kubernetes-basics/) muito interessantes
* O **POD** é o menor objeto do cluster. Nele que são executados os containers baseados em imagens. Não é uma boa prática, manter muitos containers dentro do mesmo POD. O _pattern_ Sidecard é manter um POD auxiliar para cumprir requisito não funcional ao lado do POD responsável pela funcionalidade Ex: logs.

#### b. Arquivo Yaml com manifesto do Kubernetes

* todo manifesto define as características do pod em um arquivo com formato (.yaml) e possui os seguintes elementos de definição:
  * `api-version`: A versão pode ser obtida pelo comando `kubectl api-resources |  findstr "pod"`
  * `kind`: Tipo do objeto que será declarado
  * `metadata`:
    * `name`: nome do pod
  * `spec`: 
    * `containers`:
        - `name`: nome do container
        - `image`: imagem
        - `ports`: 
            - `containerPort`: 8080

#### c. Deploy / Undeploy de aplicações e kubectl

* Criar/configurar o arquivo (.yaml) com o manifesto de configuração de um POD de uma aplicação web que deverá responder na porta 8080

```cmd
C:\src> cd kubernetes-basic
C:\src\kubernetes-basic> TYPE pod-web-page-80-naked.yaml
C:\src\kubernetes-basic> kubectl create -f pod-web-page-80-naked.yaml
pod/web-page created
```

* Olhar as informações basicas dos NODE's do cluster e dos POD's criado. 
* No resultado do "get pods", o status = "Ready" informa que esta pronto, o "READY" = "1/1" informa que um container está pronto de um container criado. "AGE" tempo de vida

```cmd
C:\src\kubernetes-basic> kubectl get nodes
NAME     STATUS   ROLES                          AGE   VERSION
lp1764   Ready    builder,control-plane,master   8d    v1.21.8+k3s2

C:\src\kubernetes-basic> kubectl get pods
NAME       READY   STATUS    RESTARTS   AGE
web-page   1/1     Running   0          4s
```

* Descrever as informações detalhadas de um POD

```cmd
C:\src\kubernetes-basic> kubectl describe  pod web-page
Name:         web-page
Namespace:    default
   :             :
Containers:
  web-page:
    Image:          kubedevio/web-page:blue
    Port:           80/TCP
   :             :
```

* Redirecionar a porta do cluster kubernetes para a porta local da máquina. Pelo browser acessando a página `http://localhost:8080/` será possível observar uma página de fundo azul, identificada por "Página de teste". O comando do port-fowrad prende o terminal que pode ser encerrado com ^C.

```cmd
C:\src\kubernetes-basic> kubectl port-forward pod/web-page 8080:80
Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

* Remover o POD recentemente criado

```cmd
C:\src\kubernetes-basic> kubectl delete pod web-page
pod "web-page" deleted

C:\src\kubernetes-basic> kubectl get pods
No resources found in default namespace.
```


#### d. Label / Selector

* Recriar/aplicar os dois PODs web-page, sendo o primeiro naked e o segundo com label, em seguida liste os pods e descrevendo os detalhes observe as diferenças

```cmd
C:\src> cd kubernetes-basic
C:\src\kubernetes-basic> TYPE pod-web-page-80-naked.yaml
C:\src\kubernetes-basic> TYPE pod-web-page-80-naked-label.yaml
C:\src\kubernetes-basic> kubectl apply -f pod-web-page-80-naked.yaml
pod/web-page created

C:\src\kubernetes-basic> kubectl apply -f pod-web-page-80-naked-label.yaml
pod/web-page-label created

C:\src\kubernetes-basic> kubectl get pods
NAME             READY   STATUS    RESTARTS   AGE
web-page         1/1     Running   0          2m10s
web-page-label   1/1     Running   0          107s

C:\src\kubernetes-basic> kubectl describe pods/web-page
   :
Name:         web-page
Labels:       <none>
   :
C:\src\kubernetes-basic> kubectl describe pods/web-page-label
   :
Name:         web-page-label
Labels:       app=web
   :

C:\src\kubernetes-basic> kubectl get pods -l app=web
NAME             READY   STATUS    RESTARTS   AGE
web-page-label   1/1     Running   0          6m57s
```

#### e. Replica Set

* O objetivo do [Replica Set](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/) é manter a quantidade de POD's desejados igual a quantidade de POD's corrente

* Criar/Configurar um Replica Set

```cmd
C:\src\kubernetes-basic> kubectl api-resources | findstr "ReplicaSet"
replicasets                       rs           apps                           true         ReplicaSet

C:\src\kubernetes-basic> type replicaset-selector-matchlabels-template-web-page.yaml
```

* Removas os PODs naked criados manualmente, se eles já tiverem sido removidos o erro poderá ser ignorado. Em seguida aplique o Replica Set criado que ele dará conta de criar o(s) e mantê-lo(s) vivo. O Replica Set nomeia o POD com o prefixo do nome do replica-set + um sufixo aleatório. 

```cmd
C:\src\kubernetes-basic> kubectl delete -f pod-web-page-80-naked.yaml
pod "web-page" deleted

C:\src\kubernetes-basic> kubectl delete -f pod-web-page-80-naked-label.yaml
pod "web-page-label" deleted

C:\src\kubernetes-basic> kubectl get pods
NAME             READY   STATUS    RESTARTS   AGE
No resources found in default namespace.

C:\src\kubernetes-basic> kubectl apply -f replicaset-selector-matchlabels-template-web-page.yaml
replicaset.apps/web-page-replicaset created

C:\src\kubernetes-basic> kubectl get pods
NAME             READY   STATUS    RESTARTS   AGE
web-page-replicaset-v2srd   1/1     Running   0          114s

C:\src\kubernetes-basic> kubectl get replicaset
NAME                 DESIRED   CURRENT   READY   AGE
web-page-replicaset   1         1         1       2m35s
```

* Vamos eliminar o POD criado `web-page-replicaset*` e constatar que o ReplicaSet cuidará de reestabelecer a situação desejada, isto é recriar o POD removido

```cmd
C:\src\kubernetes-basic> kubectl delete pod web-page-replicaset-v2srd
pod "web-page-replicaset-v2srd" deleted

C:\src\kubernetes-basic> kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
web-page-replicaset-5qwhp   1/1     Running   0          13s
```

* Criar/Configurar um Replica Set idêntico ao anterior, porém com 4 réplicas

```cmd
C:\src\kubernetes-basic> type replicaset-selector-matchlabels-template-web-page-4-replicas.yaml

C:\src\kubernetes-basic> kubectl apply -f replicaset-selector-matchlabels-template-web-page-4-replicas.yaml
replicaset.apps/web-page-replicaset configured

C:\src\kubernetes-basic> kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
web-page-replicaset-5qwhp   1/1     Running   0          9m52s
web-page-replicaset-k2zzj   1/1     Running   0          29s
web-page-replicaset-lp7rh   1/1     Running   0          29s
web-page-replicaset-qlvcz   1/1     Running   0          29s

C:\src\kubernetes-basic> kubectl get replicaset
NAME                 DESIRED   CURRENT   READY   AGE
web-page-replicaset   4         4         4       54m
```

* Remover dois dos quatro PODS e observar o trabalho do Replica Set em retornar a situação a condição desejada de 4 PODS

```cmd
C:\src\kubernetes-basic> kubectl delete pod web-page-replicaset-lp7rh web-page-replicaset-qlvcz
pod "web-page-replicaset-lp7rh" deleted
pod "web-page-replicaset-qlvcz" deleted

C:\src\kubernetes-basic> kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
web-page-replicaset-5qwhp   1/1     Running   0          14m
web-page-replicaset-k2zzj   1/1     Running   0          5m10s
web-page-replicaset-6vk55   1/1     Running   0          23s
web-page-replicaset-clx6j   1/1     Running   0          23s
```

* Alterar por linha de comando a configuração de número de réplicas do ReplicaSet de 4 para 10 réplicas

```cmd
C:\src\kubernetes-basic> kubectl get replicaset
NAME                 DESIRED   CURRENT   READY   AGE
web-page-replicaset   4         4         4       63m

C:\src\kubernetes-basic> kubectl scale replicaset web-page-replicaset --replicas 10
replicaset.apps/web-page-replicaset scaled

C:\src\kubernetes-basic> kubectl get replicaset
NAME                 DESIRED   CURRENT   READY   AGE
web-page-replicaset   10        10        10      64m
```


#### f. Gerenciamento de versão

* Cria/Configurar um Replica Set idêntico ao anterior, porém ao invés de executar a versão blue (FUNDO AZUL) da aplicação vamos executar a versão green (FUNDO VERDE) da aplicação

```cmd
C:\src\kubernetes-basic> type replicaset-selector-matchlabels-template-web-page-green-version.yaml

C:\src\kubernetes-basic> kubectl apply -f replicaset-selector-matchlabels-template-web-page-green-version.yaml
replicaset.apps/web-page-replicaset configured

C:\src\kubernetes-basic> kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
web-page-replicaset-5qwhp   1/1     Running   0          45m
web-page-replicaset-k2zzj   1/1     Running   0          35m
web-page-replicaset-6vk55   1/1     Running   0          31m
web-page-replicaset-clx6j   1/1     Running   0          31m
```

* Fazendo o port-fowarding e olhando a aplicação pelo browser, vamos observar que o código que ainda está executando ainda é o blue (FUNDO AZUL). Isto porque o ReplicaSet não gerencia a troca de versão.

```cmd
C:\src\kubernetes-basic> kubectl port-forward pod/web-page-replicaset-5qwhp 8080:80
```

* O ReplicaSet não controla a versão, porém se deletarmos os PODS criados, ao recriar o ReplicaSet os PODs serão criados com a nova versão (FUNDO VERDE)

```cmd
C:\src\kubernetes-basic> kubectl delete pod web-page-replicaset-5qwhp web-page-replicaset-k2zzj web-page-replicaset-6vk55 web-page-replicaset-clx6j
pod "web-page-replicaset-5qwhp" deleted

C:\src\kubernetes-basic> kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
 :                          :       :        :           :
web-page-replicaset-rh7ks   1/1     Running   0          115s
 :                          :       :        :           :

C:\src\kubernetes-basic> kubectl port-forward pod/web-page-replicaset-rh7ks 8080:80
```

* Por fim vamos remover todo o Replica Set

```cmd
C:\src\kubernetes-basic> kubectl get replicaset
NAME                  DESIRED   CURRENT   READY   AGE
web-page-replicaset   4         4         4       2m22s

C:\src\kubernetes-basic> kubectl delete replicaset web-page-replicaset
replicaset.apps "web-page-replicaset" deleted

C:\src\kubernetes-basic> kubectl get replicaset
No resources found in default namespace.

C:\src\kubernetes-basic> kubectl get pods
No resources found in default namespace.
```

#### g. Deployment

* O [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) provê de forma declarativa o gerenciamento de versões de POD e ReplicaSet

* Criar/Configurar um Deployment que incorpore o cenário do ReplicaSet do passo anterior e que por consequencia passe a gerenciar as versões.

```cmd
C:\src\kubernetes-basic> type deployment-selector-web-page-version-blue.yaml

C:\src\kubernetes-basic> kubectl apply -f deployment-selector-web-page-version-blue.yaml
deployment.apps/web-page-deploy created

C:\src\kubernetes-basic> kubectl get deployments
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
web-page-deploy   3/3     3            3           30s

C:\src\kubernetes-basic> kubectl get replicaset
NAME                        DESIRED   CURRENT   READY   AGE
web-page-deploy-8c44b6d5b   3         3         3       51s

C:\src\kubernetes-basic> kubectl get pods
NAME                              READY   STATUS    RESTARTS   AGE
web-page-deploy-8c44b6d5b-5ntjz   1/1     Running   0          76s
web-page-deploy-8c44b6d5b-98vrx   1/1     Running   0          76s
web-page-deploy-8c44b6d5b-q87kl   1/1     Running   0          76s
```

* Fazendo o port-fowarding e olhando a aplicação pelo browser, vamos observar que o código que ainda está executando é o blue (FUNDO AZUL)

```cmd
C:\src\kubernetes-basic> kubectl port-forward pod/web-page-deploy-8c44b6d5b-5ntjz 8080:80
```

* Criar/Configurar um novo Deployment, muito semelhante ao deployment anterior, porém vamos alterar a versão da aplicação de: blue para: green e a quantidade de PODs de: 3 para 5
* O Kubernetes vai encerrar os PODs da versao anterior e criar os novos PODS com a versão nova, com a quantidade de replicas novas

```cmd
C:\src\kubernetes-basic> type deployment-selector-web-page-version-green-5-replicas.yaml

C:\src\kubernetes-basic> kubectl apply -f deployment-selector-web-page-version-green-5-replicas.yaml
deployment.apps/web-page-deploy configured

C:\src\kubernetes-basic> kubectl get deployments
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
web-page-deploy   5/5     5            5           10m

C:\src\kubernetes-basic> kubectl get replicaset
NAME                         DESIRED   CURRENT   READY   AGE
web-page-deploy-8c44b6d5b    0         0         0       10m
web-page-deploy-86559fbcd7   5         5         5       34s

C:\src\kubernetes-basic> kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
web-page-deploy-86559fbcd7-ft2sf   1/1     Running   0          50s
web-page-deploy-86559fbcd7-zq6hl   1/1     Running   0          50s
web-page-deploy-86559fbcd7-s7ndx   1/1     Running   0          50s
web-page-deploy-86559fbcd7-ztdgs   1/1     Running   0          47s
web-page-deploy-86559fbcd7-8vkss   1/1     Running   0          47s
```

* Alterar por linha de comando a configuração de imagem de: green, para: blue. O parametro "web-page" refere-se ao container do template

```cmd
C:\src\kubernetes-basic> kubectl set image deployment web-page-deploy web-page=kubedevio/web-page:blue
deployment.apps/web-page-deploy image updated
```

#### h. Rollout history of deployment

* O [Rollout of Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#checking-rollout-history-of-a-deployment) consiste tem desfazer um deployment à posição anterior

* Listar/visualizar o histórico de Deployment 

```cmd
C:\src\kubernetes-basic> kubectl rollout history deployment web-page-deploy
deployment.apps/web-page-deploy
REVISION  CHANGE-CAUSE
2         <none>
3         <none>

C:\src\kubernetes-basic> kubectl get replicaset
NAME                         DESIRED   CURRENT   READY   AGE
web-page-deploy-86559fbcd7   0         0         0       6h37m
web-page-deploy-8c44b6d5b    5         5         5       6h47m


C:\src\kubernetes-basic> kubectl get pods
NAME                              READY   STATUS    RESTARTS   AGE
web-page-deploy-8c44b6d5b-422ch   1/1     Running   0          14m
web-page-deploy-8c44b6d5b-n2s2l   1/1     Running   0          14m
web-page-deploy-8c44b6d5b-q7x67   1/1     Running   0          14m
web-page-deploy-8c44b6d5b-2c6rr   1/1     Running   0          14m
web-page-deploy-8c44b6d5b-gxmkv   1/1     Running   0          14m

C:\src\kubernetes-basic> kubectl port-forward pod/web-page-deploy-8c44b6d5b-422ch 8080:80
```


#### i. Service: ClusterIP, NodePort and LoadBalancer

* Os [Services](https://kubernetes.io/docs/concepts/services-networking/service/), podem ser dos tipos:
  * ClusterIP
  * NodePort
  * LoadBalancer
* Não é recomendável utilizar diretamente o IP interno atribuido pelo Kubernetes.



## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
* [INICIATIVA KUBERNETES - Aula 2 - Desvendando o Kubernetes](https://www.youtube.com/watch?v=ncVLiKv1Xxo&list=WL)
