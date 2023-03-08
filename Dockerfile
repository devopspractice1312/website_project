FROM node:alpine

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install

CMD ["node","express.js"]
