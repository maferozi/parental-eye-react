import React, { useState } from "react";
import { Card, Table, Form, Dropdown } from "react-bootstrap";

export default function LocationHistory() {
    const [selectedDate, setSelectedDate] = useState("");

    const sampleData = [
        { id: 1, firstName: "John", lastName: "Doe", role: 4, status: 1, parentId: "P123", driverId: "D456" },
        { id: 2, firstName: "Jane", lastName: "Smith", role: 5, status: 2, parentId: "", driverId: "" },
    ];

    const renderRow = (item) => (
        <tr key={item.id} className="border-bottom">
            <td>{item.firstName} {item.lastName}</td>
            <td>{item.role === 4 ? "Child" : "Driver"}</td>
            <td className={`${item.status === 1 ? 'text-success' : 'text-warning'}`}>{item.status === 1 ? "Paired" : "Unpaired"}</td>
            <td>{item.role === 4 ? item.parentId || "" : ""}</td>
            <td>{item.role === 4 ? item.driverId || "" : ""}</td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="light">
                        <i className="ti ti-dots"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                        <Dropdown.Item className="text-warning">Update</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );

    return (
        <div className="container mt-4">
            <Card className="shadow-lg">
                <Card.Header>
                    <h4>Route History</h4>
                </Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Date:</Form.Label>
                        <Form.Control
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </Form.Group>
                    <Table className="table-borderless">
                        <thead>
                            <tr className="border-bottom">
                                <th>Name</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Guardian Id</th>
                                <th>Driver Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sampleData.length > 0 ? sampleData.map(renderRow) : (
                                <tr>
                                    <td colSpan="6" className="text-center border-bottom">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}
