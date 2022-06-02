module "prd" {
    source = "../../infra"

    aws_ecr_repo_name = "ecr-prd"
}
