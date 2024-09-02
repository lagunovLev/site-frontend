FROM node:latest AS build
LABEL authors="lagunov"
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["node", "server.js"]


#FROM nginx:stable
#COPY --from=build /dist /usr/share/nginx/html
#COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 3000
#CMD [ "nginx", "-g", "daemon off;" ]