import React from 'react';
import { useGym } from '../../context/GymContext';

export default function AdminDashboard() {
  const { stats, members, payments, attendance } = useGym();

  const recentMembers = [...members].sort((a, b) => new Date(b.joined) - new Date(a.joined)).slice(0, 5);
  const recentPayments = [...payments].slice(-4).reverse();

  return (
    <div>
      <h1 className="page-title">Admin Dashboard</h1>
      <div className="grid-cards">
        <div className="card">
          <p className="card-title">Total Members</p>
          <p className="card-value">{stats.totalMembers}</p>
          <p style={{ fontSize: 13, color: '#22c55e', marginTop: 4 }}>{stats.activeMembers} Active</p>
        </div>
        <div className="card">
          <p className="card-title">Active Trainers</p>
          <p className="card-value">{stats.activeTrainers}</p>
        </div>
        <div className="card">
          <p className="card-title">Monthly Revenue</p>
          <p className="card-value">RS {stats.monthlyRevenue.toLocaleString()}</p>
          <p style={{ fontSize: 13, color: '#f59e0b', marginTop: 4 }}>{stats.pendingPayments} pending</p>
        </div>
        <div className="card">
          <p className="card-title">Today's Attendance</p>
          <p className="card-value">{stats.dailyAttendance}</p>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>of {attendance.length} members</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Recent Members</h3>
          {recentMembers.map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span><b>{m.name}</b><br /><small style={{ color: '#64748b' }}>{m.plan} Plan</small></span>
              <span className={`badge badge-${m.status === 'Active' ? 'success' : 'warning'}`}>{m.status}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Recent Payments</h3>
          {recentPayments.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span><b>{p.member}</b><br /><small style={{ color: '#64748b' }}>{p.date}</small></span>
              <span style={{ textAlign: 'right' }}>
                <b>RS {Number(p.amount).toLocaleString()}</b><br />
                <span className={`badge badge-${p.status === 'Paid' ? 'success' : 'danger'}`}>{p.status}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
