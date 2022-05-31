        readme.txt
        ==========

1. Introduction

    1.1. Read before begin
    - https://www.youtube.com/watch?v=TqMKBIinjew


    1.2. Pre-requisites

        * Create a new user on AWS :: IAM - `terraform-aws_user_credentials.csv`
        * Configure AWS-CLI to use `terraform-aws` created in previous step
        * Create base directory for laboratory - `terraform-ansible-aws-ec2-k8s`
        *  Key Pair (privated, public) localy and register in AWS - "~/terraform-aws" "./terraform-aws.pub"


2. Provisioning infrastructure on AWS

    2.1. Define AWS as provider - use stable version, configure default profile and region, variables, output and security groups

        * Edit `main.tf`, `vars.tf`, `outputs.tf` and `security-group.tf`

    2.2. Initialize terraform

    ```bash
    $ terraform init
    Initializing the backend...
    ```

    2.3. Apply infrastructure and get IP/DNS output values

        ```bash
        $ terraform apply
        Outputs:
        k8s-master-1 = "ec2-3-86-155-178.compute-1.amazonaws.com"
        k8s-worker-1 = "ec2-44-203-85-205.compute-1.amazonaws.com"
        k8s-worker-2 = "ec2-3-93-9-69.compute-1.amazonaws.com"
        ```


    2.4. Connect SSH to each instance created

        ```bash
        $ export K8S_MASTER_1=ec2-3-86-155-178.compute-1.amazonaws.com
        $ export K8S_WORKER_1=ec2-44-202-62-168.compute-1.amazonaws.com
        $ export K8S_WORKER_2=ec2-3-91-239-242.compute-1.amazonaws.com

        $ ssh -i "~/terraform-aws" ubuntu@${K8S_MASTER_1}
        Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
        ubuntu@ip-XXX-XXX-XXX-XXX:~$ exit
        :
        $ ssh -i "~/terraform-aws" ubuntu@${K8S_WORKER_1}
        Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
        ubuntu@ip-XXX-XXX-XXX-XXX:~$ exit
        :
        $ ssh -i "~/terraform-aws" ubuntu${K8S_WORKER_1}
        Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
        ubuntu@ip-XXX-XXX-XXX-XXX:~$ exit
        ```


3. Configure and run Ansible `hosts.yaml` and `playbook.yaml`

    3.1. Generate `hosts.yaml` based on Outputs

        ```bash
        $ echo [k8s-master]    >  hosts.yaml
        $ echo ${K8S_MASTER_1} >> hosts.yaml
        $ echo                 >> hosts.yaml
        $ echo [k8s-worker]    >> hosts.yaml
        $ echo ${K8S_WORKER_1} >> hosts.yaml
        $ echo ${K8S_WORKER_2} >> hosts.yaml
        ```


    3.2. Edit `hosts.yaml` and revise configuration from  new instance IP/DNS

    3.3. Run Ansible Playbook `playbook-*.yaml` to configure machine role `k8s-master-*` and `k8s-worker-*`

        * https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/

        * k8s-master-*

            ```bash
            $ ansible-playbook playbook-k8s-master.yaml -i hosts.yaml -u ubuntu --private-key "~/terraform-aws"
            ```

        * k8s-worker-*

            ```bash
            $ ansible-playbook playbook-k8s-worker.yaml -i hosts.yaml -u ubuntu --private-key "~/terraform-aws"
            ```



    2.1. Define AWS as provider - use stable version, configure default profile and region, variables, output and security groups

        * Edit `main.tf`, `vars.tf`, `outputs.tf` and `security-group.tf`

