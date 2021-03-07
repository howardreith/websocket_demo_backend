const socketio = require('socket.io');
const messageRepo = require('./message');

const frontEndUrl = process.env.FRONT_END_URL;

const startSockets = function startSockets(httpServer) {
  const io = socketio(httpServer, {
    origin: frontEndUrl,
    methods: ['GET', 'POST'],
    cors: {
      origin: frontEndUrl,
    },
  });

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
};

module.exports = startSockets;
