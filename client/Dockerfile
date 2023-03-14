FROM node:14.17.3-buster as build

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run build

# Path: client/Dockerfile
FROM nginx:1.21.1-alpine as prod

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
