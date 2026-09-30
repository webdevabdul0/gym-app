import React from 'react';

export default function AdminPlans() {
  return (
    <div>
      <h1 className="page-title">Membership Plans</h1>
      <div className="grid-cards">
        <div className="card">
          <h3>Basic Plan</h3>
          <p className="card-value" style={{ color: '#0284c7', margin: '10px 0' }}>RS 3,000 / mo</p>
          <p style={{ fontSize: '14px', color: '#64748b' }}>✓ Gym Access</p>
          <p style={{ fontSize: '14px', color: '#64748b' }}>✓ Locker Room</p>
        </div>
        <div className="card">
          <h3>Gold Plan</h3>
          <p className="card-value" style={{ color: '#0284c7', margin: '10px 0' }}>RS 7,000 / mo</p>
          <p style={{ fontSize: '14px', color: '#64748b' }}>✓ Full Gym Access</p>
          <p style={{ fontSize: '14px', color: '#64748b' }}>✓ Trainer & Diet Plan</p>
        </div>
      </div>
    </div>
  );
}