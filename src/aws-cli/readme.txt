## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-XX: Instalacao e Basico AWS CLI** abaixo do projeto [**k8s-docker-iac**](../README.md) e consiste em:
* Obter os binários e instalar a ferramenta
* Configurar a ferramenta para o propósito do laboratório
* Explorar os recursos e funcionalidades básicas da ferramenta

## 2. Documentação

	### 2.1. Documentação oficial e tutoriais de referências
	
		* https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html


## 3. Projeto / Laboratório

	### 3.1. Pré-Requisitos, Pré-Condições e Premissas

		#### 3.1.1. Tecnologias e ferramentas

			* Windows On Premise
			* Linux On Premise
			* Cloud infrastructure: AWS 


	### 3.2. Guia do Desenvolvedor e Administrador
	
		* n/a


	### 3.3. Guia de Implantação, Configuração e Instalação

		#### 3.1.1. Instalar - AWS CLI 2.0 - Windows

			* Download and run the AWS CLI MSI installer for Windows (64-bit) or run MSI installer
			
				- https://awscli.amazonaws.com/AWSCLIV2.msi
				
			* Run installer
			
				```cmd
				C:\> msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
				```

			* Check installation 
			
				```cmd
				C:\>aws --version
				aws-cli/2.7.8 Python/3.9.11 Windows/10 exe/AMD64 prompt/off
				```

		#### 3.1.2. Instalar - AWS CLI 2.0 - Linux

			* Download
			
			```bash
			$ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
			$ unzip awscliv2.zip
			$ sudo ./aws/install
			```
			
			


	### 3.5. Guia de Estudo

			* Connect AWS instances
				- Change key-pair file permission to 400
						$ chmod 400 aws-key-pair-us-east-1.pem
				- Connect to your instance using its Public DNS or IP
						$ ssh -i "aws-key-pair-us-east-1.pem" ubuntu@ec2-54-173-121-129.compute-1.amazonaws.com

			* Configure, use and manipulate AWS Profiles
				- Create configuration profile
						$ aws configure --profile name-of-your-profile
				- List configured profiles
						$ aws configure list-profiles
				- Show current configuration
						$ aws configure list
				- Set current configuration to specific Profile
						$ export AWS_PROFILE=name-of-your-profile
				- Describe instance from specific profile
						$ aws ec2 describe-instances --profile name-of-your-profile
