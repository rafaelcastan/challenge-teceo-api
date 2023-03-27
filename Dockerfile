FROM node:18-alpine 

RUN apk update && apk add bash

WORKDIR /usr/src/node

COPY  package.json ./
COPY package-lock.json ./

RUN npm ci 

WORKDIR /usr/src/node/app

COPY  . .

RUN npm install -g @nestjs/cli

RUN npm run build

CMD [ "node", "dist/main.js" ]