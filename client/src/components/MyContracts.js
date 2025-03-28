// client/src/components/MyContracts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyContracts = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/contracts/client');
      setContracts(res.data.contracts);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePay = async (contract_id) => {
    try {
      const res = await axios.put(`http://localhost:4000/contracts/${contract_id}/pay`);
      alert(res.data.message);
      fetchContracts(); // refrescar lista
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Mis Contratos</h2>
      {contracts.map((c) => (
        <div key={c.contract_id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <p>Servicio: {c.title}</p>
          <p>Estado: {c.status}</p>
          <p>Pago: {c.payment_status}</p>
          {c.payment_status === 'unpaid' && (
            <button onClick={() => handlePay(c.contract_id)}>Pagar</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyContracts;
