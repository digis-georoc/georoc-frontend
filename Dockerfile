# Dockerfile
FROM node:18-alpine

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# update and install dependency
RUN apk update && apk upgrade

RUN npm install

# generates all app files and saves them under .output
# Nuxt creates .output/public and .output/server directories
RUN npm run generate

COPY .output/public /usr/src/app/

EXPOSE 80
