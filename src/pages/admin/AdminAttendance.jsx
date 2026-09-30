import React from 'react';

export default function AdminAttendance() {
  return (
    <div>
      <h1 className="page-title">Admin - Attendance Register</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Member ID</th>
              <th>Member Name</th>
              <th>Check-in Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Ali Ahmed</td>
              <td>06:30 PM</td>
              <td><span className="badge badge-success">Present</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Usman Khan</td>
              <td>--</td>
              <td><span className="badge badge-danger">Absent</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}