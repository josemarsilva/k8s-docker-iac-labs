variable "aws_profile" {
    default = "default"
}
variable "aws_region" {
    default = "us-east-1"
}

variable "key_name" {
    default = "terraform-aws"
}

variable "aws_instance_type" {
    default = "t2.medium"
}

variable "aws_instance_ami" {
    default = "ami-09d56f8956ab235b3" #   Ubuntu, 22.04 LTS, amd64
}

variable "tag_name_value" {
    default = "k8s-cluster"
}

variable "cidrs_blocks_remote_ssh" {
    type = list

    default = ["187.74.39.45/32"]
}
