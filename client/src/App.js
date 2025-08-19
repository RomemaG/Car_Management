import React, { useState, useEffect } from 'react';
import { carsApi } from './services/api';
import CarTable from './components/CarTable';
import CarForm from './components/CarForm';
import EditCarForm from './components/EditCarForm';
import './App.css';

function App() {
    const [cars, setCars] = useState([]); // רשימת הרכבים
    const [loading, setLoading] = useState(false); // מצב טעינה
    const [showAddForm, setShowAddForm] = useState(false); // הצגת טופס הוספה
    const [editingCar, setEditingCar] = useState(null); // רכב בעריכה
    const [error, setError] = useState(''); // הודעות שגיאה

    // טעינת הרכבים בטעינה ראשונית
    useEffect(() => {
        loadCars();
    }, []);

    // פונקציה לטעינת כל הרכבים מהשרת
    const loadCars = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await carsApi.getAll();
            setCars(response.data);
        } catch (error) {
            console.error('שגיאה בטעינת הרכבים:', error);
            setError('שגיאה בטעינת הנתונים מהשרת');
        } finally {
            setLoading(false);
        }
    };

    // פונקציה להוספת רכב חדש
    const handleAddCar = async (carData) => {
        try {
            setError('');
            await carsApi.create(carData);
            setShowAddForm(false);
            loadCars(); // רענון הרשימה
            alert('הרכב נוסף בהצלחה! ');
        } catch (error) {
            console.error('שגיאה בהוספת רכב:', error);
            setError('שגיאה בהוספת הרכב');
        }
    };

    // פונקציה לעדכון רכב קיים
    const handleUpdateCar = async (id, carData) => {
        try {
            setError('');
            await carsApi.update(id, carData);
            setEditingCar(null);
            loadCars(); // רענון הרשימה
            alert('הרכב עודכן בהצלחה! ');
        } catch (error) {
            console.error('שגיאה בעדכון רכב:', error);
            setError('שגיאה בעדכון הרכב');
        }
    };

    // פונקציה למחיקת רכב
    const handleDeleteCar = async (id) => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק את הרכב? ')) {
            try {
                setError('');
                await carsApi.delete(id);
                loadCars(); // רענון הרשימה
                alert('הרכב נמחק בהצלחה! ');
            } catch (error) {
                console.error('שגיאה במחיקת רכב:', error);
                setError('שגיאה במחיקת הרכב');
            }
        }
    };

    // פונקציה לפתיחת מצב עריכה
    const handleEditCar = (car) => {
        setEditingCar(car);
        setShowAddForm(false); // סגירת טופס ההוספה אם פתוח
    };

    return (
        <div className="App">
            {/* כותרת ראשית */}
            <header className="app-header">
                <h1>🚗 מערכת ניהול רכבים חשמליים ⚡</h1>
            </header>

            {/* הצגת שגיאות */}
            {error && (
                <div className="error-message">
                    ❌ {error}
                </div>
            )}

            {/* כפתורי פעולה */}
            <div className="actions-container">
                <button 
                    className={`btn ${showAddForm ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => {
                        setShowAddForm(!showAddForm);
                        setEditingCar(null); // סגירת מצב עריכה
                    }}
                >
                    {showAddForm ? ' ביטול הוספה' : ' הוסף רכב חדש'}
                </button>
                
                <button 
                    className="btn btn-secondary"
                    onClick={loadCars}
                    disabled={loading}
                >
                    {loading ? ' טוען...' : ' רענן נתונים'}
                </button>
            </div>

            {/* טופס הוספת רכב */}
            {showAddForm && (
                <CarForm 
                    onSubmit={handleAddCar}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            {/* טופס עריכת רכב */}
            {editingCar && (
                <EditCarForm 
                    car={editingCar}
                    onSubmit={handleUpdateCar}
                    onCancel={() => setEditingCar(null)}
                />
            )}

            {/* טבלת הרכבים */}
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">טוען נתונים...</p>
                </div>
            ) : (
                <CarTable 
                    cars={cars}
                    onEdit={handleEditCar}
                    onDelete={handleDeleteCar}
                />
            )}
        </div>
    );
}

export default App;