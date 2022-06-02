module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name                    = var.eks_cluster_name
  cluster_version                 = "1.21"
  cluster_endpoint_private_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    eks_mng_ng = {
      min_size     = 1
      max_size     = 10
      desired_size = 3
      vpc_security_group_ids = [aws_security_group.allow_ssh.id]
      instance_types = var.eks_mng_ng_instance_types
    }
  }
}
