const jwt = require('jsonwebtoken');

const controller = {};

controller.login = (req, res) => {
  jwt.sign({ user: req.user }, process.env.JWT_SALT, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      console.error('Error JWT:', err);
      res.json({ error: true });
    } else {
      res.json({ token });
    }
  });
};

controller.verify = (req, res) => {
  res.json(req.data.user);
};

module.exports = controller;
