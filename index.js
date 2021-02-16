const express = require('express')
const bodyParser = require('body-parser')

const path = require('path')
const cors = require('cors')

// Use a .env file if one exists (helps for dev environment)
require('dotenv').config()

// Setting up express application and socket.io application
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// Serve static resources from the public directory
app.use(express.static(__dirname + '/public'))

// Sends jsonified responses over HTTP
app.use(express.json())

// Bodyparser allows us to use queries/route params
app.use(bodyParser.urlencoded({extended: false}))

// CORS Policy
app.use(cors())

// Router initialization
app.use('/bot', require('./routes/botRouter'))
app.use('/auth', require('./routes/authRouter'))

// For every route that should go to the frontend, send the static index.html file built from
// Angular
require('./routes/frontendRoutes').forEach(route => {
    console.log(`${route} configured as a frontend route`)
    app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
    })
})

// Application Access Logging Middleware
let ApplicationAccessLogger = (req, res, next) => {
  let date = new Date().toISOString()
  let RequestMethod = req.method
  let RequestURL = req.url

  // Logs requests
  console.log(`[${date}] <${RequestMethod}> TO ${RequestURL}`)
  
  next()
}

// Use the logger middleware
app.use(ApplicationAccessLogger)

// Start our app
http.listen((process.env.PORT || 5000), () => {
    console.log(`The app is listening on port ${(process.env.PORT || 5000)}`);
});

// SocketIO Connection handling
io.on('connection', function (socket) {
    console.log(`Client ${socket.id} connected`)
    // This is just an example of an event - When a client connects, the server responds by sending it 
    // a message that says 'ping!'
    socket.emit('ping', 'ping!')
});


// These imports will start the other processes
const DiscordClient = require('./discord/init')
const RedditClient = require('./reddit/init')
