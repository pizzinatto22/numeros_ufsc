node {
  def ngcontainer = docker.image('angular/ngngcontainer')
  def nodecontainer = docker.image("node:8")
  ngcontainer.pull()
  nodecontainer.pull()

  stage('Fazendo checkout do SCM') {
    checkout scm
  }

  stage('Instalando dependencias do frontend') {
     ngcontainer.inside("-v ./client:/home/client") {
       sh 'cd ~/client && npm install'
     }
  }

  stage('Build do frontend') {
     ngcontainer.inside("-v ./client:/home/client") {
       sh 'cd ~/client && ng build --prod'
     }
  }

  stage('Instalando dependencias do backend') {
    nodecontainer.inside("-v ./server:/home/server") {
      sh 'cd ~/server && npm install'
    }
  }
  
}
