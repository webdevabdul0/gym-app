import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';

const EMPTY = { name: '', email: '', plan: 'Basic', status: 'Active', joined: new Date().toISOString().slice(0, 10) };

export default function AdminMembers() {
  const { members, plans, addMember, updateMember, deleteMember } = useGym();
  const [modal, setModal] = useState(null); // null | 'add' | member obj
  const [form, setForm] = useState(EMPTY);
  const [search, setSearch] = useState('');

  const open = (m) => { setForm(m ? { ...m } : { ...EMPTY }); setModal(m || 'add'); };
  const close = () => setModal(null);
  const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    modal === 'add' ? addMember(form) : updateMember(form);
    close();
  };

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Members Management</h1>
        <button className="btn" onClick={() => open(null)}>+ Add Member</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px 14px', border: '1px solid #e2e8f0', borderRadius: 8, width: 280, fontSize: 14 }}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Plan</th><th>Joined</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td><b>{m.name}</b></td>
                <td>{m.email}</td>
                <td>{m.plan}</td>
                <td>{m.joined}</td>
                <td><span className={`badge badge-${m.status === 'Active' ? 'success' : 'warning'}`}>{m.status}</span></td>
                <td>
                  <button className="btn" style={{ padding: '4px 12px', fontSize: 13, marginRight: 6 }} onClick={() => open(m)}>Edit</button>
                  <button className="btn" style={{ padding: '4px 12px', fontSize: 13, background: '#ef4444' }} onClick={() => deleteMember(m.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', color: '#94a3b8' }}>No members found</td></tr>}
          </tbody>
        </table>
      </div>

      {modal && (
        <div style={overlay}>
          <div style={modalBox}>
            <h3 style={{ marginBottom: 16 }}>{modal === 'add' ? 'Add Member' : 'Edit Member'}</h3>
            <form onSubmit={submit}>
              {[['name', 'Full Name'], ['email', 'Email'], ['joined', 'Join Date']].map(([k, label]) => (
                <div key={k} style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>{label}</label>
                  <input name={k} value={form[k]} onChange={change} required type={k === 'joined' ? 'date' : 'text'} style={inputStyle} />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Plan</label>
                <select name="plan" value={form.plan} onChange={change} style={inputStyle}>
                  {plans.map(p => <option key={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Status</label>
                <select name="status" value={form.status} onChange={change} style={inputStyle}>
                  <option>Active</option><option>Pending</option><option>Expired</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" className="btn">Save</button>
                <button type="button" className="btn" style={{ background: '#94a3b8' }} onClick={close}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const overlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalBox = { background: '#fff', borderRadius: 12, padding: 28, width: 400, maxWidth: '90vw' };
const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' };
const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' };
