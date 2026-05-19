// src/components/Spinner.js
import React from 'react';

function Spinner({ message = 'Loading...' }) {
    return (
        <div className="spinner-wrap flex-column gap-3">
            <div className="spinner"></div>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>{message}</p>
        </div>
    );
}

export default Spinner;