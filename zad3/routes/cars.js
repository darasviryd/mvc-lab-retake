const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const CarList = require('../models/carList');

const carList = new CarList();

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../views/car.html'), 'utf-8', (err, html) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }

        const $ = cheerio.load(html);
        if (carList.cars.length === 0) {
            $('.car').html('No cars has been found.');
        } else {
            const lastCar = carList.cars[carList.cars.length - 1];
            $('.car').html(`
        <h2>Last added car</h2>
        <div><span class="bold">Make:</span> ${lastCar.make}</div>
        <div><span class="bold">Model:</span> ${lastCar.model}</div>
        <div><span class="bold">Year:</span> ${lastCar.year}</div>
        <div><span class="bold">Color:</span> ${lastCar.color}</div>
      `);
        }

        res.send($.html());
    });
});

router.get('/add', (req, res) => {
    fs.readFile(path.join(__dirname, '../views/add-car.html'), 'utf-8', (err, html) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }

        res.send(html);
    });
});

router.post('/add', (req, res) => {
    const newCar = req.body;
    carList.addCar(newCar);
    res.redirect('/car');
});

router.get('/list', (req, res) => {
    fs.readFile(path.join(__dirname, '../views/cars-list.html'), 'utf-8', (err, html) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }

        const $ = cheerio.load(html);
        if (carList.cars.length === 0) {
            $('.cars').html('No cars has been found.');
        } else {
            let carsHtml = '<h2>Cars</h2><ul>';
            carList.cars.forEach(car => {
                carsHtml += `
          <li>
            <p><span class="bold">Make:</span> ${car.make}</p>
            <p><span class="bold">Model:</span> ${car.model}</p>
            <p><span class="bold">Year:</span> ${car.year}</p>
            <p><span class="bold">Color:</span> ${car.color}</p>
          </li>
        `;
            });
            carsHtml += '</ul>';
            $('.cars').html(carsHtml);
        }

        res.send($.html());
    });
});

module.exports = router;
