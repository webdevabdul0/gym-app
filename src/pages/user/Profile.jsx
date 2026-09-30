import React from 'react';

export default function Profile() {
  return (
    <div>
      <h1 className="page-title">My Profile</h1>
      <div className="card" style={{ maxWidth: '500px' }}>
        <p style={{ margin: '8px 0' }}><b>Full Name:</b> Ali Ahmed</p>
        <p style={{ margin: '8px 0' }}><b>Email:</b> ali@example.com</p>
        <p style={{ margin: '8px 0' }}><b>Phone:</b> 0300-1234567</p>
        <p style={{ margin: '8px 0' }}><b>Membership ID:</b> GYM-0089</p>
      </div>
    </div>
  );
}