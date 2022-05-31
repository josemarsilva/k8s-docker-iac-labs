output "k8s-master-1" {
    value = "${aws_instance.k8s-master-1.public_dns}"
}

output "k8s-worker-1" {
    value = "${aws_instance.k8s-worker-1.public_dns}"
}

output "k8s-worker-2" {
    value = "${aws_instance.k8s-worker-2.public_dns}"
}
