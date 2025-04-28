
FROM node:23

WORKDIR /app/api-gateway

COPY package.json ./
RUN npm install --unsafe-perm

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
