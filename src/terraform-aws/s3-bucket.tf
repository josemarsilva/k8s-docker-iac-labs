resource "aws_s3_bucket" "s3b" {
  bucket = "josemarsilva-terraform-s3b"

  tags = {
    Name        = "terraform-s3b"
  }
}

resource "aws_s3_bucket_acl" "s3bacl" {
  bucket = aws_s3_bucket.s3b.id
  acl    = "private"
}

