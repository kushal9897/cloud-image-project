terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# provider "aws" {
#   region = "ap-south-1" # Change if needed
# }

#AWS configuration
provider "aws" {
    region = "ap-south-1"
    access_key = "AKIA4SDN"
    secret_key = "AKIA4SDN"
}


# Create S3 Bucket
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-unique-bucket" # Change to a unique name

  tags = {
    Name        = "MyBucket"
    Environment = "Dev"
  }
}

# Block Public Access
resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.my_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable Versioning
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.my_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}



# Enable Logging (Optional)
resource "aws_s3_bucket_logging" "logging" {
  bucket        = aws_s3_bucket.my_bucket.id
  target_bucket = aws_s3_bucket.my_bucket.id
  target_prefix = "logs/"
}
