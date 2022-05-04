variable "instance_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
  default     = "ExampleAppServerInstance"
}

variable "instance_ami" {
  description = "Value of the image of AMI instance for the EC2 instance"
  type        = string
  default     = "ami-0cb4e786f15603b0d"
}
