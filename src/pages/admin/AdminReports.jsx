import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';

export default function AdminReports() {
  const { members, payments, attendance, trainers, plans } = useGym();
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  const monthPayments = payments.filter(p => p.date.startsWith(month));
  const revenue = monthPayments.filter(p => p.status === 'Paid').reduce((s, p) => s + Number(p.amount), 0);
  const pending = monthPayments.filter(p => p.status === 'Pending').reduce((s, p) => s + Number(p.amount), 0);
  const newMembers = members.filter(m => m.joined && m.joined.startsWith(month)).length;
  const monthAttendance = attendance.filter(a => a.date.startsWith(month));
  const presentCount = monthAttendance.filter(a => a.status === 'Present').length;

  const planBreakdown = plans.map(pl => ({
    name: pl.name,
    count: members.filter(m => m.plan === pl.name).length,
  }));

  const memberByStatus = [
    { label: 'Active', count: members.filter(m => m.status === 'Active').length },
    { label: 'Pending', count: members.filter(m => m.status === 'Pending').length },
    { label: 'Expired', count: members.filter(m => m.status === 'Expired').length },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Analytics & Reports</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Month:</label>
          <input type="month" value={month} onChange={e => setMonth(e.target.value)}
            style={{ padding: '7px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14 }} />
        </div>
      </div>

      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="card">
          <p className="card-title">Revenue Collected</p>
          <p className="card-value" style={{ color: '#22c55e' }}>RS {revenue.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="card-title">Pending Dues</p>
          <p className="card-value" style={{ color: '#ef4444' }}>RS {pending.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="card-title">New Members</p>
          <p className="card-value">{newMembers}</p>
        </div>
        <div className="card">
          <p className="card-title">Attendance Records</p>
          <p className="card-value">{presentCount} <span style={{ fontSize: 14, color: '#64748b' }}>present</span></p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Members by Plan</h3>
          {planBreakdown.map(p => (
            <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span>{p.name}</span>
              <b>{p.count} members</b>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Members by Status</h3>
          {memberByStatus.map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span>{s.label}</span>
              <b>{s.count}</b>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Overview</h3>
          {[
            ['Total Members', members.length],
            ['Total Trainers', trainers.length],
            ['Total Plans', plans.length],
            ['Total Payments', payments.length],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span>{label}</span><b>{val}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
