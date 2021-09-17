FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/client /usr/share/nginx/html

EXPOSE 8081

CMD ["/bin/sh", "-c", "sed -i 's/listen  .*/listen 8081;/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]