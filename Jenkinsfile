pipeline {
    checkout scm
    agent {
        docker { image 'angular/ngcontainer' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
