import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const EMPTY = { day: 'Monday', exercise: '', sets: '' };

export default function WorkoutPlan() {
  const { myWorkouts, myProfile, addWorkout, updateWorkout, deleteWorkout } = useGym();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const open = (w) => { setForm(w ? { ...w } : { ...EMPTY, memberId: myProfile?.id }); setModal(w || 'add'); };
  const close = () => setModal(null);
  const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const data = { ...form, memberId: myProfile?.id };
    modal === 'add' ? addWorkout(data) : updateWorkout(data);
    close();
  };

  const grouped = DAYS.reduce((acc, day) => {
    const exercises = myWorkouts.filter(w => w.day === day);
    if (exercises.length) acc[day] = exercises;
    return acc;
  }, {});

  const totalExercises = myWorkouts.length;
  const activeDays = Object.keys(grouped).length;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Workout Routine</h1>
        <button className="btn" onClick={() => open(null)}>+ Add Exercise</button>
      </div>

      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
        <div className="card"><p className="card-title">Total Exercises</p><p className="card-value">{totalExercises}</p></div>
        <div className="card"><p className="card-title">Active Days</p><p className="card-value">{activeDays}</p></div>
        <div className="card"><p className="card-title">Rest Days</p><p className="card-value">{7 - activeDays}</p></div>
      </div>

      {Object.keys(grouped).length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
          <p>No workout plan yet. Click "+ Add Exercise" to get started!</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Object.entries(grouped).map(([day, exercises]) => (
          <div className="card" key={day}>
            <h3 style={{ marginBottom: 12, color: '#0284c7' }}>{day}</h3>
            <div className="table-container" style={{ margin: 0 }}>
              <table>
                <thead><tr><th>Exercise</th><th>Sets & Reps</th><th>Actions</th></tr></thead>
                <tbody>
                  {exercises.map(w => (
                    <tr key={w.id}>
                      <td><b>{w.exercise}</b></td>
                      <td>{w.sets}</td>
                      <td>
                        <button className="btn" style={{ padding: '4px 12px', fontSize: 13, marginRight: 6 }} onClick={() => open(w)}>Edit</button>
                        <button className="btn" style={{ padding: '4px 12px', fontSize: 13, background: '#ef4444' }} onClick={() => deleteWorkout(w.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div style={overlay}>
          <div style={modalBox}>
            <h3 style={{ marginBottom: 16 }}>{modal === 'add' ? 'Add Exercise' : 'Edit Exercise'}</h3>
            <form onSubmit={submit}>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Day</label>
                <select name="day" value={form.day} onChange={change} style={inputStyle}>
                  {DAYS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Exercise Name</label>
                <input name="exercise" value={form.exercise} onChange={change} required style={inputStyle} placeholder="e.g. Bench Press" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Sets & Reps</label>
                <input name="sets" value={form.sets} onChange={change} required style={inputStyle} placeholder="e.g. 4 Sets x 12 Reps" />
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
