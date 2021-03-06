# Kubernetes-POC

## About

This is a simple proof of concept for setting up a load-balanced and secure kubernetes-cluster for a frontend and backend.

### Architecture

This POC consists of both a frontend- and backend application. The frontend is build up from an Angular TS and the backend is build with python and the fastapi library. Both are containerized using a Docker file.

The Kubernetes-Cluster consists of a deployment and ClusterIP service for both applications, a horizontal pod auto-scaler for the backend. It also includes an ingress for both the frontend and backend to deploy the application.

## Getting started

### Prerequisites

- Python
- Node
- Docker
- Kubectl

### Develop

First, clone the directory.

Make sure Docker Desktop is running and you have Kubernetes enabled.

Open a commandline at the directory's location, and create an image's from the Dockerfile's in the respective folders.
```commandline
cd ./client
docker build -t kpoc-client:latest .
cd ../server
docker build -t kpoc-server:latest .
cd ..
```

Make sure it is using the Docker for Desktop context by running the following:
```commandline
kubectl config use-context docker-desktop
```

Use kubectl to setup an ingress and deploy the kubernetes cluster with the following command:
```commandline
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/aws/deploy.yaml
kubectl apply -f deployment.yaml
```

Now we should see the application is deployed at http://localhost.
(This was tested on Google Chrome, some browser might not support this aproach)

To get an overview setup the dashboard:
```commandline
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl proxy
```
Kubectl will make Dashboard available at http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/.

REF: [kubernetes dashboard](https://www.replex.io/blog/how-to-install-access-and-add-heapster-metrics-to-the-kubernetes-dashboard)

#### Analysis

While the Cluster is active, deleting pods should result in a new one being created and the old container and pod being removed. Pods can be deleted with the following command:
```commandline
kubectl delete pod [pod name]
```

You can also see when running two frontend dashboard's at a time, the amount of times a server is accessed is about equally distributed, from this we can conclude the load balancing is indeed working as intended. (This assuming two pods are up and running, the pod auto-scaler takes some time to start)

#### Cleaning up

To terminate the kubernetes cluster run:
```commandline
kubectl delete -f deployment.yaml
kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/aws/deploy.yaml
```

To remove the dashboard run:
```commandline
kubectl delete -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml
kubectl delete -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

To remove the images run:
```commandline
docker rmi kpoc-client
docker rmi kpoc-server
```

## Research
Before creating this implementation I had to do some research on Kubernetes. After that I needed to research this particular implementation. To do this research properly, I need to come up with some questions on the topics, so that I find the answers I need. For this research I will be using the DOT framework.

The research I did during the project can be found [here](https://www.overleaf.com/read/ryrqzzqjwrwy).
