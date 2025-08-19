import React, { useState, useMemo } from 'react';

// רכיב להצגת טבלת הרכבים עם חיפוש מתקדם ומיון
const CarTable = ({ cars, onEdit, onDelete }) => {
    // מצבי החיפוש והסינון
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRange, setMinRange] = useState('');
    const [minEfficiency, setMinEfficiency] = useState('');
    
    // מצבי המיון
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    // פילטור והמיון של הרכבים
    const filteredAndSortedCars = useMemo(() => {
        // תחילה מפלטרים
        let filtered = cars.filter(car => {
            const matchesName = car.Car_name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMinPrice = !minPrice || car.Price >= parseFloat(minPrice);
            const matchesMaxPrice = !maxPrice || car.Price <= parseFloat(maxPrice);
            const matchesRange = !minRange || car.Range >= parseInt(minRange);
            const matchesEfficiency = !minEfficiency || car.Efficiency >= parseInt(minEfficiency);
            
            return matchesName && matchesMinPrice && matchesMaxPrice && matchesRange && matchesEfficiency;
        });

        // אחר כך ממיינים
        if (sortField) {
            filtered.sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];
                
                // אם זה שם רכב, מיון אלפביתי
                if (sortField === 'Car_name') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                    return sortDirection === 'asc' 
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }
                
                // אם זה מספר, מיון מספרי
                aValue = parseFloat(aValue) || 0;
                bValue = parseFloat(bValue) || 0;
                
                return sortDirection === 'asc' 
                    ? aValue - bValue 
                    : bValue - aValue;
            });
        }

        return filtered;
    }, [cars, searchTerm, minPrice, maxPrice, minRange, minEfficiency, sortField, sortDirection]);

    // פונקציה לטיפול במיון
    const handleSort = (field) => {
        if (sortField === field) {
            // אם לוחצים על אותה עמודה, משנים כיוון
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // אם לוחצים על עמודה חדשה, מתחילים עם asc
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // איפוס כל הפילטרים והמיון
    const resetFilters = () => {
        setSearchTerm('');
        setMinPrice('');
        setMaxPrice('');
        setMinRange('');
        setMinEfficiency('');
        setSortField('');
        setSortDirection('asc');
    };

    // פונקציה להצגת חץ המיון
    const getSortIcon = (field) => {
        if (sortField !== field) return ' ↕';
        return sortDirection === 'asc' ? ' ↑' : ' ↓';
    };

    // פורמט למחיר עם פסיקים
    const formatPrice = (price) => {
        return new Intl.NumberFormat('he-IL').format(price);
    };

    // פורמט למהירות עם יחידות
    const formatSpeed = (speed) => {
        return `${speed} קמ"ש`;
    };

    // פורמט לטווח עם יחידות
    const formatRange = (range) => {
        return `${range} ק"מ`;
    };

    // פורמט לתאוצה עם יחידות
    const formatAcceleration = (acceleration) => {
        return `${acceleration} שניות`;
    };

    return (
        <div className="table-container">
            <h2 className="table-title">רשימת רכבים חשמליים</h2>
            
            {/* אזור החיפוש והסינון */}
            <div className="search-container">
                <h3 className="search-title">חיפוש וסינון מתקדם</h3>
                
                <div className="search-grid">
                    {/* חיפוש לפי שם */}
                    <div className="search-group">
                        <label>חיפוש לפי שם:</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="הכנס שם רכב..."
                            className="search-input"
                        />
                    </div>
                    
                    {/* סינון לפי מחיר מינימלי */}
                    <div className="search-group">
                        <label>מחיר מינימלי:</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="לדוגמה: 30000"
                            className="search-input"
                            min="0"
                        />
                    </div>
                    
                    {/* סינון לפי מחיר מקסימלי */}
                    <div className="search-group">
                        <label>מחיר מקסימלי:</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="לדוגמה: 80000"
                            className="search-input"
                            min="0"
                        />
                    </div>
                    
                    {/* סינון לפי טווח נסיעה מינימלי */}
                    <div className="search-group">
                        <label>טווח מינימלי (ק"מ):</label>
                        <input
                            type="number"
                            value={minRange}
                            onChange={(e) => setMinRange(e.target.value)}
                            placeholder="לדוגמה: 300"
                            className="search-input"
                            min="0"
                        />
                    </div>
                    
                    {/* סינון לפי יעילות מינימלית */}
                    <div className="search-group">
                        <label>יעילות מינימלית:</label>
                        <input
                            type="number"
                            value={minEfficiency}
                            onChange={(e) => setMinEfficiency(e.target.value)}
                            placeholder="לדוגמה: 150"
                            className="search-input"
                            min="0"
                        />
                    </div>
                </div>
                
                {/*כפתור איפוס */}
                <div className="search-actions">
                    <button 
                        onClick={resetFilters}
                        className="btn btn-secondary btn-small reset-btn"
                    >
                        נקה פילטרים ומיון
                    </button>
                </div>
                
                {/* הוראות מיון */}
                <div className="sort-instructions">
                    לחץ על כותרת עמודה כדי למיין את התוצאות
                </div>
                
                {/* סטטיסטיקות תוצאות */}
                <div className="search-stats">
                    {filteredAndSortedCars.length === cars.length ? (
                        <span>מציג {cars.length} רכבים</span>
                    ) : (
                        <span>
                            נמצאו {filteredAndSortedCars.length} רכבים מתוך {cars.length} 
                            {filteredAndSortedCars.length === 0 && ' - נסה להרחיב את קריטריוני החיפוש'}
                        </span>
                    )}
                    {sortField && (
                        <span className="sort-info">
                            | ממוין לפי: {getSortFieldName(sortField)} ({sortDirection === 'asc' ? 'עולה' : 'יורד'})
                        </span>
                    )}
                </div>
            </div>

            {/* טבלת התוצאות */}
            {filteredAndSortedCars.length === 0 ? (
                <div className="no-data">
                    <div className="no-data-icon">🔍</div>
                    <p>לא נמצאו רכבים התואמים לקריטריוני החיפוש</p>
                    <small>נסה להרחיב את תנאי החיפוש או לאפס את הפילטרים</small>
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table className="cars-table">
                        <thead>
                            <tr>
                                <th 
                                    onClick={() => handleSort('Car_name')}
                                    className="sortable-header"
                                    title="לחץ למיון לפי שם"
                                >
                                    שם הרכב{getSortIcon('Car_name')}
                                </th>
                                <th 
                                    onClick={() => handleSort('Efficiency')}
                                    className="sortable-header"
                                    title="לחץ למיון לפי יעילות"
                                >
                                    יעילות{getSortIcon('Efficiency')}
                                </th>
                                <th 
                                    onClick={() => handleSort('Fast_charge')}
                                    className="sortable-header"
                                    title="לחץ למיון לפי טעינה מהירה"
                                >
                                    טעינה מהירה{getSortIcon('Fast_charge')}
                                </th>
                                <th 
                                    onClick={() => handleSort('Price')}
                                    className="sortable-header"
                                    title="לחץ למיון לפי מחיר"
                                >
                                    מחיר ($){getSortIcon('Price')}
                                </th>
                                <th 
                                    onClick={() => handleSort('Range')}
                                    className="sortable-header"
                                    title="לחץ למיון לפי טווח נסיעה"
                                >
                                    טווח נסיעה{getSortIcon('Range')}
                                </th>
                                <th 
                                    onClick={() => handleSort('Top_speed')}
                                    className="sortable-header"
                                    title="לחץ למיון לפי מהירות מקסימלית"
                                >
                                    מהירות מקסימלית{getSortIcon('Top_speed')}
                                </th>
                                <th 
                                    onClick={() => handleSort('Acceleration')}
                                    className="sortable-header"
                                    title="לחץ למיון לפי תאוצה"
                                >
                                    תאוצה{getSortIcon('Acceleration')}
                                </th>
                                <th>פעולות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedCars.map((car, index) => {
                                // הדגשת הטקסט החפוש
                                const highlightedName = searchTerm && car.Car_name.toLowerCase().includes(searchTerm.toLowerCase())
                                    ? car.Car_name.replace(
                                        new RegExp(searchTerm, 'gi'),
                                        (match) => `<mark style="background-color: yellow; padding: 2px 4px; border-radius: 3px;">${match}</mark>`
                                    )
                                    : car.Car_name;

                                return (
                                    <tr key={car.rowid || index}>
                                        <td style={{ 
                                            fontWeight: '600', 
                                            color: '#2c3e50',
                                            textAlign: 'right',
                                            maxWidth: '200px',
                                            wordWrap: 'break-word'
                                        }}>
                                            <span dangerouslySetInnerHTML={{ __html: highlightedName }} />
                                        </td>
                                        <td>{car.Efficiency}</td>
                                        <td>{car.Fast_charge}</td>
                                        <td style={{ 
                                            fontWeight: '600',
                                            color: '#27ae60'
                                        }}>
                                            ${formatPrice(car.Price)}
                                        </td>
                                        <td>{formatRange(car.Range)}</td>
                                        <td>{formatSpeed(car.Top_speed)}</td>
                                        <td>{formatAcceleration(car.Acceleration)}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button 
                                                    className="btn btn-primary btn-small"
                                                    onClick={() => onEdit(car)}
                                                    title="ערוך רכב"
                                                >
                                                    ערוך
                                                </button>
                                                <button 
                                                    className="btn btn-danger btn-small"
                                                    onClick={() => onDelete(car.rowid)}
                                                    title="מחק רכב"
                                                >
                                                    מחק
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            
            {filteredAndSortedCars.length > 0 && (
                <div style={{ 
                    marginTop: '20px', 
                    textAlign: 'center', 
                    color: '#7f8c8d',
                    fontSize: '0.9rem'
                }}>
                    מציג {filteredAndSortedCars.length} מתוך {cars.length} רכבים
                </div>
            )}
        </div>
    );

    // פונקציה להמרת שם שדה לעברית
    function getSortFieldName(field) {
        const fieldNames = {
            'Car_name': 'שם הרכב',
            'Efficiency': 'יעילות',
            'Fast_charge': 'טעינה מהירה',
            'Price': 'מחיר',
            'Range': 'טווח נסיעה',
            'Top_speed': 'מהירות מקסימלית',
            'Acceleration': 'תאוצה'
        };
        return fieldNames[field] || field;
    }
};

export default CarTable;