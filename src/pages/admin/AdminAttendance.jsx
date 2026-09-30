import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';

const today = new Date().toISOString().slice(0, 10);
const EMPTY = { member: '', memberId: '', date: today, checkIn: '', status: 'Present' };

export default function AdminAttendance() {
  const { attendance, members, addAttendance, updateAttendance, deleteAttendance } = useGym();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [dateFilter, setDateFilter] = useState(today);

  const open = (a) => { setForm(a ? { ...a } : { ...EMPTY }); setModal(a || 'add'); };
  const close = () => setModal(null);
  const change = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    if (name === 'member') {
      const m = members.find(m => m.name === val);
      setForm(f => ({ ...f, member: val, memberId: m ? m.id : '' }));
    } else {
      setForm(f => ({ ...f, [name]: val }));
    }
  };
  const to12h = (t) => {
    if (!t) return '--';
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${((h % 12) || 12).toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const submit = (e) => {
    e.preventDefault();
    const data = { ...form, checkIn: form.status === 'Absent' ? '--' : to12h(form.checkIn) };
    modal === 'add' ? addAttendance(data) : updateAttendance(data);
    close();
  };

  const filtered = attendance.filter(a => a.date === dateFilter);
  const present = filtered.filter(a => a.status === 'Present').length;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Attendance Register</h1>
        <button className="btn" onClick={() => open(null)}>+ Mark Attendance</button>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginRight: 8 }}>Date:</label>
          <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
            style={{ padding: '7px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14 }} />
        </div>
        <div style={{ fontSize: 14, color: '#64748b' }}>
          <span style={{ color: '#22c55e', fontWeight: 700 }}>{present} Present</span>
          {' / '}
          <span style={{ color: '#ef4444', fontWeight: 700 }}>{filtered.length - present} Absent</span>
          {' of '}
          {filtered.length} records
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>Member ID</th><th>Member Name</th><th>Date</th><th>Check-in</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id}>
                <td>{a.memberId}</td>
                <td>{a.member}</td>
                <td>{a.date}</td>
                <td>{a.checkIn}</td>
                <td><span className={`badge badge-${a.status === 'Present' ? 'success' : 'danger'}`}>{a.status}</span></td>
                <td>
                  <button className="btn" style={{ padding: '4px 12px', fontSize: 13, marginRight: 6 }} onClick={() => open(a)}>Edit</button>
                  <button className="btn" style={{ padding: '4px 12px', fontSize: 13, background: '#ef4444' }} onClick={() => deleteAttendance(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8' }}>No attendance records for this date</td></tr>}
          </tbody>
        </table>
      </div>

      {modal && (
        <div style={overlay}>
          <div style={modalBox}>
            <h3 style={{ marginBottom: 16 }}>{modal === 'add' ? 'Mark Attendance' : 'Edit Attendance'}</h3>
            <form onSubmit={submit}>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Member</label>
                <select name="member" value={form.member} onChange={change} required style={inputStyle}>
                  <option value="">Select member...</option>
                  {members.map(m => <option key={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Date</label>
                <input name="date" value={form.date} onChange={change} required type="date" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Status</label>
                <select name="status" value={form.status} onChange={change} style={inputStyle}>
                  <option>Present</option><option>Absent</option>
                </select>
              </div>
              {form.status === 'Present' && (
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Check-in Time</label>
                  <input name="checkIn" value={form.checkIn} onChange={change} type="time" style={inputStyle} />
                </div>
              )}
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
