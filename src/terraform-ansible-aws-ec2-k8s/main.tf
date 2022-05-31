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
  profile = var.aws_profile
  region  = var.aws_region
}

resource "aws_instance" "k8s-master-1" {
    ami = var.aws_instance_ami
    instance_type = var.aws_instance_type
    key_name = var.key_name
    tags = {
        Name = "k8s-master-1"
    }
    vpc_security_group_ids = [ "${aws_security_group.allow_ssh.id}", "${aws_security_group.allow_ssl.id}" ]
}

resource "aws_instance" "k8s-worker-1" {
    ami = var.aws_instance_ami
    instance_type = var.aws_instance_type
    key_name = var.key_name
    tags = {
        Name = "k8s-worker-1"
    }
    vpc_security_group_ids = [ "${aws_security_group.allow_ssh.id}", "${aws_security_group.allow_ssl.id}" ]
}

resource "aws_instance" "k8s-worker-2" {
    ami = var.aws_instance_ami
    instance_type = var.aws_instance_type
    key_name = var.key_name
    tags = {
        Name = "k8s-worker-2"
    }
    vpc_security_group_ids = [ "${aws_security_group.allow_ssh.id}", "${aws_security_group.allow_ssl.id}" ]
}
