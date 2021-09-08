from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import socket;

count = 0

app = FastAPI(
    title="Kubernetes Demo",
    description="A simple demo for kubernetes.",
    version="1.0.0"
)
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_headers=["*"])

@app.get("/")
def hey():
    global count

    count += 1

    return { "host": socket.getfqdn(), "count": count}
