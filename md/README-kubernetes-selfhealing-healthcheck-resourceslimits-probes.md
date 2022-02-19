`kubernetes-docker-rancherdesktop-labs/md/README-kubernetes-selfhealing-healthcheck-resourceslimits-probes.md` - Kubernetes, Docker e Rancher Desktop - LAB-09 - Kubernetes Self Healing, application health check, ready to serve and resources limits probes

## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-09 - Kubernetes Self Healing, application health check and resources limits probes** abaixo do projeto [kubernetes-docker-rancherdesktop-labs](../README.md). Este laboratório consiste em:
* Explorar os conceitos do _Kubernetes_ : Self healing, Liveness probe and Readiness probe

##### Table of Contents  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.3. Diagrama de BPMN (Business Process Modeling Notation)](#23-diagrama-de-bpmn-business-process-modeling-notation)
  * [2.4. Diagrama de Mapa Mental (Mind Map Diagram)](#24-diagrama-de-mapa-mental-mind-map-diagram)
  * [2.9. Glossário de Termos (Glossary)](#29-glossário-de-termos-glossary)
- [3. Projeto](#3-projeto)
  * [3.1. Pré-Requisitos, Pré-Condições e Premissas](#31-pré-requisitos-pré-condições-e-premissas)
    + [a. Tecnologias e ferramentas](#a-tecnologias-e-ferramentas)
    + [b. Ferramental de apoio](#b-ferramental-de-apoio)
    + [c. Instalando bibliotecas e configurando ambiente NodeJS](c-instalando-bibliotecas-e-configurando-ambiente-nodejs)
  * [3.2. Guia do Desenvolvedor e Administrador](#32-guia-do-desenvolvedor-e-administrador)
    + [3.2.1. Construir projeto NodeJS, Express, Swagger, Kubernetes Liveness, Readiness e Startup Probes](#321-construir-projeto-nodejs-express-swagger-kubernetes-liveness-readiness-e-startup-probes)
      - [3.2.1.01. Inicializar projeto NodeJS, Express, Swagger, Kubernetes Liveness, Readiness e Startup Probes](#32101-inicializar-projeto-nodejs-express-swagger-kubernetes-liveness-readiness-e-startup-probes)
      - [3.2.1.02. Desenvolver entry-point da aplicação e view de apresentação básica](#32102-desenvolver-entry-point-da-aplicação-e-view-de-apresentação-básica)
      - [3.2.1.03. Documentar a API no Swagger](#32103-documentar-a-api-no-swagger)
      - [3.2.1.04. Executar e testar aplicação](#32104-executar-e-testar-aplicação)
    + [3.2.2. Construir imagem Docker da aplicação](#322-construir-imagem-docker-da-aplicação)
      - [3.2.2.1. Criar/Editar/Configurar Dockerfile](#3221-criareditarconfigurar-dockerfile)
      - [3.2.2.2. Construir (Build) imagem](#3222-construir-build-imagem)
      - [3.2.2.3. Executar (run) e Testar as funcionalidades](#3223-executar-run-e-testar-as-funcionalidades)
      - [3.2.2.4. Tagear (tag) as imagens construídas e Salvar/Publicar (push) no DockerHub Registry](#3224-tagear-tag-as-imagens-constru%C3%ADdas-e-salvarpublicar-push-no-dockerhub-registry)
    + [3.2.3. Construir, Implantar e Testar cenários de self healing e livenes probe no cluster Kubernetes](#323-construir-implantar-e-testar-cen%C3%A1rios-de-self-healing-e-livenes-probe-no-cluster-kubernetes)
      - [3.2.3.1. Cenário 1: Cenário BASE da aplicação rodando no cluster](#3231-cen%C3%A1rio-1-cen%C3%A1rio-base-da-aplica%C3%A7%C3%A3o-rodando-no-cluster)
      - [3.2.3.2. Cenário 2: Deletar alguns PODs e observar o comportamento](#3232-cen%C3%A1rio-2-deletar-alguns-pods-e-observar-o-comportamento)
      - [3.2.3.3. Cenário 3: Simular a indisponibilidade de alguns PODs e observar o comportamento](#3233-cen%C3%A1rio-3-simular-a-indisponibilidade-de-alguns-pods-e-observar-o-comportamento)
      - [3.2.3.4. Cenário 4: Simular a indisponibilidade de alguns PODs tendo _SelfHealing_ do _livenessProbe_ configurado e observar o comportamento](#3234-cen%C3%A1rio-4-simular-a-indisponibilidade-de-alguns-pods-tendo-selfhealing-do-livenessprobe-configurados-e-observar-o-comportamento)
      - [3.2.3.5. Cenário 5: Configurar o atraso na prontidão de início dos pods e simular a indisponibilidade de alguns PODs tendo _SelfHealing_ do _livenessProbe_ e _readynessProbe_ configurados e observar o comportamento](#3235-cen%C3%A1rio-5-configurar-o-atraso-na-prontid%C3%A3o-de-in%C3%ADcio-dos-pods-e-simular-a-indisponibilidade-de-alguns-pods-tendo-selfhealing-do-livenessprobe-e-readynessprobe-configurados-e-observar-o-comportamento)
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
    + [a. Conceitos, definições e visão geral](#a-conceitos-definições-e-visão-geral)
    + [b. LivenessProbe](#b-livenessprobe)
    + [c. ReadnessProbe](#c-readnessprobe)
    + [d. Resources limit (cpu, memory)](#d-resources-limit-cpu-memory)


- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

* Contexto do desenvolvimento da aplicação NodeJS para Kubernetes

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes-dev.png) 

* Contexto do gerenciamento da aplicação NodeJS para Kubernetes

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-kubernetes-ops.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

* Contexto da aplicação NodeJS desenvolvida com biblioteca Express e Swagger para testes no Kubernetes

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-node-express-swagger-k8s.png) 


### 2.3. Diagrama de BPMN (Business Process Modeling Notation)

* Contexto da aplicação NodeJS desenvolvida com biblioteca Express e Swagger para testes no Kubernetes

![BpmnDiagram-kubernetes-self-healing.png](../doc/bpmn-diagrams/BpmnDiagram-kubernetes-self-healing.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-kubernetes-docker-rancherdesktop-selfhealing-healthcheck-resourceslimits.png](../doc/mind-maps/MindMapDiagram-kubernetes-docker-rancherdesktop-selfhealing-healthcheck-resourceslimits.png) 


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
* NodeJS (Development, Build and Deploy)
  * Libraries and Enviroment: express, swagger

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.2. Guia do Desenvolvedor e Administrador

#### 3.2.1. Construir projeto NodeJS, Express, Swagger, Kubernetes Liveness, Readiness e Startup Probes

##### 3.2.1.01. Inicializar projeto NodeJS, Express, Swagger, Kubernetes Liveness, Readiness e Startup Probes

* _passo-#1-INIT_: Inicializando um projeto NodeJS (em ambientes Windows)

```cmd
C:\...-probes> npm init
  :
package name: node-express-swagger-k8s-liveness-readiness-startup-probes
version: 1.0.0
description: Kubernetes - Node Express Swagger Liveness Readiness Startup Probes application
entry point: server.js
test command: 
git repository: https://github.com/josemarsilva/kubernetes-docker-rancherdesktop-labs.git
keywords: node express swagger k8s liveness readiness startup probes
author: Josemar Furegatti de Abreu Silva
license: ISC
  :
```

*  _passo-#2-INSTALL_: Instalar as dependências por linha de comando ...
  * https://www.npmjs.com/package/express
  * https://www.npmjs.com/package/swagger-ui-express
  * https://www.npmjs.com/package/ejs
  * https://www.npmjs.com/package/nodehog
  * https://www.npmjs.com/package/yamljs

```cmd
C:\...-probes> npm install express --save
C:\...-probes> npm install ejs --save
C:\...-probes> npm install nodehog --save
C:\...-probes> npm install swagger-ui-express --save
C:\...-probes> npm install yamljs --save
```

* ... ou Editar `package.json` e adicionar e revisar as dependências requeridas em ` ... "dependencies": { ...`

```cmd
C:\...-probes> TYPE package.json
```

* Instalar e configurar o ambiente NodeJS com os pacotes requeridos 

```cmd
C:\...-probes> npm install
```

##### 3.2.1.02. Desenvolver entry-point da aplicação e view de apresentação básica

* _passo-#2-DEVELOP-ENTRYPOINT_: No entry-point `server.js` instanciar o servidor Express, criar e configurar as rotas de mapeamento da aplicação. Implementar as rotas mais simples
* _passo-#3-DEVELOP-FEATURES_: Criar/editar uma sub-pasta `views` para organizar as páginas de visualização abaixo dela e criar/editar o arquivo `index.ejs` com o template do conteúdo da homepage de sua aplicação. Supondo uma aplicação que permite o input de uma mensagem que quando você clica em um botão a página é reapresentada com a mensagem no corpo
* _passo-#4-DEVELOP-HEALTHCHECK_: Criar/editar o programa `config\system-life.js` para organizar os códigos de Liveness Probles nos end-points `health-check` and `ready-to-serve`
* _passo-#5-DEVELOP-READYTOSERVE_: Criar/editar o programa `config\system-life.js` para organizar os códigos do controle, manipulação e simulação do Liveness Probles nos end-points `set-unhealth`, `set-health`, `set-unready`, `stress`  and `when-will-you-be-ready`


```cmd
C:\...-probes> TYPE server.js
C:\...-probes> TYPE .\views\index.ejs
C:\...-probes> TYPE .\config\system-lifecycle.js
```

* Criar/editar uma sub-pasta `config` para organizar os códigos
referente ao `health-check`, `ready-to-serve` e ao `stress`


##### 3.2.1.03. Documentar a API no Swagger

* _passo-#6-SWAGGER_: Criar/editar o arquivo `swagger.yaml` para documentar as API's que sua aplicação devera prover, você pode usar um editor comum ou [Editor Swagger Online](https://editor.swagger.io/)
* Configure o path `swagger-ui` no arquivo `server.js`

```cmd
C:\...-probes> TYPE server.js
C:\...-probes> TYPE .\views\index.ejs
C:\...-probes> TYPE swagger.yaml
```

#### 3.2.1.04. Executar e testar aplicação

*_passo-#7-TEST_:  Execute sua aplicação e teste sua aplicação

```cmd
C:\...-probes> node server 
```

* Screenshot: Homepage

![screenshot-node-express-swagger-liveness-readiness-startup-probes-homepage.png](../doc/screenshots/screenshot-node-express-swagger-liveness-readiness-startup-probes-homepage.png) 

* Screenshot: Show Message

![screenshot-node-express-swagger-liveness-readiness-startup-probes-showmessage.png](../doc/screenshots/screenshot-node-express-swagger-liveness-readiness-startup-probes-showmessage.png) 

* Screenshot: Swagger

![screenshot-node-express-swagger-liveness-readiness-startup-probes-swagger.png](../doc/screenshots/screenshot-node-express-swagger-liveness-readiness-startup-probes-swagger.png) 

* Test /health-check

```cmd
C:\> curl -X GET -H "accept: text/plain" "http://localhost:8080/health-check"
OK - GET /health-check - hostname
```

* Set /set-unhealth and test /health-check. Application will not respond.

```cmd
C:\> curl -X PUT -H "accept: text/plain" "http://localhost:8080/set-unhealth"
OK - PUT /set-unhealth - hostname

C:\> curl -X GET -H "accept: text/plain" "http://localhost:8080/health-check" -I
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 0
ETag: W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"
Date: Wed, 09 Feb 2022 19:24:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

* Set /set-health and test /health-check. Application is responding again.

```cmd
C:\> curl -X PUT -H "accept: text/plain" "http://localhost:8080/set-health"
OK - PUT /set-health - hostname

C:\> curl -X GET -H "accept: text/plain" "http://localhost:8080/health-check"
OK - GET /health-check - hostname
```

* Test /ready-to-serve

```cmd
C:\> curl -X GET -H "accept: text/plain" "http://localhost:8080/ready-to-serve"
OK - GET /ready-to-serve - hostname

C:\> curl -X GET -H "accept: text/plain" "http://localhost:8080/when-will-you-be-ready"
OK - GET /when-will-you-be-ready - "is_ready_to_serve": True - "wait_amount": 0 - "is_health_check": True - "current_timestamp": "Sun Feb 13 2022 20:11:28 GMT-0300 (GMT-03:00)" - "readness_timestamp": "Sun Feb 13 2022 20:07:44 GMT-0300 (GMT-03:00)" - hostname
```

* Set /set-unready 60 seconds and test /ready-to-serve before and after waiting 60 seconds

```cmd
C:\> curl -X PUT -H "accept: text/plain" "http://localhost:8080/set-unready/seconds:60"
OK - PUT /set-unready - hostname

C:\> curl -X GET -H "accept: text/plain" "http://localhost:8080/ready-to-serve" -I
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 0
ETag: W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"
Date: Mon, 14 Feb 2022 01:52:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5

C:\> curl -X GET -H "accept: text/plain" "http://localhost:8080/when-will-you-be-ready"
OK - GET /when-will-you-be-ready - "is_ready_to_serve": False - "wait_amount": 48 secs - "is_health_check": True - "current_timestamp": "Sun Feb 13 2022 22:52:20 GMT-0300 (GMT-03:00)" - "readness_timestamp": "Sun Feb 13 2022 22:53:09 GMT-0300 (GMT-03:00)" - hostname

C:\> curl -X GET -H "accept: text/plain" "http://localhost:8080/when-will-you-be-ready"
OK - GET /when-will-you-be-ready - "is_ready_to_serve": True - "wait_amount": null - "is_health_check": True - "current_timestamp": "Sun Feb 13 2022 22:53:12 GMT-0300 (GMT-03:00)" - "readness_timestamp": "Sun Feb 13 2022 22:53:09 GMT-0300 (GMT-03:00)" - hostname
```

* Stress resource 'cpu' during 60 seconds and restore normal  after another 30 seconds in a single iterations with no repetition

```cmd
C:\> curl -X PUT -H "accept: text/plain" "http://localhost:8080/stress/cpu/60/30/0"
OK - /stress/cpu/30/15/0 - hostname
```

![screenshot-node-express-swagger-liveness-readiness-startup-probes-stress.png](../doc/screenshots/screenshot-node-express-swagger-liveness-readiness-startup-probes-stress.png) 

---

#### 3.2.2. Construir imagem Docker da aplicação

#### 3.2.2.1. Criar/Editar/Configurar Dockerfile

* _passo-#8-BUILD_: Criar/editar arquivo `Dockerfile` para configurar a imagem de sua aplicação

```cmd
C:\...-probes> TYPE Dockerfile
FROM node
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]
```

#### 3.2.2.2. Construir (Build) imagem

* _passo-#8-BUILD_: Construir a imagem docker a partir de uma imagem base de NodeJS, aplicando o `Dockerfile`

```cmd
C:\...-probes> nerdctl image build -t josemarsilva/node-express-swagger-liveness-readiness-startup-probes:v1 .
  :
unpacking docker.io/josemarsilva/node-express-swagger-liveness-readiness-startup-probes:v1 (sha256:)...done
```

```cmd
C:\...-probes> nerdctl image ls
REPOSITORY                                                             TAG       IMAGE ID        CREATED               PLATFORM       SIZE
        :                                                              :            :              :
josemarsilva/node-express-swagger-liveness-readiness-startup-probes    v1        f779bc921fec    16 seconds ago    linux/amd64    1.1 GiB
        :                                                              :            :              :
```

#### 3.2.2.3. Executar (run) e Testar as funcionalidades

* _passo-#9-TEST_: Executar e testar a aplicação rodando na imagem docker. Teste Homepae, Helth-Check, Swagger, etc

```cmd
C:\...-probes> nerdctl run -d -p 8080:8080 josemarsilva/node-express-swagger-liveness-readiness-startup-probes:v1
```

#### 3.2.2.4. Tagear (tag) as imagens construídas e Salvar/Publicar (push) no DockerHub Registry

* _passo-#10-REGISTRY_: Tagear a imagem `v1` com `latest`

```cmd
C:\...-probes> nerdctl tag josemarsilva/node-express-swagger-liveness-readiness-startup-probes:v1 josemarsilva/node-express-swagger-liveness-readiness-startup-probes:latest

C:\...-probes> nerdctl image ls
REPOSITORY                                                             TAG       IMAGE ID        CREATED           PLATFORM       SIZE
         :                                                             :            :
josemarsilva/node-express-swagger-liveness-readiness-startup-probes    latest    f779bc921fec    8 seconds ago         linux/amd64    1.1 GiB
josemarsilva/node-express-swagger-liveness-readiness-startup-probes    v1        f779bc921fec    About a minute ago    linux/amd64    1.1 GiB
         :                                                             :            :
```

* _passo-#10-REGISTRY_: Efetuar login no DockerHub e registrar a imagem da aplicação

```cmd
C:\...-probes> nerdctl login -u josemarsilva
Enter Password:
Login Succeeded
```

* _passo-#10-REGISTRY_: Fazer upload da imagem local para o Registry Repository do Docker Hub da aplicação `josemarsilva/node-express-swagger-liveness-readiness-startup-probes` nas versões `v1` e `latest`

```cmd
C:\...-probes> nerdctl push josemarsilva/node-express-swagger-liveness-readiness-startup-probes:v1
  :
C:\...-probes> nerdctl push josemarsilva/node-express-swagger-liveness-readiness-startup-probes:latest
  :
```

![screenshot-docker-hub-c.png](../doc/screenshots/screenshot-docker-hub-c.png) 

![screenshot-docker-hub-d.png](../doc/screenshots/screenshot-docker-hub-d.png) 

---

#### 3.2.3. Construir, Implantar e Testar cenários de self healing e livenes probe no cluster Kubernetes

#### 3.2.3.1. Cenário 1: Cenário BASE da aplicação rodando no cluster

* _passo-#1-CONFIG-YAML_: Criar/editar a configuração desejada do manifesto kubernetes em `k8s-config-0.yaml` contemplando o cenário abaixo:
  * Pod: `josemarsilva/node-express-swagger-liveness-readiness-startup-probes:v1`
  * Replicaset: `5` instância(s)
  * Service - NodePort: `30000`

```cmd
C:\...-probes> type k8s-config-0.yaml
```

* _passo-#2-APPLY_: Aplicar, criar, atualizar a configuração desejada do manifesto kubernetes em `k8s-config-0.yaml` 

```cmd
C:\...-probes> kubectl apply -f k8s-config-0.yaml
deployment.apps/node-probes-deploy created
service/webapp-service created
```

* _passo-#3-GET_: Obter o status dos objetos criados 

```cmd
C:\...-probes> kubectl get services
NAME             TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
 :                :             :             :               :
webapp-service   NodePort    10.43.136.46   <none>        8080:30000/TCP   32s

C:\...-probes> kubectl get deployments
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
 :                    :      :            :            :
node-probes-deploy   5/5     5            5           51s

C:\...-probes> kubectl get replicaset
NAME                            DESIRED   CURRENT   READY   AGE
 :                              :         :         :        :
node-probes-deploy-6659b7f5df   5         5         5       74s

C:\...-probes> kubectl get pods
NAME                                  READY   STATUS             RESTARTS   AGE
 :                                     :         :                  :
node-probes-deploy-6659b7f5df-m7zfl   1/1     Running   0          104s
node-probes-deploy-6659b7f5df-5m7zg   1/1     Running   0          104s
node-probes-deploy-6659b7f5df-g2w5j   1/1     Running   0          104s
node-probes-deploy-6659b7f5df-qqlgf   1/1     Running   0          104s
node-probes-deploy-6659b7f5df-bsl54   1/1     Running   0          104s
```

* _passo-#4-1-API/APP-Features_: Usar e testar as funcionalidades da aplicação 
  * acessar a página principal da aplicação pelo browser `http://localhost:30000/`
  * acessar a página de documentação do Swagger pelo browser `http://localhost:30000/swagger/`
  * acessar seguidas vezes a api da aplicação e observe que ela seré executada em _nodes_ diferentes devido ao _load balancer_

```cmd
C:\> curl -X GET -H "accept: text/plain" "http://localhost:30000/health-check"
OK - GET /health-check - node-probes-deploy-6659b7f5df-bsl54

C:\> curl -X GET -H "accept: text/plain" "http://localhost:30000/health-check"
OK - GET /health-check - node-probes-deploy-6659b7f5df-m7zfl

C:\> curl -X GET -H "accept: text/plain" "http://localhost:30000/health-check"
OK - GET /health-check - node-probes-deploy-6659b7f5df-qqlgf

C:\> curl -X GET -H "accept: text/plain" "http://localhost:30000/health-check"
OK - GET /health-check - node-probes-deploy-6659b7f5df-g2w5j

C:\> curl -X GET -H "accept: text/plain" "http://localhost:30000/health-check"
OK - GET /health-check - node-probes-deploy-6659b7f5df-5m7zg
```

* _passo-#5-DELETE_: Deletar, remover toda a configuração desejada do manifesto kubernetes em `k8s-config-0.yaml` 

```cmd
C:\...-probes> kubectl delete -f k8s-config-0.yaml
deployment.apps/node-probes-deploy deleted
service/webapp-service deleted
```

#### 3.2.3.2. Cenário 2: Deletar alguns PODs e observar o comportamento

* _passo-#1-APPLY_: Aplicar, criar, atualizar a configuração desejada do manifesto kubernetes em `k8s-config-0.yaml` 

```cmd
C:\...-probes> kubectl apply -f k8s-config-0.yaml
deployment.apps/node-probes-deploy created
service/webapp-service created
```

* _passo-#2-GET_: Obter o status dos objetos POD criados 

```cmd
C:\...-probes> kubectl get pod
NAME             TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
 :                :             :             :               :
node-probes-deploy-6659b7f5df-z2vls   1/1     Running   0          2m30s
node-probes-deploy-6659b7f5df-g795c   1/1     Running   0          2m30s
node-probes-deploy-6659b7f5df-tqm55   1/1     Running   0          2m30s
node-probes-deploy-6659b7f5df-nt8vq   1/1     Running   0          52s
node-probes-deploy-6659b7f5df-m2h42   1/1     Running   0          52s
```

* _passo-#3-DELETE_: Deletar 3 dos PODs e reexecutar repetidas vezes a consulta de POD's para observar a destruição e recriação dos novos POD's

```cmd
C:\...-probes> kubectl delete pod node-probes-deploy-6659b7f5df-z2vls node-probes-deploy-6659b7f5df-g795c node-probes-deploy-6659b7f5df-tqm55
```

```cmd
C:\...-probes> kubectl get pod
NAME                                  READY   STATUS        RESTARTS   AGE
node-probes-deploy-6659b7f5df-nt8vq   1/1     Running       0          2m12s
node-probes-deploy-6659b7f5df-m2h42   1/1     Running       0          2m12s
node-probes-deploy-6659b7f5df-z2vls   1/1     Terminating   0          3m50s
node-probes-deploy-6659b7f5df-g795c   1/1     Terminating   0          3m50s
node-probes-deploy-6659b7f5df-tqm55   1/1     Terminating   0          3m50s
node-probes-deploy-6659b7f5df-scn7l   1/1     Running       0          2s
node-probes-deploy-6659b7f5df-lztpq   1/1     Running       0          2s
node-probes-deploy-6659b7f5df-29bml   1/1     Running       0          2s
```

```cmd
C:\...-probes> kubectl get pod
node-probes-deploy-6659b7f5df-nt8vq   1/1     Running   0          3m33s
node-probes-deploy-6659b7f5df-m2h42   1/1     Running   0          3m33s
node-probes-deploy-6659b7f5df-scn7l   1/1     Running   0          83s
node-probes-deploy-6659b7f5df-lztpq   1/1     Running   0          83s
node-probes-deploy-6659b7f5df-29bml   1/1     Running   0          83s
```

* _passo-#4-DELETE_: Deletar, remover toda a configuração desejada do manifesto kubernetes em `k8s-config-0.yaml` 

```cmd
C:\...-probes> kubectl delete -f k8s-config-0.yaml
deployment.apps/node-probes-deploy deleted
service/webapp-service deleted
```

#### 3.2.3.3. Cenário 3: Simular a indisponibilidade de alguns PODs e observar o comportamento

* _passo-#1-APPLY_: Aplicar, criar, atualizar a configuração desejada do manifesto kubernetes em `k8s-config-0.yaml` 

```cmd
C:\...-probes> kubectl apply -f k8s-config-0.yaml
deployment.apps/node-probes-deploy created
service/webapp-service created

C:\...-probes> kubectl get deploy
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
node-probes-deploy   5/5     5            5           6s
```

* _passo-#2-API/APP-Features_: Usar a funcionalidade `set-unhealth` para simular que alguns dos POD's "quebraram" ou "pararam" de funcionar e observe o resultado

```cmd
C:\> curl -X PUT -H "accept: text/plain" "http://localhost:30000/set-unhealth"
OK - PUT /set-unhealth - node-probes-deploy-6659b7f5df-xrmlk

C:\> curl -X PUT -H "accept: text/plain" "http://localhost:30000/set-unhealth"
OK - PUT /set-unhealth - node-probes-deploy-6659b7f5df-fbmcm

C:\> curl -X PUT -H "accept: text/plain" "http://localhost:30000/set-unhealth"
OK - PUT /set-unhealth - node-probes-deploy-6659b7f5df-xrmlk
```

* _passo-#3-GET-Status_: Obter repetidas vezes o status dos POD's. Observar que se o POD degradar seu funcionamento ainda não temos a auto-cura ou _SelfHealing_ configurado
  * Repita o comando `get pods` várias vezes, observe que os PODS's não foram reciclados como no caso de eles terem sido removidos.
  * Logo este cenário ainda não está configurado para _SelfHealing_ ou seja auto-cura da degradação do pod
  * Neste cenário alguns POD's respondem com "HTTP/1.1 500 Internal Server Error" que é sinal de que temos componentes degradados na infraestrutura


```cmd
C:\> kubectl get pods
node-probes-deploy-6659b7f5df-fbmcm   1/1     Running   0          4m45s
node-probes-deploy-6659b7f5df-xrmlk   1/1     Running   0          4m45s
node-probes-deploy-6659b7f5df-kc425   1/1     Running   0          4m44s
node-probes-deploy-6659b7f5df-gp6tr   1/1     Running   0          4m45s
node-probes-deploy-6659b7f5df-jzjhn   1/1     Running   0          4m44s

C:\> curl -X GET -H "accept: text/plain" "http://localhost:30000/health-check" -I
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 0
ETag: W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"
Date: Sat, 19 Feb 2022 18:08:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5

C:\> curl -X GET -H "accept: text/plain" "http://localhost:30000/health-check" -I
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 60
ETag: W/"3c-ZkR3TysB3IqBdbjpFOFJ8jhL0b4"
Date: Sat, 19 Feb 2022 18:11:11 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

* _passo-#4-DELETE_: Deletar, remover toda a configuração desejada do manifesto kubernetes em `k8s-config-0.yaml` 

```cmd
C:\...-probes> kubectl delete -f k8s-config-0.yaml
deployment.apps/node-probes-deploy deleted
service/webapp-service deleted
```

#### 3.2.3.4. Cenário 4: Simular a indisponibilidade de alguns PODs tendo _SelfHealing_ do _livenessProbe_ configurados e observar o comportamento

* _passo-#1-CONFIG-YAML_: Criar/editar a configuração desejada do manifesto kubernetes em `k8s-config-1.yaml` contemplando o cenário abaixo:
  * Pod: `josemarsilva/node-express-swagger-liveness-readiness-startup-probes:v1`
  * Replicaset: `5` instância(s)
  * Service - NodePort: `30000`
  * livenessProbe: `/health-check`
* [Kubernetes.io - Documentation - Define a liveness HTTP request ](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-http-request)


```cmd
C:\...-probes> type k8s-config-1.yaml
```

* _passo-#2-APPLY_: Aplicar, criar, atualizar a configuração desejada do manifesto kubernetes em `k8s-config-1.yaml` 

```cmd
C:\...-probes> kubectl apply -f k8s-config-1.yaml
deployment.apps/node-probes-deploy created
service/webapp-service created

C:\...-probes> kubectl get deploy
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
node-probes-deploy   5/5     5            5           41s

C:\...-probes> kubectl get pods
node-probes-deploy-7fcb775-fqlbn   1/1     Running   0          58s
node-probes-deploy-7fcb775-qtbwk   1/1     Running   0          58s
node-probes-deploy-7fcb775-p6zfc   1/1     Running   0          58s
node-probes-deploy-7fcb775-twtpx   1/1     Running   0          57s
node-probes-deploy-7fcb775-dspr9   1/1     Running   0          57s
```

* _passo-#2-API/APP-Features_: Usar a funcionalidade `set-unhealth` para simular que alguns dos POD's "quebraram" ou "pararam de responder" de funcionar e observe o resultado

```cmd
C:\> curl -X PUT -H "accept: text/plain" "http://localhost:30000/set-unhealth"
OK - PUT /set-unhealth - node-probes-deploy-7fcb775-p6zfc

C:\> curl -X PUT -H "accept: text/plain" "http://localhost:30000/set-unhealth"
OK - PUT /set-unhealth - node-probes-deploy-7fcb775-fqlbn

C:\> curl -X PUT -H "accept: text/plain" "http://localhost:30000/set-unhealth"
OK - PUT /set-unhealth - node-probes-deploy-7fcb775-dspr9
```

* _passo-#3-GET-Status_: Obter repetidas vezes o status dos POD's. Observar que o Kubernetes irá fazer RESTART (reiniciar) os POD's que apresentaram comportamento de simulação de "quebra" ou "pararam de responder"
  * Repita o comando `get pods` várias vezes, observe que os PODS's vão sendo reiniciados RESTART
  * Logo este cenário está configurado para _SelfHealing_ ou seja auto-cura da degradação do pod
  * Aos poucos os pods vão sendo reiniciados um a um

```cmd
C:\> kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
node-probes-deploy-7fcb775-fqlbn   1/1     Running   0          3m19s
node-probes-deploy-7fcb775-qtbwk   1/1     Running   0          3m19s
node-probes-deploy-7fcb775-twtpx   1/1     Running   0          3m18s
node-probes-deploy-7fcb775-dspr9   1/1     Running   0          3m18s
node-probes-deploy-7fcb775-p6zfc   1/1     Running   1          3m19s

C:\> kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
node-probes-deploy-7fcb775-qtbwk   1/1     Running   0          3m22s
node-probes-deploy-7fcb775-twtpx   1/1     Running   0          3m21s
node-probes-deploy-7fcb775-dspr9   1/1     Running   0          3m21s
node-probes-deploy-7fcb775-p6zfc   1/1     Running   1          3m22s
node-probes-deploy-7fcb775-fqlbn   1/1     Running   1          3m22s

C:\> kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
node-probes-deploy-7fcb775-qtbwk   1/1     Running   0          9m3s
node-probes-deploy-7fcb775-twtpx   1/1     Running   0          9m2s
node-probes-deploy-7fcb775-p6zfc   1/1     Running   1          9m3s
node-probes-deploy-7fcb775-fqlbn   1/1     Running   1          9m3s
node-probes-deploy-7fcb775-dspr9   1/1     Running   1          9m2s
``` 

#### 3.2.3.5. Cenário 5: Configurar o atraso na prontidão de início dos pods e simular a indisponibilidade de alguns PODs tendo _SelfHealing_ do _livenessProbe_ e _readynessProbe_ configurados e observar o comportamento

* _passo-#1-CONFIG-YAML_: Criar/editar a configuração desejada do manifesto kubernetes em `k8s-config-2.yaml` contemplando o cenário abaixo:
  * Pod: `josemarsilva/node-express-swagger-liveness-readiness-startup-probes:v1`
  * Replicaset: `2` instância(s)
  * Service - NodePort: `30000`
  * livenessProbe: `/health-check`
  * readynessProbe: `/ready-to-serve`
* [Kubernetes.io - Documentation - Define a liveness HTTP request ](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-http-request)


```cmd
C:\...-probes> type k8s-config-2.yaml
```

* _passo-#2-APPLY_: Aplicar, criar, atualizar a configuração desejada do manifesto kubernetes em `k8s-config-2.yaml` 

```cmd
C:\...-probes> kubectl apply -f k8s-config-2.yaml
deployment.apps/node-probes-deploy created
service/webapp-service created

C:\...-probes> kubectl get deploy
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
node-probes-deploy   2/2     2            2           8s

C:\...-probes> kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
node-probes-deploy-7fcb775-njrsd   1/1     Running   0          24s
node-probes-deploy-7fcb775-lxfp5   1/1     Running   0          24s
```


* _passo-#2-1-API/APP-Features_: Usar a funcionalidade `/set-unready/{seconds}` para configurar *todos* (porque não temos controle de qual vamos tornar indisponível logo temos que configurar todos)  os pods para que fiquem disponíveis para serviço somente após aguardar um período de 60 sec

```cmd
C:\> curl -X GET -H "accept: text/plain" "http://localhost:30000/when-will-you-be-ready"
OK - GET /when-will-you-be-ready - "is_ready_to_serve": True - "wait_amount": null - "is_health_check": True - "current_timestamp": "Sat Feb 19 2022 22:14:44 GMT+0000 (Coordinated Universal Time)" - "readness_timestamp": "Sat Feb 19 2022 22:08:09 GMT+0000 (Coordinated Universal Time)" - node-probes-deploy-7fcb775-lxfp5

C:\> curl -X PUT -H "accept: text/plain" "http://localhost:30000/set-unready/120"
OK - PUT /set-unready/120 - node-probes-deploy-7fcb775-lxfp5

C:\> curl -X PUT -H "accept: text/plain" "http://localhost:30000/set-unready/120"
OK - PUT /set-unready/120 - node-probes-deploy-7fcb775-njrsd

C:\> curl -X GET -H "accept: text/plain" "http://localhost:30000/when-will-you-be-ready" -I
curl: (52) Empty reply from server

C:\> kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
node-probes-deploy-7fcb775-lxfp5   0/1     Running   0          15m
node-probes-deploy-7fcb775-njrsd   0/1     Running   0          15m
```

* _passo-#3-GET-Status_: Obter repetidas vezes o status dos POD's. Observar que o Kubernetes irá fazer RESTART (reiniciar) os POD's que apresentaram comportamento de simulação de "quebra" ou "pararam de responder"
  * Repita o comando `get pods` várias vezes, observe que os PODS's vão sendo reiniciados RESTART
  * Apesar de iniciado, como atrasamos o estado de pronto os pods vão demorar um pouco mais para subir e começar a responder para o serviço
  * Logo este cenário está configurado para _SelfHealing_ ou seja auto-cura da degradação do pod
  * Aos poucos os pods vão sendo reiniciados um a um

```cmd
C:\> kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
node-probes-deploy-7fcb775-njrsd   1/1     Running   0          25m
node-probes-deploy-7fcb775-lxfp5   1/1     Running   0          25m
``` 

#### 3.2.3.6. Cenário 6: Provocar o stress do recurso CPU da aplicação e observar o comportamento

* _passo-#1-CONFIG-YAML_: Criar/editar a configuração desejada do manifesto kubernetes em `k8s-config-2.yaml` contemplando o cenário abaixo:
  * Pod: `josemarsilva/node-express-swagger-liveness-readiness-startup-probes:v1`
  * Replicaset: `2` instância(s)
  * Service - NodePort: `30000`
  * livenessProbe: `/health-check`
  * readynessProbe: `/ready-to-serve`
* [Kubernetes.io - Documentation - Define a liveness HTTP request ](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-http-request)


```cmd
C:\...-probes> type k8s-config-2.yaml
```

* _passo-#2-APPLY_: Aplicar, criar, atualizar a configuração desejada do manifesto kubernetes em `k8s-config-2.yaml` 

```cmd
C:\...-probes> kubectl apply -f k8s-config-2.yaml
deployment.apps/node-probes-deploy created
service/webapp-service created

C:\...-probes> kubectl get deploy
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
node-probes-deploy   2/2     2            2           8s

C:\...-probes> kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
node-probes-deploy-7cc8966c6f-mcdgq   1/1     Running   0          23s
node-probes-deploy-7cc8966c6f-cbqt9   1/1     Running   0          23s


C:\> kubectl top pod
NAME                                  CPU(cores)   MEMORY(bytes)
node-probes-deploy-7cc8966c6f-cbqt9   0m           7Mi
node-probes-deploy-7cc8966c6f-mcdgq   0m           7Mi

C:\> kubectl top pod
NAME                                  CPU(cores)   MEMORY(bytes)
node-probes-deploy-7cc8966c6f-cbqt9   2m           26Mi
node-probes-deploy-7cc8966c6f-mcdgq   2m           27Mi
```


* _passo-#2-1-API/APP-Features_: Usar a funcionalidade `/stress` para stressar o recurso `cpu` por `90` segundos e restaurar a normalidade após `15` segundos em uma interação única.

```cmd
C:\> curl -X PUT -H "accept: text/plain" "http://localhost:30000/stress/cpu/60/30/0"
```

```cmd
C:\> kubectl top pod
NAME                                  CPU(cores)   MEMORY(bytes)
node-probes-deploy-7cc8966c6f-cbqt9   1m           27Mi
node-probes-deploy-7cc8966c6f-mcdgq   845m         28Mi
```

* _passo-#3-GET-Status_: Obter repetidas vezes o status dos POD's. Observar que o Kubernetes irá fazer RESTART (reiniciar) os POD's que apresentaram comportamento de simulação de "quebra" ou "pararam de responder"
  * Repita o comando `get pods` várias vezes, observe que os PODS's vão sendo reiniciados RESTART
  * Apesar de iniciado, como atrasamos o estado de pronto os pods vão demorar um pouco mais para subir e começar a responder para o serviço
  * Logo este cenário está configurado para _SelfHealing_ ou seja auto-cura da degradação do pod
  * Aos poucos os pods vão sendo reiniciados um a um

```cmd
C:\> kubectl top pod
``` 

---

### 3.5. Guia de Estudo

#### a. Conceitos, definições e visão geral

* [Selfie-Healing](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) e  [Liveness, readiness and start probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) são configurações que o Kubernetes usa para controlar o [Lifecycle(ciclo de vida)](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/), isto é, parar, reiniciar o _containers_ se ele falhar, substitui ou reagenda os containers quando um _node_ para de funcionar, mata os _containers_ que não estão funcionando bem ou seja não estejam respondendo a uma interface de _helth-check_, _threshold_ de uso de CPU ou MEMORIA e aguarda uma interface de _ready-to-serve_ antes de considerar falha.
* De forma simplificada, sua aplicação fica respondendo periodicamente a uma interface _health-check_ para sinalizar o kubernetes que está tudo bem. O Kubernetes pode ser configurado para a frequencia de tempo em que ele vai avaliar sua aplicação. Enquanto o Kubernetes receber HTTP code 200 da requisição no path configurado, ele considera que a aplicação está funcionado.
* De forma simplificada, sua aplicação pode informar para o Kubernetes quando ela estiver pronta para responder, também através de uma interface _ready-to-serve_ 

```cmd
C:\src\kubernetes-selfhealing> kubectl top pod
```


---

### 3.5. Guia de Estudo

#### a. Conceitos, definições e visão geral

* [Selfie-Healing](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) e  [Liveness, readiness and start probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) são configurações que o Kubernetes usa para controlar o [Lifecycle(ciclo de vida)](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/), isto é, parar, reiniciar o _containers_ se ele falhar, substitui ou reagenda os containers quando um _node_ para de funcionar, mata os _containers_ que não estão funcionando bem ou seja não estejam respondendo a uma interface de _helth-check_, _threshold_ de uso de CPU ou MEMORIA e aguarda uma interface de _ready-to-serve_ antes de considerar falha.
* De forma simplificada, sua aplicação fica respondendo periodicamente a uma interface _health-check_ para sinalizar o kubernetes que está tudo bem. O Kubernetes pode ser configurado para a frequencia de tempo em que ele vai avaliar sua aplicação. Enquanto o Kubernetes receber HTTP code 200 da requisição no path configurado, ele considera que a aplicação está funcionado.
* De forma simplificada, sua aplicação pode informar para o Kubernetes quando ela estiver pronta para responder, também através de uma interface _ready-to-serve_ 

```cmd
C:\src\kubernetes-selfhealing> kubectl top pod
```


## I - Referências

* [Liveness and Readiness Probes | DevNation Lessons](https://www.youtube.com/watch?v=_9R0x_FoiHY)
* https://kubebyexample.com/en/learning-paths/kubernetes-fundamentals
* [INICIATIVA KUBERNETES - Boas práticas de deploy + dúvidas sobre o KubeDev.io](https://www.youtube.com/watch?v=YFUrhekwH64)
* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
