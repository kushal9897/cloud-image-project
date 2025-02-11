pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_KEY')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/kushal9897/image-storage-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t image-storage-app .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-credentials']) {
                    sh 'docker tag image-storage-app your-dockerhub/image-storage-app:latest'
                    sh 'docker push your-dockerhub/image-storage-app:latest'
                }
            }
        }

        
    }
}
