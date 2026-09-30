import React from 'react';

export default function UserDashboard() {
  return (
    <div>
      <h1 className="page-title">User Dashboard</h1>
      <div className="grid-cards">
        <div className="card">
          <p className="card-title">Current Plan</p>
          <p className="card-value">Gold Membership</p>
        </div>
        <div className="card">
          <p className="card-title">Days Active</p>
          <p className="card-value">18 Days</p>
        </div>
        <div className="card">
          <p className="card-title">Assigned Trainer</p>
          <p className="card-value">Hamza Malik</p>
        </div>
      </div>
    </div>
  );
}