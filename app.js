const cars = [
    { id: 1, make: "Tesla", model: "Model S", year: 2023, color: "black" },
    { id: 2, make: "Porsche", model: "911", year: 2022, color: "blue" },
    { id: 3, make: "Lamborghini", model: "Huracan", year: 2024, color: "yellow" },
    { id: 4, make: "Ferrari", model: "488 GTB", year: 2021, color: "red" },
    { id: 5, make: "McLaren", model: "720S", year: 2023, color: "orange" }
];

function getCars() {
    return cars;
}

function getCarInformation(id) {
    const car = cars.find(car => car.id === id);
    if (!car) return "Car doesn't exist";
    return `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}, Color: ${car.color}.`;
}

function getCarAge(id) {
    const car = cars.find(car => car.id === id);
    if (!car) return "Car doesn't exist";
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - car.year;
    return `Car is ${carAge} years old.`;
}

module.exports = { getCars, getCarInformation, getCarAge };
