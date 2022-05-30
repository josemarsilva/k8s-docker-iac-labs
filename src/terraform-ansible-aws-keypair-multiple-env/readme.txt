        readme.txt
        ==========

1. Read before begin
    - https://cursos.alura.com.br/course/infraestrutura-codigo-aws-ansible-terraform

2. Create sub-directories to organize your Infra as Code. Each parts for specific propouse. 

    * Create subdirectory

        $ mkdir infra       # for Ansible hosts.yaml
        $ mkdir -p env/dev  # for keypairs
        $ mkdir -p env/prd  # for keypairs

3. Create two Key Pairs, one for DEV and another for PRD


    $ ssh-keygen -f env/dev/terraform-ansible-aws-dev -N asdfghjklç
    $ ssh-keygen -f env/prd/terraform-ansible-aws-prd -N çlkjhgfdsa
    $ ls -R env
        env:
        dev  prd
        env/dev:
        terraform-ansible-aws-dev  terraform-ansible-aws-dev.pub
        env/prd:

4. Initialize Terraform

    * Create `main.tf`

        $ pwd
        ... /terraform-ansible-aws-keypair-multiple-env
        $ cat main.tf

5. Create `variables.tf`

    * Declare variables `./infra/variables.tf`

        $ cat ./infra/variables.tf

    * Declare a module and Set variables for each environment `./env/dev/main.tf`

        $ cat ./env/dev/main.tf


6. Initialize Terraform

    * Initialize Terraform ./infra

        $ pwd
        /terraform-ansible-aws-keypair-multiple-env/infra
        $ terraform init

    * Initialize Terraform ./env/dev

        $ pwd
        /terraform-ansible-aws-keypair-multiple-env/env/dev
        $ terraform init

7. Apply new infrastructure configuration using Terraform

    * Apply (Create/modify) env/dev

        $ pwd
        /terraform-ansible-aws-keypair-multiple-env/env/dev
        $ terraform apply


8. Security Group in terraform

    * Edit `.\infra\security-group.tf`
    * Define name, ingress and egress rules

