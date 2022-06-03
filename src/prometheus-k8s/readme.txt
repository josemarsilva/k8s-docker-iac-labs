## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-22: Prometheus Kubernetes** abaixo do projeto [**k8s-docker-iac-labs**](../README.md) e consiste em:
* Obter os binários e instalar a ferramenta **Prometheus** como um container Docker no Rancher Desktop Local
* Configurar a ferramenta para o propósito do laboratório
* Explorar os recursos e funcionalidades básicas da ferramenta

## 2. Documentação

	### 2.1. Documentação oficial e tutoriais de referências

		* https://prometheus.io/docs/introduction/overview/	
		* https://devopscube.com/setup-prometheus-monitoring-on-kubernetes
		* https://hub.docker.com/r/prom/prometheus


## 3. Projeto / Laboratório

	### 3.1. Pré-Requisitos, Pré-Condições e Premissas

		#### 3.1.1. Tecnologias e ferramentas

			* Windows OnPrimasse
			* WSL - Windows Subsystem for Linux
			* Docker Desktop or Rancher Desktop for Windows or Docker for Linux
			* Docker or Kubernetes or On-Premisse infrastructure (Deployment Infraestructure)


	### 3.3. Guia de Implantação, Configuração e Instalação

		#### 3.3.1. Instalar Prometheus em POD do Kubernetes

		#### 3.3.1.1. Documentação de referência

			* https://devopscube.com/setup-prometheus-monitoring-on-kubernetes

		#### 3.3.1.2. Segregando monitoramento em Namespace distinto

			* Criando definição de namespace `monitoring`

			```sh
			$ kubectl create namespace monitoring
			namespace/monitoring created
			```

			* Configurando regras de acesso ao namespace em `clusterrule-monitoring.yaml`

			```sh
			$ cat clusterrule-monitoring.yaml
			$ kubectl create -f clusterrule-monitoring.yaml
			clusterrolebinding.rbac.authorization.k8s.io/prometheus created
			```

		#### 3.3.1.3. Create a Config Map To Externalize Prometheus Configurations

			* Configuração do ConfigMap do Prometheus. Pode ser convertido dos arquivos `prometheus.yaml` e do alertmanager em `prometheus.rules`

			```sh
			$ cat configmap-prometheus.yaml
			$ kubectl create -f configmap-prometheus.yaml
			configmap/prometheus-server-conf created
			```

		#### 3.3.1.4. Create a Prometheus Deployment

			* Configuração do Deploymento do Prometheus em

			```sh
			$ cat deployment-prometheus.yaml
			$ kubectl create -f deployment-prometheus.yaml
			deployment.apps/prometheus-deployment created
			```

		#### 3.3.1.5. Check Prometheus Deployment

			* Check status of Prometheus Deployment in Namespace monitoring

			```sh
			$ kubectl get all --namespace=monitoring
			NAME                                        READY   STATUS    RESTARTS   AGE
			pod/prometheus-deployment-87cc8fb88-5jpw6   1/1     Running   0          103s
			NAME                                    READY   UP-TO-DATE   AVAILABLE   AGE
			deployment.apps/prometheus-deployment   1/1     1            1           103s
			NAME                                              DESIRED   CURRENT   READY   AGE
			replicaset.apps/prometheus-deployment-87cc8fb88   1         1         1       103s
			```

		#### 3.3.1.6. Configure Port Forwarding and test manually if it is working

		* Get Pod name of Deplyment like above `prometheus-deployment-87cc8fb88-5jpw6`

		```sh
		$ kubectl get pods --namespace=monitoring
		NAME                                    READY   STATUS    RESTARTS   AGE
		prometheus-deployment-87cc8fb88-5jpw6   1/1     Running   0          4m31s
		```

		* Get Pod name of Deplyment to execute Port Forwarding with correct name of Pod

		```sh
		$ kubectl port-forward prometheus-deployment-87cc8fb88-5jpw6 8080:9090 -n monitoring
		Forwarding from 127.0.0.1:8080 -> 9090
		Forwarding from [::1]:8080 -> 9090
		```

		* Test if Prometheus Homepage is working. You should see something like this

		+--------------------------------------------+
		| http://localhost:8080                      |
		+--------------------------------------------+
		| Prometheus  Alerts | Graph | Status | Help |
		+--------------------------------------------+

		*  Abort execution of Port Forwarding with ^C or BREAK

		```sh
		^C
		```

		#### 3.3.1.7. Exposing Prometheus as a Service - Nodeport

		```sh
		$ cat svc-nodeport-prometheus.yaml
		$ kubectl create -f svc-nodeport-prometheus.yaml --namespace=monitoring
		service/prometheus-service created
		```

		#### 3.3.1.8. Access Prometheus using Nodeport and navigate exploring functionalities

		* Dashboard Prometheus

			+--------------------------------------------+
			| http://localhost:30090                     |
			+--------------------------------------------+
			| Prometheus  Alerts | Graph | Status | Help |
			+--------------------------------------------+

		* On `Prometheus :: (menu) Status >> Targets` 
		
			- Ckeck if all target collect data are working fine
			- `kube-state-metrics` may be down because we are using **Rancher Desktop** instead of **Minikube**


		* On `Prometheus :: (menu) Graph` 
			- fill Expression: `container_cpu_usage_seconds_total`
			- click `Execute`
			- Observe result set in grid table.
			- Click tab button `Graph`
			- Observe result in graphic view

