
// import React, { useState, useEffect } from 'react';
// import { Container, Card, Table, Button } from 'react-bootstrap';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import warrantyService from '../services/warrantyService';

// const ExpiredWarranties = () => {
//     const [expiredWarranties, setExpiredWarranties] = useState([]);

//     useEffect(() => {
//         const fetchExpiredWarranties = async () => {
//             try {
//                 const data = await warrantyService.getExpiredWarranties();
//                 setExpiredWarranties(data);
//             } catch (error) {
//                 console.error('Error fetching expired warranties:', error);
//             }
//         };
//         fetchExpiredWarranties();
//     }, []);

//     const calculateDaysExpired = (expiryDate) => {
//         const today = new Date();
//         const expDate = new Date(expiryDate);
//         const diffTime = today.getTime() - expDate.getTime();
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         return diffDays > 0 ? diffDays : 0; // Return 0 if not yet expired
//     };

//     return (
//         <Container fluid className="p-3">
//             <h1 className="mb-4">Expired Warranties</h1>
//             <Card className="shadow-sm">
//                 <Card.Body>
//                     {expiredWarranties.length === 0 ? (
//                         <p className="text-center text-muted mb-0">No expired warranties found!</p>
//                     ) : (
//                         <Table responsive hover className="mb-0">
//                             <thead>
//                                 <tr>
//                                     <th>Product</th>
//                                     <th>Model</th>
//                                     <th>Purchase Date</th>
//                                     <th>Expiry Date</th>
//                                     <th>Days Expired</th>
//                                     <th>Store</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {expiredWarranties.map((warranty) => (
//                                     <tr key={warranty._id}>
//                                         <td>{warranty.productName}</td>
//                                         <td>{warranty.model || 'N/A'}</td>
//                                         <td>{new Date(warranty.purchaseDate).toLocaleDateString()}</td>
//                                         <td>{new Date(warranty.expiryDate).toLocaleDateString()}</td>
//                                         <td><span className="badge bg-danger">{calculateDaysExpired(warranty.expiryDate)} days</span></td>
//                                         <td>{warranty.storeName}</td>
//                                         <td>
//                                             <Button variant="outline-primary" size="sm" className="me-2" onClick={() => console.log('Edit', warranty._id)}>
//                                                 <FaEdit />
//                                             </Button>
//                                             <Button variant="outline-danger" size="sm" onClick={() => console.log('Delete', warranty._id)}>
//                                                 <FaTrash />
//                                             </Button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     )}
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default ExpiredWarranties;

import React, { useState, useEffect } from 'react';
import {
    Container,
    Card,
    Table,
    Button,
    Modal,
    Form
} from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import warrantyService from '../services/warrantyService';

const ExpiredWarranties = () => {
    const [expiredWarranties, setExpiredWarranties] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedWarrantyId, setSelectedWarrantyId] = useState(null);

    const [editFormData, setEditFormData] = useState({
        productName: '',
        storeName: '',
        purchaseDate: '',
        expiryDate: '',
        category: '',
        purchasePrice: '',
        serialNumber: '',
        description: '',
        notes: '',
    });

    useEffect(() => {
        fetchExpiredWarranties();
    }, []);

    const fetchExpiredWarranties = async () => {
        try {
            const data = await warrantyService.getExpiredWarranties();
            setExpiredWarranties(data);
        } catch (error) {
            console.error('Error fetching expired warranties:', error);
        }
    };

    const calculateDaysExpired = (expiryDate) => {
        const today = new Date();
        const expDate = new Date(expiryDate);
        const diffTime = today.getTime() - expDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this warranty?');
        if (!confirmDelete) return;

        try {
            await warrantyService.deleteWarranty(id);
            setExpiredWarranties((prev) => prev.filter((warranty) => warranty._id !== id));
            alert('Warranty deleted successfully!');
        } catch (error) {
            console.error('Error deleting warranty:', error);
            alert(error.response?.data?.msg || 'Failed to delete warranty');
        }
    };

    const handleEditClick = (warranty) => {
        setSelectedWarrantyId(warranty._id);
        setEditFormData({
            productName: warranty.productName || '',
            storeName: warranty.storeName || '',
            purchaseDate: formatDateForInput(warranty.purchaseDate),
            expiryDate: formatDateForInput(warranty.expiryDate),
            category: warranty.category || '',
            purchasePrice: warranty.purchasePrice || '',
            serialNumber: warranty.serialNumber || '',
            description: warranty.description || '',
            notes: warranty.notes || '',
        });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            await warrantyService.updateWarranty(selectedWarrantyId, editFormData);
            setShowEditModal(false);
            setSelectedWarrantyId(null);
            await fetchExpiredWarranties();
            alert('Warranty updated successfully!');
        } catch (error) {
            console.error('Error updating warranty:', error);
            alert(error.response?.data?.msg || 'Failed to update warranty');
        }
    };

    return (
        <Container fluid className="p-3">
            <h1 className="mb-4">Expired Warranties</h1>

            <Card className="shadow-sm">
                <Card.Body>
                    {expiredWarranties.length === 0 ? (
                        <p className="text-center text-muted mb-0">No expired warranties found!</p>
                    ) : (
                        <Table responsive hover className="mb-0">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Model</th>
                                    <th>Purchase Date</th>
                                    <th>Expiry Date</th>
                                    <th>Days Expired</th>
                                    <th>Store</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expiredWarranties.map((warranty) => (
                                    <tr key={warranty._id}>
                                        <td>{warranty.productName}</td>
                                        <td>{warranty.model || 'N/A'}</td>
                                        <td>{new Date(warranty.purchaseDate).toLocaleDateString()}</td>
                                        <td>{new Date(warranty.expiryDate).toLocaleDateString()}</td>
                                        <td>
                                            <span className="badge bg-danger">
                                                {calculateDaysExpired(warranty.expiryDate)} days
                                            </span>
                                        </td>
                                        <td>{warranty.storeName}</td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleEditClick(warranty)}
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDelete(warranty._id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Expired Warranty</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="productName"
                                value={editFormData.productName}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Store Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="storeName"
                                value={editFormData.storeName}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Purchase Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="purchaseDate"
                                value={editFormData.purchaseDate}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="expiryDate"
                                value={editFormData.expiryDate}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={editFormData.category}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Purchase Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="purchasePrice"
                                value={editFormData.purchasePrice}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Serial Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="serialNumber"
                                value={editFormData.serialNumber}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="description"
                                value={editFormData.description}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="notes"
                                value={editFormData.notes}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default ExpiredWarranties;