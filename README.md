
##README##

# Prequisite

- Note: instructions may vary slightly for Mac / Linux environment
- Dependencies:
  - node v14.13.0
  - docker 19.03.12
- Install and run docker. For details visit: https://www.docker.com/products/docker-desktop
- Open Docker Desktop
  - Go to Settings
  - Select Kubernetes
  - Check Enable Kubernetes
- Register / Sign in with Docker account for pushing docker images to Docker Hub
- Set up ingress-nginx
  - Install Krew by following instructions on https://krew.sigs.k8s.io/docs/user-guide/setup/install/
  - Run the following command:
    `kubectl krew install ingress-nginx`
  - Run the following command to create ingress controller & load balancer:
    `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.1/deploy/static/provider/cloud/deploy.yaml`
- Install chocolatey: https://chocolatey.org/install
- Install skaffold by running the following command from your terminal:
  `choco install -y skaffold`
- Update your host file (C:/Windows/System32/Drivers/etc/hosts) and set up 127.0.0.1 to point to host specified in ingress-srv.yaml

# Start App

1. Run the command: `skaffold dev`
