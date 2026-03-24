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

module.exports = router;
