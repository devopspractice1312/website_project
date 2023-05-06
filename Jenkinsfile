def Branch = "${params.Branch}"
def Image_Version = "${params.img_ver}"
def Host_Port = "${params.host_port}"
def Container_Name = "${params.container_name}"

    pipeline {
    agent any
    parameters {
        choice(name: 'Branch', choices: ['master','DEV','QA','PROD'], description: 'Select branch')
        string(name: 'img_ver', description: 'Define Image version')
        string(name: 'host_port', description: 'Define Host port')
        string(name: 'container_name', description: 'Define Container name')
    }
    stages{
        stage('1. Get SCM'){
            steps{
                git branch: '$Branch', url: 'https://github.com/devopspractice1312/website_project.git'
            }
        }
        stage('2. Build Docker Image'){
            steps{
                sh "docker build -t 9010870895/node_express:${Image_Version} ."
            }
        }
        stage('3. Login to DockerHub'){
            steps{
                withCredentials([string(credentialsId: 'dockerhub_cred', variable: 'password')]) {
                    sh " docker login -u 9010870895 -p ${password}"
                }
            }
        }
        stage('4. Push the Image to DockerHub'){
            steps{
                sh "docker push 9010870895/node_express:${Image_Version}"
            }
        }
        stage('5. Deploy the containers on Servers'){
            steps{
                script{
                    if ("$Branch"=='master'){
                        sshagent(['Dev_Server']) {
                            sh "ssh -o StrictHostKeyChecking=no ec2-user@172.31.44.14 docker run -d -p ${Host_Port}:3000 --name ${Container_Name} 9010870895/node_express:${Image_Version}"
                        }
                    }
                    else
                        sshagent(['ec2_Prod_Server']) {
                            sh "ssh -o StrictHostKeyChecking=no ec2-user@172.31.44.14 docker run -d -p ${Host_Port}:3000 --name ${Container_Name} 9010870895/node_express:${Image_Version}"
                        }
                }
            }
        }
    }
}
