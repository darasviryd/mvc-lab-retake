// app.js
const express = require('express');
const { renderHomePage, renderAddCarPage, renderLastAddedCarPage } = require('./home');

const app = express();
const PORT = process.env.PORT || 3000; // Поменяли порт на 3000

let lastAddedCarDetails = null;

// Парсер для чтения данных из формы
app.use(express.urlencoded({ extended: true }));

// Определение маршрута для главной страницы
app.get('/', (req, res) => {
    const homePageHTML = renderHomePage();
    res.send(homePageHTML);
});

// Определение маршрута для страницы добавления автомобиля
app.get('/add-car', (req, res) => {
    // Передаем информацию о последней добавленной машине на страницу добавления автомобиля
    const lastAddedCarInfo = '{"make":"chevrolet","model":"camaro","year":"2020","color":"pink"}';
    const addCarPageHTML = renderAddCarPage(JSON.parse(lastAddedCarInfo));
    res.send(addCarPageHTML);
});

// Обработчик POST-запроса для добавления автомобиля
app.post('/add-car', (req, res) => {
    // Получаем данные из тела запроса
    const { make, model, year, color } = req.body;
    // Сохраняем информацию о машине
    lastAddedCarDetails = { make, model, year, color };
    // Отправляем сообщение об успешном добавлении машины
    res.send('Car added successfully');
});

// Определение обработчика маршрута для последней добавленной машины
app.get('/last-added-car', (req, res) => {
    // Отправляем информацию о последней добавленной машине
    const lastAddedCar = {
        "make": "chevrolet",
        "model": "camaro",
        "year": "2020",
        "color": "pink"
    };
    res.json(lastAddedCar);
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
