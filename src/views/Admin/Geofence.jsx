import React from 'react';
import { Table } from 'reactstrap';

const GeofenceTable = () => {
    const geofences = [
        { id: 1, name: 'Geofence 1', latitude: '40.7128', longitude: '-74.0060', radius: '100m' },
        { id: 2, name: 'Geofence 2', latitude: '34.0522', longitude: '-118.2437', radius: '200m' },
        { id: 3, name: 'Geofence 3', latitude: '51.5074', longitude: '-0.1278', radius: '150m' },
    ];

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Radius</th>
                </tr>
            </thead>
            <tbody>
                {geofences.map((geofence) => (
                    <tr key={geofence.id}>
                        <td>{geofence.id}</td>
                        <td>{geofence.name}</td>
                        <td>{geofence.latitude}</td>
                        <td>{geofence.longitude}</td>
                        <td>{geofence.radius}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default GeofenceTable;