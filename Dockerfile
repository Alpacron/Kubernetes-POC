# syntax=docker/dockerfile:1
FROM python:3.7

# Installing requirements
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Deploy
EXPOSE 80
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
