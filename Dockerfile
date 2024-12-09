FROM python:3.11-slim

# working directory
WORKDIR /app

# Copy application files
COPY currency-converter-api/main.py /app/
COPY currency-converter-api/static_data /app/static_data/

# Copy the dependencies file
COPY currency-converter-api/requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]