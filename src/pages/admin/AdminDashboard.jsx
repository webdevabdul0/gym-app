import React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="page-title">Admin Dashboard</h1>
      <div className="grid-cards">
        <div className="card">
          <p className="card-title">Total Members</p>
          <p className="card-value">120</p>
        </div>
        <div className="card">
          <p className="card-title">Active Trainers</p>
          <p className="card-value">8</p>
        </div>
        <div className="card">
          <p className="card-title">Monthly Revenue</p>
          <p className="card-value">RS 250,000</p>
        </div>
        <div className="card">
          <p className="card-title">Daily Attendance</p>
          <p className="card-value">45</p>
        </div>
      </div>
    </div>
  );
}