9. Getting output result of Terraform Script - AWS Public IP of instance launched

    * Edit `.\infra\main.tf`

        ```.\infra\main.tf
        :
        output "IP_public" {
        value = aws_instance.app_server.public_ip
        }
        :
        ```

    * Edit `.\dev\main.tf`

        ```.\env\dev\main.tf
        :
        output "IP" {
            value = module.aws-dev.IP_public
        }
        :
        ```

    * Apply Terraform specification and get output

        ```cmd
        $ pwd
        /src/terraform-ansible-aws-keypair-multiple-env/env/dev
        $ terraform apply
        :
        Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
        DNS = "ec2-54-184-204-11.us-west-2.compute.amazonaws.com"
        IP = "54.184.204.11"
        :

10. Configure Ansible `hosts.yaml` and run playbook

    * Edit `.\infra\hosts.yaml` and configure new instance IP

        ```.\infra\hosts.yaml
        [terraform-ansible-category]
        ec2-54-184-204-11.us-west-2.compute.amazonaws.com
        ```

    * Connect SSH 
        $ pwd
        /src/terraform-ansible-aws-keypair-multiple-env/env/dev
        $ ssh -i "terraform-ansible-aws-dev" ubuntu@ec2-52-37-8-6.us-west-2.compute.amazonaws.com
        Enter passphrase for key 'terraform-ansible-aws-dev': asdfghjklç
        ubuntu@ip-172-31-19-182:~$ exit

    * Run Ansible Playbook `.\infra\playbook.yaml` to configure Python Django application

    ```bash
    $ pwd
    /src/terraform-ansible-aws-keypair-multiple-env
    $  ansible-playbook env/dev/playbook.yaml -i infra/hosts.yaml -u ubuntu --private-key env/dev/terraform-ansible-aws-dev
    Enter passphrase for key 'terraform-ansible-aws-dev': asdfghjklç
    ```

    * Open Browser

        +----------------------------------------------------------------+
        | http://ec2-52-37-8-6.us-west-2.compute.amazonaws.com:8000/     |
        +----------------------------------------------------------------+
        | Django The install worked successfully! Congratulations!       |
        +----------------------------------------------------------------+

11. Tornando o playbook idempotente

    11.1. Conceito
        - Idempotencia é a qualidade da operação que pode ser aplicada mais de uma vez sem que haja alteração do resultado.
        - Vamos substituir o trecho que remove a instalação do venv anterior por um script que testa se ela existe.

    11.2. Identificando o problema de tentar start o projeto Django que já existe.

        ```.\infra\playbook-sem-idempotencia.yaml`
        :
        - name: Initialize Django Project
            shell: '. /home/ubuntu/prj/venv/bin/activate; django-admin startproject setup /home/ubuntu/prj'
        :
        ```

    11.3. Run Ansible Playbook `.\infra\playbook-sem-idempotencia.yaml` to configure, install and run  Python Django application
        - oberve que resultará em erro, pois o Django já foi instalado e não pode ser reinstalado

        ```bash
        $ pwd
        /src/terraform-ansible-aws-keypair-multiple-env
        $  ansible-playbook env/dev/playbook-sem-idempotencia.yaml -i infra/hosts.yaml -u ubuntu --private-key env/dev/terraform-ansible-aws-dev
        Enter passphrase for key 'terraform-ansible-aws-dev': asdfghjklç
        :
        TASK [Initialize Django Project]
        fatal: [ec2-52-37-8-6.us-west-2.compute.amazonaws.com]: FAILED! => {"changed": true, "cmd": ". /home/ubuntu/prj/venv/bin/activate; django-admin startproject setup /home/ubuntu/prj", "delta": "0:00:00.231859", "end": "2022-05-27 18:10:04.539149", "msg": "non-zero return code", "rc": 1, "start": "2022-05-27 18:10:04.307290", "stderr": "CommandError: /home/ubuntu/prj/manage.py already exists. Overlaying a project into an existing directory won't replace conflicting files.", "stderr_lines": ["CommandError: /home/ubuntu/prj/manage.py already exists. Overlaying a project into an existing directory won't replace conflicting files."], "stdout": "", "stdout_lines": []}
        :
        ```

    11.4. Solucionando o problema a idempotencia do playbook

        ```.\infra\playbook-com-idempotencia.yaml`
        :
        - name: Verify if Django project settings.py already exists
            stat:
            path: /home/ubuntu/prj/setup/settings.py
            register: file_settings_py
        - name: Initialize Django Project
            shell: '. /home/ubuntu/prj/venv/bin/activate; django-admin startproject setup /home/ubuntu/prj'
            when: not file_settings_py.stat.exists
        :
        ```

    11.5. Run Ansible Playbook `.\infra\playbook-com-idempotencia.yaml` to configure, install and run  Python Django application
        - oberve que não vai mais ocorrer erro porque o passo foi pulado "skiped"

        ```bash
        $ pwd
        /src/terraform-ansible-aws-keypair-multiple-env
        $  ansible-playbook env/dev/playbook-com-idempotencia.yaml -i infra/hosts.yaml -u ubuntu --private-key env/dev/terraform-ansible-aws-dev
        Enter passphrase for key 'terraform-ansible-aws-dev': asdfghjklç
        :
        TASK [Gathering Facts]
        ok: ...
        TASK [Install Python 3 and VENV] 
        ok: ...
        TASK [Install Pip dependencies Django e Django REST]
        ok: ...
        TASK [Verify if Django project settings.py already exists]
        ok: ...
        TASK [Initialize Django Project]
        skipping: ...
        :
        ```

12. Criando o ambiente para maquina de produção

    12.1. Edit `.\env\prd\main.tf` para obter o IP/DNS da instância

        ```.\env\prd\main.tf
        output "IP" {
            value = module.aws-prd.IP_public
        }

        output "DNS" {
            value = module.aws-prd.DNS_public
        }
        ```

    12.3. Apply new infrastructure configuration using Terraform e obtenha o IP/DNS

        ```bash
        $ pwd
        src/terraform-ansible-aws-keypair-multiple-env/env/prd

        $ terraform apply
        ```

    12.4. Connect SSH 

        $ pwd
        /src/terraform-ansible-aws-keypair-multiple-env/env/prd
        $ ssh -i "terraform-ansible-aws-prd" ubuntu@ec2-35-88-173-17.us-west-2.compute.amazonaws.com
        Enter passphrase for key 'terraform-ansible-aws-prd': çlkjhgfdsa
        ubuntu@ip-172-31-23-43:~$ exit

    12.5. Edit `.\infra\hosts.yaml` and configure new instance IP

        ```.\infra\hosts.yaml
        [terraform-ansible-category]
        ec2-35-88-173-17.us-west-2.compute.amazonaws.com
        ```

    12.6. Edit `.\env\prd\playbook.yaml` - create/edit task clone source code from Github

        ```.\env\prd\playbook.yaml
        :
        - name: Git Clone
            ansible.builtin.git:
            repo: https://github.com/josemarsilva/clientes-leo-api.git
            dest: /home/ubuntu/prj
            version: master
        :
        ```

    12.7. Edit `.\env\prd\playbook.yaml` - create/edit task to pip install from file `requriements.txt` instead of named

        ```.\env\prd\playbook.yaml
        :
        - name: Install Pip dependencies Django e Django REST
            pip:
            virtualenv: /home/ubuntu/prj/venv
            requirements: /home/ubuntu/prj/requirements.txt
        :


    12.8. Edit `.\env\prd\playbook.yaml` - Run migrations for database

        ```.\env\prd\playbook.yaml
        :
        - name: Migrations configuren
            pip:
            virtualenv: /home/ubuntu/prj/venv
            requirements: /home/ubuntu/prj/requirements.txt
        :


    12.9. Run Ansible Playbook `.\env\prd\playbook.yaml` configure and install application

        ```bash
        $ cd ../..
        $ pwd
        /src/terraform-ansible-aws-keypair-multiple-env
        $ ansible-playbook env/prd/playbook.yaml -i infra/hosts.yaml -u ubuntu --private-key env/prd/terraform-ansible-aws-prd
        Enter passphrase for key 'terraform-ansible-aws-prd': çlkjhgfdsa
        :
        PLAY [terraform-ansible-category]
        TASK [Gathering Facts] 
        ok: ...
        TASK [Install Python 3 and VENV] 
        ok: ...
        TASK [Git Clone] 
        ok: ...
        TASK [Install Pip dependencies Django e Django REST] 
        ok: ...
        TASK [Verify if Django project settings.py already exists] 
        ok: ...
        TASK [Initialize Django Project] 
        ok: ...
        TASK [Configure HOST_ALLOW] 
        ok: ...
        TASK [Configure databases and migrations] 
        changed: [ec2-35-88-173-17.us-west-2.compute.amazonaws.com]
        TASK [Loading initial data] 
        changed: [ec2-35-88-173-17.us-west-2.compute.amazonaws.com]
        TASK [Run Django server] 
        changed: [ec2-35-88-173-17.us-west-2.compute.amazonaws.com]
        PLAY RECAP 
        ec2-35-88-173-17.us-west-2.compute.amazonaws.com : ok=8    changed=4    unreachable=0    failed=0    skipped=1    rescued=0    ignored=0
        :
        ```

    12.10. Open Browser

        * Homepage show list of API possibilities

        +-------------------------------------------------------------------------------------------+
        | http://ec2-35-88-173-17.us-west-2.compute.amazonaws.com:8000/                             |
        +-------------------------------------------------------------------------------------------+
        | GET /                                                                                     |
        | HTTP 200 OK                                                                               |
        | { "clientes": "http://ec2-35-88-173-17.us-west-2.compute.amazonaws.com:8000/clientes/" }  |
        +-------------------------------------------------------------------------------------------+

        * GET url

        +-------------------------------------------------------------------------------------------+
        | http://ec2-35-88-173-17.us-west-2.compute.amazonaws.com:8000/clientes/                    |
        +-------------------------------------------------------------------------------------------+
        | Cliente List                                                                              |
        | GET /clientes/                                                                            |
        | HTTP 200 OK                                                                               |
        | [ {    "id": 1,                                                                           |
        |        "nome": "Leonardo",                                                                |
        |        "email": "leo@alura.com"                                                           |
        |    },                                                                                     |
        |  :                                                                                        |
        +-------------------------------------------------------------------------------------------+
