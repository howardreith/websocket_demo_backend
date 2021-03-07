const authRepo = require('../services/auth');

module.exports = {
  signin: function (app) {
    app.post('/signin', async (req, res) => {
      const username = req.body.username;
      try {
        const result = await authRepo.signInUser(username);
        if (result === 'OK') {
          res.send({
            'status': 'OK'
          });
        }
      } catch (e) {
        res.send({
          'status': 'ERROR',
          'error': e
        })
      }
    });
  }
};