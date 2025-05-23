import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Table, Card, Row, Col, Form } from 'react-bootstrap';

// Dummy report data
const rawData = {
  locationHistory: [
    { date: '2025-05-13', location: 'School', duration: '3h 20m' },
    { date: '2025-05-02', location: 'Home', duration: '14h 10m' },
    { date: '2025-05-03', location: 'Mall', duration: '2h 45m' },
    { date: '2025-04-13', location: 'Park', duration: '1h 05m' },
    { date: '2025-04-01', location: 'Grandma’s', duration: '5h 30m' },
  ],
  geofenceBreaches: [
    { date: '2025-05-13', breaches: 1 },
    { date: '2025-05-02', breaches: 0 },
    { date: '2025-05-03', breaches: 2 },
    { date: '2025-04-25', breaches: 10 },
    { date: '2025-04-10', breaches: 3 },
  ],
  deviceActivity: { online: 4, offline: 1 },
  notifications: [
    { type: 'danger', count: 3 },
    { type: 'login', count: 5 },
    { type: 'safe_entry', count: 8 },
  ],
};
const COLORS = ['#00C49F', '#FF8042', '#0088FE'];

const Report = () => {
  const [range, setRange] = useState('7'); // default to last 7 days

  // filter helper
  const filterByRange = (items) => {
    const now = new Date('2025-05-13');
    const cutoff = new Date(now);
    cutoff.setDate(now.getDate() - parseInt(range, 10));
    return items.filter(item => new Date(item.date) >= cutoff);
  };

  // memoized filtered data
  const data = useMemo(() => ({
    locationHistory: filterByRange(rawData.locationHistory),
    geofenceBreaches: filterByRange(rawData.geofenceBreaches),
    deviceActivity: rawData.deviceActivity,
    notifications: rawData.notifications,
  }), [range]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📊 Parental Eye Report Dashboard</h2>

      {/* Time‐Range Selector */}
      <Form.Group controlId="timeRange" className="mb-4 w-25 mx-auto">
        <Form.Label>Select Time Range:</Form.Label>
        <Form.Control
          as="select"
          value={range}
          onChange={e => setRange(e.target.value)}
        >
          <option value="1">Last 1 Day</option>
          <option value="7">Last 1 Week</option>
          <option value="30">Last 1 Month</option>
        </Form.Control>
      </Form.Group>

      <Row className="mb-4">
        {/* Device Status Pie Chart */}
        <Col md={6}>
          <Card className="p-3 text-center">
            <h5>Device Status</h5>
            <PieChart width={200} height={200}>
              <Pie
                data={[
                  { name: 'Online', value: data.deviceActivity.online },
                  { name: 'Offline', value: data.deviceActivity.offline },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
                dataKey="value"
              >
                <Cell fill="#00C49F" />
                <Cell fill="#FF6B6B" />
              </Pie>
              <Legend verticalAlign="bottom" />
            </PieChart>
          </Card>
        </Col>

        {/* Notification Summary Pie Chart */}
        <Col md={6}>
          <Card className="p-3 text-center">
            <h5>Notification Summary</h5>
            <PieChart width={200} height={200}>
              <Pie
                data={data.notifications}
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
                dataKey="count"
              >
                {data.notifications.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
            </PieChart>
          </Card>
        </Col>
      </Row>

      {/* Geofence Breach Chart */}
      <Card className="p-3 mb-4">
        <h5>📍 Geofence Breach History (Last {range} days)</h5>
        <BarChart width={600} height={250} data={data.geofenceBreaches}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="breaches" fill="#FF6B6B" />
        </BarChart>
      </Card>

      {/* Location History Table */}
      <Card className="p-3 mb-4">
        <h5>🗺️ Location History (Last {range} days)</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {data.locationHistory.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.date}</td>
                <td>{entry.location}</td>
                <td>{entry.duration}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Report;
