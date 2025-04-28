
FROM node:23

WORKDIR /app/product-service

COPY package.json ./
RUN npm install --unsafe-perm

RUN npm install -g migrate-mongo

COPY . .

EXPOSE 4002

# CMD ["npm", "start"]
CMD ["sh", "-c", "npm run migrate && npm start"]
