#!/bin/bash

# Define the name for your Docker image
IMAGE_NAME="backend-service"

# rm file
# rm -rf ./build
# rm -rf ./app/backend-service.jar

# gradle
# ./gradlew clean build
# ./gradlew build

# docker
# docker stop backend-service
# docker rm backend-service
docker build -t $IMAGE_NAME .
# docker-compose up -d
