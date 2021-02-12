# tilicev2
This is the Tilice Bot for FlairWars, rewritten from the ground up

# Setup
## Dependencies
Angular CLI https://angular.io/guide/setup-local

NodeJS/NPM https://nodejs.org/en/download/ - At minimum version 12
### Setup
Running `npm install` in both the root directory and in the `/Frontend` directory should get you going.

To start the app, run `npm start` in the root directory

To build the frontend to `/public`, run `ng build` in the `/Frontend` directory. Please note you should have the Angular CLI installed if you are doing this.

## Environment Variables
### DISCORD_TOKEN
This is the discord bot token, used to log in the bot

### REDDIT_CLIENTID
This is the Client ID for the Reddit App

### REDDIT_CLIENTSECRET
This is the Client Secret for the Reddit App

### REDDIT_USERNAME
This is the Username for the account holding the Reddit App

### REDDIT_PASSWORD
This is the Password for the account holding the Reddit App

## Project Structure

### /db
This directory contains schema and operational logic for database interactions

### /discord
This directory contains the logic for the discord bot
#### /commands
This is where command files are put.

### /Frontend
This folder contains the development-environment Angular files. Using `ng build` in this directory builds the webpanel to `/public` automatically.

#### /src/app/components
This is where all the Angular Components should be placed. Automatically generate them here using the Angular CLI in the `/Frontend` folder using `ng g c components/COMPONENT_NAME`

#### /src/app/services
This is where all the Angular Services should be placed. Automatically generate them here using the Angular CLI in the `/Frontend` folder using `ng g s services/SERVICE_NAME`

### /public
This directory contains the static files served for the frontend

### /reddit
This directory contains the logic for the reddit bot

### /routes
This directory contains all Express Routers, which are the endpoints used for internal functionality

#### /botRoutes
This directory contains express routes that interact with the Discord and Reddit bots
