module "aws-dev" {
    source = "../../infra"
    aws_region = "us-west-2"
    aws_instance_type = "t2.micro"
    aws_ssh_key = "terraform-ansible-aws-dev"
}

output "IP" {
    value = module.aws-dev.IP_public
}

output "DNS" {
    value = module.aws-dev.DNS_public
}
