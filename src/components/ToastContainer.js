// src/components/ToastContainer.js
// Global toast notifications — managed via a simple module-level store
// so any component can call showToast() without context or props.

import React, { useState, useEffect } from 'react';

let listeners = [];

export function showToast(message, icon = '✅') {
    const id = Date.now() + Math.random();
    listeners.forEach((fn) => fn({ id, message, icon }));
}

function ToastContainer() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handler = (toast) => {
            setToasts((prev) => [...prev, toast]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== toast.id));
            }, 3000);
        };
        listeners.push(handler);
        return () => { listeners = listeners.filter((l) => l !== handler); };
    }, []);

    if (toasts.length === 0) return null;

    return (
        <div className="toast-container-custom">
            {toasts.map((toast) => (
                <div key={toast.id} className="toast-item">
                    <span className="toast-icon">{toast.icon}</span>
                    <span>{toast.message}</span>
                </div>
            ))}
        </div>
    );
}

export default ToastContainer;