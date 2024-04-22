const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../views/home.html'), 'utf-8', (err, html) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }

        res.send(html);
    });
});

module.exports = router;
