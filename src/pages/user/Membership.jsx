import React from 'react';
import { useGym } from '../../context/GymContext';

export default function Membership() {
  const { myProfile, myPlan, myPayments } = useGym();

  if (!myProfile) return <p>Loading...</p>;

  const daysLeft = myProfile.expiryDate
    ? Math.max(0, Math.ceil((new Date(myProfile.expiryDate) - new Date()) / 86400000))
    : null;

  const totalPaid = myPayments.filter(p => p.status === 'Paid').reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div>
      <h1 className="page-title">Membership</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div className="card">
          <h3 style={{ marginBottom: 12 }}>{myProfile.plan}</h3>
          <p style={{ marginTop: 6 }}>
            Status: <span className={`badge badge-${myProfile.status === 'Active' ? 'success' : 'warning'}`}>{myProfile.status}</span>
          </p>
          {myPlan && (
            <p style={{ marginTop: 10, color: '#0284c7', fontWeight: 700, fontSize: 20 }}>
              RS {Number(myPlan.price).toLocaleString()} / {myPlan.duration}
            </p>
          )}
          <div style={{ marginTop: 12 }}>
            <p style={{ fontSize: 14, color: '#64748b' }}><b>Member Since:</b> {myProfile.joined}</p>
            <p style={{ fontSize: 14, color: '#64748b' }}><b>Expiry Date:</b> {myProfile.expiryDate || '—'}</p>
            {daysLeft !== null && (
              <p style={{ fontSize: 14, color: daysLeft < 30 ? '#ef4444' : '#22c55e', fontWeight: 600, marginTop: 6 }}>
                {daysLeft > 0 ? `${daysLeft} days remaining` : 'Membership expired'}
              </p>
            )}
          </div>
          <button className="btn" style={{ marginTop: 16, width: '100%' }} onClick={() => alert('Renewal request sent! Our team will contact you shortly.')}>Renew Plan</button>
        </div>

        {myPlan && (
          <div className="card">
            <h3 style={{ marginBottom: 12 }}>Plan Features</h3>
            {myPlan.features.map((f, i) => (
              <p key={i} style={{ fontSize: 14, color: '#374151', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#22c55e', marginRight: 8 }}>✓</span>{f}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3>Payment History</h3>
          <span style={{ fontSize: 14, color: '#64748b' }}>Total paid: <b style={{ color: '#22c55e' }}>RS {totalPaid.toLocaleString()}</b></span>
        </div>
        {myPayments.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: 14 }}>No payments yet.</p>
        ) : (
          <div className="table-container" style={{ margin: 0 }}>
            <table>
              <thead>
                <tr><th>Tx ID</th><th>Plan</th><th>Amount</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {[...myPayments].reverse().map(p => (
                  <tr key={p.id}>
                    <td>PAY-{p.id}</td>
                    <td>{p.plan}</td>
                    <td><b>RS {Number(p.amount).toLocaleString()}</b></td>
                    <td>{p.date}</td>
                    <td><span className={`badge badge-${p.status === 'Paid' ? 'success' : 'danger'}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
