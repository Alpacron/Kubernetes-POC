# Kubernetes-POC

## Getting started

### Prerequisites

- Python
- Node
- docker
- kubectl

### Setup

First, clone the directory.

Open a commandline at the directory's location, and create an image and run it to start up the container.

```commandline
docker build -f Dockerfile -t kpoc:latest .
```
```commandline
docker run -p 81:80 kpoc
```

Now we can see the application is running at http://localhost:81

Open another commandline and make sure it is using the Docker for Desktop context by running the following:

```commandline
kubectl config use-context docker-desktop
```

Use kubectl to send the YAML file to Kubernetes by running the following command:

```commandline
kubectl apply -f deployment.yaml
```

Now we should se the application is deployed and load balanced at http://localhost:82
As you refresh the page multiple times, the server accessed count should increase and the host id should change once in a while.

### Clean-up

When you're done run:

```commandline
kubectl delete -f deployment.yaml
```

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.
