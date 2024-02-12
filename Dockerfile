FROM node:18.14.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install pm2 -g

RUN npm ci --include=dev

COPY . .

EXPOSE 5005

CMD [ "npm", "run", "dev2" ]

