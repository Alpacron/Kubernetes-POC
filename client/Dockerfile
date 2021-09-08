FROM node:latest as build

COPY . .

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /docs /usr/share/nginx/html

EXPOSE 81