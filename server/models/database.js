const Database = require('better-sqlite3');
const path = require('path');

// יצירת חיבור לבסיס הנתונים
const db = new Database(path.join(__dirname, '..', 'cars.db'));

// פונקציה לקבלת כל הרכבים - שם הטבלה תוקן ל-EV_cars
const getAllCars = () => {
    try {
        const stmt = db.prepare('SELECT rowid, * FROM EV_cars');
        return stmt.all();
    } catch (error) {
        console.error('שגיאה בקריאת רכבים:', error);
        throw error;
    }
};

// פונקציה להוספת רכב חדש
const addCar = (car) => {
    try {
        const stmt = db.prepare(`
            INSERT INTO EV_cars (Car_name, Efficiency, Fast_charge, Price, Range, Top_speed, Acceleration)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        return stmt.run(car.Car_name, car.Efficiency, car.Fast_charge, car.Price, car.Range, car.Top_speed, car.Acceleration);
    } catch (error) {
        console.error('שגיאה בהוספת רכב:', error);
        throw error;
    }
};

// פונקציה לעדכון רכב קיים
const updateCar = (id, car) => {
    try {
        const stmt = db.prepare(`
            UPDATE EV_cars 
            SET Car_name = ?, Efficiency = ?, Fast_charge = ?, Price = ?, Range = ?, Top_speed = ?, Acceleration = ?
            WHERE rowid = ?
        `);
        return stmt.run(car.Car_name, car.Efficiency, car.Fast_charge, car.Price, car.Range, car.Top_speed, car.Acceleration, id);
    } catch (error) {
        console.error('שגיאה בעדכון רכב:', error);
        throw error;
    }
};

// פונקציה למחיקת רכב
const deleteCar = (id) => {
    try {
        const stmt = db.prepare('DELETE FROM EV_cars WHERE rowid = ?');
        return stmt.run(id);
    } catch (error) {
        console.error('שגיאה במחיקת רכב:', error);
        throw error;
    }
};

module.exports = {
    getAllCars,
    addCar,
    updateCar,
    deleteCar
};