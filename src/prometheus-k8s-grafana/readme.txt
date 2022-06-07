## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-22: Prometheus and Grafana in Kubernetes** abaixo do projeto [**k8s-docker-iac-labs**](../README.md) e consiste em:
* Obter os binários e instalar a ferramenta **Grafana** como um pod com a imagem do Grafana Docker no Rancher Desktop Local
* Configurar a ferramenta para o propósito do laboratório
* Explorar os recursos e funcionalidades básicas da ferramenta

## 2. Documentação

	### 2.1. Documentação oficial e tutoriais de referências

		* https://grafana.com/
		* https://hub.docker.com/r/grafana/grafana
		* https://devopscube.com/setup-grafana-kubernetes/
		* https://github.com/bibinwilson/kubernetes-grafana


## 3. Projeto / Laboratório

	### 3.1. Pré-Requisitos, Pré-Condições e Premissas

		#### 3.1.1. Tecnologias e ferramentas

			* Windows OnPrimasse
			* WSL - Windows Subsystem for Linux
			* Docker Desktop or Rancher Desktop for Windows or Docker for Linux
			* Docker or Kubernetes or On-Premisse infrastructure (Deployment Infraestructure)

		#### 3.1.2. Laboratory PRE-REQUISITE

			* O laboratório de ../prometheus-k8s/readme.txt precisa ter sido executado


	### 3.3. Guia de Implantação, Configuração e Instalação

		#### 3.3.1. Instalar Grafana em POD do Kubernetes

		#### 3.3.1.1. Documentação de referência

			* https://devopscube.com/setup-grafana-kubernetes/

		#### 3.3.1.2. Segregando monitoramento em Namespace distinto

			* Check namespace definition `monitoring` - pre-requisite: `../prometheus-k8s/readme.txt`

			```sh
			$ kubectl get namespaces
			NAME              STATUS   AGE 
			:                 :        :
			default           Active   140d
			:                 :        :
			monitoring        Active   98m
			:                 :        :
			```

		#### 3.3.1.3. Create a Config Map To Grafana

			* Configuração do ConfigMap do Grafana

			```sh
			$ cat configmap-grafana-datasource.yaml
			$ kubectl create -f configmap-grafana-datasource.yaml
			configmap/grafana-datasources created
			```

		#### 3.3.1.4. Create a Grafana Deployment

			* Configuração do Deploymento do Grafana

			```sh
			$ cat deployment-grafana.yaml
			$ kubectl create -f deployment-grafana.yaml
			deployment.apps/grafana created
			```

		#### 3.3.1.5. Check Grafana Deployment

			* Check status of Prometheus Deployment in Namespace monitoring

			```sh
			$ kubectl get all --namespace=monitoring
			NAME                                        READY   STATUS    RESTARTS   AGE
			pod/prometheus-deployment-87cc8fb88-5jpw6   1/1     Running   0          89m
			pod/grafana-64c89f57f7-kzlrd                1/1     Running   0          92s

			NAME                         TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
			service/prometheus-service   NodePort   10.43.251.32   <none>        8080:30090/TCP   68m

			NAME                                    READY   UP-TO-DATE   AVAILABLE   AGE
			deployment.apps/prometheus-deployment   1/1     1            1           89m
			deployment.apps/grafana                 1/1     1            1           92s

			NAME                                              DESIRED   CURRENT   READY   AGE
			replicaset.apps/prometheus-deployment-87cc8fb88   1         1         1       89m
			replicaset.apps/grafana-64c89f57f7                1         1         1       92s
			```

		#### 3.3.1.6. Configure Port Forwarding and test manually if it is working

		* Get Pod name of Deplyment like above `prometheus-deployment-87cc8fb88-5jpw6`

		```sh
		$ kubectl get pods --namespace=monitoring
		NAME                                    READY   STATUS    RESTARTS   AGE
		:                                       :       :         :          :
		grafana-64c89f57f7-kzlrd                1/1     Running   0          3m21s
		:                                       :       :         :          :
		```

		* Get Pod name of Deplyment to execute Port Forwarding with correct name of Pod

		```sh
		$ kubectl port-forward grafana-64c89f57f7-kzlrd 3000 -n monitoring
		Forwarding from 127.0.0.1:3000 -> 3000
		Forwarding from [::1]:3000 -> 3000
		```

		* Test if Grafana Homepage is working. You should see something like this

		+--------------------------------------------+
		| http://localhost:3000                      |
		+--------------------------------------------+
		|            Welcome to grafana              |
		|                                            |
		|            username: [admin]               |
		|            password: [admin]               |
		|                                 +--------+ |
		|                                 | Log in | |
		|                                 +--------+ |
		+--------------------------------------------+

		*  Abort execution of Port Forwarding with ^C or BREAK

		```sh
		^C
		```

		#### 3.3.1.7. Exposing Grafana as a Service - Nodeport

		```sh
		$ cat svc-nodeport-grafana.yaml
		$ kubectl create -f svc-nodeport-grafana.yaml --namespace=monitoring
		service/grafana created
		```

		#### 3.3.1.8. Access Grafna using Nodeport and navigate exploring functionalities

		* Login Grafana

		+--------------------------------------------+
		| http://localhost:32000                     |
		+--------------------------------------------+
		|            Welcome to grafana              |
		|                                            |
		|            username: [admin]               |
		|            password: [admin]               |
		|                                 +--------+ |
		|                                 | Log in | |
		|                                 +--------+ |
		+--------------------------------------------+

		* Change pasword to: admin123

		#### 3.3.1.9. Create Kubernetes Dashboards on Grafana

		* Step 1: Get the template ID from grafana public template. as shown below. 8588
		* Step 2: Head over to the Grafana dashbaord and select the import option.
			- On `Grafana :: (left-menu) Dashboard >> Import`
		* Step 3: Enter the dashboard ID you got in step 1
			- Click `Load`
			- Select combo `Prometheus` value `prometheus`
		* Step 4: Grafana will automatically fetch the template from the Grafana website. You can change the values as shown in the image below and click import.
		* Step 5: Expected result is Dashbaord of your Kubernetes


