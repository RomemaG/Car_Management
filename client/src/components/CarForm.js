import React, { useState } from 'react';

// רכיב לטופס הוספת רכב חדש
const CarForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        Car_name: '',
        Efficiency: '',
        Fast_charge: '',
        Price: '',
        Range: '',
        Top_speed: '',
        Acceleration: ''
    });

    // עדכון נתוני הטופס
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // שליחת הטופס
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-container">
            <h3 className="form-title"> הוספת רכב חדש למערכת</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label> שם הרכב:</label>
                        <input
                            type="text"
                            name="Car_name"
                            value={formData.Car_name}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="לדוגמה: Tesla Model S"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label> יעילות:</label>
                        <input
                            type="number"
                            name="Efficiency"
                            value={formData.Efficiency}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="לדוגמה: 172"
                            min="1"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label> טעינה מהירה:</label>
                        <input
                            type="number"
                            name="Fast_charge"
                            value={formData.Fast_charge}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="לדוגמה: 670"
                            min="1"
                            step="0.1"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label> מחיר ($):</label>
                        <input
                            type="number"
                            name="Price"
                            value={formData.Price}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="לדוגמה: 59017"
                            min="1"
                            step="0.01"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label> טווח נסיעה (ק"מ):</label>
                        <input
                            type="number"
                            name="Range"
                            value={formData.Range}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="לדוגמה: 435"
                            min="1"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label> מהירות מקסימלית (קמ"ש):</label>
                        <input
                            type="number"
                            name="Top_speed"
                            value={formData.Top_speed}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="לדוגמה: 217"
                            min="1"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label> תאוצה (שניות):</label>
                        <input
                            type="number"
                            step="0.1"
                            name="Acceleration"
                            value={formData.Acceleration}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="לדוגמה: 5.0"
                            min="0.1"
                        />
                    </div>
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="btn btn-success">
                         הוסף רכב
                    </button>
                    <button type="button" onClick={onCancel} className="btn btn-secondary">
                         ביטול
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CarForm;