
FROM node:23

WORKDIR /app/user-service

COPY package.json ./
RUN npm install --unsafe-perm

COPY . .

EXPOSE 4001

CMD ["npm", "start"]
