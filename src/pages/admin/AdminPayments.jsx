import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';

const EMPTY = { member: '', amount: '', date: new Date().toISOString().slice(0, 10), status: 'Paid', plan: '' };

export default function AdminPayments() {
  const { payments, members, plans, addPayment, updatePayment, deletePayment } = useGym();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [filter, setFilter] = useState('All');

  const open = (p) => { setForm(p ? { ...p } : { ...EMPTY }); setModal(p || 'add'); };
  const close = () => setModal(null);
  const change = (e) => {
    const { name, value } = e.target;
    if (name === 'member') {
      const m = members.find(m => m.name === value);
      setForm(f => ({ ...f, member: value, memberId: m ? m.id : '', plan: m?.plan || f.plan }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };
  const submit = (e) => {
    e.preventDefault();
    modal === 'add' ? addPayment({ ...form, amount: Number(form.amount) }) : updatePayment({ ...form, amount: Number(form.amount) });
    close();
  };

  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + Number(p.amount), 0);
  const totalPending = payments.filter(p => p.status === 'Pending').reduce((s, p) => s + Number(p.amount), 0);

  const filtered = filter === 'All' ? payments : payments.filter(p => p.status === filter);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Payments</h1>
        <button className="btn" onClick={() => open(null)}>+ Add Payment</button>
      </div>

      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
        <div className="card">
          <p className="card-title">Total Collected</p>
          <p className="card-value" style={{ color: '#22c55e' }}>RS {totalPaid.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="card-title">Pending Amount</p>
          <p className="card-value" style={{ color: '#ef4444' }}>RS {totalPending.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="card-title">Total Transactions</p>
          <p className="card-value">{payments.length}</p>
        </div>
      </div>

      <div style={{ marginBottom: 14, display: 'flex', gap: 8 }}>
        {['All', 'Paid', 'Pending'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className="btn"
            style={{ background: filter === s ? '#0284c7' : '#e2e8f0', color: filter === s ? '#fff' : '#374151', padding: '6px 16px' }}>
            {s}
          </button>
        ))}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>Tx ID</th><th>Member</th><th>Plan</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>PAY-{p.id}</td>
                <td>{p.member}</td>
                <td>{p.plan}</td>
                <td><b>RS {Number(p.amount).toLocaleString()}</b></td>
                <td>{p.date}</td>
                <td><span className={`badge badge-${p.status === 'Paid' ? 'success' : 'danger'}`}>{p.status}</span></td>
                <td>
                  <button className="btn" style={{ padding: '4px 12px', fontSize: 13, marginRight: 6 }} onClick={() => open(p)}>Edit</button>
                  <button className="btn" style={{ padding: '4px 12px', fontSize: 13, background: '#ef4444' }} onClick={() => deletePayment(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', color: '#94a3b8' }}>No records</td></tr>}
          </tbody>
        </table>
      </div>

      {modal && (
        <div style={overlay}>
          <div style={modalBox}>
            <h3 style={{ marginBottom: 16 }}>{modal === 'add' ? 'Add Payment' : 'Edit Payment'}</h3>
            <form onSubmit={submit}>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Member</label>
                <select name="member" value={form.member} onChange={change} required style={inputStyle}>
                  <option value="">Select member...</option>
                  {members.map(m => <option key={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Plan</label>
                <select name="plan" value={form.plan} onChange={change} style={inputStyle}>
                  <option value="">Select plan...</option>
                  {plans.map(p => <option key={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Amount (RS)</label>
                <input name="amount" value={form.amount} onChange={change} required type="number" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Date</label>
                <input name="date" value={form.date} onChange={change} required type="date" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Status</label>
                <select name="status" value={form.status} onChange={change} style={inputStyle}>
                  <option>Paid</option><option>Pending</option>
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
const modalBox = { background: '#fff', borderRadius: 12, padding: 28, width: 420, maxWidth: '90vw' };
const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' };
const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' };
