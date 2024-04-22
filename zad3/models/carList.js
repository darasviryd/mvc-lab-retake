class CarList {
    constructor() {
        this.cars = [];
        this.nextId = 1;
    }

    addCar(car) {
        car.id = this.nextId++;
        this.cars.push(car);
    }
}

module.exports = CarList;
