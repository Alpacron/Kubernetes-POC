# Kubernetes-POC

## Getting started

### Prerequisites

- Python
- Node
- docker
- kubectl

### Setup

First, clone the directory.

To run the application create an image in your commandline at the location of the cloned repository.

```commandline
docker build -f Dockerfile -t hello-python:latest .
```

Make sure it is using the Docker for Desktop context by running the following:

```commandline
kubectl config use-context docker-desktop
```

Use kubectl to send the YAML file to Kubernetes by running the following command:

```commandline
kubectl apply -f deployment.yaml
```

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.
