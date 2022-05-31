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

provider "aws" {
  alias = "us-east-2"
  profile = "default"
  region  = "us-east-2"
}

resource "aws_instance" "dev" {
    count = 3
    ami = var.amis["us-east-1"]
    instance_type = "t2.micro"
    key_name = var.key_name
    tags = {
        Name = "dev-${count.index}"
    }
    vpc_security_group_ids = [ "${aws_security_group.allow_ssh.id}" ]
}

resource "aws_instance" "dev-3" {
    ami = var.amis["us-east-1"]
    instance_type = "t2.micro"
    key_name = var.key_name
    tags = {
        Name = "dev-3"
    }
    vpc_security_group_ids = [ "${aws_security_group.allow_ssh.id}" ]
    depends_on = [
      aws_s3_bucket.s3b
    ]
}

resource "aws_instance" "dev-4" {
    ami = var.amis["us-east-1"]
    instance_type = "t2.micro"
    key_name = var.key_name
    tags = {
        Name = "dev-4"
    }
    vpc_security_group_ids = [ "${aws_security_group.allow_ssh.id}" ]
}


resource "aws_instance" "dev-5" {
    provider = aws.us-east-2
    ami = var.amis["us-east-2"]
    instance_type = "t2.micro"
    key_name = var.key_name
    tags = {
        Name = "dev-5"
    }
    vpc_security_group_ids = [ "${aws_security_group.allow_ssh_us_east_2.id}" ]
    depends_on = [ aws_dynamodb_table.dynamodb-hml ]
}

resource "aws_dynamodb_table" "dynamodb-hml" {
  provider = aws.us-east-2
  name           = "GameScores"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "UserId"
  range_key      = "GameTitle"

  attribute {
    name = "UserId"
    type = "S"
  }

  attribute {
    name = "GameTitle"
    type = "S"
  }
}