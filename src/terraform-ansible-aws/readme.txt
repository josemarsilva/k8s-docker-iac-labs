    readme.txt
    ----------

1. Read before begin
    - https://learn.hashicorp.com/tutorials/terraform/aws-build?in=terraform/aws-get-started
    - https://cursos.alura.com.br/course/infraestrutura-codigo-maquinas-aws-ansible-terraform/

2. Create first AWS Linux Ubuntu instance
    $ pwd terraform-ansible-aws
    $ cat main.tf
    $ terraform init
    $ terraform plan
    $ terraform apply

3. Try to connect SSH to your new instance using AWS Console, create Key Pair and apply changes using Terraform
    * You still do not have acesss to machine
    * You need to create Key Pair
    * AWS Console :: Services >> EC2 >> Network and Security >> Key Pairs
        * Click "Create key Pair Button", type = PEM,  named `terraform-ansible-aws`
    * Download `terraform-ansible-aws.pem` and copy to /home/josemarsilva/terraform-ansible-aws.pem
        $ 
    * Edit file `main.tf`. Edit session `resources= ...` add key above
        keyname = 'terraform-ansible-aws`
    * cat `main.tf`
    * Terraform apply changes. Your machine will be destroyed and another new machine will be created with key pair
        $ terraform apply

4. Try to Connect your new machine created using SSH Client from AWS Console
    * AWS Console :: EC2 >> Instances >> Instances
        * Click link "i-xxxx" bellow column "Instance ID"
        * Click `Connect` Button
        * Follow connection instructions
            $ chmod 400 terraform-ansible-aws.pem
            $ ssh -i "terraform-ansible-aws.pem" ubuntu@ec2-34-222-12-82.us-west-2.compute.amazonaws.com
            ERROR: connect to host ec2-34-222-12-82.us-west-2.compute.amazonaws.com port 22: Resource temporarily unavailable

5. Configure AWS Security Groups - Inbound and Outbound rules and Connect SSH
    * AWS Console :: Services >> EC2 >> Network and Security >> Security Grouop
        * Edit Inbound Rules - add rule - All Trafic - Inbound - IPV4 / IPV6 and Inbound IPV4 / IPV6 
    * Connect SSH 
        $ ssh -i "terraform-ansible-aws.pem" ubuntu@ec2-34-222-12-82.us-west-2.compute.amazonaws.com


6. Run HTTP Server on remote machine
    ubuntu@ip-172-31-16-91:~$ 
    $ echo '<html><h1>Hello Terraform World!</h1></html>' > index.html
    $ nohup busybox httpd -f -p 8080 &

    * Open Browser
        +----------------------------------------------------------------+
        | http://ec2-34-222-12-82.us-west-2.compute.amazonaws.com:8080/  |
        +----------------------------------------------------------------+
        | Hello Terraform World!                                         |
        +----------------------------------------------------------------+


7. Configure your .gitignore file
    $ cat .gitignore

8. Configure Terraform script to automatically start http server
    * Edit file `main.tf`. Edit session `resources= ...` add lines above

```main.tf
  user_data     = <<-EOF
                    #!/bin/bash
                    cd /home/ubuntu
                    echo '<html><h1>Hello Terraform World!</h1></html>' > index.html
                    nohup busybox httpd -f -p 8080 &
                     EOF
```

    * Connect SSH 
        $ ssh -i "terraform-ansible-aws.pem" ubuntu@ec2-34-221-13-124.us-west-2.compute.amazonaws.com

    * Open Browser
        +----------------------------------------------------------------+
        | http://ec2-34-221-13-124.us-west-2.compute.amazonaws.com:8080/ |
        +----------------------------------------------------------------+
        | Hello Terraform World!                                         |
        +----------------------------------------------------------------+


9. Create Ansible configuration files

    * Edit `main.tf`
      * delete rows `user_data`
      * APPLY changes to IaC. HTTP is not present Network

      $ terraform apply

    * Edit `hosts.yaml` e crie uma categoria de hosts para o Ansible
        ```hosts.yaml
        [terraform-ansible-category]
        ec2-34-220-40-233.us-west-2.compute.amazonaws.com
        ```
    * Edit `playbook.yaml` e crie uma sequencia de comandos de instalação no host disponibilizado
        ```playbook
        - hosts: terraform-ansible-category
        tasks:
        - name: Criando o arquivo index.html
            copy: 
            dest: /home/ubuntu/index.html
            content: <html><h1>Hello Terraform World!</h1></html>'
        - name: Iniciando o servidor
            shell: "nohup busybox httpd -f -p 8080 &"
        ```

