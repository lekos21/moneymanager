# Dockerfile per backend FastAPI
FROM python:3.11-slim

WORKDIR /app
# install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# copy application code
COPY app ./app

# expose port e avviare uvicorn
EXPOSE 8000
ENV PYTHONPATH=/app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
