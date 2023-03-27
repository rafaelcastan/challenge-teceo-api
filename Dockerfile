FROM node:18-alpine 

RUN apk update && apk add bash

WORKDIR /usr/src/node

COPY  package.json ./

RUN yarn install 

WORKDIR /usr/src/node/app

COPY  . .

RUN yarn global add @nestjs/cli

RUN yarn build

CMD [ "node", "dist/main.js" ]