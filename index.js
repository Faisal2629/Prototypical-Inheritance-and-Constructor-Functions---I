// Step 1: Car Constructor Function
function Car(make, model, year, type) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.type = type; // Type can be SUV, Sedan, etc.
    this.isAvailable = true; // Default is true
}

//Step 2: Customer Constructor Function
function Customer(name) {
    this.name = name;
    this.rentedCars = []; // Default is an empty array
}

//Step 3: Add a Method to Rent a Car
Customer.prototype.rentCar = function(car) {
    if (car.isAvailable) {
        car.isAvailable = false;
        this.rentedCars.push(car);
        console.log(`${this.name} has rented the ${car.make} ${car.model}.`);
    } else {
        console.log(`Sorry, the ${car.make} ${car.model} is already rented.`);
    }
};

//Step 4: PremiumCustomer Constructor Function
function PremiumCustomer(name, discountRate) {
    Customer.call(this, name); // Call Customer constructor to initialize name and rentedCars
    this.discountRate = discountRate; // e.g., 10% discount
}

// Set up inheritance from Customer
PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

//Step 5: Calculate Rental Prices
function calculateRentalPrice(car, days, customer) {
    const basePricePerDay = 50;
    let price = basePricePerDay * days;

    // Adjust price based on car type
    if (car.type === 'SUV') {
        price *= 1.5; // SUVs are more expensive
    } else if (car.type === 'Sedan') {
        price *= 1.2; // Sedans are slightly more expensive
    }

    // Apply discount if customer is a PremiumCustomer
    if (customer instanceof PremiumCustomer) {
        price -= price * customer.discountRate;
    }

    return price;
}

//Step 6: Return a Car with Asynchronous Delay
Customer.prototype.returnCar = function(car) {
    const index = this.rentedCars.indexOf(car);
    if (index !== -1) {
        // Simulate a delay in processing the return
        setTimeout(() => {
            car.isAvailable = true;
            this.rentedCars.splice(index, 1); // Remove car from rentedCars
            console.log(`${this.name} has returned the ${car.make} ${car.model}.`);
        }, 2000); // 2 seconds delay
    } else {
        console.log(`The ${car.make} ${car.model} is not rented by ${this.name}.`);
    }
};

//Step 7: Maintenance Function
function Maintenance(car, delay) {
    console.log(`The ${car.make} ${car.model} is under maintenance.`);
    setTimeout(() => {
        car.isAvailable = true;
        console.log(`The ${car.make} ${car.model} is now available after maintenance.`);
    }, delay);
}

//Step 8: Demonstrate the Functionality
// Create several car objects
const car1 = new Car('Toyota', 'Corolla', 2020, 'Sedan');
const car2 = new Car('Honda', 'Civic', 2019, 'Sedan');
const car3 = new Car('Ford', 'Explorer', 2021, 'SUV');
const car4 = new Car('Chevrolet', 'Tahoe', 2022, 'SUV');

// Create regular and premium customers
const customer1 = new Customer('Rahul');
const customer2 = new PremiumCustomer('Faisal', 0.1); // 10% discount

// Renting cars
customer1.rentCar(car1); // Rahul rents the Toyota Corolla
customer2.rentCar(car2); // Faisal rents the Honda Civic
customer2.rentCar(car3); // Faisal rents the Ford Explorer

// Attempt to rent a car that is already rented
customer1.rentCar(car1); // Should log that the car is already rented

// Calculate rental prices
const price = calculateRentalPrice(car3, 5, customer2); // 5 days rental for an SUV
console.log(`Rental price for ${customer2.name} is $${price.toFixed(2)}.`); // Discounted price for premium customer

// Returning cars with a delay
customer2.returnCar(car3); // Faisal returns the Ford Explorer

// Maintenance
Maintenance(car1, 3000); // Toyota Corolla under maintenance for 3 seconds

// Bind demonstration (bind a method to a specific car)
const rentCar1 = customer1.rentCar.bind(customer1, car1);
setTimeout(rentCar1, 4000); // Try to rent car1 again after 4 seconds

// Apply demonstration (calculate price for Faisal using apply)
const rentalArgs = [car4, 3, customer2];
const price2 = calculateRentalPrice.apply(null, rentalArgs);
console.log(`Rental price for ${customer2.name} is $${price2.toFixed(2)}.`);
