# Specify a base image
FROM node:lts-alpine

# Install angular
RUN npm install -g @angular/cli

#Install some dependencies
WORKDIR /code
COPY ./ /code
RUN npm install && cd /code/Frontend && npm install && ng build

# Expose ports
EXPOSE 5000/tcp

# Set up a default command
CMD [ "npm","start" ]