10. Execute o playbook do Ansible
    * Run playbook

        $ ansible-playbook playbook.yaml -u ubuntu --private-key terraform-ansible-aws.pem -i hosts.yaml
        PLAY [terraform-ansible-category] ***
        TASK [Gathering Facts] **************ok: [ec2-34-220-40-233.us-west-2.compute.amazonaws.com]
        TASK [Criando o arquivo index.html] *changed: [ec2-34-220-40-233.us-west-2.compute.amazonaws.com]
        TASK [Iniciando o servidor] *********changed: [ec2-34-220-40-233.us-west-2.compute.amazonaws.com]
        PLAY RECAP **************************ec2-34-220-40-233.us-west-2.compute.amazonaws.com : ok=3    changed=2    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0        

    * Open Browser

        +----------------------------------------------------------------+
        | http://ec2-34-220-40-233.us-west-2.compute.amazonaws.com:8080/ |
        +----------------------------------------------------------------+
        | Hello Terraform World!                                         |
        +----------------------------------------------------------------+

11. Change Hello message information from do Ansible
    * Edit `playbook.yaml`
    * Change from: `Hello Terraform World!`, to: `Hello Terraform and Ansible  World!`
    * Run playbook
    
        $ ansible-playbook playbook.yaml -u ubuntu --private-key terraform-ansible-aws.pem -i hosts.yaml

12. Create a new playbook to install Python 3 and VENV

    * Edit `main.tf` and change resources.tags.name to "TerraformAnsiblePythonVenv"
    * Destroy/Create last created AWS machine
        $ terraform apply

    * Edit `playbook-py-venv.yaml`: sudo apt update, install Python3, VENV
    * Run playbook
    
        $ ansible-playbook playbook-py-venv.yaml -u ubuntu --private-key terraform-ansible-aws.pem -i hosts.yaml

    * Connect SSH to new instance and check configuration

        $ ssh -i "terraform-ansible-aws.pem" ubuntu@ec2-34-221-61-120.us-west-2.compute.amazonaws.com

        $ # instance: ubuntu@ip-172-31-17-76~: 
        $ virtualenv --version
        virtualenv 20.0.17 from /usr/lib/python3/dist-packages/virtualenv/__init__.py
        $ ubuntu@ip-172-31-17-76~: python3 --version
        Python 3.8.10

13. Create a new playbook to install Python3, VENV, Django and DjangoRestFramewrk in the same Virtual Environment

    * Edit `playbook-py-venv-pip-dependencies.yaml`: sudo apt update, install Python3, VENV, set virtual Environment, install Django and DjangoRestFramework
    * Run playbook
    
        $ ansible-playbook playbook-py-venv-pip-dependencies.yaml -u ubuntu --private-key terraform-ansible-aws.pem -i hosts.yaml

    * Connect SSH to new instance and check configuration

        $ ssh -i "terraform-ansible-aws.pem" ubuntu@ec2-34-221-61-120.us-west-2.compute.amazonaws.com

    * Check installation

        $ ls
        prj
        $ ls prj
        venv
        $ source venv/bin/activate
        (venv) ubuntu@ip-172-31-17-76:~/prj$
        $ pip freeze
        asgiref==3.5.2
        backports.zoneinfo==0.2.1
        Django==4.0.4
        djangorestframework==3.13.1
        pytz==2022.1
        sqlparse==0.4.2


13. Criar um projeto Django simples

    * Criar o projeto Django e executa-lo

        $ pwd
        /home/ubuntu/prj
        $ django-admin startproject setup .
        $ ls
        manage.py  setup  venv
        $ python manage.py runserver 0.0.0.0:8000
        :
        You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
        :
        Quit the server with CONTROL-C.

    * Open Browser

        +----------------------------------------------------------------+
        | http://ec2-34-220-40-233.us-west-2.compute.amazonaws.com:8000/ |
        +----------------------------------------------------------------+
        | DisallowedHost at / | Invalid HTTP_HOST header: ... to ...     |
        +----------------------------------------------------------------+


14. Alterar o codigo fonte do projeto Django para permissão ao caminho /

    * Editar arquivo `vim setup/settings.p` e acrescentar chamve `ALLOWED_HOSTS = ['*']`

    * Open Browser

        +----------------------------------------------------------------+
        | http://ec2-34-220-40-233.us-west-2.compute.amazonaws.com:8000/ |
        +----------------------------------------------------------------+
        | Django The install worked successfully! Congratulations!       |
        +----------------------------------------------------------------+



