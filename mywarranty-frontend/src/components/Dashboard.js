
// // import React, { useState, useEffect } from 'react';
// // import {
// //     Container,
// //     Row,
// //     Col,
// //     Card,
// //     Table,
// //     Button,
// //     Badge,
// //     Modal,
// //     Form
// // } from 'react-bootstrap';
// // import { FaEdit, FaTrash } from 'react-icons/fa';
// // import warrantyService from '../services/warrantyService';

// // const Dashboard = () => {
// //     const [activeWarranties, setActiveWarranties] = useState([]);
// //     const [upcomingExpires, setUpcomingExpires] = useState([]);
// //     const [reminders, setReminders] = useState([]);
// //     const [user, setUser] = useState(null);

// //     const [showEditModal, setShowEditModal] = useState(false);
// //     const [selectedWarrantyId, setSelectedWarrantyId] = useState(null);
// //     const [editFormData, setEditFormData] = useState({
// //         productName: '',
// //         storeName: '',
// //         purchaseDate: '',
// //         expiryDate: '',
// //         category: '',
// //         purchasePrice: '',
// //         serialNumber: '',
// //         description: '',
// //         notes: '',
// //     });

// //     useEffect(() => {
// //         const storedUser = JSON.parse(localStorage.getItem("user"));
// //         setUser(storedUser);
// //         fetchWarranties();
// //     }, []);

// //     const fetchWarranties = async () => {
// //         try {
// //             const allWarranties = await warrantyService.getWarranties();
// //             const today = new Date();

// //             const active = allWarranties.filter(
// //                 (warranty) => new Date(warranty.expiryDate) >= today
// //             );
// //             setActiveWarranties(active);

// //             const upcoming = active.filter((warranty) => {
// //                 const diffDays = getDaysLeft(warranty.expiryDate);
// //                 return diffDays <= 90 && diffDays >= 0;
// //             });
// //             setUpcomingExpires(upcoming);

// //             const reminderData = allWarranties
// //                 .map((warranty) => {
// //                     const daysLeft = getDaysLeft(warranty.expiryDate);

// //                     let type = '';
// //                     let message = '';

// //                     if (daysLeft < 0) {
// //                         type = 'expired';
// //                         message = `${warranty.productName} warranty expired ${Math.abs(daysLeft)} day(s) ago`;
// //                     } else if (daysLeft <= 3) {
// //                         type = 'urgent';
// //                         message = `${warranty.productName} expires in ${daysLeft} day(s)`;
// //                     } else if (daysLeft <= 15) {
// //                         type = 'medium';
// //                         message = `${warranty.productName} expires soon in ${daysLeft} day(s)`;
// //                     } else {
// //                         return null;
// //                     }

// //                     return {
// //                         id: warranty._id,
// //                         productName: warranty.productName,
// //                         daysLeft,
// //                         expiryDate: warranty.expiryDate,
// //                         storeName: warranty.storeName,
// //                         type,
// //                         message,
// //                     };
// //                 })
// //                 .filter(Boolean)
// //                 .sort((a, b) => a.daysLeft - b.daysLeft);

// //             setReminders(reminderData);
// //         } catch (error) {
// //             console.error('Error fetching warranties:', error);
// //         }
// //     };

// //     const getDaysLeft = (expiryDate) => {
// //         const today = new Date();
// //         const expDate = new Date(expiryDate);
// //         const diffTime = expDate.getTime() - today.getTime();
// //         return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
// //     };

// //     const calculateDaysLeft = (expiryDate) => {
// //         const daysLeft = getDaysLeft(expiryDate);
// //         return daysLeft > 0 ? daysLeft : 0;
// //     };

// //     const getReminderBadge = (type) => {
// //         if (type === 'urgent') return <Badge bg="danger">Urgent</Badge>;
// //         if (type === 'medium') return <Badge bg="warning" text="dark">Medium</Badge>;
// //         if (type === 'expired') return <Badge bg="dark">Expired</Badge>;
// //         return <Badge bg="secondary">Info</Badge>;
// //     };

