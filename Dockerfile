FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm cache clean --force

RUN npm ci

COPY . .

RUN npm run build

# Expose the port your app runs on
EXPOSE 3030

CMD ["node", "dist/src/main.js"]