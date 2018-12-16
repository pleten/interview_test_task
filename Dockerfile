FROM node:8.14.0
RUN mkdir -p /usr/zone3000
WORKDIR /usr/zone3000
COPY . /usr/zone3000
RUN npm install