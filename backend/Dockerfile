FROM node:12.16.1

WORKDIR /Desktop/DockerizedProjects/ReapnSow/Backend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["sh", "-c", "npm start"]