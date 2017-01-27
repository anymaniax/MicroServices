
FROM node:latest
MAINTAINER Bury
LABEL Name=Api Version=1.0.0 
COPY Api/package.json /tmp/package.json
RUN cd /tmp && npm install --production
RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src/app
COPY Api/ /usr/src/app
WORKDIR /usr/src/app
EXPOSE 5000
ENV DEBUG=0
CMD node index.js
