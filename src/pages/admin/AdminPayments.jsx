import React from 'react';

export default function AdminPayments() {
  return (
    <div>
      <h1 className="page-title">Payments History</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tx ID</th>
              <th>Member Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PAY-101</td>
              <td>Ali Ahmed</td>
              <td><b>RS 7,000</b></td>
              <td>2026-03-01</td>
              <td><span className="badge badge-success">Paid</span></td>
            </tr>
            <tr>
              <td>PAY-102</td>
              <td>Usman Khan</td>
              <td><b>RS 3,000</b></td>
              <td>2026-03-05</td>
              <td><span className="badge badge-danger">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}