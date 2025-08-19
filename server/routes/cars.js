const express = require('express');
const router = express.Router();
const { getAllCars, addCar, updateCar, deleteCar } = require('../models/database');

router.get('/', (req, res) => {
    try {
        const cars = getAllCars();
        res.json(cars);
    } catch (error) {
        console.error('שגיאה בשליפת הרכבים:', error);
        res.status(500).json({ error: 'שגיאה בשליפת הנתונים' });
    }
});

router.post('/', (req, res) => {
    try {
        const result = addCar(req.body);
        res.status(201).json({ 
            message: 'הרכב נוסף בהצלחה',
            id: result.lastInsertRowid 
        });
    } catch (error) {
        console.error('שגיאה בהוספת רכב:', error);
        res.status(500).json({ error: 'שגיאה בהוספת הרכב' });
    }
});

router.put('/:id', (req, res) => {
    try {
        const result = updateCar(req.params.id, req.body);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'רכב לא נמצא' });
        }
        res.json({ message: 'הרכב עודכן בהצלחה' });
    } catch (error) {
        console.error('שגיאה בעדכון רכב:', error);
        res.status(500).json({ error: 'שגיאה בעדכון הרכב' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const result = deleteCar(req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'רכב לא נמצא' });
        }
        res.json({ message: 'הרכב נמחק בהצלחה' });
    } catch (error) {
        console.error('שגיאה במחיקת רכב:', error);
        res.status(500).json({ error: 'שגיאה במחיקת הרכב' });
    }
});

module.exports = router;