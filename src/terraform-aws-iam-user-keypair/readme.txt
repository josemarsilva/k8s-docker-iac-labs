## 1. Introdução

Este documento contém os artefatos do laboratório  consiste em:
* Configurar AWS IAM User para ser utilizado no terraform

## 2. Documentação

	### 2.1. Documentação oficial e tutoriais de referências
	
        * https://registry.terraform.io/browse/providers
        * https://learn.hashicorp.com/collections/terraform/aws-get-started
        * https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform


## 3. Projeto / Laboratório

	### 3.1. Pré-Requisitos, Pré-Condições e Premissas

		#### 3.1.1. Tecnologias e ferramentas

			* WSL - Windows Subsystem for Linux
			* Cloud infrastructure: AWS 
			* IaC: Terraform, Ansible


	### 3.5. Guia de Estudo

		### 3.5.1. Configurar IAM User para ser usado tanto pelo AWS-CLI quanto pelo Terraform para manutenção da infraestrutura

			1. Na console da AWS, define a region
			
				* On `AWS Console` click _combo-box_ para definir a região e escolha `US East(N.Virginia) us-east-1`
			
			2. Create AWS IAM user for laboratory

				2.1. Create a new key-pair for on AWS :: IAM

					* On `AWS Console :: IAM >> User` click button `Add user` to access Add User Form
						+ Add User
							- username: `terraform-josemar`
							- Select AWS access type: Select AWS credential Type `Access key - Programmatic user`
						+ Set permission boundary:
						  - Choose option `Use a permissions boundary to control the maximum user permissions`
						  - Choose option on Filter policies: `AdministratorAccess`
						+ Add tags
							- "role" = "terraform-administrator-access"
							- "owner" = "josemar"
						- Click `Create user` button
						- Click `Download .csv` button

				2.1. Create base directory for laboratory and configuration files
				
					* Create laboratory directory and move file (security) `new_user_credentials.csv` to `iam-user_terraform-josemar.csv`

					```bash
					$ mkdir ./src/terraform-aws-iam-user-keypair
					$ cd ./src/terraform-aws-iam-user-keypair
					$ mv new_user_credentials.csv iam-user_terraform-josemar.csv
					$ echo new_user_credentials.csv       >> .gitignore
					$ echo iam-user_terraform-josemar.csv >> .gitignore
					```
			
			3. Configure AWS-CLI to use `terraform-aws` created in previous step

				* Configure default AWS user, region, etc

				```bash
				$ aws configure
				aws configure
				AWS Access Key ID [****************M6PN]: ****************DZWN
				AWS Secret Access Key [****************Ogkk]: ****************TkXE
				Default region name [None]: us-east-1
				Default output format [None]: json

				$ aws configure list-profiles
				default
				```

		### 3.5.2. Criar um Key Pair (privated, public) para o(s) hosts a serem criados

			1. Opção no. 1 - Gerar o key pair localmente usando ssh-keygen e depois importar na AWS :: EC2 >> Network Security > KeyPair
			
				* Create key pair local using ssh-keygen

				```bash
				$ pwd # /src/terraform-aws-iam-user-keypair
				$ ssh-keygen -f terraform-aws-keypair -t rsa -P asdfghjklç
				Generating public/private rsa key pair.
				Your identification has been saved in terraform-aws-iam-user-keypair.
				Your public key has been saved in terraform-aws-iam-user-keypair.pub.
				The key fingerprint is:
				SHA256:PXEafhET5OLRShqInfdbxyoZn2gpK+Gjia2PBwBBbrQ josemar silva@LP1764
				:
				$ ls -la terraform-aws-keypair*
				-rwxrwxrwx 1 ubuntu ubuntu 2655 Aug 15 11:46 terraform-aws-keypair
				-rwxrwxrwx 1 ubuntu ubuntu  573 Aug 15 11:46 terraform-aws-keypair.pub
				```

				* Import created key into AWS - Same AWS region for your test laboratory - Ex: us-east-1
				
					- On `AWS Console :: EC2 ` click menu item option `AWS Console :: EC2 >> Network and Security >> Key Pairs`
					- `AWS Console :: EC2 >> Key Pairs" click button `action >> import key pair`
					- On `AWS Console :: EC2 >> Key Pairs >> Import Key Pairs`
						- Name: `terraform-aws-iam-user-keypair`
						- click `Procurar` e informe o caminho até o arquivo `terraform-aws-iam-user-keypair.pub`
						- click `import-key-pairs`

				* Move private key file to a security place and change permission

				```bash
				:
				$ mv terraform-aws-keypair     ~/aws-config
				$ mv terraform-aws-keypair.pub ~/aws-config
				$ chmod 400 ~/aws-config/terraform-aws-keypair
				$ ln -s ~/aws-config/terraform-aws-keypair     terraform-aws-keypair
				$ ln -s ~/aws-config/terraform-aws-keypair.pub terraform-aws-keypair.pub
				$ echo terraform-aws-keypair     >> .gitignore
				$ echo terraform-aws-keypair.pub >> .gitignore
				:
				```

			2. Opção no. 2 - Gerar o key pair diretamente pela AWS

				* Created key on AWS :: EC2 >> Network and Security >> Key Pairs
				
					- On `AWS Console :: EC2 ` click menu item option `AWS Console :: EC2 >> Network and Security >> Key Pairs` clique `Create Key Pair`
					  - Type: `[*] RSA`
					  - Name: `terraform-aws-keypair-rsa-pem`
					  - Private key format: `[*] .pem for use with OpenSSH`
					  - Click `Create key pair`
					  - Download file `terraform-aws-keypair-rsa-pem`

				```bash
				:
				ls -la terraform-aws-keypair-rsa-pem.ppk 
				-rwxrwxrwx 1 ubuntu ubuntu 1447 Aug 15 14:21 terraform-aws-keypair-rsa-pem.ppk
				echo terraform-aws-keypair-rsa-pem.ppk >> .gitignore .gitignore
 				:
				```
				


		### 3.5.3. Criar uma máquina manualmente para observar o passo a passo manual
		
				* Created key on `AWS :: EC2 >> Instances >> Instance` clique botão `Criar instância`
				  + Em formulário `Launch an Instance` on `AWS :: EC2 >> Instances >> Instance` em região `us-east-1`
				    - Name: `win-server`
					- Application and OS Image: Microsoft Windows Server 2019 - `ami-0c95d38b24a19de18`
					- Instance type: `t2.micro`
					- KeyPair: `terraform-aws-iam-user-keypair`
					- Network settings / Subnet: `subnet-*`
					+ Security group name: `launch-wizard-*`
					  - Inbound security group rules: `rdp, TCP, 3389, 0.0.0.0/0`
					- Clique `Launch instance`
					

-- ----------------------------------------------------------------------------					
		


2. Provisioning infrastructure on AWS

    2.1. Define AWS as provider - use stable version and configure default profile and region

    ```main.tf
    terraform {
    required_providers {
        aws = {
        source  = "hashicorp/aws"
        version = "~> 3.27"
        }
    }
    required_version = ">= 0.14.9"
    }
    provider "aws" {
    profile = "default"
    region  = "us-east-1"
    }
    :
    ```

    2.2. Define AWS as provider and provision 3 instances named dev-1, dev-2 and dev-3

    ```main.tf
    resource "aws_instance" "dev" {
        count = 3
        ami = "ami-09d56f8956ab235b3"
        instance_type = "t2.micro"
        key_name = "terraform-aws"
        tags = {
            Name = "dev-${count.index}"
        }
    }
    ```

    2.2. Initialize terraform

    ```bash
    $ terraform init
    Initializing the backend...
    ```

    2.3. Apply infrastructure

    ```bash
    $ terraform apply
    :
    Plan: 3 to add, 0 to change, 0 to destroy.
    Enter a value: yes
    :
    ```


3. Modify provisioned infrastructure on AWS

    3.1. See Provider Documentation for Resources

        * https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group

    3.2. Configure SSH acesss in Security Group for only your IP machine

    ```main.tf
    resource "aws_security_group" "allow_ssh" {
    name        = "allow_ssh"
    description = "Allow SSH inbound traffic"
    ingress {
        description      = "SSH from VPC"
        to_port          = 22
        protocol         = "tcp"
        cidr_blocks      = ["187.74.39.45/32"]
    :
    vpc_security_group_ids = [ "sg-0868c6b99e186b57a" ]
    :
    resource "aws_security_group" "allow_ssh" {
        name        = "allow_ssh"
    :
    ```

    3.3. Show current configuration of Terraform

    * Terraform SHOW command show current status:

    ```bash
    $ terraform show
    ```

    * Terraform current status is also saved in terraform files:

    ```bash
    $ cat terraform.tfstate
    ```

    3.4. Connect SSH to each one of 3 instances

    ```bash
    $ ssh -i "~/terraform-aws" ubuntu@ec2-3-87-69-254.compute-1.amazonaws.com
    ubuntu@ip-XXX-XXX-XXX-XXX:~$ exit

    $ ssh -i "~/terraform-aws" ubuntu@ec2-54-166-51-29.compute-1.amazonaws.com
    Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
    ubuntu@ip-XXX-XXX-XXX-XXX:~$ exit

    $ ssh -i "~/terraform-aws" ubuntu@ec2-3-83-64-159.compute-1.amazonaws.com
    Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
    ubuntu@ip-XXX-XXX-XXX-XXX:~$ exit
    ```


4. Using references and dependencies between resources

    4.1. Change from literal id from security group to reference

        * From:

            ```main.tf
            :
            vpc_security_group_ids = [ "sg-0868c6b99e186b57a" ]
            :
            ```

        * To:

            ```main.tf
            :
            vpc_security_group_ids = [ "${aws_security_group.allow_ssh.id}" ]
            :
            ```

    4.2. Using resources dependencies

        4.2.1. Create S3 Bucket to store some files

        * https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket

        * Edit `main.tf`

            ```main.tf
            :
            resource "aws_s3_bucket" "s3b" {
            bucket = "josemarsilva-terraform-s3b"

            tags = {
                Name        = "terraform-s3b"
            }
            }

            resource "aws_s3_bucket_acl" "s3bacl" {
            bucket = aws_s3_bucket.s3b.id
            acl    = "private"
            }
            :
            ```

        4.2.2. Add two news instances (`dev-3`, `dev-4`) but make `dev-3` depends on bucket `s3b`. 
        
        * Edit `main.tf`

            ```main.tf
            :
            resource "aws_instance" "dev-3" {
                :
                depends_on = [
                aws_s3_bucket.s3b
                ]
            }
            :
            resource "aws_instance" "dev-4" {
            :
            ```

        4.2.3. Apply changes and observe dependencies

        * When you apply changes to infrastructure, observe that instance `dev-3` will be created only after `s3b`


5. Organizing configuration, files, aliases

    5.1. Copy current file `main.tf` to `main-before-reorganize.tf`

        ```bash
        $ cp main.tf main.tf.before-reorganize
        ```

    5.2. Split file into smallers pieces

    * Edit `main.tf` extract out "aws_security_group" settings to `security-group.tf`

    ```security-group.tf
    resource "aws_security_group" "allow_ssh" {
    name        = "allow_ssh"
    :
    ```

    * Edit `main.tf` extract out ""aws_s3_bucket"" settings to `s3-bucket.tf`

    ```s3-bucket.tf
    resource "aws_s3_bucket" "s3b" {
    :
    resource "aws_s3_bucket_acl" "s3bacl" {
    :
    ```

    5.3. Use alias to create resources of same provider in others regions

    5.3.1. Edit `main.tf` and create an alias for AWS provider in another region `us-east-2`

        ```main.tf
        :
        provider "aws" {
        alias = "us-east-2"
        profile = "default"
        region  = "us-east-2"
        }
        :
        ```

    5.3.2. Edit `main.tf` and create new instance `dev-5` in another region `us-east-2` using another image ami available in this region

        ```main.tf
        :
        resource "aws_instance" "dev-5" {
            provider = aws.us-east-2
            ami = "ami-0fa49cc9dc8d62c84"
            :
            vpc_security_group_ids = [ "${aws_security_group.allow_ssh_us_east_2.id}" ]
        :
        ```

    5.3.3.  Edit `security-group.tf` and create new security-group `allow_ssh_us_east_2` in provider of another region `us-east-2` declaring another name

        ```security-group.tf
        :
        resource "aws_security_group" "allow_ssh_us_east_2" {
            provider = aws.us-east-2
            name        = "allow_ssh_us_east_2"
        :
        ```

    5.3.4. `AWS Console :: EC2 >> Network & Security` click `Actions >> Import Key Pairs`

        * Import public key pair file

    5.4. Add new resource Database and use as `depends_on` of instance `dev-5`

    5.4.1. See Provider Documentation

    * https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/dynamodb_table

    5.4.2. Edit `main.tf` and dynamodb configurations settings in provider us-east-2

        ```main.tf
        :
        resource "aws_dynamodb_table" "dynamodb-hml" {
            provider = aws.us-east-2
            name           = "GameScores"
            billing_mode   = "PAY_PER_REQUEST"
            hash_key       = "UserId"
            range_key      = "GameTitle"
        :
        ```

    5.4.3. Edit `main.tf` and add dependencies of instance `dev-5` from `aws_dynamodb_table`

        ```main.tf
        :
        resource "aws_instance" "dev-5" {
            provider = aws.us-east-2
            :
            depends_on = [ aws_dynamodb_table.dynamodb-hml ]
            :
        ```

    5.4.4. Apply changes to infrastructure

        ```bash
        $ terraform apply
        ```


6. Working with variables

    6.1. Split literal configurations inside another file

        * Edit `vars.tf` create configuration map for region x ami_images

        ```vars.tf
        variable "amis" {
            type = map
            default = {
                "us-east-1" = "ami-09d56f8956ab235b3"
                "us-east-2" = "ami-0fa49cc9dc8d62c84"
            }
        }
        :
        ```

    6.2. Replace literals inside `main.tf` for variables

        ```main.tf
        :
        resource "aws_instance" "dev" {
            count = 3
            ami = var.amis["us-east-1"]
        :
        resource "aws_instance" "dev-5" {
            provider = aws.us-east-2
            ami = var.amis["us-east-2"]
        :
        ```

    6.3. Split literal configurations inside another file

        * Edit `vars.tf` create configuration list of  cidr_blocks

        ```vars.tf
        variable "cidrs_blocks_remote_ssh" {
            type = list

            default = ["187.74.39.45/32"]
        }
        :
        ```

    6.4. Replace literals inside `security-group.tf` for variables

        ```security-group.tf
        :
        cidr_blocks      = var.cidrs_blocks_remote_ssh
        :
        ```

    6.5. Split literal configurations inside another file

        * Edit `vars.tf` create configuration list of  cidr_blocks

        ```vars.tf
        variable "key_name" {
            # type = string # default can be ommited
            default = "terraform-aws"
        }
        :
        ```

    6.4. Replace literals inside `main.tf` for variables

        ```main.tf
        :
        key_name = var.key_name
        :
        ```

    6.5. See Documentation for more about variables

        * https://learn.hashicorp.com/tutorials/terraform/variables


7. Working with Output

    7.1. See Documentation for more about output

        * https://learn.hashicorp.com/tutorials/terraform/outputs

    7.2. Configure output information of your infrastructure into `outputs.tf`

        * Edit `outputs.tf` configure output information like IP, DNS, from some instances

        ```outputs.tf
        output "dev-0_ip" {
            value = "${aws_instance.dev[0].public_ip}"
        }

        output "dev-0_dns" {
            value = "${aws_instance.dev[0].public_dns}"
        }

        output "dev-5_ip" {
            value = "${aws_instance.dev-5.public_ip}"
        }

        output "dev-5_dns" {
            value = "${aws_instance.dev-5.public_dns}"
        }
        :
        ```

    7.3. Apply changes to infrastructure

        ```bash
        $ terraform apply
        dev-0_dns = "ec2-3-90-45-85.compute-1.amazonaws.com"
        dev-0_ip = "3.90.45.85"
        dev-5_dns = "ec2-18-118-121-207.us-east-2.compute.amazonaws.com"
        dev-5_ip = "18.118.121.207"
        ```


8. Working with Terraform Cloud

    8.1. See Documentation for more about output

        * https://learn.hashicorp.com/collections/terraform/cloud-get-started
        * https://www.terraform.io/cdktf/concepts/remote-backends

    8.2. Configure remote centralized Terraform Cloud administration

        8.2.1. Create an account in Terraform Cloud

            * https://cloud.hashicorp.com/products/terraform

        8.2.2. Login with your credentials on Terraform Cloud

            * https://cloud.hashicorp.com/products/terraform

        8.2.3. Setup an Example on Terraform Cloud

            * On `Terraform Cloud :: Getting Started` click `Start from scratch`
                - https://app.terraform.io/app/getting-started
            * On `Terraform Cloud :: Organizations >> New`
                - https://app.terraform.io/app/organizations/new
                + fill:
                    - Organization Name: `josemarsilva-lab`
                    - E-mail: `xxxx@xxxxx.xxx`
            * On `Terraform Cloud :: Workspace >> New`
                - https://app.terraform.io/app/josemarsilva-lab/workspaces/new
                + fill:
                    - Choose Workflow: Version control Workflow
                    - Connect to VCP: Github 
                    - Choose a repository: https://github.com/josemarsilva/terraform-labs
                    - Configure settings:
