# refactored until here !

terraform {
  backend "s3" {
    bucket = "josemarsilva-terraform-state"
    key    = "prd/terraform.tfstate"
    region = "us-west-2"
  }
}