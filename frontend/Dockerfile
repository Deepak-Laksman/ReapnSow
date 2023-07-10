FROM node:20.1.0

WORKDIR /Desktop/DockerizedProjects/ReapnSow/Frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["sh", "-c", "npm start"]