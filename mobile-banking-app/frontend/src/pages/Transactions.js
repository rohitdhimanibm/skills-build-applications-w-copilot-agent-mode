import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionService } from '../services/api';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await transactionService.list();
      setTransactions(response.data);
    } catch (err) {
      console.error('Failed to load transactions:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      COMPLETED: 'badge bg-success',
      PENDING: 'badge bg-warning',
      FAILED: 'badge bg-danger'
    };
    return badges[status] || 'badge bg-secondary';
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading transactions...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Transaction History</h2>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="alert alert-info">No transactions found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Type</th>
                <th>Recipient</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.transaction_id}</td>
                  <td>
                    {transaction.transaction_type === 'TRANSFER' ? 'Fund Transfer' : 'Bill Payment'}
                  </td>
                  <td>
                    <div>{transaction.recipient_name}</div>
                    <small className="text-muted">{transaction.recipient_account}</small>
                  </td>
                  <td>${parseFloat(transaction.amount).toFixed(2)}</td>
                  <td>
                    <span className={getStatusBadge(transaction.status)}>
                      {transaction.status}
                    </span>
                  </td>
                  <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Transactions;
