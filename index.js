require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const frontEndUrl = process.env.FRONT_END_URL;
const port = process.env.PORT || 8080;
const app = express();

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  origin: frontEndUrl,
  methods: ['GET', 'POST'],
  cors: {
    origin: frontEndUrl,
  },
});

const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');
const messageRepo = require('./services/message');

const corsOptions = {
  origin: frontEndUrl,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(bodyParser.json());

authRoutes.signin(app);
messageRoutes.getLast50Messages(app);

io.on('connection', (socket) => {
  socket.on('message', async (data) => {
    const { message, username } = data;
    const messageInfo = {
      messageSender: username,
      message,
    };
    await messageRepo.addMessageToDb(messageInfo);
    io.sockets.emit('receiveMessage', data);
  });
});

// Start the Server
httpServer.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Server Started. Listening on *:${port}`);
});
