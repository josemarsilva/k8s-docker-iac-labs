variable "amis" {
    type = map

    default = {
        "us-east-1" = "ami-09d56f8956ab235b3"
        "us-east-2" = "ami-0fa49cc9dc8d62c84"
    }
}

variable "cidrs_blocks_remote_ssh" {
    type = list

    default = ["187.74.39.45/32"]
}

variable "key_name" {
    # type = string # default can be ommited

    default = "terraform-aws"
}