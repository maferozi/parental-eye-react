import React, { useState } from 'react';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState('');

    const handleAddNotification = () => {
        if (newNotification.trim()) {
            setNotifications([...notifications, newNotification]);
            setNewNotification('');
        }
    };

    const handleRemoveNotification = (index) => {
        const updatedNotifications = notifications.filter((_, i) => i !== index);
        setNotifications(updatedNotifications);
    };

    return (
        <div>
            <h2>Notification Management</h2>
            <input
                type="text"
                value={newNotification}
                onChange={(e) => setNewNotification(e.target.value)}
                placeholder="Enter new notification"
            />
            <button onClick={handleAddNotification}>Add Notification</button>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        {notification}
                        <button onClick={() => handleRemoveNotification(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;