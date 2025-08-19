const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const carsRouter = require('./routes/cars');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 

// Routes
app.use('/api/cars', carsRouter);


app.get('/', (req, res) => {
    res.json({ message: 'שרת ניהול רכבים פועל בהצלחה!' });
});


app.listen(PORT, () => {
    console.log(`השרת פועל על פורט ${PORT}`);
});