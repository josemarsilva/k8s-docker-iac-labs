variable "eks_mng_node_group_name" {
  type = string

  default = "eks-mng-ng"
}

variable "eks_cluster_name" {
  type = string

  default = "eks-cluster"
}

variable "eks_mng_ng_instance_types" {
  type = list

  default = ["t2.micro"]
}

variable "eks_mng_ng_max_size" {
  type = number

  default = 5
}

variable "eks_mng_ng_desired_size" {
  type = number

  default = 3
}

variable "aws_ecr_repo_name" {
  type = string
}

variable "aws_profile" {
  type = string

  default = "default"
}

variable "aws_region" {
  type = string

  default = "us-west-2"
}
