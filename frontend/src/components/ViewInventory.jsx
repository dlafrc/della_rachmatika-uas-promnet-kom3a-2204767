import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import InventoryService from '../services/InventoryService';
import './style.css'; // Pastikan untuk mengimpor file style.css

function ViewInventory() {
  const { id: routeId } = useParams();
  const [inventoryItem, setInventoryItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        setLoading(true);
        const response = await InventoryService.getItemById(routeId);

        if (response.data && response.data.id) {
          setInventoryItem(response.data);
        } else {
          console.error(`Error: Item not found with ID ${routeId}`);
        }
      } catch (error) {
        console.error('Error fetching inventory item:', error);
      } finally {
        setLoading(false);
      }
    };

    if (routeId) {
      fetchInventoryItem();
    }
  }, [routeId]);

  return (
    <Container className="vh-100 d-flex flex-column align-items-center mt-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        inventoryItem && (
          <Card className="card-view-inventory shadow my-4 rounded" style={{ width: '30rem' }}>
            <Card.Body>
            <Card.Title className="card-title-view-inventory mb-5"><strong>{inventoryItem.nama_barang}</strong></Card.Title>
              
              {/* ID */}
              <div className="value-box">
                <strong>ID: </strong>
                <br className="mb-1" />
                <span className="value-center rounded">{inventoryItem.id}</span>
              </div>

              {/* Jumlah */}
              <div className="value-box">
                <strong>Jumlah: </strong>
                <br className="mb-1" />
                <span className="value-center rounded">{inventoryItem.jumlah}</span>
              </div>

              {/* Harga Satuan */}
              <div className="value-box">
                <strong>Harga Satuan: </strong>
                <br className="mb-1" />
                <span className="value-center rounded">{inventoryItem.harga_satuan}</span>
              </div>

              {/* Lokasi */}
              <div className="value-box">
                <strong>Lokasi: </strong>
                <br className="mb-1" />
                <span className="value-center rounded">{inventoryItem.lokasi}</span>
              </div>

              {/* Deskripsi */}
              <div className="value-box">
                <strong>Deskripsi: </strong>
                <br className="mb-1" />
                <span className="value-center rounded">{inventoryItem.deskripsi}</span>
              </div>

              <Link to="/" className="btn btn-back-to-inventory w-100 mt-3">
                Back to Inventory
              </Link>
            </Card.Body>
          </Card>
        )
      )}
    </Container>
  );
}

export default ViewInventory;
