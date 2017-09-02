FROM node:4
ADD ./package.json /musejs/package.json
WORKDIR /musejs
RUN npm install
ADD . /musejs
RUN npm test
