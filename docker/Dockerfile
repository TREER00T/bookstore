FROM node:18

WORKDIR /app
RUN npm i --save-dev typescript -g && \
    npm intsall

USER node

COPY ../src/* .

EXPOSE 4000

CMD [ "npm", "start" ]