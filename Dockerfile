# Start with the python:3.9 image
FROM python:3.9
# Set the following enviroment variables
#
# REACT_APP_BASE_URL -> Your deployment URL
ENV REACT_APP_BASE_URL=https://nonogram.onrender.com/
# FLASK_APP -> entry point to your flask app
ENV FLASK_APP=app
# FLASK_ENV -> Tell flask to use the production server
ENV FLASK_ENV=production
# SQLALCHEMY_ECHO -> Just set it to true
ENV SQLALCHEMY_ECHO=true
# Set the directory for upcoming commands to /var/www
WORKDIR /var/www
# Install Python development headers
RUN apt-get update && apt-get install -y python3-dev
# Install system dependencies for greenlet and psycopg2
RUN apt-get install -y libffi-dev libpq-dev
# Upgrade pip
RUN pip install --upgrade pip
# Copy all the files from your repo to the working directory
COPY . .
# Copy the built react app (it's built for us) from the
# /react-app/build/ directory into your flasks app/static directory
COPY /react-app/build/* app/static/
# Run the next two python install commands with PIP
# install -r requirements.txt
RUN pip install -r requirements.txt
# install psycopg2
RUN pip install psycopg2
# Start the flask environment by setting our
# closing command to gunicorn app:app
CMD gunicorn app:app
