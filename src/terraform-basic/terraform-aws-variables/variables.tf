variable "instance_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
  default     = "ExampleAppServerInstance"
}

variable "instance_ami" {
  description = "Value of the image of AMI instance for the EC2 instance"
  type        = string
  default     = "ami-0f9fc25dd2506cf6d"
}
