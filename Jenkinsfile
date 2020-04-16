node {
  BUILD_TRIGGER_BY = sh ( script: "BUILD_BY=\$(curl -k --silent ${BUILD_URL}/api/xml | tr '<' '\n' | egrep '^userId>|^userName>' | sed 's/.*>//g' | sed -e '1s/\$/ \\/ /g'); if [[ -z \${BUILD_BY} ]]; then BUILD_BY=\$(curl -k --silent ${BUILD_URL}/api/xml | tr '<' '\n' | grep '^shortDescription>' | sed 's/.*user //g;s/.*by //g'); fi; echo \${BUILD_BY}", returnStdout: true ).trim()
  echo "BUILD_TRIGGER_BY: ${BUILD_TRIGGER_BY}"
  
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
