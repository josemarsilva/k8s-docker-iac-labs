        readme.txt
        ==========

1. Introduction

    1.1. Read before begin
    - https://cursos.alura.com.br/course/infraestrutura-codigo-terraform-kubernetes


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
        ```


3. Configure provider for Module AWS - EKS

    3.1. See Provider Documentation

        * https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/18.21.0/submodules/eks-managed-node-group
    
    3.2. Copy and cutomize example of sub-module eks_managed_node_group into `./infra/module-eks.tf`

        ```./infra/module-eks.tf
        module "eks_managed_node_group" {
        source = "terraform-aws-modules/eks/aws//modules/eks-managed-node-group"
        :
        name            = var.eks_mng_node_group_name
        cluster_name    = var.eks_cluster_name
        cluster_version = "1.21"
        :
        ```

    3.3. Edit `./infra/ecr.tf` and configure settings for S3 Elastic Container Registry

        ```./infra/ecr.tf
        resource "aws_ecr_repository" "repositorio" {
        name                 = var.aws_ecr_repo_name
        }        :
        ```

    3.4. Edit `./infra/module-vpc.tf` and configure settings for S3 Elastic Container Registry

        ```./infra/module-vpc.tf
        :
        module "vpc" {
        source = "terraform-aws-modules/vpc/aws"
        :
        ```

    3.5. Edit `./infra/providers.tf` and configure provider resources AWS

        ```./infra/providers.tf
        :
        terraform {
        required_providers {
            aws = {
        :
        provider "aws" {
        :
        ```

    3.6. Edit `./infra/security-group.tf` and configure provider resources AWS

        ```./infra/security-group.tf
        :
        resource "aws_security_group" "allow_ssh" {
        :
        ```


    3.7. Edit `./infra/vars.tf` and configure settings of global variables

        ```./infra/vars.tf
        :
        variable "eks_mng_node_group_name" {
        :
        variable "eks_cluster_name" {
        :
        ```

    3.8. Apply infrastructure configuration

        ```bash
        $ terraform apply
        ```

4. Configure provider Kubernetes Services using Data Sources

    4.1. See Provider Documentation

        * https://www.terraform.io/language/data-sources
    
    4.2. Edit `./infra/providers.tf` and configure provider resources using Data

        ```./infra/providers.tf
        :
        provider "kubernetes" {
        host                   = data.aws_eks_cluster.default.endpoint
        cluster_ca_certificate = base64decode(data.aws_eks_cluster.default.certificate_authority[0].data)
        token                  = data.aws_eks_cluster_auth.default.token
        }
        :
        ```

    4.3. Edit `./infra/vars.tf` and configure variables used by provider

        ```./infra/vars.tf
        :
        variable "cluster_name" {
        type = string

        default = "prd-cluster"
        }
        :
        ```

5. Configure your Kubernetes application

    5.1. Edit `./infra/kubernetes.tf` and configure your application

        ```./infra/kubernetes.tf
        :
        :
        ```

6. Configure Load Balancer using output of created object

    6.1. Edit `./dev/prd/main.tf` and configure output of address

        ```./infra/main.tf
        :
        :
        ```



