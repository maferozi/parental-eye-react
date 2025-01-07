import React, { useState } from 'react';

const DeviceManagement = () => {
    const [devices, setDevices] = useState([
        { id: 1, name: 'Device 1', status: 'Active' },
        { id: 2, name: 'Device 2', status: 'Inactive' },
    ]);

    const toggleDeviceStatus = (id) => {
        setDevices(devices.map(device => 
            device.id === id ? { ...device, status: device.status === 'Active' ? 'Inactive' : 'Active' } : device
        ));
    };

    return (
        <div>
            <h1>Device Management</h1>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>
                        {device.name} - {device.status}
                        <button onClick={() => toggleDeviceStatus(device.id)}>
                            Toggle Status
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeviceManagement;