const messageRepo = require('../services/message');

module.exports = {
  getLast50Messages(app) {
    app.get('/last50messages', async (req, res) => {
      const messages = await messageRepo.getMessageInRange(0, 50);
      res.send({
        status: 'OK',
        messages,
      });
    });
  },
};
