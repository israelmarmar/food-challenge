FROM node:alpine

  RUN apk add --no-cache bash 

  RUN mkdir -p /usr/src/app

  WORKDIR /usr/src/app

  COPY package.json /usr/src/app/

  RUN npm install

  COPY . /usr/src/app
  COPY wait-for-it.sh /

  EXPOSE 3333

  CMD /wait-for-it.sh db:3306 -- npm run migrate && npm run migrate:seed && npm run start