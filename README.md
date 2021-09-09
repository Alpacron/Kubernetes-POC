# Kubernetes-POC

## Getting started

### Prerequisites

- Python
- Node
- Docker
- Kubectl

### Setup

First, clone the directory.

Make sure Docker Desktop is running and you have Kubernetes enabled.

Open a commandline at the directory's location, and create an image from the Dockerfile in the corresponding folders.

```commandline
cd ./client
docker build -t kpoc-client:latest .
cd ../server
docker build -t kpoc-server:latest .
cd ..
```

#### Kubernetes Cluster

Make sure it is using the Docker for Desktop context by running the following:
```commandline
kubectl config use-context docker-desktop
```

Use kubectl to send the YAML file to Kubernetes by running the following command:
```commandline
kubectl apply -f deployment.yaml
```

Now we should see the application is deployed at http://localhost:83

### Clean-up

To terminate the kubernetes cluster run:
```commandline
kubectl delete -f deployment.yaml
```

To remove the image run:
```commandline
docker rmi kpoc-client
docker rmi kpoc-server
```

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.
