FROM node:20.1.0

WORKDIR /src/frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["sh", "-c", "npm start"]