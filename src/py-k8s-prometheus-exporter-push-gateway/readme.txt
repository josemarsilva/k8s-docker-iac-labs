## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-??: Python exporter Push Gateway for Prometheus in Kubernetes** abaixo do projeto [**k8s-docker-iac-labs**](../README.md) e consiste em:
* Obter os binários e instalar a ferramenta
* Codificar um programa para o propósito do laboratório
* Configurar a ferramenta para o propósito do laboratório
* Explorar os recursos e funcionalidades básicas da ferramenta

## 2. Documentação

	### 2.1. Documentação oficial e tutoriais de referências
	
		* https://github.com/prometheus/client_python#exporting-to-a-pushgateway
		* https://stackoverflow.com/questions/40989737/how-to-push-metrics-with-python-and-prometheus-pushgateway


## 3. Projeto / Laboratório

	### 3.1. Pré-Requisitos, Pré-Condições e Premissas

		#### 3.1.1. Tecnologias e ferramentas

			* Windows OnPrimasse
			* WSL - Windows Subsystem for Linux
			* Docker Desktop or Rancher Desktop for Windows or Docker for Linux
			* Docker and Kubernetes or VirtualBox or On-Premisse infrastructure (Deployment Infraestructure)
			* Programming Languages / Libraries / IDE:
				* Python 3.x (3.8 recommended) / venv


	### 3.3. Guia de Implantação, Configuração e Instalação

	### 3.5. Guia de Estudo

	### 3.5.1. Iniciar Kubernetes Prometheus
	
		* Create/apply Kubernetes Deployment, Replicaset, Pod, Service ClusterIP e Nodeport

			```cmd
			C:\> type configmap-py-k8s-prometheus-exporter-push-gateway.yaml
			C:\> kubectl apply -f configmap-py-k8s-prometheus-exporter-push-gateway.yaml
			configmap/configmap-prometheus-server-conf-py-k8s-prometheus-exporter-push-gateway created
			C:\> type deploy-svc-py-k8s-prometheus-server-push-gateway.yaml
			C:\> kubectl apply -f deploy-svc-py-k8s-prometheus-server-push-gateway.yaml
			deployment.apps/deploy-prometheus-server created
			service/svc-prometheus-server created
			service/svc-nodeport-prometheus-server created
			service/svc-prometheus-server-push-gateway created
			service/svc-nodeport-prometheus-server-push-gateway created
			```

		* Test - Prometheus UI

			```browse
			+-------------------------+
			| http://localhost:30090  |
			+-------------------------+
			|          :              |
			+-------------------------+
			```

		* ?????

			```cmd
			C:\> nerdctl.exe image pull prom/pushgateway
			C:\> nerdctl.exe run -d -p 9091:9091 prom/pushgateway
			```




	### 3.5.2. Executar e testar - linha de comando local aplicação py-k8s-prometheus-exporter-push-gateway

		* Iniciar aplicação que registra informação no push gateway

			```cmd
			C:\> python py-k8s-prometheus-exporter-push-gateway.py
			```

	### 3.5.3. Construir, executar e testar - imagem container aplicação py-k8s-prometheus-exporter-push-gateway

		* Extrair as dependências do pip (nenhuma neste caso)

		```cmd
		C:\> pip freeze > requirements.txt
		```

		* Force remove previous images

			```cmd
			C:\> nerdctl.exe image rm josemarsilva/py-k8s-prometheus-exporter-push-gateway:latest
			C:\> nerdctl.exe image rm josemarsilva/py-k8s-prometheus-exporter-push-gateway:v1
			```

		* Build Docker image

			```cmd
			C:\> type Dockerfile
			C:\> type requirements.txt
			C:\> nerdctl.exe image build -t josemarsilva/py-k8s-prometheus-exporter-push-gateway:v1 .
			C:\> nerdctl.exe image tag josemarsilva/py-k8s-prometheus-exporter-push-gateway:v1 josemarsilva/py-k8s-prometheus-exporter-push-gateway:latest
			```


		* Run container (force remove previous)

			```cmd
			C:\> nerdctl.exe container rm -f py-k8s-prometheus-exporter-push-gateway
			C:\> nerdctl.exe container run -d -p 9090:9090 -p 9091:9091 -name py-k8s-prometheus-exporter-push-gateway josemarsilva/py-k8s-prometheus-exporter-push-gateway:latest
			C:\> nerdctl.exe container ls
			CONTAINER ID    IMAGE                                                       COMMAND                   CREATED 					STATUS    PORTS                     NAMES
			ca0d0700af29    docker.io/josemarsilva/py-k8s-prometheus-exporter-push-gateway:latest    "python py-k8s-prome…"    7 seconds ago    Up        0.0.0.0:9000->9000/tcp    py-k8s-prometheus-exporter-push-gateway
			```

		* Test

			```cmd
			C:\> curl localhost:9000
			:
			```


		* Registry Dockerhub

			```cmd
			C:\> nerdctl.exe push josemarsilva/py-k8s-prometheus-exporter-push-gateway:v1
			C:\> nerdctl.exe push josemarsilva/py-k8s-prometheus-exporter-push-gateway:latest
			```

		* Force remove after successfully test

			```cmd
			C:\> nerdctl.exe container rm -f py-k8s-prometheus-exporter-push-gateway
			C:\> nerdctl.exe container ls -a | findstr "prometheus"
			```


	### 3.5.3. Construir, executar e testar - Kubernetes Prometheus Exporter - Deployment, Replicaset, Pod, Service ClusterIP e Nodeport

		* Create/apply Kubernetes Deployment, Replicaset, Pod, Service ClusterIP e Nodeport

			```cmd
			C:\> type deploy-svc-py-k8s-prometheus-exporter-push-gateway.yaml
			C:\> kubectl apply -f deploy-svc-py-k8s-prometheus-exporter-push-gateway.yaml
			deployment.apps/deploy-py-k8s-prometheus-exporter-push-gateway created
			service/svc-py-k8s-prometheus-exporter-push-gateway created
			service/svc-nodeport-py-k8s-prometheus-exporter-push-gateway created
			```

		* Test - prometheus-exporter - Is running OK?

			```cmd
			C:\> curl localhost:30095
			# HELP python_gc_objects_collected_total Objects collected during gc
			# TYPE python_gc_objects_collected_total counter
			python_gc_objects_collected_total{generation="0"} 343.0
			python_gc_objects_collected_total{generation="1"} 36.0
			python_gc_objects_collected_total{generation="2"} 0.0
			:
			```

	### 3.5.4. Construir, executar e testar - Kubernetes Prometheus Server - Configmap, Deployment, Replicaset, Pod, Service ClusterIP e Nodeport

		* Create/apply Kubernetes Configmap, Deployment, Replicaset, Pod, Service ClusterIP e Nodeport

			```cmd
			C:\> type configmap-py-k8s-prometheus-exporter-push-gateway.yaml
			C:\> type deploy-svc-py-k8s-prometheus-server.yaml
			C:\>
			C:\> kubectl apply -f configmap-py-k8s-prometheus-exporter-push-gateway.yaml
			configmap/configmap-prometheus-server-conf-py-k8s-prometheus-exporter-push-gateway created
			C:\> 
			C:\> kubectl apply -f deploy-svc-py-k8s-prometheus-server.yaml
			deployment.apps/deploy-prometheus-server created
			service/svc-prometheus-server created
			service/svc-nodeport-prometheus-server created
			```

		* Test - prometheus-exporter - Is running OK?

			```cmd
			C:\> curl localhost:30095
			:
			```


		* Test - prometheus-server - Is running OK?

			```cmd
			+--------------------------------------------------------------------------------+
			| http://localhost:30096                                                         |
			+--------------------------------------------------------------------------------+
			| Prometheus   Alerts | Graph | Status | Help                                    | 
			| [Expression]                                                                   |
			| :                                                                              |
			+--------------------------------------------------------------------------------+
			```

		* Test - Check Prometheus Configuration for Target 

			- On `http://localhost:30096` clicar menu "Prometheus :: Status >> Targets"
			+ Observar no resultado o target da aplicação py-k8s-http-echo
				- Endpoint=http://svc-py-k8s-prometheus-exporter-push-gateway:9000/metrics
				- State=UP

		* Test - Check Prometheus Database

			+ Enter expression on filter and execute query and observe results
				+ On `http://localhost:30096` clicar menu "Prometheus :: Graph", fill "python_gc_collections_total"           and click "Execute"
				+ On `http://localhost:30096` clicar menu "Prometheus :: Graph", fill "python_gc_objects_collected_total"     and click "Execute"
				+ On `http://localhost:30096` clicar menu "Prometheus :: Graph", fill "python_gc_objects_uncollectable_total" and click "Execute"
				+ On `http://localhost:30096` clicar menu "Prometheus :: Graph", fill "python_info"                           and click "Execute"

