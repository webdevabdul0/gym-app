import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';

const EMPTY = { name: '', specialty: '', experience: '', phone: '' };

export default function AdminTrainers() {
  const { trainers, addTrainer, updateTrainer, deleteTrainer } = useGym();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const open = (t) => { setForm(t ? { ...t } : { ...EMPTY }); setModal(t || 'add'); };
  const close = () => setModal(null);
  const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    modal === 'add' ? addTrainer(form) : updateTrainer(form);
    close();
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Trainers</h1>
        <button className="btn" onClick={() => open(null)}>+ Add Trainer</button>
      </div>
      <div className="grid-cards">
        {trainers.map(t => (
          <div className="card" key={t.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3>{t.name}</h3>
                <p className="card-title" style={{ marginTop: 4 }}>{t.specialty}</p>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => open(t)}>Edit</button>
                <button className="btn" style={{ padding: '4px 10px', fontSize: 12, background: '#ef4444' }} onClick={() => deleteTrainer(t.id)}>✕</button>
              </div>
            </div>
            <p style={{ marginTop: 12, fontSize: 14 }}><b>Experience:</b> {t.experience}</p>
            <p style={{ fontSize: 14 }}><b>Phone:</b> {t.phone}</p>
          </div>
        ))}
        {trainers.length === 0 && <p style={{ color: '#94a3b8' }}>No trainers yet. Add one!</p>}
      </div>

      {modal && (
        <div style={overlay}>
          <div style={modalBox}>
            <h3 style={{ marginBottom: 16 }}>{modal === 'add' ? 'Add Trainer' : 'Edit Trainer'}</h3>
            <form onSubmit={submit}>
              {[['name', 'Full Name'], ['specialty', 'Specialty'], ['experience', 'Experience (e.g. 3 Years)'], ['phone', 'Phone']].map(([k, label]) => (
                <div key={k} style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>{label}</label>
                  <input name={k} value={form[k]} onChange={change} required style={inputStyle} />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
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
