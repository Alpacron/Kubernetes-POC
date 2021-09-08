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

Open a commandline at the directory's location, and create an image from the Dockerfile.

```commandline
docker build -f Dockerfile -t kpoc:latest .
```

#### Single container deployment

(Optional) Create and start a container:
```commandline
docker create -p 81:80 --name kpoc-client kpoc
docker start kpoc-client
```

Now we can see the application is running in a single container at http://localhost:81

#### Kubernetes Cluster

Make sure it is using the Docker for Desktop context by running the following:
```commandline
kubectl config use-context docker-desktop
```

Use kubectl to send the YAML file to Kubernetes by running the following command:
```commandline
kubectl apply -f deployment.yaml
```

Now we should see the application is deployed and load balanced at http://localhost:82

As you refresh the page multiple times, the host id should change once in a while, and the amount of times the server is accessed should increase and is bound to the host id.

### Clean-up

To terminate the container run:
```commandline
docker stop kpoc-client
docker rm kpoc-client
```

To terminate the kubernetes cluster run:
```commandline
kubectl delete -f deployment.yaml
```

To remove the image run:
```commandline
docker rmi kpoc
```

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.
