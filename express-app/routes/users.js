const express = require('express');
const router = express.Router();

/* GET users listing. */

const users = [
    { id: 1, name: 'Jonathan' },
    { id: 2, name: 'Sarah' },
    { id: 3, name: 'John' }
];

router.get('/', function (req, res) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }

        res.json({
            items: rows
        });
    });
});

router.post('/', (req, res) => {
    const userData = req.body;
    if (!userData.name) {
        return res.status(400).json({ error: 'Имя пользователя обязательно'});
    }

    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name]);

    const newUser = {
        id: Date.now(),
        name: userData.name
    };

    users.push(newUser);
    res.status(201).json(newUser);
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

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

module.exports = router;
