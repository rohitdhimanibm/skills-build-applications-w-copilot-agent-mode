import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionService, beneficiaryService } from '../services/api';

function FundTransfer() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [formData, setFormData] = useState({
    recipient_account: '',
    recipient_name: '',
    amount: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadBeneficiaries();
  }, []);

  const loadBeneficiaries = async () => {
    try {
      const response = await beneficiaryService.list();
      setBeneficiaries(response.data);
    } catch (err) {
      console.error('Failed to load beneficiaries:', err);
    }
  };

  const handleBeneficiarySelect = (e) => {
    const beneficiaryId = e.target.value;
    if (beneficiaryId) {
      const beneficiary = beneficiaries.find(b => b.id === parseInt(beneficiaryId));
      if (beneficiary) {
        setFormData({
          ...formData,
          recipient_account: beneficiary.account_number,
          recipient_name: beneficiary.name
        });
      }
    }
  };

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
      const response = await transactionService.transfer(formData);
      setSuccess(`Transfer successful! Transaction ID: ${response.data.transaction_id}`);
      setFormData({ recipient_account: '', recipient_name: '', amount: '', description: '' });
      setTimeout(() => {
        navigate('/transactions');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.detail || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Fund Transfer</h2>
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
                  <label className="form-label">Select Beneficiary (Optional)</label>
                  <select className="form-select" onChange={handleBeneficiarySelect}>
                    <option value="">-- Select or enter manually --</option>
                    {beneficiaries.map((beneficiary) => (
                      <option key={beneficiary.id} value={beneficiary.id}>
                        {beneficiary.name} - {beneficiary.account_number}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Recipient Account Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="recipient_account"
                    value={formData.recipient_account}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Recipient Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="recipient_name"
                    value={formData.recipient_name}
                    onChange={handleChange}
                    required
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
                  <label className="form-label">Description (Optional)</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Processing...' : 'Transfer Funds'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundTransfer;
