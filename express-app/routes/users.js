const express = require('express');
const router = express.Router();

/* GET users listing. */

const users = [
    { id: 1, name: 'Jonathan' },
    { id: 2, name: 'Sarah' },
    { id: 3, name: 'John' }
];

router.get('/', function(req, res, next) {
  res.json({
      items: users
  });
});

router.post('/', (req, res) => {
    const userData = req.body;
    if (!userData.name) {
        return res.status(400).json({ error: 'Имя пользователя обязательно'});
    }

    const newUser = {
        id: Date.now(),
        name: userData.name
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

module.exports = router;
