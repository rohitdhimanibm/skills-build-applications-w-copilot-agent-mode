import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { beneficiaryService } from '../services/api';

function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    account_number: '',
    bank_name: '',
    ifsc_code: ''
  });
  const [error, setError] = useState('');
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
      if (err.response?.status === 401) {
        navigate('/login');
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
    setLoading(true);

    try {
      await beneficiaryService.create(formData);
      setFormData({ name: '', account_number: '', bank_name: '', ifsc_code: '' });
      setShowForm(false);
      loadBeneficiaries();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add beneficiary');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this beneficiary?')) {
      try {
        await beneficiaryService.delete(id);
        loadBeneficiaries();
      } catch (err) {
        alert('Failed to delete beneficiary');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Beneficiaries</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Beneficiary'}
          </button>
          <button className="btn btn-outline-secondary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Add New Beneficiary</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Beneficiary Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">IFSC Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleChange}
                  required
                  maxLength="11"
                />
              </div>
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Adding...' : 'Add Beneficiary'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {beneficiaries.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No beneficiaries added yet.</div>
          </div>
        ) : (
          beneficiaries.map((beneficiary) => (
            <div key={beneficiary.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{beneficiary.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Account:</strong> {beneficiary.account_number}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Bank:</strong> {beneficiary.bank_name}
                  </p>
                  <p className="card-text mb-3">
                    <strong>IFSC:</strong> {beneficiary.ifsc_code}
                  </p>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(beneficiary.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Beneficiaries;
