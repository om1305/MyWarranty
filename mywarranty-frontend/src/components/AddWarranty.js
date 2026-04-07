// import React, { useState } from 'react';
// import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { FaUpload, FaTv, FaSnowflake, FaCar, FaFan, FaDolly, FaLaptop, FaMobileAlt, FaIndustry, FaTint, FaCog } from 'react-icons/fa';
// import warrantyService from '../services/warrantyService'; // Import warrantyService

// const AddWarranty = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         productName: '',
//         storeName: '',
//         purchaseDate: '',
//         expiryDate: '',
//         category: '',
//         purchasePrice: '',
//         serialNumber: '',
//         description: '',
//         notes: '',
//         // imageUrl: '',
//     });

//     const { productName, storeName, purchaseDate, expiryDate, category, purchasePrice, serialNumber, description, notes } = formData;

//     const onChange = (e) =>
//         setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleCategorySelect = (selectedCategory) => {
//         setFormData({ ...formData, category: selectedCategory });
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await warrantyService.addWarranty(formData);
//             alert('Warranty added successfully!');
//             navigate('/dashboard');
//         } catch (error) {
//             console.error('Failed to add warranty:', error.response.data.msg);
//             alert(error.response.data.msg || 'Failed to add warranty');
//         }
//     };

//     return (
//         <Container fluid className="p-3">
//             {/* <h1 className="mb-4">Add Warranty</h1> */}
//             <Row>
//                 <Col md={12} className="mb-4">
//                     <Card className="shadow-sm">
//                         <Card.Body>
//                             <h4 className="mb-3">Warranty Details</h4>
//                             <Form onSubmit={onSubmit}>
//                                 <Row>
//                                     <Col md={6} className="mb-3">
//                                         <Form.Group controlId="productName">
//                                             <Form.Label>Product Name *</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter product name"
//                                                 name="productName"
//                                                 value={productName}
//                                                 onChange={onChange}
//                                                 required
//                                                 style={{ borderRadius: '5px', borderColor: '#ddd' }}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={6} className="mb-3">
//                                         <Form.Group controlId="storeName">
//                                             <Form.Label>Store Name *</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter store name"
//                                                 name="storeName"
//                                                 value={storeName}
//                                                 onChange={onChange}
//                                                 required
//                                                 style={{ borderRadius: '5px', borderColor: '#ddd' }}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col md={6} className="mb-3">
//                                         <Form.Group controlId="purchaseDate">
//                                             <Form.Label>Purchase Date *</Form.Label>
//                                             <Form.Control
//                                                 type="date"
//                                                 name="purchaseDate"
//                                                 value={purchaseDate}
//                                                 onChange={onChange}
//                                                 required
//                                                 style={{ borderRadius: '5px', borderColor: '#ddd' }}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={6} className="mb-3">
//                                         <Form.Group controlId="expiryDate">
//                                             <Form.Label>Expiry Date *</Form.Label>
//                                             <Form.Control
//                                                 type="date"
//                                                 name="expiryDate"
//                                                 value={expiryDate}
//                                                 onChange={onChange}
//                                                 required
//                                                 style={{ borderRadius: '5px', borderColor: '#ddd' }}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col md={6} className="mb-3">
//                                         <Form.Group controlId="category">
//                                             <Form.Label>Category *</Form.Label>
//                                             <Form.Control
//                                                 as="select"
//                                                 name="category"
//                                                 value={category}
//                                                 onChange={onChange}
//                                                 required
//                                                 style={{ borderRadius: '5px', borderColor: '#ddd' }}
//                                             >
//                                                 <option value="">Select Category</option>
//                                                 <option value="Electronics">Electronics</option>
//                                                 <option value="Home Appliances">Home Appliances</option>
//                                                 <option value="Automotive">Automotive</option>
//                                                 <option value="Other">Other</option>
//                                             </Form.Control>
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={6} className="mb-3">
//                                         <Form.Group controlId="purchasePrice">
//                                             <Form.Label>Purchase Price</Form.Label>
//                                             <div className="input-group">
//                                                 <span className="input-group-text" style={{ borderRadius: '5px 0 0 5px', borderColor: '#ddd', backgroundColor: '#e9ecef' }}>₹</span>
//                                                 <Form.Control
//                                                     type="number"
//                                                     placeholder="Enter purchase price"
//                                                     name="purchasePrice"
//                                                     value={purchasePrice}
//                                                     onChange={onChange}
//                                                     style={{ borderRadius: '0 5px 5px 0', borderColor: '#ddd' }}
//                                                 />
//                                             </div>
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col md={6} className="mb-3">
//                                         <Form.Group controlId="serialNumber">
//                                             <Form.Label>Serial Number</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter serial number"
//                                                 name="serialNumber"
//                                                 value={serialNumber}
//                                                 onChange={onChange}
//                                                 style={{ borderRadius: '5px', borderColor: '#ddd' }}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={6} className="mb-3">
//                                         <Form.Group controlId="description">
//                                             <Form.Label>Description</Form.Label>
//                                             <Form.Control
//                                                 as="textarea"
//                                                 rows={3}
//                                                 placeholder="Brief description of the product"
//                                                 name="description"
//                                                 value={description}
//                                                 onChange={onChange}
//                                                 style={{ borderRadius: '5px', borderColor: '#ddd' }}
//                                             />
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>
//                                 <Form.Group controlId="notes" className="mb-4">
//                                     <Form.Label>Notes</Form.Label>
//                                     <Form.Control
//                                         as="textarea"
//                                         rows={3}
//                                         placeholder="Additional notes or comments"
//                                         name="notes"
//                                         value={notes}
//                                         onChange={onChange}
//                                         style={{ borderRadius: '5px', borderColor: '#ddd' }}
//                                     />
//                                 </Form.Group>
//                                 <div className="d-flex justify-content-center">
//                                     <Button variant="primary" type="submit" className="w-auto mx-2" style={{ backgroundColor: '#007bff', borderColor: '#007bff', borderRadius: '5px' }}>
//                                         Save Warranty
//                                     </Button>
//                                     <Button variant="secondary" type="reset" className="w-auto mx-2" style={{ borderRadius: '5px' }}>
//                                         Reset Form
//                                     </Button>
//                                     <Button variant="light" className="w-auto mx-2" onClick={() => navigate('/dashboard')} style={{ borderRadius: '5px', borderColor: '#ddd' }}>
//                                         Back to Dashboard
//                                     </Button>
//                                 </div>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>

