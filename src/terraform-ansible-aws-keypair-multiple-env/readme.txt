        readme.txt
        ==========

1. Create sub-directories to organize your Infra as Code. Each parts for specific propouse. 

    * Create subdirectory

        $ mkdir infra       # for Ansible hosts.yaml
        $ mkdir -p env/dev  # for keypairs
        $ mkdir -p env/prd  # for keypairs

2. Create two Key Pairs, one for DEV and another for PRD


    $ ssh-keygen -f env/dev/terraform-ansible-aws-dev -N asdfghjklç
    $ ssh-keygen -f env/prd/terraform-ansible-aws-prd -N çlkjhgfdsa
    $ ls -R env
        env:
        dev  prd
        env/dev:
        terraform-ansible-aws-dev  terraform-ansible-aws-dev.pub
        env/prd:


3. Initialize Terraform

    * Create `main.tf`

        $ pwd
        ... /terraform-ansible-aws-keypair-multiple-env
        $ cat main.tf

4. Create `variables.tf`

    * Declare variables `./infra/variables.tf`

        $ cat ./infra/variables.tf

    * Declare a module and Set variables for each environment `./env/dev/main.tf`

        $ cat ./env/dev/main.tf


5. Initialize Terraform

    * Initialize Terraform ./infra

        $ pwd
        /terraform-ansible-aws-keypair-multiple-env/infra
        $ terraform init

    * Initialize Terraform ./env/dev

        $ pwd
        /terraform-ansible-aws-keypair-multiple-env/env/dev
        $ terraform init

    * Apply (Create/modify) env/dev

        $ pwd
        /terraform-ansible-aws-keypair-multiple-env/env/dev
        $ terraform apply
