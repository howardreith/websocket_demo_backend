const authRepo = require('../services/auth');

module.exports = {
  signin(app) {
    app.post('/signin', async (req, res) => {
      const { username } = req.body;
      try {
        await authRepo.signInUser(username);
        res.send({
          status: 'OK',
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('error', e);
        res.status(401).send('Username already in use');
      }
    });
  },
};
