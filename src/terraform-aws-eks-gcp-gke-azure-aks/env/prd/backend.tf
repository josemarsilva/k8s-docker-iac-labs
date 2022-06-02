terraform {
  backend "s3" {
    bucket = "josemarsilva-terraform-state" # terraform-state-alura
    key    = "prd/terraform.tfstate"        # Prod/terraform.tfstate
    region = "us-west-2"
  }
}
