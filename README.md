`k8s-docker-iac-labs/README.md` - Laboratório Kuberntes, Docker, Rancherdesktop, Infra as Code, Monitoring and Observability

## 1. Introdução

Este repositório contém os artefatos do projeto / laboratório de avaliação  **k8s-docker-iac-labs** organizado conforme o índice de conteúdo abaixo:

##### Índice de conteúdo  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.4. Diagrama de Mapa Mental (Mind Map Diagram)](#24-diagrama-de-mapa-mental-mind-map-diagram)
  * [2.8. Notas de atenção e Avisos (Notice and information)](#28-notas-de-atenção-e-avisos-notice-and-information)
- [3. Projeto / Laboratório](#3-projeto--laboratório)

- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.drawio.png](./doc/uml-diagrams/UseCaseDiagram-kubernetes.drawio.png) 


### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.drawio.png](./doc/uml-diagrams/DeployDiagram-kubernetes-docker.drawio.png) 


### 2.4. Diagrama de Mapa Mental (Mind Map Diagram)

![MindMapDiagram-Context.png](./doc/mind-maps/MindMapDiagram-kubernetes-docker.png) 

[`MindMapDiagram-Context-all-expanded.png`](./doc/mind-maps/MindMapDiagram-kubernetes-docker-all-expanded.png) 


### 2.8. Notas de atenção e Avisos (Notice and information)

* A idéia deste repositório é elaborar, construir e revisar um material documentado que possa usar como referência inicial sobre Kubernetes e Devops, seja para um projeto ou para um novo laboratório, evoluindo ou especializando (abstração vs especialização) e facilitando o aprendizado constante
* Deixo aqui o registro e agradecimento aos produtores de conteúdos que me inspiraram e  material foi inspirado e baseado na 
  * [Playlist da Iniciativa Kubernetes - Semana Kubedev](https://www.youtube.com/watch?v=0V_zGIEqIBc&list=PLZfrXScDmaiPwFQvY4JnPZkgC3NmqxFLX) produzido pelo canal do Youtube [Kubedev - Fabrício Veronez](https://www.youtube.com/channel/UCUy0NlW6WlVFj8V3xhXegYQ)
  * [Playlist de Apache Kafka](https://www.youtube.com/watch?v=o5yviW6QSrE&list=PL5aY_NrL1rjt_AZxj11kQjiTNLGg4ZaZA) produzido pelo canal do Youtube [FullCycle - Wesley Willians](https://www.youtube.com/channel/UCMUoZehUZBhLb8XaTc8TQrA)
  * [Kafka (Plataforma de Mensageria e Streaming) // Dicionário do Programador](https://www.youtube.com/watch?v=qOqXz5Qv_-8&list=PLORrDfZD1hkGVBK4byiS82zaAutzuhsRz) produzido pelo canal do Youtube [Código Fonte TV - Gabriel Fróes e Vanessa Weber](https://www.youtube.com/watch?v=qOqXz5Qv_-8&t=74s)
  * [Evento Imersão Full Stack & Full Cycle](https://www.youtube.com/watch?v=O0HqVNkzY1Q) produzido pelo canal do Youtube [FullCycle - Wesley Willians](https://www.youtube.com/channel/UCMUoZehUZBhLb8XaTc8TQrA)


## 3. Projeto / Laboratório

| Laboratório | Descrição                       |
| :---------- | :------------------------------ |
| [LAB-01](./md/README-install-wsl-rancherdesktop-windows.md)                        | Install WSL, Rancher Desktop and command line with nerdctl |
| [LAB-02](./md/README-docker-commands-basic.md)                                     | Docker Commands Basic |
| [LAB-03](./md/README-install-windows-client-mongodb-studio3t.md)                   | Windows Client MongoDB Studio 3T vs Docker Server MongoDB |
| [LAB-04](./md/README-docker-images-containers.md)                                  | Docker Images vs Containers vs DockerHub |
| [LAB-05](./md/README-k8s-commands-basic.md)                                        | Basic Kubernetes Commands Basic |
| [LAB-06](./md/README-k8s-python-flask-mongodb.md)                                  | Kubernetes, Python, Flask e MongoDB |
| [LAB-07](./md/README-k8s-nodejs-http-echo.md)                                      | NodeJS http echo application |
| [LAB-08](./md/README-install-windows-client-kubernetes-ide-lens.md)                | Kubernetes IDE Lens |
| [LAB-09](./md/README-k8s-selfhealing-healthcheck-resourceslimits-probes.md)        | Kubernetes Self Healing, application health check and resources limits probes with NodeJS, Express, Swagger-UI, NodeHog, YamlJS and Ejs |
| [LAB-10](./md/README-k8s-api-lang-response-database-middleware-action.md)          | Kubernetes - API - Response - Database - Middleware - Action ![star.jpg](./doc/images/star.jpg) ![star.jpg](./doc/images/star.jpg) ![star.jpg](./doc/images/star.jpg) |
| [LAB-11](./md/README-dockerfile-docker-compose-basic.md)                           | Dockerfile e Docker Compose Basic |
| [LAB-12](./md/README-golang-basic.md)                                              | GoLang Programming Basic |
| [LAB-13](./md/README-install-cloud-docker-kubernetes.md)                           | Install on Cloud Docker & Kubernetes |
| [LAB-14](./md/README-terraform-basic.md)                                           | Terraform Basic |
| [LAB-15](./md/README-kafka-basic.md)                                               | Kafka Basic |
| [LAB-16](./src/terraform-ansible-aws/readme.txt)                                   | Terraform Ansible AWS - Provision AWS EC2 Linux instance, Install Python and Django, Create simple Django Project and make server available  |
| [LAB-17](./src/terraform-ansible-aws-keypair-multiple-env/readme.txt)              | Terraform Ansible AWS - Create Key Pair, provision two AWS EC2 Linux instances: DEV, PRD  |
| [LAB-18](./src/terraform-aws/readme.txt)                                           | Terraform AWS - Provision, Modify, References, Dependencies, Alias, Variables, Output and working with a team |
| [LAB-19](./src/terraform-ansible-aws-ec2-k8s/readme.txt)                           | Terraform AWS, Ansible, EC2, Kubernetes - Criando Cluster Kubernetes na AWS com 3 instâncias EC2 (master-1, worker-1, worker-2) |
| [LAB-20](./src/terraform-aws-eks-gcp-gke-azure-aks/readme.txt)                     | Terraform Kubernetes on multi cloud - AWS/EKS: Elastic Kubernetes Service, GCP/GKE - Gooble Kubernetes Engine, AZURE/AKS - Azure Kuberntes Engine |
| [LAB-21](./src/prometheus-docker/readme.txt)                                       | Prometheus Docker |
| [LAB-22](./src/prometheus-k8s/readme.txt)                                          | Prometheus Kubernetes |
| [LAB-23](./src/prometheus-k8s-grafana/readme.txt)                                  | Prometheus and Grafana in Kubernetes |
| [LAB-24](./src/py-http-echo/readme.txt)                                            | Python HTTP echo application - run standalone, docker and kubernetes |
| [LAB-25](./src/py-k8s-prometheus-exporter/readme.txt)                              | Python Exporter for Prometheus in Kubernets |
| [LAB-26](./src/aws-cli/readme.txt)                                                 | AWS CLI 2.0 - Install Windows and Linux |
| [LAB-27](./src/py-k8s-prometheus-exporter-push-gateway/readme.txt)                 | Python Exporter Push Gateway for Prometheus in Kubernets |
| [LAB-28](./src/terraform-aws-iam-user-keypair-ec2-linux-windows/readme.txt)        | Terraform - AWS - IAM User and KeyPair - EC2 instance Linux and Windows |
| [LAB-29](./md/README-install-kubernetes-kind.md)                                   | Install Kind Kubernetes platform on Windows |
| [LAB-30](./md/README-dotnet-basic.md)                                              | DotNet Basic |
| [LAB-31](./src/k8s-nginx-ingress-controller/readme.txt)                            | NGINX Ingress Controller Reverse Proxy |
| [LAB-32](https://github.com/josemarsilva/study-node#351-node-js-first-example)     | Node.js Tutorial Programming language |
| [LAB-33](https://github.com/josemarsilva/study-node#3513-hands-on-laboratory-creating-nodejs-project-with-dependencies-express-jade-nano-body-parser-errorhandler-url-serve-favicon-logger-json-express-session) | Node.js Express Jade Nano |
| [LAB-34](./src/docker-compose-postgresql/readme.txt)                               | Docker-Compose PostgreSQL |
| [LAB-35](./md/README-install-dockerdesktop-wsl2-kubernetes-on-windows11.md)        | Install Docker Desktop, WSL2 e Kubernetes on Windows 11 |




## I - Referências

* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)
