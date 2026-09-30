import React from 'react';

export default function AdminTrainers() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Trainers List</h1>
        <button className="btn">+ Add Trainer</button>
      </div>
      <div className="grid-cards">
        <div className="card">
          <h3>Hamza Malik</h3>
          <p className="card-title" style={{ marginTop: '4px' }}>Bodybuilding Specialist</p>
          <p style={{ marginTop: '12px', fontSize: '14px' }}><b>Experience:</b> 5 Years</p>
          <p style={{ fontSize: '14px' }}><b>Phone:</b> 0300-1234567</p>
        </div>
        <div className="card">
          <h3>Bilal Hassan</h3>
          <p className="card-title" style={{ marginTop: '4px' }}>CrossFit & Cardio</p>
          <p style={{ marginTop: '12px', fontSize: '14px' }}><b>Experience:</b> 3 Years</p>
          <p style={{ fontSize: '14px' }}><b>Phone:</b> 0312-9876543</p>
        </div>
      </div>
    </div>
  );
}