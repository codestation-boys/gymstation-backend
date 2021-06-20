FROM node:latest

WORKDIR /usr/app

COPY package.json ./
RUN npm install

RUN npm uninstall bcrypt
RUN npm install bcrypt

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]