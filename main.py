from typing import Counter
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from starlette.middleware.cors import CORSMiddleware
import socket;

count = 0

app = FastAPI(
    title="Kubernetes Demo",
    description="A simple demo for kubernetes.",
    version="1.0.0"
)
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['POST', 'PUT'], allow_headers=["*"])

@app.get("/", response_class=HTMLResponse)
def hey():
    global count

    count += 1

    html_content = """
    <html>
        <body>
            <p>The current app is running on host with id: {}</p>
            <p>This server has been accessed {} times.</p>
        </body>
    </html>
    """.format(socket.getfqdn(), count)

    return html_content