// //     const handleDelete = async (id) => {
// //         const confirmDelete = window.confirm("Are you sure you want to delete this warranty?");
// //         if (!confirmDelete) return;

// //         try {
// //             await warrantyService.deleteWarranty(id);

// //             setActiveWarranties((prev) =>
// //                 prev.filter((warranty) => warranty._id !== id)
// //             );

// //             setUpcomingExpires((prev) =>
// //                 prev.filter((warranty) => warranty._id !== id)
// //             );

// //             setReminders((prev) =>
// //                 prev.filter((reminder) => reminder.id !== id)
// //             );

// //             alert("Warranty deleted successfully!");
// //         } catch (error) {
// //             console.error("Error deleting warranty:", error);
// //             alert(error.response?.data?.msg || "Failed to delete warranty");
// //         }
// //     };

// //     const formatDateForInput = (dateString) => {
// //         if (!dateString) return '';
// //         return new Date(dateString).toISOString().split('T')[0];
// //     };

// //     const handleEditClick = (warranty) => {
// //         setSelectedWarrantyId(warranty._id);
// //         setEditFormData({
// //             productName: warranty.productName || '',
// //             storeName: warranty.storeName || '',
// //             purchaseDate: formatDateForInput(warranty.purchaseDate),
// //             expiryDate: formatDateForInput(warranty.expiryDate),
// //             category: warranty.category || '',
// //             purchasePrice: warranty.purchasePrice || '',
// //             serialNumber: warranty.serialNumber || '',
// //             description: warranty.description || '',
// //             notes: warranty.notes || '',
// //         });
// //         setShowEditModal(true);
// //     };

// //     const handleEditChange = (e) => {
// //         const { name, value } = e.target;
// //         setEditFormData((prev) => ({
// //             ...prev,
// //             [name]: value,
// //         }));
// //     };

// //     const handleEditSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //             await warrantyService.updateWarranty(selectedWarrantyId, editFormData);
// //             setShowEditModal(false);
// //             setSelectedWarrantyId(null);
// //             await fetchWarranties();
// //             alert("Warranty updated successfully!");
// //         } catch (error) {
// //             console.error("Error updating warranty:", error);
// //             alert(error.response?.data?.msg || "Failed to update warranty");
// //         }
// //     };

// //     return (
// //         <Container fluid className="p-3">
// //             <Row className="mb-4">
// //                 <Col md={12}>
// //                     <Card className="shadow-sm">
// //                         <Card.Body>
// //                             <h4 className="mb-3">Upcoming Expires</h4>
// //                             {upcomingExpires.length > 0 ? (
// //                                 <ul className="mb-0">
// //                                     {upcomingExpires.map((warranty) => (
// //                                         <li key={warranty._id}>
// //                                             <strong>{warranty.productName}</strong> expires in{' '}
// //                                             <strong>{calculateDaysLeft(warranty.expiryDate)}</strong> day(s)
// //                                         </li>
// //                                     ))}
// //                                 </ul>
// //                             ) : (
// //                                 <p className="text-muted mb-0">No warranties expiring soon</p>
// //                             )}
// //                         </Card.Body>
// //                     </Card>
// //                 </Col>
// //             </Row>

