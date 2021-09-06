from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Kubernetes Demo",
    description="A simple demo for kubernetes.",
    version="1.0.0"
)
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['POST', 'PUT'], allow_headers=["*"])

@app.get("/")
def hey():
    return "Hello World!"
