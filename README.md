# Kubernetes-POC

## About
This is a simple proof of concept for setting up a load-balanced and secure kubernetes-cluster for a frontend and backend.

## Getting started

### Prerequisites

- Python
- Node
- Docker
- Kubectl

### Production

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
kubectl apply -f deployment.yaml
```

Now we should see the application is deployed at http://localhost:83

#### Analysis

While the Cluster is active, deleting pods should result in a new one being created and the old container and pod being removed. Pods can be deleted with the following command:
```commandline
kubectl delete pod [pod name]
```

You can also see when running two frontend dashboard's at a time, the amount of times a server is accessed is about equally distributed, from this we can conclude the load balancing is indeed working as intended. (This assuming two pods are up and running, the pod auto-scaler takes some time to start)

#### Clean-up

To terminate the kubernetes cluster run:
```commandline
kubectl delete -f deployment.yaml
```

To remove the images run:
```commandline
docker rmi kpoc-client
docker rmi kpoc-server
```

### Development

To start the client run the following in the respective directory:
```commandline
ng serve
```

The client should be deployed on http://localhost:4200

To start the server run:
```commandline
uvicorn main:app --reload
```

The server is now deployed on http://localhost:8000

## Research
Before creating this implementation I had to do some research on Kubernetes. After that I needed to research this particular implementation. To do this research properly, I need to come up with some questions on the topics, so that I find the answers I need. For this research I will be using the DOT framework.

The research I did during the project can be found [here](https://www.overleaf.com/read/ryrqzzqjwrwy).
