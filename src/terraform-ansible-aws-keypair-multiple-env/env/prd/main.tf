module "aws-prd" {
    source = "../../infra"
    aws_region = "us-west-2"
    aws_instance_type = "t2.micro"
    aws_ssh_key = "terraform-ansible-aws-prd"
}