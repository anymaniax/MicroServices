
FROM node:latest
MAINTAINER Bury
LABEL Name=ProductsApi Version=1.0.0 
COPY ProductsApi/package.json /tmp/package.json
RUN cd /tmp && npm install --production
RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src/app
COPY ProductsApi/ /usr/src/app
WORKDIR /usr/src/app
EXPOSE 5003
ENV DEBUG=0
CMD node index.js
