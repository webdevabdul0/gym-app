import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';

export default function Profile() {
  const { myProfile, updateMember } = useGym();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);

  if (!myProfile) return <p>Loading...</p>;

  const startEdit = () => { setForm({ ...myProfile }); setEditing(true); };
  const cancel = () => setEditing(false);
  const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const save = (e) => {
    e.preventDefault();
    updateMember(form);
    setEditing(false);
  };

  return (
    <div>
      <h1 className="page-title">My Profile</h1>
      <div className="card" style={{ maxWidth: 520 }}>
        {!editing ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22, fontWeight: 700 }}>
                  {myProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{myProfile.name}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>{myProfile.plan} Member</p>
                </div>
              </div>
              <button className="btn" style={{ padding: '6px 16px' }} onClick={startEdit}>Edit Profile</button>
            </div>
            {[
              ['Full Name', myProfile.name],
              ['Email', myProfile.email],
              ['Phone', myProfile.phone || '—'],
              ['Membership ID', myProfile.membershipId || '—'],
              ['Plan', myProfile.plan],
              ['Status', myProfile.status],
              ['Member Since', myProfile.joined],
              ['Expiry Date', myProfile.expiryDate || '—'],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14 }}>
                <span style={{ color: '#64748b', fontWeight: 600 }}>{label}</span>
                <span style={{ fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </>
        ) : (
          <form onSubmit={save}>
            <h3 style={{ marginBottom: 16 }}>Edit Profile</h3>
            {[['name', 'Full Name', 'text', true], ['email', 'Email', 'email', true], ['phone', 'Phone', 'text', false]].map(([k, label, type, req]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <label style={labelStyle}>{label}</label>
                <input name={k} value={form[k] || ''} onChange={change} type={type} required={req} style={inputStyle} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button type="submit" className="btn">Save Changes</button>
              <button type="button" className="btn" style={{ background: '#94a3b8' }} onClick={cancel}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' };
const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' };
