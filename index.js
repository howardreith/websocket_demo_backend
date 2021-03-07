require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');
const messageRepo = require('./services/message');

const frontEndUrl = process.env.FRONT_END_URL;
const port = process.env.PORT || 8080;
const app = express();
const httpServer = require('http').createServer(app);

const corsOptions = {
  origin: frontEndUrl,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(bodyParser.json());

const io = require('socket.io')(httpServer, {
  origin: frontEndUrl,
  methods: ['GET', 'POST'],
  cors: {
    origin: frontEndUrl,
  }
});

authRoutes.signin(app);
messageRoutes.getLast50Messages(app);

console.log('====> port', port)
console.log('====> frontEndUrl', frontEndUrl)

io.on('connection', function (socket) {
  socket.on('message', async function (data) {
    const {message, username} = data;
    const messageInfo = {
      messageSender: username,
      message
    };
    await messageRepo.addMessageToDb(messageInfo);
    io.sockets.emit('receiveMessage', data);
  });
});

// Start the Server
httpServer.listen(port, function () {
  console.info('Server Started. Listening on *:' + port);
});

