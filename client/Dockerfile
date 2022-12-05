FROM node:alpine3.16

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /usr/app

COPY package.json /usr/app/
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
