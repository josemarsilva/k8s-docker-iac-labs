module "eks_managed_node_group" {
  source = "terraform-aws-modules/eks/aws//modules/eks-managed-node-group"

  name            = var.eks_mng_node_group_name
  cluster_name    = var.eks_cluster_name
  cluster_version = "1.21"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  min_size     = 1
  max_size     = var.eks_mng_ng_max_size
  desired_size = var.eks_mng_ng_desired_size

  instance_types = var.eks_mng_ng_instance_types #
}