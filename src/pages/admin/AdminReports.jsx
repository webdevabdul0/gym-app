import React from 'react';

export default function AdminReports() {
  return (
    <div>
      <h1 className="page-title">Monthly Analytics & Reports</h1>
      <div className="card">
        <h3>January 2026 Summary</h3>
        <p style={{ marginTop: '8px', color: '#64748b' }}>Total Revenue: <b>RS 250,000</b> | New Members: <b>25</b></p>
        <button className="btn" style={{ marginTop: '16px' }}>Download PDF Report</button>
      </div>
    </div>
  );
}