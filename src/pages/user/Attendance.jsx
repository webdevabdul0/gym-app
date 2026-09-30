import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';

export default function Attendance() {
  const { myAttendance, myDaysActive } = useGym();
  const [filter, setFilter] = useState('All');

  const absent = myAttendance.filter(a => a.status === 'Absent').length;
  const rate = myAttendance.length > 0 ? Math.round((myDaysActive / myAttendance.length) * 100) : 0;


  const filtered = filter === 'All' ? myAttendance : myAttendance.filter(a => a.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h1 className="page-title">My Attendance History</h1>

      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="card">
          <p className="card-title">Total Sessions</p>
          <p className="card-value">{myAttendance.length}</p>
        </div>
        <div className="card">
          <p className="card-title">Present</p>
          <p className="card-value" style={{ color: '#22c55e' }}>{myDaysActive}</p>
        </div>
        <div className="card">
          <p className="card-title">Absent</p>
          <p className="card-value" style={{ color: '#ef4444' }}>{absent}</p>
        </div>
        <div className="card">
          <p className="card-title">Attendance Rate</p>
          <p className="card-value" style={{ color: rate >= 75 ? '#22c55e' : '#ef4444' }}>{rate}%</p>
        </div>
      </div>

      <div style={{ marginBottom: 14, display: 'flex', gap: 8 }}>
        {['All', 'Present', 'Absent'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className="btn"
            style={{ background: filter === s ? '#0284c7' : '#e2e8f0', color: filter === s ? '#fff' : '#374151', padding: '6px 16px' }}>
            {s}
          </button>
        ))}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>#</th><th>Date</th><th>Check-in Time</th><th>Status</th></tr>
          </thead>
          <tbody>
            {sorted.map((a, i) => (
              <tr key={a.id}>
                <td>{i + 1}</td>
                <td>{a.date}</td>
                <td>{a.checkIn}</td>
                <td><span className={`badge badge-${a.status === 'Present' ? 'success' : 'danger'}`}>{a.status}</span></td>
              </tr>
            ))}
            {sorted.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', color: '#94a3b8' }}>No records found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
