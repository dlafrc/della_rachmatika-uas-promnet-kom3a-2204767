// Import necessary dependencies and styles
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Container, Row, Col, Modal, Card } from 'react-bootstrap';
import InventoryService from '../services/InventoryService';
import './style.css'; // Import your custom CSS file

const customTableClass = "custom-table";

function GetAllComponent() {
  // State and effect hooks
  const [originalInventoryItems, setOriginalInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryItems, setInventoryItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const navigate = useNavigate();

  // Fetch inventory items on component mount
  useEffect(() => {
    fetchInventoryItems();
  }, []);

  // Update inventory items on search term change
  useEffect(() => {
    if (searchTerm === '') {
      setInventoryItems(originalInventoryItems);
      setSearchError(null);
    } else {
      searchInventoryByName();
    }
  }, [searchTerm, originalInventoryItems]);

  // Fetch inventory items from the server
  const fetchInventoryItems = async () => {
    try {
      const response = await InventoryService.getItem();
      setOriginalInventoryItems(response.data);
      setInventoryItems(response.data);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
    }
  };

  // Search inventory items by name
  const searchInventoryByName = async () => {
    try {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const response = await InventoryService.searchItemByName(encodedSearchTerm);
        console.log("Axios Response:", response);

        const searchData = response.data;

        if (Array.isArray(searchData) && searchData.length > 0) {
            setInventoryItems(searchData);
            setSearchError(null);
        } else {
            setInventoryItems([]);
            setSearchError('No items found.');
        }
    } catch (error) {
        console.error('Error searching inventory items:', error);
        setSearchError('Error searching items. Please try again.');
    }
};

  // View item details
  const handleView = (itemId) => {
    console.log('Viewing item with ID:', itemId);
    navigate(`/view-inventory/${itemId}`);
  };

  // Update item details
  const handleUpdate = (itemId) => {
    console.log('Updating item with ID:', itemId);
    navigate(`/update-item/${itemId}`);
  };

  // Display delete confirmation modal
  const handleDeleteConfirmation = (itemId) => {
    setDeleteItemId(itemId);
    setShowConfirmModal(true);
  };

  // Delete item
  const handleDelete = async () => {
    try {
      await InventoryService.deleteItem(deleteItemId);

      setInventoryItems((prevItems) =>
        prevItems.filter((item) => item.id !== deleteItemId)
      );

      setDeleteItemId(null);
      setShowConfirmModal(false);
      setShowModal(true);
      console.log(`Delete item with ID: ${deleteItemId}`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Close success modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Close delete confirmation modal
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setDeleteItemId(null);
  };

  // Render the component
  return (
    <Container className="vh-100 d-flex flex-column mb-5">
      <Row className="justify-content-between align-items-center mb-5 mt-5">
        <Col>
          <h2>Inventory Items</h2>
        </Col>
        <Col xs="auto">
          <div className="d-flex">
            <input
              type="text"
              placeholder="  Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="custom-search-input"
            />
            <Button
              variant="primary"
              className="ms-2 custom-reset-search-button"
              onClick={() => {
                setSearchTerm('');
                fetchInventoryItems();
              }}
            >
              Reset Search
            </Button>
          </div>
        </Col>
        <Col xs="auto">
          <Link to="/create-inventory">
            <Button variant="success" className="custom-create-item-button">
              Create Item
            </Button>
          </Link>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          {searchError && <p className="text-danger">{searchError}</p>}
          {Array.isArray(inventoryItems) && inventoryItems.length > 0 ? (
            <Table bordered striped responsive="md" className={`${customTableClass} table-hover`}>
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Nama Barang</th>
                  <th>Jumlah</th>
                  <th>Harga Satuan</th>
                  <th>Lokasi</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nama_barang}</td>
                    <td>{item.jumlah}</td>
                    <td>{item.harga_satuan}</td>
                    <td>{item.lokasi}</td>
                    <td className="d-flex justify-content-center">
                      <Button variant="info" className="me-2 custom-info-button" onClick={() => handleView(item.id)}>
                        View
                      </Button>
                      <Button variant="warning" className="me-2 custom-warning-button" onClick={() => handleUpdate(item.id)}>
                        Edit
                      </Button>
                      <Button variant="danger" className="custom-danger-button" onClick={() => handleDeleteConfirmation(item.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No items available.</p>
          )}
        </Card.Body>
      </Card>
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Item Deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Item has been successfully deleted.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default GetAllComponent;
