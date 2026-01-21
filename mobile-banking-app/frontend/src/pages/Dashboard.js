import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await authService.getProfile();
      setProfile(response.data);
    } catch (err) {
      console.error('Failed to load profile:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {profile && (
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Account Information</h5>
              </div>
              <div className="card-body">
                <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Account Number:</strong> {profile.account_number}</p>
                <p><strong>Phone:</strong> {profile.phone_number || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Balance</h5>
              </div>
              <div className="card-body">
                <h2 className="text-success">${parseFloat(profile.balance).toFixed(2)}</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-4">
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/beneficiaries')}>
            <div className="card-body">
              <h5 className="card-title">Beneficiaries</h5>
              <p className="card-text">Manage your beneficiaries</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/fund-transfer')}>
            <div className="card-body">
              <h5 className="card-title">Fund Transfer</h5>
              <p className="card-text">Transfer money</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/bill-payment')}>
            <div className="card-body">
              <h5 className="card-title">Bill Payment</h5>
              <p className="card-text">Pay your bills</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/transactions')}>
            <div className="card-body">
              <h5 className="card-title">Transactions</h5>
              <p className="card-text">View transaction history</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
