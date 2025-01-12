# Dockerfile
FROM node:18-alpine

# update and install dependency
RUN apk update && apk upgrade

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