// //             <Row>
// //                 <Col md={8} className="mb-3">
// //                     <Card className="shadow-sm">
// //                         <Card.Body>
// //                             <h4 className="mb-3">Active Warranties</h4>
// //                             {activeWarranties.length > 0 ? (
// //                                 <Table responsive hover className="mb-0">
// //                                     <thead>
// //                                         <tr>
// //                                             <th>Product</th>
// //                                             <th>Expiry Date</th>
// //                                             <th>Days Left</th>
// //                                             <th>Store</th>
// //                                             <th>Actions</th>
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {activeWarranties.map((warranty) => (
// //                                             <tr key={warranty._id}>
// //                                                 <td>{warranty.productName}</td>
// //                                                 <td>{new Date(warranty.expiryDate).toLocaleDateString()}</td>
// //                                                 <td>
// //                                                     <span className="badge bg-success">
// //                                                         {calculateDaysLeft(warranty.expiryDate)} day(s)
// //                                                     </span>
// //                                                 </td>
// //                                                 <td>{warranty.storeName}</td>
// //                                                 <td>
// //                                                     <Button
// //                                                         variant="outline-primary"
// //                                                         size="sm"
// //                                                         className="me-2"
// //                                                         onClick={() => handleEditClick(warranty)}
// //                                                     >
// //                                                         <FaEdit />
// //                                                     </Button>
// //                                                     <Button
// //                                                         variant="outline-danger"
// //                                                         size="sm"
// //                                                         onClick={() => handleDelete(warranty._id)}
// //                                                     >
// //                                                         <FaTrash />
// //                                                     </Button>
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                     </tbody>
// //                                 </Table>
// //                             ) : (
// //                                 <p className="text-muted mb-0">No active warranties found</p>
// //                             )}
// //                         </Card.Body>
// //                     </Card>
// //                 </Col>

// //                 <Col md={4} className="mb-3">
// //                     <Card className="shadow-sm">
// //                         <Card.Body>
// //                             <h4 className="mb-3">Reminders</h4>

// //                             {reminders.length > 0 ? (
// //                                 <div>
// //                                     {reminders.map((reminder) => (
// //                                         <div
// //                                             key={reminder.id}
// //                                             className="d-flex justify-content-between align-items-start border rounded p-2 mb-2"
// //                                         >
// //                                             <div>
// //                                                 <div className="fw-semibold">{reminder.productName}</div>
// //                                                 <div className="text-muted small">{reminder.message}</div>
// //                                                 <div className="small text-secondary">
// //                                                     Expiry: {new Date(reminder.expiryDate).toLocaleDateString()}
// //                                                 </div>
// //                                             </div>
// //                                             <div>{getReminderBadge(reminder.type)}</div>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             ) : (
// //                                 <p className="text-muted mb-0">No alerts</p>
// //                             )}
// //                         </Card.Body>
// //                     </Card>
// //                 </Col>
// //             </Row>

// //             <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
// //                 <Modal.Header closeButton>
// //                     <Modal.Title>Edit Warranty</Modal.Title>
// //                 </Modal.Header>
// //                 <Form onSubmit={handleEditSubmit}>
// //                     <Modal.Body>
// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Product Name</Form.Label>
// //                             <Form.Control
// //                                 type="text"
// //                                 name="productName"
// //                                 value={editFormData.productName}
// //                                 onChange={handleEditChange}
// //                                 required
// //                             />
// //                         </Form.Group>

// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Store Name</Form.Label>
// //                             <Form.Control
// //                                 type="text"
// //                                 name="storeName"
// //                                 value={editFormData.storeName}
// //                                 onChange={handleEditChange}
// //                             />
// //                         </Form.Group>

// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Purchase Date</Form.Label>
// //                             <Form.Control
// //                                 type="date"
// //                                 name="purchaseDate"
// //                                 value={editFormData.purchaseDate}
// //                                 onChange={handleEditChange}
// //                             />
// //                         </Form.Group>

// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Expiry Date</Form.Label>
// //                             <Form.Control
// //                                 type="date"
// //                                 name="expiryDate"
// //                                 value={editFormData.expiryDate}
// //                                 onChange={handleEditChange}
// //                                 required
// //                             />
// //                         </Form.Group>

// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Category</Form.Label>
// //                             <Form.Control
// //                                 type="text"
// //                                 name="category"
// //                                 value={editFormData.category}
// //                                 onChange={handleEditChange}
// //                             />
// //                         </Form.Group>

// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Purchase Price</Form.Label>
// //                             <Form.Control
// //                                 type="number"
// //                                 name="purchasePrice"
// //                                 value={editFormData.purchasePrice}
// //                                 onChange={handleEditChange}
// //                             />
// //                         </Form.Group>

// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Serial Number</Form.Label>
// //                             <Form.Control
// //                                 type="text"
// //                                 name="serialNumber"
// //                                 value={editFormData.serialNumber}
// //                                 onChange={handleEditChange}
// //                             />
// //                         </Form.Group>

// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Description</Form.Label>
// //                             <Form.Control
// //                                 as="textarea"
// //                                 rows={2}
// //                                 name="description"
// //                                 value={editFormData.description}
// //                                 onChange={handleEditChange}
// //                             />
// //                         </Form.Group>

// //                         <Form.Group className="mb-3">
// //                             <Form.Label>Notes</Form.Label>
// //                             <Form.Control
// //                                 as="textarea"
// //                                 rows={2}
// //                                 name="notes"
// //                                 value={editFormData.notes}
// //                                 onChange={handleEditChange}
// //                             />
// //                         </Form.Group>
// //                     </Modal.Body>

// //                     <Modal.Footer>
// //                         <Button variant="secondary" onClick={() => setShowEditModal(false)}>
// //                             Cancel
// //                         </Button>
// //                         <Button variant="primary" type="submit">
// //                             Save Changes
// //                         </Button>
// //                     </Modal.Footer>
// //                 </Form>
// //             </Modal>
// //         </Container>
// //     );
// // };

// // export default Dashboard;
// import React, { useState, useEffect } from 'react';
// import {
//     Container,
//     Row,
//     Col,
//     Card,
//     Table,
//     Button,
//     Badge,
//     Modal,
//     Form
// } from 'react-bootstrap';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import warrantyService from '../services/warrantyService';

// const Dashboard = () => {
//     const [activeWarranties, setActiveWarranties] = useState([]);
//     const [upcomingExpires, setUpcomingExpires] = useState([]);
//     const [reminders, setReminders] = useState([]);
//     const [user, setUser] = useState(null);

//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedWarrantyId, setSelectedWarrantyId] = useState(null);
//     const [editFormData, setEditFormData] = useState({
//         productName: '',
//         storeName: '',
//         purchaseDate: '',
//         expiryDate: '',
//         category: '',
//         purchasePrice: '',
//         serialNumber: '',
//         description: '',
//         notes: '',
//         imageUrl: '',
//     });

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         setUser(storedUser);
//         fetchWarranties();
//     }, []);

//     const fetchWarranties = async () => {
//         try {
//             const allWarranties = await warrantyService.getWarranties();
//             const today = new Date();

//             const active = allWarranties.filter(
//                 (warranty) => new Date(warranty.expiryDate) >= today
//             );
//             setActiveWarranties(active);

//             const upcoming = active.filter((warranty) => {
//                 const diffDays = getDaysLeft(warranty.expiryDate);
//                 return diffDays <= 90 && diffDays >= 0;
//             });
//             setUpcomingExpires(upcoming);

//             const reminderData = allWarranties
//                 .map((warranty) => {
//                     const daysLeft = getDaysLeft(warranty.expiryDate);

//                     let type = '';
//                     let message = '';

//                     if (daysLeft < 0) {
//                         type = 'expired';
//                         message = `${warranty.productName} warranty expired ${Math.abs(daysLeft)} day(s) ago`;
//                     } else if (daysLeft <= 3) {
//                         type = 'urgent';
//                         message = `${warranty.productName} expires in ${daysLeft} day(s)`;
//                     } else if (daysLeft <= 15) {
//                         type = 'medium';
//                         message = `${warranty.productName} expires soon in ${daysLeft} day(s)`;
//                     } else {
//                         return null;
//                     }

//                     return {
//                         id: warranty._id,
//                         productName: warranty.productName,
//                         daysLeft,
//                         expiryDate: warranty.expiryDate,
//                         storeName: warranty.storeName,
//                         type,
//                         message,
//                     };
//                 })
//                 .filter(Boolean)
//                 .sort((a, b) => a.daysLeft - b.daysLeft);

//             setReminders(reminderData);
//         } catch (error) {
//             console.error('Error fetching warranties:', error);
//         }
//     };

//     const getDaysLeft = (expiryDate) => {
//         const today = new Date();
//         const expDate = new Date(expiryDate);
//         const diffTime = expDate.getTime() - today.getTime();
//         return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     };

//     const calculateDaysLeft = (expiryDate) => {
//         const daysLeft = getDaysLeft(expiryDate);
//         return daysLeft > 0 ? daysLeft : 0;
//     };

//     const getReminderBadge = (type) => {
//         if (type === 'urgent') return <Badge bg="danger">Urgent</Badge>;
//         if (type === 'medium') return <Badge bg="warning" text="dark">Medium</Badge>;
//         if (type === 'expired') return <Badge bg="dark">Expired</Badge>;
//         return <Badge bg="secondary">Info</Badge>;
//     };

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this warranty?");
//         if (!confirmDelete) return;

//         try {
//             await warrantyService.deleteWarranty(id);

//             setActiveWarranties((prev) =>
//                 prev.filter((warranty) => warranty._id !== id)
//             );

//             setUpcomingExpires((prev) =>
//                 prev.filter((warranty) => warranty._id !== id)
//             );

//             setReminders((prev) =>
//                 prev.filter((reminder) => reminder.id !== id)
//             );

//             alert("Warranty deleted successfully!");
//         } catch (error) {
//             console.error("Error deleting warranty:", error);
//             alert(error.response?.data?.msg || "Failed to delete warranty");
//         }
//     };

//     const formatDateForInput = (dateString) => {
//         if (!dateString) return '';
//         return new Date(dateString).toISOString().split('T')[0];
//     };

//     const handleEditClick = (warranty) => {
//         setSelectedWarrantyId(warranty._id);
//         setEditFormData({
//             productName: warranty.productName || '',
//             storeName: warranty.storeName || '',
//             purchaseDate: formatDateForInput(warranty.purchaseDate),
//             expiryDate: formatDateForInput(warranty.expiryDate),
//             category: warranty.category || '',
//             purchasePrice: warranty.purchasePrice || '',
//             serialNumber: warranty.serialNumber || '',
//             description: warranty.description || '',
//             notes: warranty.notes || '',
//             imageUrl: warranty.imageUrl || '',
//         });
//         setShowEditModal(true);
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleEditSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await warrantyService.updateWarranty(selectedWarrantyId, editFormData);
//             setShowEditModal(false);
//             setSelectedWarrantyId(null);
//             await fetchWarranties();
//             alert("Warranty updated successfully!");
//         } catch (error) {
//             console.error("Error updating warranty:", error);
//             alert(error.response?.data?.msg || "Failed to update warranty");
//         }
//     };

//     return (
//         <Container fluid className="p-3">
//             <Row className="mb-4">
//                 <Col md={12}>
//                     <Card className="shadow-sm">
//                         <Card.Body>
//                             <h4 className="mb-3">Upcoming Expires</h4>
//                             {upcomingExpires.length > 0 ? (
//                                 <ul className="mb-0">
//                                     {upcomingExpires.map((warranty) => (
//                                         <li key={warranty._id}>
//                                             <strong>{warranty.productName}</strong> expires in{' '}
//                                             <strong>{calculateDaysLeft(warranty.expiryDate)}</strong> day(s)
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p className="text-muted mb-0">No warranties expiring soon</p>
//                             )}
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>

//             <Row>
//                 <Col md={8} className="mb-3">
//                     <Card className="shadow-sm">
//                         <Card.Body>
//                             <h4 className="mb-3">Active Warranties</h4>
//                             {activeWarranties.length > 0 ? (
//                                 <Table responsive hover className="mb-0">
//                                     <thead>
//                                         <tr>
//                                             <th>Image</th>
//                                             <th>Product</th>
//                                             <th>Expiry Date</th>
//                                             <th>Days Left</th>
//                                             <th>Store</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {activeWarranties.map((warranty) => (
//                                             <tr key={warranty._id}>
//                                                 <td>
//                                                     {warranty.imageUrl ? (
//                                                         <img
//                                                             src={`http://localhost:5000${warranty.imageUrl}`}
//                                                             alt={warranty.productName}
//                                                             style={{
//                                                                 width: '55px',
//                                                                 height: '55px',
//                                                                 objectFit: 'cover',
//                                                                 borderRadius: '8px',
//                                                                 border: '1px solid #ddd',
//                                                             }}
//                                                         />
//                                                     ) : (
//                                                         <span className="text-muted small">No image</span>
//                                                     )}
//                                                 </td>
//                                                 <td>{warranty.productName}</td>
//                                                 <td>{new Date(warranty.expiryDate).toLocaleDateString()}</td>
//                                                 <td>
//                                                     <span className="badge bg-success">
//                                                         {calculateDaysLeft(warranty.expiryDate)} day(s)
//                                                     </span>
//                                                 </td>
//                                                 <td>{warranty.storeName}</td>
//                                                 <td>
//                                                     <Button
//                                                         variant="outline-primary"
//                                                         size="sm"
//                                                         className="me-2"
//                                                         onClick={() => handleEditClick(warranty)}
//                                                     >
//                                                         <FaEdit />
//                                                     </Button>
//                                                     <Button
//                                                         variant="outline-danger"
//                                                         size="sm"
//                                                         onClick={() => handleDelete(warranty._id)}
//                                                     >
//                                                         <FaTrash />
//                                                     </Button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             ) : (
//                                 <p className="text-muted mb-0">No active warranties found</p>
//                             )}
//                         </Card.Body>
//                     </Card>
//                 </Col>

//                 <Col md={4} className="mb-3">
//                     <Card className="shadow-sm">
//                         <Card.Body>
//                             <h4 className="mb-3">Reminders</h4>

//                             {reminders.length > 0 ? (
//                                 <div>
//                                     {reminders.map((reminder) => (
//                                         <div
//                                             key={reminder.id}
//                                             className="d-flex justify-content-between align-items-start border rounded p-2 mb-2"
//                                         >
//                                             <div>
//                                                 <div className="fw-semibold">{reminder.productName}</div>
//                                                 <div className="text-muted small">{reminder.message}</div>
//                                                 <div className="small text-secondary">
//                                                     Expiry: {new Date(reminder.expiryDate).toLocaleDateString()}
//                                                 </div>
//                                             </div>
//                                             <div>{getReminderBadge(reminder.type)}</div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <p className="text-muted mb-0">No alerts</p>
//                             )}
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>

//             <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Edit Warranty</Modal.Title>
//                 </Modal.Header>
//                 <Form onSubmit={handleEditSubmit}>
//                     <Modal.Body>
//                         {editFormData.imageUrl && (
//                             <div className="text-center mb-3">
//                                 <img
//                                     src={`http://localhost:5000${editFormData.imageUrl}`}
//                                     alt="Warranty Preview"
//                                     style={{
//                                         width: '140px',
//                                         height: '140px',
//                                         objectFit: 'cover',
//                                         borderRadius: '10px',
//                                         border: '1px solid #ddd',
//                                     }}
//                                 />
//                             </div>
//                         )}

//                         <Form.Group className="mb-3">
//                             <Form.Label>Product Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="productName"
//                                 value={editFormData.productName}
//                                 onChange={handleEditChange}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Store Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="storeName"
//                                 value={editFormData.storeName}
//                                 onChange={handleEditChange}
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Purchase Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 name="purchaseDate"
//                                 value={editFormData.purchaseDate}
//                                 onChange={handleEditChange}
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Expiry Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 name="expiryDate"
//                                 value={editFormData.expiryDate}
//                                 onChange={handleEditChange}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Category</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="category"
//                                 value={editFormData.category}
//                                 onChange={handleEditChange}
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Purchase Price</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="purchasePrice"
//                                 value={editFormData.purchasePrice}
//                                 onChange={handleEditChange}
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Serial Number</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="serialNumber"
//                                 value={editFormData.serialNumber}
//                                 onChange={handleEditChange}
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={2}
//                                 name="description"
//                                 value={editFormData.description}
//                                 onChange={handleEditChange}
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Notes</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={2}
//                                 name="notes"
//                                 value={editFormData.notes}
//                                 onChange={handleEditChange}
//                             />
//                         </Form.Group>
//                     </Modal.Body>

//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//                             Cancel
//                         </Button>
//                         <Button variant="primary" type="submit">
//                             Save Changes
//                         </Button>
//                     </Modal.Footer>
//                 </Form>
//             </Modal>
//         </Container>
//     );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Button,
    Badge,
    Modal,
    Form
} from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import warrantyService from '../services/warrantyService';

const Dashboard = () => {
    const [activeWarranties, setActiveWarranties] = useState([]);
    const [upcomingExpires, setUpcomingExpires] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [user, setUser] = useState(null);

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
        imageUrl: '',
    });

    // NEW: image preview modal state
    const [previewImage, setPreviewImage] = useState(null);

    const BASE_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
        fetchWarranties();
    }, []);

    const fetchWarranties = async () => {
        try {
            const allWarranties = await warrantyService.getWarranties();
            const today = new Date();

            const active = allWarranties.filter(
                (warranty) => new Date(warranty.expiryDate) >= today
            );
            setActiveWarranties(active);

            const upcoming = active.filter((warranty) => {
                const diffDays = getDaysLeft(warranty.expiryDate);
                return diffDays <= 90 && diffDays >= 0;
            });
            setUpcomingExpires(upcoming);

            const reminderData = allWarranties
                .map((warranty) => {
                    const daysLeft = getDaysLeft(warranty.expiryDate);

                    let type = '';
                    let message = '';

                    if (daysLeft < 0) {
                        type = 'expired';
                        message = `${warranty.productName} warranty expired ${Math.abs(daysLeft)} day(s) ago`;
                    } else if (daysLeft <= 3) {
                        type = 'urgent';
                        message = `${warranty.productName} expires in ${daysLeft} day(s)`;
                    } else if (daysLeft <= 15) {
                        type = 'medium';
                        message = `${warranty.productName} expires soon in ${daysLeft} day(s)`;
                    } else {
                        return null;
                    }

                    return {
                        id: warranty._id,
                        productName: warranty.productName,
                        daysLeft,
                        expiryDate: warranty.expiryDate,
                        storeName: warranty.storeName,
                        type,
                        message,
                    };
                })
                .filter(Boolean)
                .sort((a, b) => a.daysLeft - b.daysLeft);

            setReminders(reminderData);
        } catch (error) {
            console.error('Error fetching warranties:', error);
        }
    };

    const getDaysLeft = (expiryDate) => {
        const today = new Date();
        const expDate = new Date(expiryDate);
        const diffTime = expDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateDaysLeft = (expiryDate) => {
        const daysLeft = getDaysLeft(expiryDate);
        return daysLeft > 0 ? daysLeft : 0;
    };

    const getReminderBadge = (type) => {
        if (type === 'urgent') return <Badge bg="danger">Urgent</Badge>;
        if (type === 'medium') return <Badge bg="warning" text="dark">Medium</Badge>;
        if (type === 'expired') return <Badge bg="dark">Expired</Badge>;
        return <Badge bg="secondary">Info</Badge>;
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this warranty?");
        if (!confirmDelete) return;

        try {
            await warrantyService.deleteWarranty(id);

            setActiveWarranties((prev) =>
                prev.filter((warranty) => warranty._id !== id)
            );

            setUpcomingExpires((prev) =>
                prev.filter((warranty) => warranty._id !== id)
            );

            setReminders((prev) =>
                prev.filter((reminder) => reminder.id !== id)
            );

            alert("Warranty deleted successfully!");
        } catch (error) {
            console.error("Error deleting warranty:", error);
            alert(error.response?.data?.msg || "Failed to delete warranty");
        }
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
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
            imageUrl: warranty.imageUrl || '',
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
            await fetchWarranties();
            alert("Warranty updated successfully!");
        } catch (error) {
            console.error("Error updating warranty:", error);
            alert(error.response?.data?.msg || "Failed to update warranty");
        }
    };

    const openImagePreview = (imageUrl) => {
        setPreviewImage(`${BASE_URL}${imageUrl}`);
    };

    const closeImagePreview = () => {
        setPreviewImage(null);
    };

    return (
        <Container fluid className="p-3">
            <Row className="mb-4">
                <Col md={12}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4 className="mb-3">Upcoming Expires</h4>
                            {upcomingExpires.length > 0 ? (
                                <ul className="mb-0">
                                    {upcomingExpires.map((warranty) => (
                                        <li key={warranty._id}>
                                            <strong>{warranty.productName}</strong> expires in{' '}
                                            <strong>{calculateDaysLeft(warranty.expiryDate)}</strong> day(s)
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted mb-0">No warranties expiring soon</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={8} className="mb-3">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4 className="mb-3">Active Warranties</h4>
                            {activeWarranties.length > 0 ? (
                                <Table responsive hover className="mb-0">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th>Expiry Date</th>
                                            <th>Days Left</th>
                                            <th>Store</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeWarranties.map((warranty) => (
                                            <tr key={warranty._id}>
                                                <td>
                                                    {warranty.imageUrl ? (
                                                        <img
                                                            src={warranty.imageUrl} alt={warranty.productName} 
                                                            onClick={() => setPreviewImage(warranty.imageUrl)}
                                                            style={{
                                                                width: '55px',
                                                                height: '55px',
                                                                objectFit: 'cover',
                                                                borderRadius: '8px',
                                                                border: '1px solid #ddd',
                                                                cursor: 'pointer',
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-muted small">No image</span>
                                                    )}
                                                </td>
                                                <td>{warranty.productName}</td>
                                                <td>{new Date(warranty.expiryDate).toLocaleDateString()}</td>
                                                <td>
                                                    <span className="badge bg-success">
                                                        {calculateDaysLeft(warranty.expiryDate)} day(s)
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
                            ) : (
                                <p className="text-muted mb-0">No active warranties found</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} className="mb-3">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4 className="mb-3">Reminders</h4>

                            {reminders.length > 0 ? (
                                <div>
                                    {reminders.map((reminder) => (
                                        <div
                                            key={reminder.id}
                                            className="d-flex justify-content-between align-items-start border rounded p-2 mb-2"
                                        >
                                            <div>
                                                <div className="fw-semibold">{reminder.productName}</div>
                                                <div className="text-muted small">{reminder.message}</div>
                                                <div className="small text-secondary">
                                                    Expiry: {new Date(reminder.expiryDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div>{getReminderBadge(reminder.type)}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted mb-0">No alerts</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Warranty</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        {editFormData.imageUrl && (
                            <div className="text-center mb-3">
                                <img
                                    src={`${BASE_URL}${editFormData.imageUrl}`}
                                    alt="Warranty Preview"
                                    onClick={() => openImagePreview(editFormData.imageUrl)}
                                    style={{
                                        width: '140px',
                                        height: '140px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>
                        )}

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

            {/* NEW: Full image preview modal */}
            <Modal show={!!previewImage} onHide={closeImagePreview} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                objectFit: 'contain',
                                borderRadius: '10px',
                            }}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Dashboard;