FROM python:3.7-slim

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

EXPOSE 8080
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
