 # Base image
FROM node:latest
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
RUN npm install
RUN npm install pm2 -g

# Declaring PROT in containers
EXPOSE 3000
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]