#syntax=docker/dockerfile:1

FROM node:18-alpine AS development

WORKDIR  /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /user/src/app/package-lock.json

RUN npm install 

COPY . /usr/src/app/

CMD ["node", "src/main.ts"]


