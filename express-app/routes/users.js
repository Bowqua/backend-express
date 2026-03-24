const express = require('express');
const router = express.Router();

/* GET users listing. */

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

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
    });
});

router.post('/', (req, res) => {
    const userData = req.body;
    if (!userData.name) {
        return res.status(400).json({ error: 'Имя пользователя обязательно'});
    }

    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [userData.name]);

    res.status(201).json(userData);
});

router.get('/:id', function(req, res, next) {
    const id = Number(req.params.id);
    db.get('SELECT id, name FROM users WHERE id = ?', [id], function (err, row) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(row);
    });
});


module.exports = router;
