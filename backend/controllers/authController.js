const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const config = require('../config/config');

exports.register = async (req, res) => {
  const { username, password ,area, branch} = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({ username, password: hashedPassword,area, branch});

    await user.save();

    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message});
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ token: null, message: 'Invalid Password' });
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration
    });

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
};

exports.protected = (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token' });
    }
    res.status(200).send({ message: 'Protected content', user: decoded });
  });
};
