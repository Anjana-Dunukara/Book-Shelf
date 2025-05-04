FROM node:alpine AS build

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx:1.22-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/app/dist /usr/share/nginx/html

EXPOSE 3000
