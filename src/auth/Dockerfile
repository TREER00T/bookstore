FROM node:18

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package.json /app

RUN npm i --save-dev typescript -g && \
    npm i

USER node

COPY --chown=node:node . .

COPY . /app

EXPOSE 80

CMD [ "npm", "start" ]