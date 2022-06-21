## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-26: Grafana collecting data from Prometheus in Kubernetes** abaixo do projeto [**k8s-docker-iac-labs**](../README.md) e consiste em:
* Obter os binários e instalar a ferramenta
* Configurar a ferramenta para o propósito do laboratório
* Explorar os recursos e funcionalidades básicas da ferramenta

## 2. Documentação

	### 2.1. Documentação oficial e tutoriais de referências
	
		* https://grafana.com/
		* https://www.youtube.com/watch?v=65-Y7Sjogv8
		* https://www.youtube.com/watch?v=0C-v3U6S1X0
		* https://www.youtube.com/watch?v=hvACEDjHQZE
		* https://www.youtube.com/watch?v=t6jZUR-xYVM


## 3. Projeto / Laboratório

	### 3.1. Pré-Requisitos, Pré-Condições e Premissas

		#### 3.1.1. Tecnologias e ferramentas

			* Windows OnPrimasse
			* WSL - Windows Subsystem for Linux
			* Docker Desktop or Rancher Desktop for Windows or Docker for Linux
			* Docker and Kubernetes or VirtualBox or On-Premisse infrastructure (Deployment Infraestructure)


	### 3.3. Guia de Implantação, Configuração e Instalação

	### 3.5. Guia de Estudo

	### 3.5.1. Configurar, executar e testar - Kubernetes Grafana - Deployment, Replicaset, Pod, Service ClusterIP e Nodeport

		* Create/apply Kubernetes Deployment, Replicaset, Pod, Service ClusterIP e Nodeport

			```cmd
			C:\> type configmap-k8s-grafana-datasource-prometheus.yaml
			C:\> kubectl apply -f configmap-k8s-grafana-datasource-prometheus.yaml
			configmap/configmap-grafana-datasources-prometheus created
			C:\> 
			C:\> type deploy-k8s-grafana.yaml
			C:\> kubectl apply -f deploy-k8s-grafana.yaml
			deployment.apps/deploy-grafana created
			service/svc-nodeport-grafana created
			```

		* Test - Grafana - Is running OK?

			```browser
			+--------------------------------------------+
			| http://localhost:30097                     |
			+--------------------------------------------+
			|            Welcome to grafana              |
			|                                            |
			|            username: [admin]               |
			|            password: [admin]               |
			|                                 +--------+ |
			|                                 | Log in | |
			|                                 +--------+ |
			+--------------------------------------------+
			```

		* Log In to Grafana using credentials admin/admin and change password to admin123

		* On `Grafana :: (left menu Organization Main Org.) >> Configuration`
		  + Observe table grid result
		  	- Prometheus - http://svc-prometheus-server:9090
			- Click on link to navigate to details for Datasource Prometheus


	### 3.5.2. Import Grafana Dashboard for Prometheus

		* On `Grafana :: (left menu Organization Main Org.) >> Configuration >> Datasource Prometheus`
		  - Click on tab-menu `Dashboard`
		  - Observe list of Dashboard available for this
		  - Click on button `Import` from `Prometheus 2.0 Stats`

		* On `Grafana :: (left menu ) >> Dashboard` browse Dashboards availables
			- Click on `Prometheus 2.0 Stats`
			- Observe `Scrap Duration`
