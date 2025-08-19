import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const carsApi = {
    // קבלת כל הרכבים
    getAll: () => api.get('/cars'),
    
    // הוספת רכב חדש
    create: (carData) => api.post('/cars', carData),
    
    // עדכון רכב קיים
    update: (id, carData) => api.put(`/cars/${id}`, carData),
    
    // מחיקת רכב
    delete: (id) => api.delete(`/cars/${id}`)
};