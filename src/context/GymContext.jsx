import React, { createContext, useContext, useState, useEffect } from 'react';

const PLANS_DEFAULT = [
  { id: 1, name: 'Basic Plan', price: 3000, duration: 'Monthly', features: ['Gym Access', 'Locker Room'] },
  { id: 2, name: 'Silver Plan', price: 5000, duration: 'Monthly', features: ['Full Gym Access', 'Locker Room', 'Cardio Zone'] },
  { id: 3, name: 'Gold Plan', price: 7000, duration: 'Monthly', features: ['Full Gym Access', 'Trainer Sessions', 'Diet Plan', 'Locker Room'] },
];

const TRAINERS_DEFAULT = [
  { id: 1, name: 'Hamza Malik', specialty: 'Bodybuilding Specialist', experience: '5 Years', phone: '0300-1234567' },
  { id: 2, name: 'Bilal Hassan', specialty: 'CrossFit & Cardio', experience: '3 Years', phone: '0312-9876543' },
];

const MEMBERS_DEFAULT = [
  { id: 1, name: 'Ali Ahmed', email: 'ali@example.com', plan: 'Gold', status: 'Active', joined: '2026-01-15' },
  { id: 2, name: 'Usman Khan', email: 'usman@example.com', plan: 'Silver', status: 'Pending', joined: '2026-02-20' },
  { id: 3, name: 'Sara Malik', email: 'sara@example.com', plan: 'Basic', status: 'Active', joined: '2026-03-01' },
  { id: 4, name: 'Farhan Raza', email: 'farhan@example.com', plan: 'Gold', status: 'Active', joined: '2026-03-10' },
];

const PAYMENTS_DEFAULT = [
  { id: 101, member: 'Ali Ahmed', amount: 7000, date: '2026-03-01', status: 'Paid', plan: 'Gold' },
  { id: 102, member: 'Usman Khan', amount: 5000, date: '2026-03-05', status: 'Pending', plan: 'Silver' },
  { id: 103, member: 'Sara Malik', amount: 3000, date: '2026-03-08', status: 'Paid', plan: 'Basic' },
  { id: 104, member: 'Farhan Raza', amount: 7000, date: '2026-03-10', status: 'Paid', plan: 'Gold' },
];

const ATTENDANCE_DEFAULT = [
  { id: 1, memberId: 1, member: 'Ali Ahmed', date: '2026-09-30', checkIn: '06:30 AM', status: 'Present' },
  { id: 2, memberId: 2, member: 'Usman Khan', date: '2026-09-30', checkIn: '--', status: 'Absent' },
  { id: 3, memberId: 3, member: 'Sara Malik', date: '2026-09-30', checkIn: '07:15 AM', status: 'Present' },
  { id: 4, memberId: 4, member: 'Farhan Raza', date: '2026-09-30', checkIn: '08:00 AM', status: 'Present' },
];

function load(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

const GymContext = createContext(null);

export function GymProvider({ children }) {
  const [members, setMembers] = useState(() => load('gym_members', MEMBERS_DEFAULT));
  const [trainers, setTrainers] = useState(() => load('gym_trainers', TRAINERS_DEFAULT));
  const [plans, setPlans] = useState(() => load('gym_plans', PLANS_DEFAULT));
  const [payments, setPayments] = useState(() => load('gym_payments', PAYMENTS_DEFAULT));
  const [attendance, setAttendance] = useState(() => load('gym_attendance', ATTENDANCE_DEFAULT));

  useEffect(() => save('gym_members', members), [members]);
  useEffect(() => save('gym_trainers', trainers), [trainers]);
  useEffect(() => save('gym_plans', plans), [plans]);
  useEffect(() => save('gym_payments', payments), [payments]);
  useEffect(() => save('gym_attendance', attendance), [attendance]);

  const nextId = (arr) => Math.max(0, ...arr.map(i => i.id)) + 1;

  // Members
  const addMember = (m) => setMembers(p => [...p, { ...m, id: nextId(p) }]);
  const updateMember = (m) => setMembers(p => p.map(x => x.id === m.id ? m : x));
  const deleteMember = (id) => setMembers(p => p.filter(x => x.id !== id));

  // Trainers
  const addTrainer = (t) => setTrainers(p => [...p, { ...t, id: nextId(p) }]);
  const updateTrainer = (t) => setTrainers(p => p.map(x => x.id === t.id ? t : x));
  const deleteTrainer = (id) => setTrainers(p => p.filter(x => x.id !== id));

  // Plans
  const addPlan = (pl) => setPlans(p => [...p, { ...pl, id: nextId(p) }]);
  const updatePlan = (pl) => setPlans(p => p.map(x => x.id === pl.id ? pl : x));
  const deletePlan = (id) => setPlans(p => p.filter(x => x.id !== id));

  // Payments
  const addPayment = (py) => setPayments(p => [...p, { ...py, id: nextId(p) }]);
  const updatePayment = (py) => setPayments(p => p.map(x => x.id === py.id ? py : x));
  const deletePayment = (id) => setPayments(p => p.filter(x => x.id !== id));

  // Attendance
  const addAttendance = (a) => setAttendance(p => [...p, { ...a, id: nextId(p) }]);
  const updateAttendance = (a) => setAttendance(p => p.map(x => x.id === a.id ? a : x));
  const deleteAttendance = (id) => setAttendance(p => p.filter(x => x.id !== id));

  // Derived stats
  const stats = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === 'Active').length,
    activeTrainers: trainers.length,
    monthlyRevenue: payments.filter(p => p.status === 'Paid').reduce((s, p) => s + Number(p.amount), 0),
    dailyAttendance: attendance.filter(a => a.status === 'Present').length,
    pendingPayments: payments.filter(p => p.status === 'Pending').length,
  };

  return (
    <GymContext.Provider value={{
      members, addMember, updateMember, deleteMember,
      trainers, addTrainer, updateTrainer, deleteTrainer,
      plans, addPlan, updatePlan, deletePlan,
      payments, addPayment, updatePayment, deletePayment,
      attendance, addAttendance, updateAttendance, deleteAttendance,
      stats,
    }}>
      {children}
    </GymContext.Provider>
  );
}

export const useGym = () => useContext(GymContext);
