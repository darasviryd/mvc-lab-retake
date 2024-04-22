function renderAddCarPage(lastAddedCar) {
    const lastAddedCarData = lastAddedCar ? JSON.stringify(lastAddedCar) : '';
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Add Car Page</title>
        </head>
        <body>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/add-car">Add Car</a></li>
                    <li><a href="/last-added-car">Last Added Car</a></li>
                </ul>
            </nav>
            <h1>Add a New Car</h1>
            <form action="/add-car" method="POST">
                <input type="hidden" id="lastAddedCar" name="lastAddedCar" value='${lastAddedCarData}'>
                <label for="make">Make:</label><br>
                <input type="text" id="make" name="make"><br>
                <label for="model">Model:</label><br>
                <input type="text" id="model" name="model"><br>
                <label for="year">Year:</label><br>
                <input type="number" id="year" name="year"><br>
                <label for="color">Color:</label><br>
                <input type="text" id="color" name="color"><br><br>
                <input type="submit" value="Submit">
            </form>
        </body>
        </html>
    `;
}

module.exports = {
    renderAddCarPage: renderAddCarPage
};