//             <Row className="mb-4">
//                 <Col md={12}>
//                     <Card className="shadow-sm">
//                         <Card.Body className="text-center">
//                             <h4 className="mb-3">Upload Receipt/Warranty Card</h4>
//                             <div
//                                 style={{
//                                     border: '2px dashed #007bff',
//                                     borderRadius: '10px',
//                                     padding: '40px 20px',
//                                     backgroundColor: '#eaf5ff',
//                                     cursor: 'pointer',
//                                     marginBottom: '20px',
//                                 }}
//                             >
//                                 <FaUpload size={40} className="mb-3" style={{ color: '#007bff' }} />
//                                 <p className="mb-1">Click to upload or drag and drop</p>
//                                 <p className="text-muted mb-0">Upload receipt or warranty card image for automatic data extraction</p>
//                                 <div className="mt-3">
//                                     <span className="badge bg-light text-dark me-2" style={{ border: '1px solid #ddd' }}>JPG</span>
//                                     <span className="badge bg-light text-dark me-2" style={{ border: '1px solid #ddd' }}>PNG</span>
//                                     <span className="badge bg-light text-dark" style={{ border: '1px solid #ddd' }}>PDF</span>
//                                 </div>
//                             </div>
//                             {/* Hidden file input */}
//                             <input type="file" style={{ display: 'none' }} id="warrantyFileInput" />
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>

//         </Container>
//     );
// };

// export default AddWarranty;

import React, { useState, useRef } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';
import warrantyService from '../services/warrantyService';
import uploadService from '../services/uploadService';

const AddWarranty = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
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

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const {
        productName,
        storeName,
        purchaseDate,
        expiryDate,
        category,
        purchasePrice,
        serialNumber,
        description,
        notes,
        imageUrl
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileBoxClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setUploading(true);

        try {
            const uploadResponse = await uploadService.uploadFile(file);
            setFormData((prev) => ({
                ...prev,
                imageUrl: uploadResponse.imageUrl,
            }));
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert(error.response?.data?.msg || 'File upload failed');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await warrantyService.addWarranty(formData);
            alert('Warranty added successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to add warranty:', error);
            alert(error.response?.data?.msg || 'Failed to add warranty');
        }
    };

    return (
        <Container fluid className="p-3">
            <Row>
                <Col md={12} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4 className="mb-3">Warranty Details</h4>
                            <Form onSubmit={onSubmit}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Product Name *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="productName"
                                                value={productName}
                                                onChange={onChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Store Name *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="storeName"
                                                value={storeName}
                                                onChange={onChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Purchase Date *</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="purchaseDate"
                                                value={purchaseDate}
                                                onChange={onChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Expiry Date *</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="expiryDate"
                                                value={expiryDate}
                                                onChange={onChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Category *</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="category"
                                                value={category}
                                                onChange={onChange}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Home Appliances">Home Appliances</option>
                                                <option value="Automotive">Automotive</option>
                                                <option value="Other">Other</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Purchase Price</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="purchasePrice"
                                                value={purchasePrice}
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Serial Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="serialNumber"
                                                value={serialNumber}
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="description"
                                                value={description}
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="notes"
                                        value={notes}
                                        onChange={onChange}
                                    />
                                </Form.Group>

                                {imageUrl && (
                                    <div className="mb-3">
                                        <strong>Uploaded File:</strong> {imageUrl}
                                    </div>
                                )}

                                <Button type="submit">Save Warranty</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={12}>
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <h4 className="mb-3">Upload Receipt/Warranty Card</h4>
                            <div
                                onClick={handleFileBoxClick}
                                style={{
                                    border: '2px dashed #007bff',
                                    borderRadius: '10px',
                                    padding: '40px 20px',
                                    backgroundColor: '#eaf5ff',
                                    cursor: 'pointer',
                                    marginBottom: '20px',
                                }}
                            >
                                <FaUpload size={40} className="mb-3" style={{ color: '#007bff' }} />
                                <p className="mb-1">Click to upload or drag and drop</p>
                                <p className="text-muted mb-0">
                                    Upload receipt or warranty card image
                                </p>

                                {selectedFile && (
                                    <p className="mt-3 mb-0">
                                        Selected file: <strong>{selectedFile.name}</strong>
                                    </p>
                                )}

                                {uploading && <p className="mt-2">Uploading...</p>}
                            </div>

                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddWarranty;