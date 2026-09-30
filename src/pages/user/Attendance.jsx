import React from 'react';

export default function Attendance() {
  return (
    <div>
      <h1 className="page-title">My Attendance History</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check-in Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-03-20</td>
              <td>06:30 PM</td>
              <td><span className="badge badge-success">Present</span></td>
            </tr>
            <tr>
              <td>2026-03-21</td>
              <td>06:15 PM</td>
              <td><span className="badge badge-success">Present</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}