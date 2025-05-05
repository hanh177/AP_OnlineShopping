FROM node:23-alpine AS build

WORKDIR /app/react-fe

COPY package.json ./

RUN npm install --unsafe-perm

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/react-fe/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
