# Image Storage App Deployment with Terraform & Docker

This project sets up an image storage application that uploads images to an **AWS S3 bucket**. The infrastructure is provisioned using **Terraform**, and the application is containerized using **Docker**.

## 🚀 Project Overview
- **Application**: `server.js` (Node.js app for image uploads)
- **Infrastructure**: AWS S3 bucket (provisioned via Terraform)
- **Containerization**: Docker
- **Future Enhancements**: Jenkins CI/CD & monitoring tools (Prometheus & Grafana)

---

## 📌 Setup Guide

### **1️⃣ Prerequisites**
Before proceeding, ensure you have:
- **AWS Account**
- **Terraform** installed ([Download Here](https://developer.hashicorp.com/terraform/downloads))
- **Docker** installed ([Download Here](https://www.docker.com/get-started))
- **AWS CLI** installed & configured ([Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html))

---

### **2️⃣ Provision AWS S3 Bucket using Terraform**

#### **🔹 Terraform Configuration** (`main.tf`)
```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

resource "aws_s3_bucket" "image_storage" {
  bucket = "my-image-storage-bucket"
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.image_storage.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "encryption" {
  bucket = aws_s3_bucket.image_storage.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
```

#### **🔹 Deploy with Terraform**
```sh
terraform init
terraform apply -auto-approve
```
This will create an S3 bucket and enable **versioning & encryption** for security.

---

### **3️⃣ Containerizing with Docker**
#### **🔹 Dockerfile**
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 3000
```
#### **🔹 Build & Run Docker Container**
```sh
docker build -t image-storage-app .
docker run -d -p 3000:3000 --name image-storage image-storage-app
```
This will start the **Node.js app** inside a container.

---

### **4️⃣ Uploading Images to S3**
#### **🔹 Ensure `.env` is Configured**
Create a `.env` file with AWS credentials:
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-south-1
S3_BUCKET_NAME=my-image-storage-bucket
```

---

## 🔜 **Future Enhancements**
✅ Automate deployment with **Jenkins** (CI/CD)  
✅ Implement monitoring with **Prometheus & Grafana**

---

## 🎯 **Conclusion**
This project sets up an **image storage service** using Terraform & Docker. It ensures security by enabling **S3 encryption & versioning**. Future improvements will include **CI/CD pipelines & monitoring tools**.

---

💡 *Contributions & improvements are welcome!* 🚀

