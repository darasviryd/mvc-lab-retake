// Подключение модулей
const { renderPage: renderHomePage } = require('../views/home');
const { renderPage: renderAddCarPage } = require('../views/add-car');
const { renderPage: renderCarPage } = require('../views/car');
const fs = require('fs');

// Определение функций обработчиков маршрутов

function handleHome(req, res) {
    // Установка заголовка Content-Type в значение text/html
    res.setHeader('Content-Type', 'text/html');

    // Получение HTML-кода для страницы "home"
    const htmlContent = renderHomePage();

    // Проверка на существование htmlContent перед отправкой
    if (htmlContent) {
        // Отправка HTML-кода клиенту
        res.write(htmlContent);
    } else {
        // Если htmlContent не определен, отправляем сообщение об ошибке
        res.write('Error: Unable to generate home page');
    }

    // Завершение ответа
    res.end();
}

function handleAddCar(req, res) {
    // Получение метода запроса
    const method = req.method;

    // Для метода GET
    if (method === 'GET') {
        // Установка заголовка Content-Type в значение text/html
        res.setHeader('Content-Type', 'text/html');

        // Получение HTML-кода для страницы "add-car"
        const htmlContent = renderAddCarPage();

        // Отправка HTML-кода клиенту
        res.write(htmlContent);

        // Завершение ответа
        res.end();
    }
    // Для метода POST
    else if (method === 'POST') {
        let formData = '';

        // Считывание данных из формы
        req.on('data', chunk => {
            // Проверка на наличие данных в chunk
            if (chunk) {
                formData += chunk.toString();
            }
        });

        req.on('end', () => {
            // Сохранение данных в файл formData.json
            fs.writeFile('formData.json', formData, (err) => {
                if (err) {
                    console.error('Ошибка при сохранении данных:', err);
                    // Обработка ошибки и завершение ответа с кодом ошибки
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Ошибка при сохранении данных');
                } else {
                    // Установка statusCode в значение 302
                    res.statusCode = 302;
                    // Установка заголовка Location на значение "/car"
                    res.setHeader('Location', '/car');
                    // Завершение ответа
                    res.end();
                }
            });
        });
    }
}

function handleCar(req, res) {
    // Считывание содержимого файла formData.json
    fs.readFile('formData.json', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла formData.json:', err);
            // Обработка ошибки и завершение ответа с кодом ошибки
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Ошибка при чтении данных');
        } else {
            // Установка заголовка Content-Type в значение text/html
            res.setHeader('Content-Type', 'text/html');

            // Получение HTML-кода для страницы "car"
            const htmlContent = renderCarPage(data);

            // Отправка HTML-кода клиенту
            res.write(htmlContent);

            // Завершение ответа
            res.end();
        }
    });
}

function handlePageNotFound(req, res) {
    // Установите statusCode в значение 404
    res.statusCode = 404;
    // Установите заголовок Content-Type в значение text/html
    res.setHeader('Content-Type', 'text/html');
    // С помощью метода write верните текст "404 Page Not Found"
    res.write('404 Page Not Found');
    // Завершите построение ответа с помощью метода end
    res.end();
}

// Экспорт обработчиков маршрутов
module.exports = {
    handleHome,
    handleAddCar,
    handleCar,
    handlePageNotFound
};
