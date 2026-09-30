import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';

const MEALS = ['Breakfast', 'Mid-Morning', 'Lunch', 'Pre-Workout', 'Dinner', 'Post-Workout'];
const EMPTY = { meal: 'Breakfast', time: '', items: '', calories: '' };

export default function DietPlan() {
  const { myDiet, myProfile, addDiet, updateDiet, deleteDiet } = useGym();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const open = (d) => { setForm(d ? { ...d } : { ...EMPTY, memberId: myProfile?.id }); setModal(d || 'add'); };
  const close = () => setModal(null);
  const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const data = { ...form, calories: Number(form.calories), memberId: myProfile?.id };
    modal === 'add' ? addDiet(data) : updateDiet(data);
    close();
  };

  const totalCalories = myDiet.reduce((s, d) => s + Number(d.calories || 0), 0);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Daily Diet Plan</h1>
        <button className="btn" onClick={() => open(null)}>+ Add Meal</button>
      </div>

      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
        <div className="card"><p className="card-title">Total Meals</p><p className="card-value">{myDiet.length}</p></div>
        <div className="card"><p className="card-title">Daily Calories</p><p className="card-value">{totalCalories} kcal</p></div>
        <div className="card"><p className="card-title">Goal</p><p className="card-value" style={{ fontSize: 18 }}>2,500 kcal</p></div>
      </div>

      {myDiet.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
          <p>No diet plan yet. Click "+ Add Meal" to get started!</p>
        </div>
      )}

      <div className="grid-cards">
        {myDiet.map(d => (
          <div className="card" key={d.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3>{d.meal}</h3>
                {d.time && <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>{d.time}</p>}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => open(d)}>Edit</button>
                <button className="btn" style={{ padding: '4px 10px', fontSize: 12, background: '#ef4444' }} onClick={() => deleteDiet(d.id)}>✕</button>
              </div>
            </div>
            <p style={{ marginTop: 10, color: '#64748b', fontSize: 14 }}>{d.items}</p>
            {d.calories > 0 && (
              <p style={{ marginTop: 8, fontSize: 13, color: '#0284c7', fontWeight: 600 }}>{d.calories} kcal</p>
            )}
          </div>
        ))}
      </div>

      {modal && (
        <div style={overlay}>
          <div style={modalBox}>
            <h3 style={{ marginBottom: 16 }}>{modal === 'add' ? 'Add Meal' : 'Edit Meal'}</h3>
            <form onSubmit={submit}>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Meal</label>
                <select name="meal" value={form.meal} onChange={change} style={inputStyle}>
                  {MEALS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Time</label>
                <input name="time" value={form.time} onChange={change} type="time" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Food Items</label>
                <textarea name="items" value={form.items} onChange={change} required rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="e.g. 4 Egg Whites + Oatmeal" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Calories (kcal)</label>
                <input name="calories" value={form.calories} onChange={change} type="number" style={inputStyle} placeholder="e.g. 420" />
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
