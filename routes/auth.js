const authRepo = require('../services/auth');

module.exports = {
  signin(app) {
    app.post('/signin', async (req, res) => {
      const { username } = req.body;
      try {
        const result = await authRepo.signInUser(username);
        if (result === 'OK') {
          res.send({
            status: 'OK',
          });
        }
      } catch (e) {
        res.send({
          status: 'ERROR',
          error: e,
        });
      }
    });
  },
};
