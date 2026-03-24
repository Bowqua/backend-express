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

router.get('/:id', function(req, res, next) {
    const id = Number(req.params.id);
    const user = users.find(function (user) {
        return user.id === id;
    });

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        });
    }

    res.json(user);
});

module.exports = router;
