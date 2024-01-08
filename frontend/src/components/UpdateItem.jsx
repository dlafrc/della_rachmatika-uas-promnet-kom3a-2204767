// UpdateItem.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import InventoryService from '../services/InventoryService';
import './style.css';

function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_barang: '',
    jumlah: '',
    harga_satuan: '',
    lokasi: '',
    deskripsi: '',
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await InventoryService.getItemById(id);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching inventory item:', error);
      }
    };

    fetchInventoryItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIncrement = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: String(parseInt(prevData[field], 10) + 1),
    }));
  };

  const handleDecrement = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: String(Math.max(parseInt(prevData[field], 10) - 1, 0)),
    }));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/'); // Navigate back to the inventory list
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await InventoryService.updateItem(formData, id);
      console.log('Item updated successfully');
      handleShowModal(); // Show modal on success
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <Container className="vh-100 mt-5">
      <Row className="d-flex align-items-center justify-content-center my-auto">
        <Col md={8}>
          <div className="card-update-inventory card mx-auto">
            <div className="card-body rounded-2">
              <h2 className="text-center mb-4 card-title-update-inventory"><strong>Update Inventory Item</strong></h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNamaBarang">
                  <Form.Label><strong>Nama Barang</strong></Form.Label>
                  <Form.Control
                    type="text"
                    name="nama_barang"
                    value={formData.nama_barang}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br></br>
                <Form.Group controlId="formJumlah">
                  <Form.Label><strong>Jumlah</strong></Form.Label>
                  <div className="d-flex">
                    <Button variant="outline-secondary" onClick={() => handleDecrement('jumlah')}>
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      name="jumlah"
                      value={formData.jumlah}
                      onChange={handleChange}
                      required
                    />
                    <Button variant="outline-secondary" onClick={() => handleIncrement('jumlah')}>
                      +
                    </Button>
                  </div>
                </Form.Group>
                <br></br>
                <Form.Group controlId="formHargaSatuan">
                  <Form.Label><strong>Harga Satuan</strong></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan Harga Satuan"
                    name="harga_satuan"
                    value={formData.harga_satuan}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br></br>
                <Form.Group controlId="formLokasi">
                  <Form.Label><strong>Lokasi</strong></Form.Label>
                  <Form.Control
                    as="select"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Lokasi</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Denpasar">Denpasar</option>
                    <option value="Manokwari">Manokwari</option>
                  </Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId="formDeskripsi">
                  <Form.Label><strong>Deskripsi</strong></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3 btn-update-inventory">
                  Update Item
                </Button>
              </Form>

              <Link to="/">
                <Button variant="secondary" className="w-100 mt-3 btn-back-to-inventory">
                  Back to Inventory
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="modal-header-update-inventory">
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-update-inventory">Item updated successfully!</Modal.Body>
        <Modal.Footer className="modal-footer-update-inventory">
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UpdateItem;
