# Kubernetes-POC

## About

This is a simple proof of concept for setting up a load-balanced and secure kubernetes-cluster for a frontend and backend.

### Architecture

This POC consists of both a frontend- and backend application. The frontend is build up from an Angular TS and the backend is build with python and the fastapi library. Both are containerized using a Docker file.

The Kubernetes-Cluster consists of a deployment and load balancing service for both applications, a horizontal pod auto-scaler for the backend and an ingress for the frontend.

## Getting started

### Prerequisites

- Python
- Node
- Docker
- Kubectl

### Develop

First, clone the directory.

Make sure Docker Desktop is running and you have Kubernetes enabled.

Open a commandline at the directory's location, and create an image from the Dockerfile in the respective folders.

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

Use kubectl to send the YAML file to Kubernetes by running the following command:
```commandline
kubectl apply -f develop.yaml
```

Now we should see the application is deployed at http://localhost:83

#### Analysis

While the Cluster is active, deleting pods should result in a new one being created and the old container and pod being removed. Pods can be deleted with the following command:
```commandline
kubectl delete pod [pod name]
```

You can also see when running two frontend dashboard's at a time, the amount of times a server is accessed is about equally distributed, from this we can conclude the load balancing is indeed working as intended. (This assuming two pods are up and running, the pod auto-scaler takes some time to start)

#### Cleaning up

To terminate the kubernetes cluster run:
```commandline
kubectl delete -f develop.yaml
```

To remove the images run:
```commandline
docker rmi kpoc-client
docker rmi kpoc-server
```

## Research
Before creating this implementation I had to do some research on Kubernetes. After that I needed to research this particular implementation. To do this research properly, I need to come up with some questions on the topics, so that I find the answers I need. For this research I will be using the DOT framework.

The research I did during the project can be found [here](https://www.overleaf.com/read/ryrqzzqjwrwy).
