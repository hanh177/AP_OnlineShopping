
FROM node:23

WORKDIR /app/product-service

COPY package.json ./
RUN npm install --unsafe-perm

RUN npm install -g migrate-mongo

RUN migrate-mongo up
COPY . .

EXPOSE 4002

CMD ["npm", "start"]
