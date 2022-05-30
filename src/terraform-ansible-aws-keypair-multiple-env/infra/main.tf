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
  region  = var.aws_region
}

resource "aws_instance" "app_server" {
  ami           = "ami-0cb4e786f15603b0d"
  instance_type = var.aws_instance_type
  key_name      = var.aws_ssh_key
  tags = {
    Name = "InstanciaPythonVenvDjang-${var.aws_ssh_key}"
  }
}

resource "aws_key_pair" "chave_ssh" {
  key_name = var.aws_ssh_key
  public_key = file("${var.aws_ssh_key}.pub")
}

output "IP_public" {
  value = aws_instance.app_server.public_ip
}

output "DNS_public" {
  value = aws_instance.app_server.public_dns
}
