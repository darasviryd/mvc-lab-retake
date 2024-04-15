// Импортируем модуль http
const http = require('http');

// Импортируем модуль cars, чтобы использовать методы getCars, getCarInformation и getCarAge
const carsModule = require('./cars');
const htmlGenerator = require('./htmlGenerator');

// Задаем порт, на котором будет работать сервер
const PORT = 3000;

// Создаем сервер Node.js с помощью модуля http
const server = http.createServer((req, res) => {
    // Логирование при подключении к серверу
    console.log("Connected to the server.");

    // Логирование при получении запроса
    console.log("Request received.");

    // Вывод информации о запуске сервера в консоль
    server.listen(PORT, () => {
        console.log(`Server is running on ${PORT}.`);
    });

    // Присваиваем результат выполнения функции getCars константе cars
    const cars = carsModule.getCars();

    // Логирование содержимого массива cars
    console.log("Cars:");
    console.log(cars);

    // Устанавливаем заголовок Content-Type в значение text/html
    res.writeHead(200, {'Content-Type': 'text/html'});

    // Записываем результат выполнения метода getHTMLDocumentStart
    res.write(htmlGenerator.getHTMLDocumentStart());

    // Записываем начало тега <body>
    res.write("<body>");

    // Проходим по всем автомобилям и записываем информацию о каждом из них в тег <p>
    cars.forEach(car => {
        // Получаем информацию о каждом автомобиле по его id
        const carInfo = carsModule.getCarInformation(car.id);
        const carAge = carsModule.getCarAge(car.id);

        // Записываем информацию о каждом автомобиле в тег <p>
        res.write(`<p>${carInfo}</p>`);
        res.write(`<p>${carAge}</p>`);
    });

    // Записываем конец тега </body>
    res.write("</body>");

    // Записываем результат выполнения метода getHTMLDocumentEnd
    res.write(htmlGenerator.getHTMLDocumentEnd());

    // Закрываем соединение
    res.end();
});

// Слушаем запросы на порту PORT
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});

