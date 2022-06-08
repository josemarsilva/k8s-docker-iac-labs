## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-21: Prometheus in Docker** abaixo do projeto [**k8s-docker-iac-labs**](../README.md) e consiste em:
* Obter os binários e instalar a ferramenta **Prometheus** como um container Docker no Rancher Desktop Local
* Configurar a ferramenta para o propósito do laboratório
* Explorar os recursos e funcionalidades básicas da ferramenta

## 2. Documentação

	### 2.1. Documentação oficial e tutoriais de referências

		* https://prometheus.io/docs/introduction/overview/	
		* https://www.youtube.com/watch?v=tIvHAxs8Fec&list=WL
		* https://hub.docker.com/r/prom/prometheus
		* https://hub.docker.com/r/bitnami/prometheus (distribution bitnami)
		* https://hub.docker.com/r/ubuntu/prometheus (distribution ubuntu)


## 3. Projeto / Laboratório

	### 3.1. Pré-Requisitos, Pré-Condições e Premissas

		#### 3.1.1. Tecnologias e ferramentas

			* Windows OnPrimasse
			* WSL - Windows Subsystem for Linux
			* Rancher Desktop for Windows
			* Docker On-Premise infrastructure


	### 3.3. Guia de Implantação, Configuração e Instalação

		#### 3.3.1. Instalar Prometheus em container Docker no Rancker Desktop

		#### 3.3.1.1. Download  image(s) from DockerHub registry

			```bash
			$ nerdctl.exe image pull bitnami/prometheus
			$ nerdctl.exe image pull ubuntu/prometheus
			$ nerdctl.exe image pull prom/prometheus

			$ nerdctl.exe image ls
			REPOSITORY            TAG       IMAGE ID        CREATED          PLATFORM       SIZE         BLOB SIZE
			:                     :         :               :                :              :            :
			bitnami/alertmanager  latest    e392081810df    5 weeks ago      linux/amd64    147.9 MiB    58.3 MiB
			bitnami/prometheus    latest    b9d9be1ee582    5 weeks ago      linux/amd64    490.2 MiB    192.5 MiB
			prom/prometheus       latest    18dfa7c0caba    4 seconds ago    linux/amd64    203.5 MiB    80.8 MiB
			:                     :         :               :                :              :            :
			```

		#### 3.3.1.2. Run **Prometheus** distribution prom as service deamon

			```bash
			$ pwd # /../k8s-docker-iac-labs/src/prometheus-basic
			$ mkdir ../../volume/prometheus
			$ nerdctl.exe run -d --name prometheus -p 9090:9090 -v ../../volume/prometheus:/opt/bitnami/prometheus/data prom/prometheus
			fe7c23a692166bf5acf7500dc76bd666313a397a5edc1c775f8560be481c2c79
			```

		#### 3.3.1.3. Open Page localhost:9090 and check working

			+----------------------------------------------+
			| http://127.0.0.1:9090/                       |
			+----------------------------------------------+
			| Prometheus | Alerts | Graphs | Status | Help |
			+----------------------------------------------+

		#### 3.3.1.4. Check and test Prometheus default configuration - Targets

			* On `Prometheus :: (menu) Status >> Targets`
				- Endpoint http://localhost:9090/metrics | State = Up ...

			* Open default Prometheus metrics page

			+----------------------------------------------+
			| https://localhost:9090/metrics               |
			+----------------------------------------------+
			| # HELP go_gc_duration_seconds A summary ...  |
			| :                                            |
			+----------------------------------------------+

			* On `Prometheus :: (menu) Status >> Graph`
				- Expression: `promhttp_metric_handler_requests_total`
				- Observe table results


		#### 3.3.1.5. Stop Prometheus, configure `../../volume/prometheus/prometheus.yaml` with file `prometheus-initial.yaml` and restart

			* Stop Prometheus

			```bash
			$ cp prometheus.yaml ../../volume/prometheus/prometheus.yaml
			$ nerdctl.exe container stop prometheus
			$ nerdctl.exe container rm   prometheus
			````

			* Configure Prometheus configuration file `prometheus.yaml`

			```../../volume/prometheus/prometheus.yaml
			global:
			scrape_interval: 30s

			scrape_configs:
			- job_name: prometheus
				static_configs:
				- targets: ["localhost:9090"]
					labels:
					subsystem: "Prometheus"
			```

			* Run Prometheus -  start again using configuration file prometheus.yaml

			```bash
			$ nerdctl.exe run -d --name prometheus -p 9090:9090 -v ../../volume/prometheus:/opt/bitnami/prometheus/data -v ../../volume/prometheus/prometheus.yaml:/etc/prometheus/prometheus.yml prom/prometheus
			fe7c23a692166bf5acf7500dc76bd666313a397a5edc1c775f8560be481c2c79
			```

		#### 3.3.1.6. Check and test Prometheus after new configurations

			* On `Prometheus :: (menu) Status >> Graph`
				+ Query parameters
					- Expression: `promhttp_metric_handler_requests_total`
					- Evaluation time: null
					- Click `Execute`
				+ Query parameters
					- Expression: `prometheus_http_requests_total`
					- Evaluation time: null
					- Click `Execute`
				- Observe and analyze results
				- Observe metric attributes: `subsystem="Prometheus"`


	### 3.4. Guia de Demonstração e Teste

			* n/a


	### 3.5. Guia de Estudo

		### 3.5.1. Conceitos

			* Time Series Database
			* Tipos de métricas:
				- Counter: Incremental values. Ex: http request count, error count
				- Gauge: Arbitrary numbers. Ex: Numbers of on-line users
				- Histogram: Frequency distribution and agregation possible. Ex: Sales by age groups - $ 1000 for childreen < 18 in last hour.
				- Summary: Similar to histogram and allow grouping.
			* PromQL - Query Language to Prometheus
				+ Ex: 
					- http_requests_total
					- rate(http_requests_total(5m))
					- http_requests_total("status!=4..")
