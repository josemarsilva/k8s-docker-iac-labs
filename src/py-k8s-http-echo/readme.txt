## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-24: Python HTTP echo application** abaixo do projeto [**k8s-docker-iac-labs**](../README.md) e consiste em:
* Obter os binários e instalar a ferramenta
* Configurar a ferramenta para o propósito do laboratório
* Explorar os recursos e funcionalidades básicas da ferramenta

## 2. Documentação

	### 2.1. Documentação oficial e tutoriais de referências
	
		* https://docs.python.org/3/library/http.server.html
		* https://flaviocopes.com/python-http-server/


## 3. Projeto / Laboratório

	### 3.1. Pré-Requisitos, Pré-Condições e Premissas

		#### 3.1.1. Tecnologias e ferramentas

			* Windows OnPrimasse
			* WSL - Windows Subsystem for Linux
			* Docker Desktop or Rancher Desktop for Windows or Docker for Linux
			* Docker or Kubernetes or VirtualBox or On-Premisse infrastructure (Deployment Infraestructure)
			* Programming Languages / Libraries / IDE:
				* Python 3.x (3.8 recommended) / venv


	### 3.3. Guia de Implantação, Configuração e Instalação

	### 3.5. Guia de Estudo

	### 3.5.1. Executar e testar - aplicação python local command line

		* Iniciar aplicação servidor echo "Hello World!"

			```cmd
			C:\> python py-http-echo.py
			```

		* Run and test

			```browser
				+--------------------------------------------------------------+
				| http://localhost:8000                                        |
				+--------------------------------------------------------------+
				| Hello, World! Here is a GET response                         |
				+--------------------------------------------------------------+
			```

	### 3.5.2. Construir, executar e testar - docker 

		* Extrair as dependências do pip (nenhuma neste caso)

		```cmd
		C:\> pip freeze > requirements.txt
		```

		* Force remove previous images

			```cmd
			C:\> nerdctl.exe image rm josemarsilva/py-http-echo:latest
			C:\> nerdctl.exe image rm josemarsilva/py-http-echo:v1
			```

		* Build Docker image

			```cmd
			C:\> type Dockerfile
			C:\> type requirements.txt
			C:\> nerdctl.exe image build -t josemarsilva/py-http-echo:v1 .
			C:\> nerdctl.exe image tag josemarsilva/py-http-echo:v1 josemarsilva/py-http-echo:latest
			```


		* Run container

			```cmd
			C:\> nerdctl.exe container rm -f py-http-echo
			C:\> nerdctl.exe container run -d -p 8000:8000 -name py-http-echo josemarsilva/py-http-echo:latest
			C:\> nerdctl.exe container ls
			CONTAINER ID    IMAGE                                         COMMAND                   CREATED           STATUS    PORTS    NAMES
			4fbf17df8f88    docker.io/josemarsilva/py-http-echo:latest    "python py-http-echo…"    12 seconds ago    Up                 py-http-echo  
			```

		* Test

			```browser
				+--------------------------------------------------------------+
				| http://localhost:8000                                        |
				+--------------------------------------------------------------+
				| Hello, World! Here is a GET response                         |
				+--------------------------------------------------------------+
			```



		* Registry Dockerhub

			```cmd
			C:\> nerdctl.exe push josemarsilva/py-http-echo:v1
			C:\> nerdctl.exe push josemarsilva/py-http-echo:latest
			```


	### 3.5.3. Construir, executar e testar - Kubernetes

		* Create/apply Kubernetes deployment and services

			```cmd
			C:\> type deploy-svc-py-http-echo.yaml
			C:\> kubectl apply -f deploy-svc-py-http-echo.yaml
			deployment.apps/py-http-echo unchanged
			service/py-http-echo created
			```

		* Test

			```browser
				+--------------------------------------------------------------+
				| http://localhost:30080/                                      |
				+--------------------------------------------------------------+
				| Hello, World! Here is a GET response                         |
				+--------------------------------------------------------------+
			```
