import React from 'react';
import { Link } from 'react-router-dom';
import { useGym } from '../../context/GymContext';

export default function UserDashboard() {
  const { myProfile, myPlan, myTrainer, myDaysActive, myAttendance, myPayments } = useGym();

  if (!myProfile) return <p>Loading...</p>;

  const recentAttendance = [...myAttendance].reverse().slice(0, 5);
  const recentPayments = [...myPayments].reverse().slice(0, 3);

  const daysLeft = myProfile.expiryDate
    ? Math.max(0, Math.ceil((new Date(myProfile.expiryDate) - new Date()) / 86400000))
    : null;

  return (
    <div>
      <h1 className="page-title">Welcome back, {myProfile.name.split(' ')[0]}</h1>

      <div className="grid-cards">
        <div className="card">
          <p className="card-title">Current Plan</p>
          <p className="card-value" style={{ fontSize: 20 }}>{myProfile.plan}</p>
          <p style={{ fontSize: 13, color: myProfile.status === 'Active' ? '#22c55e' : '#f59e0b', marginTop: 4 }}>
            {myProfile.status}
          </p>
        </div>
        <div className="card">
          <p className="card-title">Days Active</p>
          <p className="card-value">{myDaysActive}</p>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>sessions attended</p>
        </div>
        <div className="card">
          <p className="card-title">Assigned Trainer</p>
          <p className="card-value" style={{ fontSize: 18 }}>{myTrainer ? myTrainer.name : 'Not Assigned'}</p>
          {myTrainer && <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{myTrainer.specialty}</p>}
        </div>
        {daysLeft !== null && (
          <div className="card">
            <p className="card-title">Membership Expires In</p>
            <p className="card-value" style={{ color: daysLeft < 30 ? '#ef4444' : '#0284c7' }}>{daysLeft} days</p>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{myProfile.expiryDate}</p>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3>Recent Attendance</h3>
            <Link to="/user/attendance" style={{ fontSize: 13, color: '#0284c7' }}>View all</Link>
          </div>
          {recentAttendance.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14 }}>No attendance records yet.</p>}
          {recentAttendance.map(a => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: 14 }}>{a.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                {a.checkIn !== '--' && <span style={{ color: '#64748b' }}>{a.checkIn}</span>}
                <span className={`badge badge-${a.status === 'Present' ? 'success' : 'danger'}`}>{a.status}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3>Payment History</h3>
            <Link to="/user/membership" style={{ fontSize: 13, color: '#0284c7' }}>View all</Link>
          </div>
          {recentPayments.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14 }}>No payment records yet.</p>}
          {recentPayments.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: 14 }}><b>{p.plan}</b><br /><small style={{ color: '#64748b' }}>{p.date}</small></span>
              <span style={{ textAlign: 'right', fontSize: 14 }}>
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
