// client/src/components/MyRequests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRequests = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/contracts/professional');
      setContracts(res.data.contracts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (contract_id) => {
    try {
      const res = await axios.put(`http://localhost:4000/contracts/${contract_id}/complete`);
      alert(res.data.message);
      fetchContracts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Mis Solicitudes (Profesional)</h2>
      {contracts.map((c) => (
        <div key={c.contract_id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <p>Servicio: {c.title}</p>
          <p>Estado: {c.status}</p>
          <p>Pago: {c.payment_status}</p>
          {c.status !== 'completed' && (
            <button onClick={() => handleComplete(c.contract_id)}>Marcar como Completado</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
