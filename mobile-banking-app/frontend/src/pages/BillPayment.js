import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionService } from '../services/api';

function BillPayment() {
  const [formData, setFormData] = useState({
    biller_category: '',
    biller_name: '',
    consumer_number: '',
    amount: '',
    due_date: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const billerCategories = [
    { value: 'ELECTRICITY', label: 'Electricity' },
    { value: 'WATER', label: 'Water' },
    { value: 'GAS', label: 'Gas' },
    { value: 'INTERNET', label: 'Internet' },
    { value: 'MOBILE', label: 'Mobile' },
    { value: 'CREDIT_CARD', label: 'Credit Card' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await transactionService.createBillPayment(formData);
      setSuccess(`Payment successful! Transaction ID: ${response.data.transaction_id}`);
      setFormData({
        biller_category: '',
        biller_name: '',
        consumer_number: '',
        amount: '',
        due_date: ''
      });
      setTimeout(() => {
        navigate('/transactions');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.detail || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Bill Payment</h2>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Biller Category</label>
                  <select
                    className="form-select"
                    name="biller_category"
                    value={formData.biller_category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Category --</option>
                    {billerCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Biller Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="biller_name"
                    value={formData.biller_name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., ABC Electricity Company"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Consumer Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="consumer_number"
                    value={formData.consumer_number}
                    onChange={handleChange}
                    required
                    placeholder="Your consumer/account number"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="1"
                    step="0.01"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Due Date (Optional)</label>
                  <input
                    type="date"
                    className="form-control"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Processing...' : 'Pay Bill'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillPayment;
