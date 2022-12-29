`k8s-docker-iac-labs/md/README-k8s-commands-basic.md` - Kubernetes, Docker e Rancher Desktop - LAB-05 - Basic Commands using Kubernetes on RanckerDesktop

## 1. Introdução

Este documento contém os artefatos dolaboratório **LAB-05 - Kubernetes Commands Basic on RanckerDesktop** abaixo do projeto [k8s-docker-iac-labs](../README.md). Este laboratório consiste em:
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
    + [c. Pods, Deployment, Undeployment e kubectl](#c-pods-deployment-undeployment-e-kubectl)
    + [d. Label / Selector](#d-label-selector)
    + [e. Replica Set](#e-replica-set)
    + [f. Gerenciamento de versão](#f-gerenciamento-de-versão)
    + [g. Deployment](#g-deployment)
    + [h. Rollout history of deployment](#h-rollout-history-of-deployment)
    + [i. Service: ClusterIP, NodePort and LoadBalancer](#i-service-clusterip-nodeport-and-loadbalancer)
    + [j. Exercício Portal de Noticias da Alura no Kubernetes](#j-exercício-portal-de-notícias)
      - [j.1. Criar o(s) POD do Portal de Notícias](#j1-criar-portal-de-noticias)
      - [j.2. Criar o(s) SERVICE do tipo ClusterIP para acessar o(s) POD's](#j2-criar-clusterip-service-com-2-novos-pod-nginx-acessados-através-pelo-service)
      - [j.3. Criar o SERVICE do tipo NodePort para acessar o(s) POD's](#j3-criar-nodeport-service)
      - [j.4. Criar Load Balancer Service](#j4-criar-load-balancer-service)
      - [j.5. Criar Node  Port Service](#j5-criar-node-port-service-para-o-portal-noticias)
      - [j.6. Configurar MySQL database para o portal noticias](#j6-configurar-mysql-database-para-o-portal-noticias-utilizando-configmaps-para-as-senhas)
      - [j.7. Configurar variáveis do sistema de notícias PHP vs MySQL com ConfigMap](#j7-configurar-variáveis-do-sistema-noticias-php-com-o-mysql-utilizando-configmaps-para-as-senhas)
      - [j.8. Reiniciar todos os POD SERVICES CONFIGMAP e explorar pelo sistema](#j8-re-iniciar-todos-os-pod-services-configmap-e-explorar-pelo-sistema)

- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker.png) 



### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-basic-kubernetes-commands.png) 


### 2.8. Notas de atenção e Avisos (Notice and information)

* n/a

### 2.9. Glossário de Termos (Glossary)

De uma forma geral, vamos tentar <ins>definir</ins> e <ins>caracterizar</ins> alguns dos termos utilizados neste projeto para permitir uma melhor compreensão e entendimento:

| Termo       | Significado                     |
| :---------- | :------------------------------ |
| `nerdctl`   | programa em linha de comando do Rancher Desktop que equivale ao comando `docker`. |


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

#### c. Pods, Deployment, Undeployment e kubectl

* O [POD](https://kubernetes.io/docs/concepts/workloads/pods/) é a menor unidade computacional que pode ser gerenciada pelo cluster kubernetes 
* Criar/configurar o arquivo (.yaml) com o manifesto de configuração de um POD de uma aplicação web que deverá responder na porta 8080

```cmd
C:\src> cd kubernetes-basic
C:\src\k8s-basic> TYPE pod-web-page-80-naked.yaml
C:\src\k8s-basic> kubectl create -f pod-web-page-80-naked.yaml
pod/web-page created
```

* Olhar as informações basicas dos NODE's do cluster e dos POD's criado. 
* No resultado do "get pods", o status = "Ready" informa que esta pronto, o "READY" = "1/1" informa que um container está pronto de um container criado. "AGE" tempo de vida

```cmd
C:\src\k8s-basic> kubectl get nodes
NAME     STATUS   ROLES                          AGE   VERSION
lp1764   Ready    builder,control-plane,master   8d    v1.21.8+k3s2

C:\src\k8s-basic> kubectl get pods
NAME       READY   STATUS    RESTARTS   AGE
web-page   1/1     Running   0          4s
```

* Descrever as informações detalhadas de um POD

```cmd
C:\src\k8s-basic> kubectl describe  pod web-page
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
C:\src\k8s-basic> kubectl port-forward pod/web-page 8080:80
Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
```

* Remover o POD recentemente criado

```cmd
C:\src\k8s-basic> kubectl delete pod web-page
pod "web-page" deleted

C:\src\k8s-basic> kubectl get pods
No resources found in default namespace.
```


#### d. Label / Selector

* Recriar/aplicar os dois PODs web-page, sendo o primeiro naked e o segundo com label, em seguida liste os pods e descrevendo os detalhes observe as diferenças

```cmd
C:\src> cd kubernetes-basic
C:\src\k8s-basic> TYPE pod-web-page-80-naked.yaml
C:\src\k8s-basic> TYPE pod-web-page-80-naked-label.yaml
C:\src\k8s-basic> kubectl apply -f pod-web-page-80-naked.yaml
pod/web-page created

C:\src\k8s-basic> kubectl apply -f pod-web-page-80-naked-label.yaml
pod/web-page-label created

C:\src\k8s-basic> kubectl get pods
NAME             READY   STATUS    RESTARTS   AGE
web-page         1/1     Running   0          2m10s
web-page-label   1/1     Running   0          107s

C:\src\k8s-basic> kubectl describe pods/web-page
   :
Name:         web-page
Labels:       <none>
   :
C:\src\k8s-basic> kubectl describe pods/web-page-label
   :
Name:         web-page-label
Labels:       app=web
   :

C:\src\k8s-basic> kubectl get pods -l app=web
NAME             READY   STATUS    RESTARTS   AGE
web-page-label   1/1     Running   0          6m57s
```

#### e. Replica Set

* O objetivo do [Replica Set](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/) é manter a quantidade de POD's desejados igual a quantidade de POD's corrente

* Criar/Configurar um Replica Set

```cmd
C:\src\k8s-basic> kubectl api-resources | findstr "ReplicaSet"
replicasets                       rs           apps                           true         ReplicaSet

C:\src\k8s-basic> type replicaset-selector-matchlabels-template-web-page.yaml
```

* Removas os PODs naked criados manualmente, se eles já tiverem sido removidos o erro poderá ser ignorado. Em seguida aplique o Replica Set criado que ele dará conta de criar o(s) e mantê-lo(s) vivo. O Replica Set nomeia o POD com o prefixo do nome do replica-set + um sufixo aleatório. 

```cmd
C:\src\k8s-basic> kubectl delete -f pod-web-page-80-naked.yaml
pod "web-page" deleted

C:\src\k8s-basic> kubectl delete -f pod-web-page-80-naked-label.yaml
pod "web-page-label" deleted

C:\src\k8s-basic> kubectl get pods
NAME             READY   STATUS    RESTARTS   AGE
No resources found in default namespace.

C:\src\k8s-basic> kubectl apply -f replicaset-selector-matchlabels-template-web-page.yaml
replicaset.apps/web-page-replicaset created

C:\src\k8s-basic> kubectl get pods
NAME             READY   STATUS    RESTARTS   AGE
web-page-replicaset-v2srd   1/1     Running   0          114s

C:\src\k8s-basic> kubectl get replicaset
NAME                 DESIRED   CURRENT   READY   AGE
web-page-replicaset   1         1         1       2m35s
```

* Vamos eliminar o POD criado `web-page-replicaset*` e constatar que o ReplicaSet cuidará de reestabelecer a situação desejada, isto é recriar o POD removido

```cmd
C:\src\k8s-basic> kubectl delete pod web-page-replicaset-v2srd
pod "web-page-replicaset-v2srd" deleted

C:\src\k8s-basic> kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
web-page-replicaset-5qwhp   1/1     Running   0          13s
```

* Criar/Configurar um Replica Set idêntico ao anterior, porém com 4 réplicas

```cmd
C:\src\k8s-basic> type replicaset-selector-matchlabels-template-web-page-4-replicas.yaml

C:\src\k8s-basic> kubectl apply -f replicaset-selector-matchlabels-template-web-page-4-replicas.yaml
replicaset.apps/web-page-replicaset configured

C:\src\k8s-basic> kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
web-page-replicaset-5qwhp   1/1     Running   0          9m52s
web-page-replicaset-k2zzj   1/1     Running   0          29s
web-page-replicaset-lp7rh   1/1     Running   0          29s
web-page-replicaset-qlvcz   1/1     Running   0          29s

C:\src\k8s-basic> kubectl get replicaset
NAME                 DESIRED   CURRENT   READY   AGE
web-page-replicaset   4         4         4       54m
```

* Remover dois dos quatro PODS e observar o trabalho do Replica Set em retornar a situação a condição desejada de 4 PODS

```cmd
C:\src\k8s-basic> kubectl delete pod web-page-replicaset-lp7rh web-page-replicaset-qlvcz
pod "web-page-replicaset-lp7rh" deleted
pod "web-page-replicaset-qlvcz" deleted

C:\src\k8s-basic> kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
web-page-replicaset-5qwhp   1/1     Running   0          14m
web-page-replicaset-k2zzj   1/1     Running   0          5m10s
web-page-replicaset-6vk55   1/1     Running   0          23s
web-page-replicaset-clx6j   1/1     Running   0          23s
```

* Alterar por linha de comando a configuração de número de réplicas do ReplicaSet de 4 para 10 réplicas

```cmd
C:\src\k8s-basic> kubectl get replicaset
NAME                 DESIRED   CURRENT   READY   AGE
web-page-replicaset   4         4         4       63m

C:\src\k8s-basic> kubectl scale replicaset web-page-replicaset --replicas 10
replicaset.apps/web-page-replicaset scaled

C:\src\k8s-basic> kubectl get replicaset
NAME                 DESIRED   CURRENT   READY   AGE
web-page-replicaset   10        10        10      64m
```


#### f. Gerenciamento de versão

* Cria/Configurar um Replica Set idêntico ao anterior, porém ao invés de executar a versão blue (FUNDO AZUL) da aplicação vamos executar a versão green (FUNDO VERDE) da aplicação

```cmd
C:\src\k8s-basic> type replicaset-selector-matchlabels-template-web-page-green-version.yaml

C:\src\k8s-basic> kubectl apply -f replicaset-selector-matchlabels-template-web-page-green-version.yaml
replicaset.apps/web-page-replicaset configured

C:\src\k8s-basic> kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
web-page-replicaset-5qwhp   1/1     Running   0          45m
web-page-replicaset-k2zzj   1/1     Running   0          35m
web-page-replicaset-6vk55   1/1     Running   0          31m
web-page-replicaset-clx6j   1/1     Running   0          31m
```

* Fazendo o port-fowarding e olhando a aplicação pelo browser, vamos observar que o código que ainda está executando ainda é o blue (FUNDO AZUL). Isto porque o ReplicaSet não gerencia a troca de versão.

```cmd
C:\src\k8s-basic> kubectl port-forward pod/web-page-replicaset-5qwhp 8080:80
```

* O ReplicaSet não controla a versão, porém se deletarmos os PODS criados, ao recriar o ReplicaSet os PODs serão criados com a nova versão (FUNDO VERDE)

```cmd
C:\src\k8s-basic> kubectl delete pod web-page-replicaset-5qwhp web-page-replicaset-k2zzj web-page-replicaset-6vk55 web-page-replicaset-clx6j
pod "web-page-replicaset-5qwhp" deleted

C:\src\k8s-basic> kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
 :                          :       :        :           :
web-page-replicaset-rh7ks   1/1     Running   0          115s
 :                          :       :        :           :

C:\src\k8s-basic> kubectl port-forward pod/web-page-replicaset-rh7ks 8080:80
```

* Por fim vamos remover todo o Replica Set

```cmd
C:\src\k8s-basic> kubectl get replicaset
NAME                  DESIRED   CURRENT   READY   AGE
web-page-replicaset   4         4         4       2m22s

C:\src\k8s-basic> kubectl delete replicaset web-page-replicaset
replicaset.apps "web-page-replicaset" deleted

C:\src\k8s-basic> kubectl get replicaset
No resources found in default namespace.

C:\src\k8s-basic> kubectl get pods
No resources found in default namespace.
```

#### g. Deployment

* O [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) provê de forma declarativa o gerenciamento de versões de POD e ReplicaSet

* Criar/Configurar um Deployment que incorpore o cenário do ReplicaSet do passo anterior e que por consequencia passe a gerenciar as versões.

```cmd
C:\src\k8s-basic> type deployment-selector-web-page-version-blue.yaml

C:\src\k8s-basic> kubectl apply -f deployment-selector-web-page-version-blue.yaml
deployment.apps/web-page-deploy created

C:\src\k8s-basic> kubectl get deployments
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
web-page-deploy   3/3     3            3           30s

C:\src\k8s-basic> kubectl get replicaset
NAME                        DESIRED   CURRENT   READY   AGE
web-page-deploy-8c44b6d5b   3         3         3       51s

C:\src\k8s-basic> kubectl get pods
NAME                              READY   STATUS    RESTARTS   AGE
web-page-deploy-8c44b6d5b-5ntjz   1/1     Running   0          76s
web-page-deploy-8c44b6d5b-98vrx   1/1     Running   0          76s
web-page-deploy-8c44b6d5b-q87kl   1/1     Running   0          76s
```

* Fazendo o port-fowarding e olhando a aplicação pelo browser, vamos observar que o código que ainda está executando é o blue (FUNDO AZUL)

```cmd
C:\src\k8s-basic> kubectl port-forward pod/web-page-deploy-8c44b6d5b-5ntjz 8080:80
```

* Criar/Configurar um novo Deployment, muito semelhante ao deployment anterior, porém vamos alterar a versão da aplicação de: blue para: green e a quantidade de PODs de: 3 para 5
* O Kubernetes vai encerrar os PODs da versao anterior e criar os novos PODS com a versão nova, com a quantidade de replicas novas

```cmd
C:\src\k8s-basic> type deployment-selector-web-page-version-green-5-replicas.yaml

C:\src\k8s-basic> kubectl apply -f deployment-selector-web-page-version-green-5-replicas.yaml
deployment.apps/web-page-deploy configured

C:\src\k8s-basic> kubectl get deployments
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
web-page-deploy   5/5     5            5           10m

C:\src\k8s-basic> kubectl get replicaset
NAME                         DESIRED   CURRENT   READY   AGE
web-page-deploy-8c44b6d5b    0         0         0       10m
web-page-deploy-86559fbcd7   5         5         5       34s

C:\src\k8s-basic> kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
web-page-deploy-86559fbcd7-ft2sf   1/1     Running   0          50s
web-page-deploy-86559fbcd7-zq6hl   1/1     Running   0          50s
web-page-deploy-86559fbcd7-s7ndx   1/1     Running   0          50s
web-page-deploy-86559fbcd7-ztdgs   1/1     Running   0          47s
web-page-deploy-86559fbcd7-8vkss   1/1     Running   0          47s
```

* Alterar por linha de comando a configuração de imagem de: green, para: blue. O parametro "web-page" refere-se ao container do template

```cmd
C:\src\k8s-basic> kubectl set image deployment web-page-deploy web-page=kubedevio/web-page:blue
deployment.apps/web-page-deploy image updated
```

#### h. Rollout history of deployment

* O [Rollout of Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#checking-rollout-history-of-a-deployment) consiste tem desfazer um deployment à posição anterior

* Listar/visualizar o histórico de Deployment 

```cmd
C:\src\k8s-basic> kubectl rollout history deployment web-page-deploy
deployment.apps/web-page-deploy
REVISION  CHANGE-CAUSE
2         <none>
3         <none>

C:\src\k8s-basic> kubectl get replicaset
NAME                         DESIRED   CURRENT   READY   AGE
web-page-deploy-86559fbcd7   0         0         0       6h37m
web-page-deploy-8c44b6d5b    5         5         5       6h47m


C:\src\k8s-basic> kubectl get pods
NAME                              READY   STATUS    RESTARTS   AGE
web-page-deploy-8c44b6d5b-422ch   1/1     Running   0          14m
web-page-deploy-8c44b6d5b-n2s2l   1/1     Running   0          14m
web-page-deploy-8c44b6d5b-q7x67   1/1     Running   0          14m
web-page-deploy-8c44b6d5b-2c6rr   1/1     Running   0          14m
web-page-deploy-8c44b6d5b-gxmkv   1/1     Running   0          14m

C:\src\k8s-basic> kubectl port-forward pod/web-page-deploy-8c44b6d5b-422ch 8080:80
```


#### i. Service: ClusterIP, NodePort and LoadBalancer

* Os [Services](https://kubernetes.io/docs/concepts/services-networking/service/), são responsáveis por expor (IP e PORT) dos serviços prestados pelo POD. O services podem ser dos tipos:
  * **ClusterIP**: usado internamente no cluster Kubernetes. Sempre que é criado um serviço é gerado um IP de acesso e um nome de dns interno
  * **NodePort**: acessível ao mundo externo do cluster Kubernetes. Sempre que é criado um service deste tipo é criado uma porta no range >= 30000. Muito usado em cenários _OnPremisse_
  * **LoadBalancer**: Sempre que é criado um serviço, também é criado junto um Load Balance que vai dar o IP de acesso a este serviço
* PS:
  * Não é recomendável utilizar diretamente o IP interno atribuido pelo Kubernetes.

* Remover o ultimo deployment criado no passo anterior para deixar o ambiente limpo
* Criar/configurar novamente o deployment `service-nodeport-selector-label-app-web.yaml` com a página de fundo azul em 3 instâncias com o label "app: web"

```cmd
C:\src\k8s-basic> kubectl get deployments
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
web-page-deploy   5/5     5            5           17h

C:\src\k8s-basic> kubectl delete deployments web-page-deploy
deployment.apps "web-page-deploy" deleted

C:\src\k8s-basic> kubectl get deployments
No resources found in default namespace.

C:\src\k8s-basic> TYPE service-nodeport-selector-label-app-web.yaml

C:\src\k8s-basic> kubectl apply -f service-nodeport-selector-label-app-web.yaml
deployment.apps/web-page-deploy created

C:\src\k8s-basic> kubectl get deployments
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
web-page-deploy   3/3     3            3           15s

C:\src\k8s-basic> TYPE service-selector-label-app-web.yaml

C:\src\k8s-basic> kubectl apply -f service-selector-label-app-web.yaml
C:\src\k8s-basic> 

C:\src\k8s-basic> kubectl get services
C:\GitHome\ws-github-01\k8s-docker-iac-labs\src\k8s-basic>kubectl get services
NAME               TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes         ClusterIP   10.43.0.1      <none>        443/TCP        9d
web-page-service   NodePort    10.43.11.172   <none>        80:31725/TCP   44s
```

* Observe que o servico foi criado na porta `31725`. Este número de "porta alta" é aleatório. Lembre-se também de liberar a regra de entrada de firewall para TCP 30000-65535

![screenshot-windows-firewall-INPUT-TCP-30000-65535.png](../doc/screenshots/screenshot-windows-firewall-INPUT-TCP-30000-65535.png)

* Abrir com o browser a url `http:localhost:31725` e observar a WebPage com fundo azul

* Porém o endereço IP `10.43.11.172` é interno ao cluster e não é visível pelo SO da máquina Windows de fora, uma vez que esta sub-rede é interna do Cluster. 

* Agora vamos fixar a "porta alta" para sempre ser a porta 30000. Estamos cientes da limitação de que poderemos ter apenas 1 (um) serviço nesta porta.

```cmd
C:\src\k8s-basic> kubectl apply -f service-nodeport-port-30000-selector-label-app-web.yaml
deployment.apps/web-page-deploy created

C:\src\k8s-basic> kubectl get service web-app-service
```

* Abrir com o browser a url `http:localhost:30000` e observar a WebPage com fundo azul. Se você tentar acessar a url anterior `http:localhost:31725` ela não mais estará disponível porque foi feito _apply_ no servico que foi atualizado.

#### j. Exercício Portal de notícias

O objetivo deste exercícioé  cria o portal de notícias da Alura: https://cursos.alura.com.br/course/kubernetes-pods-services-configmap/

![screenshot-kubernetes-aluracursos-arquitetura-portal-noticias.png](../doc/screenshots/screenshot-kubernetes-aluracursos-arquitetura-portal-noticias.png) 


#### j.1. Criar Portal de Noticias

* Criar um POD para o portal de notícias usuando a imagem disponibilizada no registry da AluraCursos no DockerHub
* Criar um POD para o portal de notícias usuando a imagem disponibilizada no registry da AluraCursos no DockerHub

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ cat pod-portal-noticias.yaml
$ kubectl apply -f pod-portal-noticias.yaml
```

* Acompanhar enquanto a imagem é baixada e o POD iniciado com `--watch`, quando o POD inciar a execução faça um describe

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ kubectl get pods --watch
NAME              READY   STATUS    RESTARTS   AGE
portal-noticias   1/1     Running   0          4m50s
$ kubectl describe pods portal-noticias
```

* Acessar através do POD `portal-noticias` e executar o comando `bash` para ter acesso ao terminal linux de linha de comandos de um POD dentro do cluster Kubernetes
  * No `bash` executar o `curl` para obter a homepage de localhost

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ kubectl exec -it portal-noticias -- bash
root@portal-noticias:/var/www/html# curl localhost
<html>
  :
root@portal-noticias:/var/www/html# exit
```

#### j.2. Criar ClusterIP Service com 2 novos POD nginx acessados através pelo service

* Documentação e registry do Nginx no Dockerhub: https://hub.docker.com/_/nginx
* Criar dois PODs conforme especificação em `pod-1.yaml` e `pod-2.yaml`

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ cat pod-1.yaml
$ cat pod-2.yaml
$ kubectl apply -f pod-1.yaml
$ kubectl apply -f pod-2.yaml
$ kubectl get pods
NAME              READY   STATUS    RESTARTS   AGE
portal-noticias   1/1     Running   0          21m
pod-2             1/1     Running   0          21s
pod-1             1/1     Running   0          28s
```

* Criar o Service do tipo `ClusterIP` para atender inicialmente apenas o `pod-2` configurando os arquivos (.yaml) com o *label:* `app: pod-2` na definição do POD e com o *selector:* `app: pod-2` na definição do service.

```cmd
C:\portal-noticias> type svc-pod-2.yaml
C:\portal-noticias> kubectl apply -f svc-pod-2.yaml
C:\portal-noticias> kubectl get services
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.43.0.1      <none>        443/TCP   83d
svc-pod-2    ClusterIP   10.43.10.108   <none>        80/TCP    2m42s
```

* Acessar através do POD `pod-1` e executar o comando `bash` para ter acesso ao terminal linux de linha de comandos de um POD dentro do cluster Kubernetes
  * No `bash` executar o `curl` para obter homepage do `pod-2` através do IP optido pelo ClusterIP
  * Observar que o IP é visível apenas dentro dos objetos do cluster

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ kubectl exec -it pod-1 -- bash
root@pod-1:/# curl 10.43.10.108
<!DOCTYPE html>
  :
root@pod-1:/# exit
```

* Remover o POD `pod-2` 
* Acessar através do POD `pod-1` e executar o comando `bash` para ter acesso ao terminal linux de linha de comandos de um POD dentro do cluster Kubernetes
  * No `bash` executar o `curl` para obter a homepage do `pod-2` através do IP optido pelo ClusterIP
  * Observar que embora o POD `pod-2` tenha sido removido, o serviço ainda existe e aponta para o vazio

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ kubectl delete pod pod-2
$ kubectl get pods
NAME              READY   STATUS    RESTARTS   AGE
portal-noticias   1/1     Running   0          51m
pod-1             1/1     Running   0          30m

$ kubectl get services
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.43.0.1      <none>        443/TCP   83d
svc-pod-2    ClusterIP   10.43.10.108   <none>        80/TCP    19m

$ kubectl exec -it portal-noticias -- bash
root@portal-noticias:/var/www/html# curl 10.43.10.108
curl: (7) Failed to connect to 10.43.10.108 port 80: Connection refused
root@portal-noticias:/var/www/html# exit
```

* Se reaplicarmos (create) o POD `pod-2` removido no passo anterior, que tem o *label* `app: pod-2` que é selecionado pelo *selector* `app:pod-2` do servico criado então o IP do cluster voltará a responder

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ kubectl apply -f pod-2.yaml
$ kubectl exec -it portal-noticias -- bash
root@portal-noticias:/var/www/html# curl 10.43.10.108
<!DOCTYPE html>
  :
root@portal-noticias:/var/www/html# exit
```

* Criar o Service do tipo `ClusterIP` para atender inicialmente apenas o `pod-1` na porta `81` configurando os arquivos (.yaml) com o *label:* `app: pod-1` na definição do POD e com o *selector:* `app: pod-3` na definição do service.
  * Observar que a porta do POD independe da porta do service

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ cat pod-1.yaml
$ cat svc-pod-1.yaml
$ kubectl apply -f svc-pod-1.yaml
$ kubectl get services -o wide
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE    SELECTOR
kubernetes   ClusterIP   10.43.0.1      <none>        443/TCP   83d    <none>
svc-pod-2    ClusterIP   10.43.10.108   <none>        80/TCP    83m    app=pod-2
svc-pod-1    ClusterIP   10.43.224.69   <none>        81/TCP    100s   app=pod-1
```

#### j.3. Criar NodePort Service


* Criar o Service do tipo `NodePort` para atender inicialmente apenas o `pod-3` na porta `8080` configurando os arquivos (.yaml) com o *label:* `app: pod-3` na definição do POD e com o *selector:* `app: pod-3` na definição do service.
  * Observar que a porta do POD independe da porta do service

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ cat pod-3.yaml
$ cat svc-pod-3.yaml
$ kubectl apply -f svc-pod-3.yaml
$ kubectl get services -o wide
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE    SELECTOR
kubernetes   ClusterIP   10.43.0.1       <none>        443/TCP          83d    <none>
svc-pod-2    ClusterIP   10.43.10.108    <none>        80/TCP           149m   app=pod-2
svc-pod-1    ClusterIP   10.43.224.69    <none>        81/TCP           68m    app=pod-1
svc-pod-3    NodePort    10.43.217.169   <none>        8080:30702/TCP   29m    app=pod-3
```

* Acessar através do POD `portal-noticias` e executar o comando `bash` para ter acesso ao terminal linux de linha de comandos de um POD dentro do cluster Kubernetes
  * No `bash` executar o `curl` para obter a homepage do IP na coluna CLUSTER-IP correspondente ao *NodePort* do `svc-pod-3`

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ kubectl exec -it portal-noticias -- bash
root@portal-noticias:/var/www/html# curl 10.43.217.169:8080
<html>
  :
root@portal-noticias:/var/www/html# exit
```

* Agora tente acessar o mesmo IP na coluna CLUSTER-IP correspondente ao *NodePort* do `svc-pod-3` de uma máquina fora do cluster, ou seja na sua máquina externa
  * Observar que não responde porque as portas da coluna CLUSTER-IP são internas do cluster

```browser
+-----------------------------------+
| http://10.43.217.169:8080         |
+-----------------------------------+
|  Não é possível acessar esse site |
|  ERR_CONNECTION_TIMED_OUT         |
+-----------------------------------+
```

* Agora tente acessar usando o IP `localhost` e a porta binded na coluna PORT(S) correspondente ao *NodePort* do `svc-pod-3` de uma máquina fora do cluster, ou seja na sua máquina externa
  * Observar que no Windows o Docker Desktop ou Rancher Desktop providenciam o bind em uma porta alta > 30000 para a máquina externa
  * Lembrar que no Linux este bind automático não funciona e deve ser usado o internal IP em substituição ao localhost

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ kubectl get services -o wide
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE    SELECTOR
kubernetes   ClusterIP   10.43.0.1       <none>        443/TCP          83d    <none>
svc-pod-2    ClusterIP   10.43.10.108    <none>        80/TCP           149m   app=pod-2
svc-pod-1    ClusterIP   10.43.224.69    <none>        81/TCP           68m    app=pod-1
svc-pod-3    NodePort    10.43.217.169   <none>        8080:30702/TCP   29m    app=pod-3
```

```browser
+-----------------------------------+
| http://localhost:30702            |
+-----------------------------------+
|  Welcome to nginx!                |
|      :                            |
|  Thank you for using nginx.       |
+-----------------------------------+
```

#### j.4. Criar Load Balancer Service

* Criar o Service do tipo `LoadBalancer` para atender todos os POD's (`pod-1`, `pod-2` e `pod-3`)  na porta `8000` configurando os arquivos (.yaml) com o *label:* `app: pod-1 pod-2 pod-3` na definição do POD e com o *selector:* `app: pod-3` na definição do service.
  * Observar que a porta do POD independe da porta do service

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ cat svc-pod-loadbalancer.yaml
$ kubectl apply -f svc-pod-loadbalancer.yaml
$ kubectl get services -o wide
NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE     SELECTOR
kubernetes             ClusterIP   10.43.0.1       <none>        443/TCP          83d     <none>
svc-pod-2              ClusterIP   10.43.10.108    <none>        80/TCP           6h14m   app=pod-2
svc-pod-1              ClusterIP   10.43.224.69    <none>        81/TCP           4h53m   app=pod-1
svc-pod-3              NodePort    10.43.217.169   <none>        8080:30702/TCP   4h14m   app=pod-3
svc-pod-loadbalancer   NodePort    10.43.72.147    <none>        8000:31492/TCP   38s     app=pod-3
```

* Acessar usando o IP `localhost` e a porta binded na coluna PORT(S) correspondente ao *NodePort* do `svc-pod-3` de uma máquina fora do cluster, ou seja na sua máquina externa
  * Observar que no Windows o Docker Desktop ou Rancher Desktop providenciam o bind em uma porta alta > 30000 para a máquina externa
  * Lembrar que no Linux este bind automático não funciona e deve ser usado o internal IP em substituição ao localhost

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ curl localhost:31492
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
```

* Para conseguirmos observar o **LoadBalancer** atuando dividindo a carga entre os diversos POD's ( `pod-1`, `pod-2` e `pod-3`), precisaremos editar a homepage de cada um dos POD's com uma informação diferente para conseguirmos observar esta dinâmica.
  * Para cada um dos POD's ( `pod-1`, `pod-2` e `pod-3`) - onde `<?>` corresponde ao número do pod
    * acessar o POD  executando o comando: `kubectl exec -it pod-<?> -- bash` 
    * executar comandos para configurar o arquivos (.html) da homepage

```bash
root@portal-noticias:/var/www/html# sed -i 's/Welcome to /Welcome to pod-<?> /g' /usr/share/nginx/html/index.html
```

* Agora repetir diversas vezes o procedimento de acessar usando o IP `localhost` e a porta binded na coluna PORT(S) correspondente ao *NodePort* do `svc-pod-3` de uma máquina fora do cluster, ou seja na sua máquina externa
  * Observar que a cada execução o **LoadBalancer** irá dividir a carga entre `pod-1`, `pod-2` e `pod-3`

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ curl localhost:31492
<!DOCTYPE html>
<html>
<head>
<title>Welcome to pod-<?> nginx!</title>
```

#### j.5. Criar Node Port Service para o portal-noticias

* Remover para efeito de limpeza todos o(s) POD's e SERVICE's criados até então com os comandos abaixo:

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$ kubectl delete --all pods
$ kubectl delete --all services
```

* Criar o Service do tipo `NodePort` para atender todos o(s) POD  `portal-noticias` na porta `30000` configurando os arquivos (.yaml) com o *label:* `app: portal-noticias` na definição do POD e com o *selector:* `app: portal-noticias` na definição do service.
  * Observar que a porta do POD independe da porta do service

```sh
$ pwd # ./src/kubernetes-basic/portal-noticias
$
$ cat pod-portal-noticias.yaml
$ kubectl apply -f pod-portal-noticias.yaml
$
$ cat svc-portal-noticias.yaml
$ kubectl apply -f svc-portal-noticias.yaml
$ kubectl get services -o wide
NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE     SELECTOR
  :                      :             :              :            :               :          :
svc-portal-noticias    NodePort    10.43.7.196     <none>        80:30000/TCP     3m35s   app=svc-portal-noticias
```

```browser
+---------------------------------------+
| http://localhost:30000                |
+---------------------------------------+
|+-------------------------------------+|
||  Alura Noticias | [Search] | Painel ||
|+-------------------------------------+|
|                                       |
+---------------------------------------+
```

#### j.6. Configurar MySQL database para o portal-noticias utilizando configmaps para as senhas

* **Objetivo**: configurar as definições do  POD do banco de dados do portal-notícias a partir de uma imagem que já vem com as tabelas necessárias para o sistema criadas

* Primeiramente vamos criar o POD com a base MySQL com a configuração de usuário e senha acoplada no próprio arquivo de definição do POD

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ cat db-noticias-sem-usar-configmap.yaml
$ kubectl apply -f db-noticias-sem-usar-configmap.yaml
$ kubectl get pods
NAME              READY   STATUS    RESTARTS   AGE
portal-noticias   1/1     Running   0          17m
db-noticias       1/1     Running   0          37s
$ kubectl exec -it db-noticias -- bash
root@db-noticias:/# mysql -u root -p
Enter password: q1w2e3r4
  :
mysql> show databases ;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| empresa            |
| mysql              |
| performance_schema |
+--------------------+
4 rows in set (0.00 sec)

mysql> use empresa;

Database changed
mysql> show tables;
+-------------------+
| Tables_in_empresa |
+-------------------+
| noticias          |
| usuario           |
+-------------------+
2 rows in set (0.00 sec)
```

* agora vamos utilizar o configmaps para armazenar as variáveis de ambiente 

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ kubectl get pods
NAME              READY   STATUS    RESTARTS   AGE
portal-noticias   1/1     Running   0          41m
db-noticias       1/1     Running   0          24m

$ kubectl delete -f db-noticias-sem-usar-configmap.yaml
pod "db-noticias" deleted

$ kubectl get pods
NAME              READY   STATUS    RESTARTS   AGE
portal-noticias   1/1     Running   0          43m

$ kubectl apply -f db-configmap.yaml
configmap/db-configmap created

$ kubectl get configmap
NAME               DATA   AGE
kube-root-ca.crt   1      110d
db-configmap       3      64s

$ kubectl describe configmap db-configmap
Name:         db-configmap
Namespace:    default
Labels:       <none>
Annotations:  <none>
Data
====
MYSQL_PASSWORD:
----
q1w2e3r4
MYSQL_ROOT_PASSWORD:
----
q1w2e3r4
MYSQL_DATABASE:
----
empresa
Events:  <none>

$ kubectl apply -f db-noticias.yaml
pod/db-noticias created

$ kubectl exec -it db-noticias -- mysql -u root -p
Enter password: q1w2e3r4
  :
mysql> use empresa;
mysql> SELECT * FROM usuario;
+-----------+-------+-------+
| idusuario | login | senha |
+-----------+-------+-------+
|         1 | admin | admin |
+-----------+-------+-------+
1 row in set (0.00 sec)
```

#### j.7. Configurar variáveis do sistema-noticias PHP com o MySQL utilizando configmaps para as senhas

* **Objetivo**: configurar as definições do POD do sistema PHP portal-notícias 

* Configurar o sistema-noticias utilizando os configmaps

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ cat sistema-configmap.yaml
$ kubectl apply -f sistema-configmap.yaml
configmap/sistema-configmap created
$ cat sistema-noticias.yaml
$ kubectl apply -f sistema-noticias.yaml
pod/sistema-noticias created
```

* Configurar o portal-noticias utilizando os configmaps

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ cat portal-configmap.yaml
$ kubectl apply -f portal-configmap.yaml
configmap/portal-configmap created
$ cat portal-noticias.yaml
$ kubectl apply -f portal-noticias.yaml
pod/portal-noticias unchanged
$ kubectl get pods
NAME               READY   STATUS    RESTARTS   AGE
db-noticias        1/1     Running   0          60m
sistema-noticias   1/1     Running   0          30m
portal-noticias    1/1     Running   0          72s
$ kubectl get configmaps
NAME                DATA   AGE
kube-root-ca.crt    1      110d
db-configmap        3      69m
sistema-configmap   3      38m
portal-configmap    1      6m37s
$ kubectl get svc
NAME                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes            ClusterIP   10.43.0.1      <none>        443/TCP        117m
svc-portal-noticias   NodePort    10.43.80.119   <none>        80:30000/TCP   116m
```

#### j.8. Re-iniciar todos o(s) POD, SERVICES, CONFIGMAP e explorar pelo sistema

* **Objetivo**: Colocar o projeto no ar e testá-lo

* Delete (remover) todos os objetos kubernetes para recriá-los. O seguinte erro poderá-ser ignorado: "... Error from server (NotFound): error when deleting ..."

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ 
$ kubectl delete -f svc-portal-noticias.yaml 
$ kubectl delete -f svc-sistema-noticias.yaml
$ kubectl delete -f svc-db-noticias.yaml
$
$ kubectl delete -f portal-noticias.yaml
$ kubectl delete -f sistema-noticias.yaml
$ kubectl delete -f db-noticias.yaml
$
$ kubectl delete -f db-configmap.yaml
$ kubectl delete -f portal-configmap.yaml
$ kubectl delete -f sistema-configmap.yaml
```

* _Apply_ (criar ou atualizar) todos os objetos kubernetes.

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$
$ # configmap
$ kubectl apply -f portal-configmap.yaml
configmap/portal-configmap created
$ kubectl apply -f sistema-configmap.yaml
configmap/sistema-configmap created
$ kubectl apply -f db-configmap.yaml
configmap/db-configmap created
$
$ # pod/service database
$ kubectl apply -f db-noticias.yaml
pod/db-noticias created
$ kubectl apply -f svc-db-noticias.yaml
service/svc-db-noticias created
$
$ # pod
$ kubectl apply -f portal-noticias.yaml
pod/portal-noticias created
$ kubectl apply -f sistema-noticias.yaml
pod/sistema-noticias created
$
$ # services
$ kubectl apply -f svc-portal-noticias.yaml 
service/svc-portal-noticias created
$ kubectl apply -f svc-sistema-noticias.yaml
service/svc-sistema-noticias created

$ # getting status
$ kubectl get all -o wide
$ kubectl get configmaps -o wide
```

* Entrar no portal de notícias

```browser
+---------------------------------------+
| http://localhost:30001                |
+---------------------------------------+
|+-------------------------------------+|
||  Alura Noticias | [Search] | Painel ||
|+-------------------------------------+|
|                                       |
+---------------------------------------+
```

* Entrar no sistema de notícias

```browser
+---------------------------------------+
| http://localhost:30001                |
+---------------------------------------+
|+-------------------------------------+|
||  Alura Noticias | [Search] | Painel ||
|+-------------------------------------+|
|                                       |
+---------------------------------------+
```

* Caso tenha problemas baixe o [gabarito do projeto](https://github.com/alura-cursos/1846-kubernetes/tree/Aula6)

#### j.9 Criar o REPLICASET parao POD

* **Objetivo**: Implementar ReplicaSet para os POD

* _Apply_ (criar ou atualizar) replicaset de portal-noticias

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ cat .\portal-noticias-replicaset.yaml
$ kubectl apply -f portal-noticias-replicaset.yaml
replicaset.apps/portal-noticias-replicaset created

$ kubectl get replicaset
NAME                         DESIRED   CURRENT   READY   AGE
portal-noticias-replicaset   3         3         3       3m44s

$ kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
db-noticias                        1/1     Running   0          15m
sistema-noticias                   1/1     Running   0          15m
portal-noticias-replicaset-w4tqn   1/1     Running   0          2m10s
portal-noticias-replicaset-p278v   1/1     Running   0          2m10s
portal-noticias-replicaset-7vd9n   1/1     Running   0          2m10s
```

#### j.10 Criar o DEPLOYMENT para 3 replicas POD com imagem de NGINX

* **Objetivo**: Criar Deployment e ReplicaSet para os POD

* _Apply_ (criar ou atualizar) replicaset de portal-noticias

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ cat nginx-deployment.yaml
$ kubectl apply -f nginx-deployment.yaml
deployment.apps/nginx-deployment created

$ kubectl get pods
NAME                                READY   STATUS    RESTARTS   AGE
db-noticias                         1/1     Running   0          64m
sistema-noticias                    1/1     Running   0          64m
portal-noticias-replicaset-w4tqn    1/1     Running   0          50m
portal-noticias-replicaset-p278v    1/1     Running   0          50m
portal-noticias-replicaset-7vd9n    1/1     Running   0          50m
nginx-deployment-58d6df6b6b-fnglx   1/1     Running   0          81s
nginx-deployment-58d6df6b6b-pn7td   1/1     Running   0          81s
nginx-deployment-58d6df6b6b-x62dj   1/1     Running   0          81s

$ kubectl get replicaset
NAME                          DESIRED   CURRENT   READY   AGE
portal-noticias-replicaset    3         3         3       51m
nginx-deployment-58d6df6b6b   3         3         3       102s

$ kubectl get deployments
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   3/3     3            3           116s
```

* _Rollout_ (Consultar) histórico de instalação dos deployments

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ kubectl rollout history deployment nginx-deployment
deployment.apps/nginx-deployment 
REVISION  CHANGE-CAUSE
1         <none>
```

* Editar o yaml do deployment para instalar a versão `latest` e não mais a versão `stable`

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ cat nginx-deployment.yaml
```

* _Apply_ (criar ou atualizar) o deployment do arquivo `nginx-deployment.yaml` agora configurado com a versão `latest` e não mais com a versão `stable`
  * observar o histórico dos deployments
  * alterar a anotação do histórico do deployment

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ kubectl apply -f nginx-deployment.yaml --record
deployment.apps/nginx-deployment configured

$ kubectl rollout history deployment nginx-deployment
deployment.apps/nginx-deployment 
REVISION  CHANGE-CAUSE
1         <none>
2         kubectl1.21.8 apply --filename=nginx-deployment.yaml --record=true

$ kubectl annotate deployment nginx-deployment kubernetes.io/change-cause="Definindo a imagem com versao latest"
deployment.apps/nginx-deployment annotated

kubectl rollout history deployment nginx-deployment
REVISION  CHANGE-CAUSE
1         <none>
2         Definindo a imagem com versao latest
```

* _Apply_ (criar ou atualizar) o deployment do arquivo `nginx-deployment.yaml` devolta para a versão stable  `stable`
  * observar o histórico dos deployments
  * alterar a anotação do histórico do deployment

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ kubectl apply -f nginx-stable-deployment.yaml --record
deployment.apps/nginx-deployment configured

$ kubectl annotate deployment nginx-deployment kubernetes.io/change-cause="Definindo a imagem com versao stable"
deployment.apps/nginx-deployment annotated

$ kubectl rollout history deployment nginx-deployment
REVISION  CHANGE-CAUSE
2         Definindo a imagem com versao latest
3         Definindo a imagem com versao stable
```

* _Rollout_ (desfazer deployment) até determinada versão 
  * observar o histórico dos deployments
  * alterar a anotação do histórico do deployment

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ kubectl rollout undo deployment nginx-deployment --to-revision=2
deployment.apps/nginx-deployment rolled back

$ kubectl get pods nginx-deployment
NAME                                READY   STATUS    RESTARTS   AGE
  :                                 :         :       :          :
nginx-deployment-6645687878-lw7qx   1/1     Running   0          57s
nginx-deployment-6645687878-sfllm   1/1     Running   0          56s
nginx-deployment-6645687878-vszjk   1/1     Running   0          55s

$ kubectl describe pods nginx-deployment-6645687878-lw7qx
  :
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  3m17s  default-scheduler  Successfully assigned default/nginx-deployment-6645687878-lw7qx to lp1764
  Normal  Pulled     3m17s  kubelet            Container image "nginx:latest" already present on machine
  :
```

* Destruir todos os objetos no Kubernetes referente aos testes de replicaset e deployment

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ kubectl delete -f nginx-deployment.yaml
deployment.apps "nginx-deployment" deleted

$ kubectl delete -f portal-noticias-replicaset.yaml
replicaset.apps "portal-noticias-replicaset" deleted
```

#### j.11 Criar o DEPLOYMENT para o portal de noticias, sistema noticias e banco de dados

* **Objetivo**: Implementar Replicaset e Deployments para o portal de noticias

* _Apply_ (criar ou atualizar) replicaset de portal-noticias

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$

$ cat portal-noticias-deployment.yaml
$ kubectl apply -f portal-noticias-deployment.yaml
deployment.apps/portal-noticias-deployment created

$ kubectl rollout history deployment portal-noticias-deployment
REVISION  CHANGE-CAUSE
1         <none>

$ kubectl annotate deployment portal-noticias-deployment kubernetes.io/change-cause="Criando portal de noticias na versao 1"
deployment.apps/portal-noticias-deployment annotated

$ cat sistema-noticias-deployment.yaml
$ kubectl delete pod sistema-noticias
$ kubectl apply -f sistema-noticias-deployment.yaml
deployment.apps/sistema-noticias-deployment created

$ cat db-noticias-deployment.yaml
$ kubectl delete pod db-noticias
pod "db-noticias" deleted
$ kubectl apply -f db-noticias-deployment.yaml
deployment.apps/db-noticias-deployment created

$ kubectl get pods
NAME                                           READY   STATUS    RESTARTS   AGE
portal-noticias-deployment-6b7d66bc9c-kvztz    1/1     Running   0          31m
portal-noticias-deployment-6b7d66bc9c-qt5w7    1/1     Running   0          31m
portal-noticias-deployment-6b7d66bc9c-6hm6p    1/1     Running   0          31m
sistema-noticias-deployment-666dcb977f-mmdm5   1/1     Running   0          6m
db-noticias-deployment-6b949b4bf7-clhd6        1/1     Running   0          71s

$ kubectl annotate deployment sistema-noticias-deployment kubernetes.io/change-cause="Subindo o sistema noticias pelo deployment na versao 1"
deployment.apps/sistema-noticias-deployment annotated

$ kubectl annotate deployment sistema-noticias-deployment kubernetes.io/change-cause="Subindo o sistema noticias pelo deployment na versao 1"
deployment.apps/sistema-noticias-deployment annotated

$ kubectl annotate deployment db-noticias-deployment kubernetes.io/change-cause="Subindo o database pelo deployment na versao 1"
deployment.apps/db-noticias-deployment annotated


$ kubectl rollout history deployment db-noticias-deployment sistema-noticias-deployment
deployment.apps/db-noticias-deployment 
REVISION  CHANGE-CAUSE
1         Subindo o database pelo deployment na versao 1

deployment.apps/sistema-noticias-deployment
REVISION  CHANGE-CAUSE
1         Subindo o sistema noticias pelo deployment na versao 1
```

#### j.12 Criar o VOLUME do tipo hostPath

* **Objetivo**: Criar um volume do tipo hostPath que compartilha e persiste dados locais

* Consutar a documentação oficial em https://kubernetes.io/docs/concepts/storage/volumes/

* _Apply_ (criar ou atualizar) volume e entrar no container dentro do POD para fazer testes

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ kubectl apply -f pod-volume.yaml 
pod/pod-volume configured

$ kubectl exec -it pod-volume --container nginx-container -- bash
root@pod-volume:/ ls
bin   dev                  docker-entrypoint.sh  home  lib64  mnt  proc  run   srv  tmp  var
boot  docker-entrypoint.d  etc                   lib   media  opt  root  sbin  sys  usr  volume-dentro-do-container
root@pod-volume:/ echo "Hello file inside container" >  volume-dentro-do-container/file.txt
root@pod-volume:/ exit
```

#### j.13 Criar o VOLUME do tipo Storage Class na Google Cloud Platform com um GCE Persistent Disk

* **Objetivo**: Criar um volume do tipo Storage Class na Google Cloud Platform

* _Apply_ (criar ou atualizar) um Storage Class para volume do sistema de notícias utilizando 
* Na documentação oficial https://kubernetes.io/docs/concepts/storage/storage-classes/ é possível ter uma idéia do arquivo (.yaml) de configuração.

* No Google Cloud Platform :: GKE > CloudShell criar o arquivo `sc.yaml` com a definição do Storage Class para o cluster Kubernetes
* No Google Cloud Platform :: GKE > CloudShell criar o arquivo `pvc-sc.yaml` com a definição do PVC - Physical Volue Claim para o Storage Class para o cluster Kubernetes
* Executar a criação do `sc.yaml` e `pvc-sc.yaml`

```sh
$ kubectl apply -f sc.yaml
$ kubectl apply -f pvc-sc.yaml
$ kubectl get pvc # status bound
$ kubectl get pv  # pv criado em funcao do PVC
```

* No Google Cloud Platform :: GKE > CloudShell criar o arquivo `pod-sc.yaml` com a definição do POD vinculado ao volume vinculado automaticamente com Storage Class para o cluster Kubernetes

```sh
$ kubectl apply -f pod-sc.yaml
$ kubectl get pod --watch
$ kubectl exec -it pod-sc -- bash
root@pod-sc:/ ls -la
```


#### j.14 Criar um StatefulSet para o sistema de notícias

* **Objetivo**: Criar um StatefulSet para o sistema de notícias

* _Apply_ (criar ou atualizar) um StateFulSet para o sistema de notícias, usando um Claim Private Volume e um Private Volume a AWS

```sh
$ pwd # /src/kubernetes-basic/portal-noticias$
$ cat sistema-noticias-statefulset.yaml

```


## I - Referências

* Kubernets
  * https://kubebyexample.com/en/learning-paths/kubernetes-fundamentals
  * https://cursos.alura.com.br/course/kubernetes-deployments-volumes-escalabilidade/task/80496
  * [INICIATIVA KUBERNETES - Aula 2 - Desvendando o Kubernetes](https://www.youtube.com/watch?v=ncVLiKv1Xxo&list=WL)
* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
