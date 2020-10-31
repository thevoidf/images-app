FROM node

WORKDIR /home/app

COPY package.json .
COPY . .

RUN npm install

CMD npm start

EXPOSE 3000
