output "dev-0_ip" {
    value = "${aws_instance.dev[0].public_ip}"
}

output "dev-0_dns" {
    value = "${aws_instance.dev[0].public_dns}"
}

output "dev-5_ip" {
    value = "${aws_instance.dev-5.public_ip}"
}

output "dev-5_dns" {
    value = "${aws_instance.dev-5.public_dns}"
}
