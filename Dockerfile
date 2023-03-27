FROM node:18.14.2

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]