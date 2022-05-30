module "aws-prd" {
    source = "../../infra"
    aws_region = "us-west-2"
    aws_instance_type = "t2.micro"
    aws_ssh_key = "terraform-ansible-aws-prd"
}

output "IP" {
    value = module.aws-prd.IP_public
}

output "DNS" {
    value = module.aws-prd.DNS_public
}
