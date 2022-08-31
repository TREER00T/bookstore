FROM node:18

RUN mkdir -p /app/auth/node_modules && chown -R node:node /app/auth

WORKDIR /app/auth

COPY package.json /app/auth

RUN npm i --save-dev typescript -g && \
    npm i

USER node

COPY --chown=node:node . .

COPY . /app/auth

EXPOSE 8080

CMD [ "npm", "start" ]