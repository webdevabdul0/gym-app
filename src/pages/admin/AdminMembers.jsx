import React from 'react';

export default function AdminMembers() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Members Management</h1>
        <button className="btn">+ Add Member</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><b>Ali Ahmed</b></td>
              <td>ali@example.com</td>
              <td>Gold</td>
              <td><span className="badge badge-success">Active</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td><b>Usman Khan</b></td>
              <td>usman@example.com</td>
              <td>Silver</td>
              <td><span className="badge badge-warning">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}