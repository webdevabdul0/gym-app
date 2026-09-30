import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';

const EMPTY = { name: '', price: '', duration: 'Monthly', features: '' };

export default function AdminPlans() {
  const { plans, addPlan, updatePlan, deletePlan } = useGym();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const open = (pl) => {
    setForm(pl ? { ...pl, features: pl.features.join(', ') } : { ...EMPTY });
    setModal(pl || 'add');
  };
  const close = () => setModal(null);
  const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), features: form.features.split(',').map(f => f.trim()).filter(Boolean) };
    modal === 'add' ? addPlan(data) : updatePlan(data);
    close();
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Membership Plans</h1>
        <button className="btn" onClick={() => open(null)}>+ Add Plan</button>
      </div>
      <div className="grid-cards">
        {plans.map(pl => (
          <div className="card" key={pl.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3>{pl.name}</h3>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => open(pl)}>Edit</button>
                <button className="btn" style={{ padding: '4px 10px', fontSize: 12, background: '#ef4444' }} onClick={() => deletePlan(pl.id)}>✕</button>
              </div>
            </div>
            <p className="card-value" style={{ color: '#0284c7', margin: '10px 0' }}>RS {Number(pl.price).toLocaleString()} / {pl.duration}</p>
            {(pl.features || []).map((f, i) => <p key={i} style={{ fontSize: 14, color: '#64748b' }}>✓ {f}</p>)}
          </div>
        ))}
        {plans.length === 0 && <p style={{ color: '#94a3b8' }}>No plans yet. Add one!</p>}
      </div>

      {modal && (
        <div style={overlay}>
          <div style={modalBox}>
            <h3 style={{ marginBottom: 16 }}>{modal === 'add' ? 'Add Plan' : 'Edit Plan'}</h3>
            <form onSubmit={submit}>
              {[['name', 'Plan Name'], ['price', 'Price (RS)']].map(([k, label]) => (
                <div key={k} style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>{label}</label>
                  <input name={k} value={form[k]} onChange={change} required type={k === 'price' ? 'number' : 'text'} style={inputStyle} />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Duration</label>
                <select name="duration" value={form.duration} onChange={change} style={inputStyle}>
                  <option>Monthly</option><option>Quarterly</option><option>Yearly</option>
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Features (comma-separated)</label>
                <textarea name="features" value={form.features} onChange={change} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Gym Access, Locker Room, Trainer" />
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
