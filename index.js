require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');
const startSockets = require('./services/sockets');

const frontEndUrl = process.env.FRONT_END_URL;
const port = process.env.PORT || 8080;
const app = express();
const httpServer = http.createServer(app);

const corsOptions = {
  origin: frontEndUrl,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(bodyParser.json());

authRoutes.signin(app);
messageRoutes.getLast50Messages(app);
startSockets(httpServer);

// Start the Server
httpServer.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Server Started. Listening on *:${port}`);
});
