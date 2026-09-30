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
  { id: 1, name: 'Ali Ahmed', email: 'ali@example.com', phone: '0300-1234567', plan: 'Gold Plan', status: 'Active', joined: '2026-07-15', trainerId: 1, membershipId: 'GYM-0089', expiryDate: '2026-12-31' },
  { id: 2, name: 'Usman Khan', email: 'usman@example.com', phone: '0312-9876543', plan: 'Silver Plan', status: 'Pending', joined: '2026-08-20', trainerId: 2, membershipId: 'GYM-0090', expiryDate: '2026-11-30' },
  { id: 3, name: 'Sara Malik', email: 'sara@example.com', phone: '0321-5554443', plan: 'Basic Plan', status: 'Active', joined: '2026-09-05', trainerId: 1, membershipId: 'GYM-0091', expiryDate: '2026-10-05' },
  { id: 4, name: 'Farhan Raza', email: 'farhan@example.com', phone: '0333-1112223', plan: 'Gold Plan', status: 'Active', joined: '2026-09-18', trainerId: 2, membershipId: 'GYM-0092', expiryDate: '2026-12-18' },
  { id: 5, name: 'Hina Baig', email: 'hina@example.com', phone: '0345-6667778', plan: 'Silver Plan', status: 'Active', joined: '2026-09-22', trainerId: 1, membershipId: 'GYM-0093', expiryDate: '2026-12-22' },
];

const PAYMENTS_DEFAULT = [
  { id: 101, member: 'Ali Ahmed', memberId: 1, amount: 7000, date: '2026-07-15', status: 'Paid', plan: 'Gold Plan' },
  { id: 102, member: 'Ali Ahmed', memberId: 1, amount: 7000, date: '2026-08-15', status: 'Paid', plan: 'Gold Plan' },
  { id: 103, member: 'Ali Ahmed', memberId: 1, amount: 7000, date: '2026-09-15', status: 'Paid', plan: 'Gold Plan' },
  { id: 104, member: 'Usman Khan', memberId: 2, amount: 5000, date: '2026-08-20', status: 'Paid', plan: 'Silver Plan' },
  { id: 105, member: 'Usman Khan', memberId: 2, amount: 5000, date: '2026-09-20', status: 'Pending', plan: 'Silver Plan' },
  { id: 106, member: 'Sara Malik', memberId: 3, amount: 3000, date: '2026-09-05', status: 'Paid', plan: 'Basic Plan' },
  { id: 107, member: 'Farhan Raza', memberId: 4, amount: 7000, date: '2026-09-18', status: 'Paid', plan: 'Gold Plan' },
  { id: 108, member: 'Hina Baig', memberId: 5, amount: 5000, date: '2026-09-22', status: 'Paid', plan: 'Silver Plan' },
];

const ATTENDANCE_DEFAULT = [
  { id: 1, memberId: 1, member: 'Ali Ahmed', date: '2026-09-28', checkIn: '06:30 AM', status: 'Present' },
  { id: 2, memberId: 1, member: 'Ali Ahmed', date: '2026-09-29', checkIn: '07:00 AM', status: 'Present' },
  { id: 3, memberId: 1, member: 'Ali Ahmed', date: '2026-09-30', checkIn: '06:45 AM', status: 'Present' },
  { id: 4, memberId: 2, member: 'Usman Khan', date: '2026-09-30', checkIn: '--', status: 'Absent' },
  { id: 5, memberId: 3, member: 'Sara Malik', date: '2026-09-30', checkIn: '07:15 AM', status: 'Present' },
  { id: 6, memberId: 4, member: 'Farhan Raza', date: '2026-09-30', checkIn: '08:00 AM', status: 'Present' },
  { id: 7, memberId: 5, member: 'Hina Baig', date: '2026-09-30', checkIn: '07:45 AM', status: 'Present' },
];

const WORKOUT_DEFAULT = [
  { id: 1, memberId: 1, day: 'Monday', exercise: 'Bench Press', sets: '4 Sets x 12 Reps' },
  { id: 2, memberId: 1, day: 'Tuesday', exercise: 'Squats & Leg Press', sets: '4 Sets x 10 Reps' },
  { id: 3, memberId: 1, day: 'Wednesday', exercise: 'Deadlift & Rows', sets: '3 Sets x 8 Reps' },
  { id: 4, memberId: 1, day: 'Thursday', exercise: 'Shoulder Press', sets: '4 Sets x 12 Reps' },
  { id: 5, memberId: 1, day: 'Friday', exercise: 'Pull-ups & Bicep Curls', sets: '3 Sets x 10 Reps' },
  { id: 6, memberId: 1, day: 'Saturday', exercise: 'Cardio & Core', sets: '30 min' },
];

const DIET_DEFAULT = [
  { id: 1, memberId: 1, meal: 'Breakfast', time: '07:00 AM', items: '4 Egg Whites + Oatmeal + Black Coffee', calories: 420 },
  { id: 2, memberId: 1, meal: 'Mid-Morning', time: '10:00 AM', items: 'Banana + Protein Shake', calories: 280 },
  { id: 3, memberId: 1, meal: 'Lunch', time: '01:00 PM', items: '200g Grilled Chicken + Brown Rice', calories: 550 },
  { id: 4, memberId: 1, meal: 'Pre-Workout', time: '04:30 PM', items: 'Apple + Peanut Butter', calories: 200 },
  { id: 5, memberId: 1, meal: 'Dinner', time: '08:00 PM', items: 'Fish / Mutton + Green Salad', calories: 480 },
];

const CURRENT_USER_DEFAULT = { memberId: 1 };

const DATA_VERSION = 'v2';

function load(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// Clear stale data if version changed
if (localStorage.getItem('gym_data_version') !== DATA_VERSION) {
  ['gym_members','gym_trainers','gym_plans','gym_payments','gym_attendance','gym_workouts','gym_diet'].forEach(k => localStorage.removeItem(k));
  localStorage.setItem('gym_data_version', DATA_VERSION);
}

const GymContext = createContext(null);

export function GymProvider({ children }) {
  const [members, setMembers] = useState(() => load('gym_members', MEMBERS_DEFAULT));
  const [trainers, setTrainers] = useState(() => load('gym_trainers', TRAINERS_DEFAULT));
  const [plans, setPlans] = useState(() => load('gym_plans', PLANS_DEFAULT));
  const [payments, setPayments] = useState(() => load('gym_payments', PAYMENTS_DEFAULT));
  const [attendance, setAttendance] = useState(() => load('gym_attendance', ATTENDANCE_DEFAULT));
  const [workouts, setWorkouts] = useState(() => load('gym_workouts', WORKOUT_DEFAULT));
  const [diet, setDiet] = useState(() => load('gym_diet', DIET_DEFAULT));
  const [currentUser] = useState(() => load('gym_current_user', CURRENT_USER_DEFAULT));

  useEffect(() => save('gym_members', members), [members]);
  useEffect(() => save('gym_trainers', trainers), [trainers]);
  useEffect(() => save('gym_plans', plans), [plans]);
  useEffect(() => save('gym_payments', payments), [payments]);
  useEffect(() => save('gym_attendance', attendance), [attendance]);
  useEffect(() => save('gym_workouts', workouts), [workouts]);
  useEffect(() => save('gym_diet', diet), [diet]);

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

  // Workouts
  const addWorkout = (w) => setWorkouts(p => [...p, { ...w, id: nextId(p) }]);
  const updateWorkout = (w) => setWorkouts(p => p.map(x => x.id === w.id ? w : x));
  const deleteWorkout = (id) => setWorkouts(p => p.filter(x => x.id !== id));

  // Diet
  const addDiet = (d) => setDiet(p => [...p, { ...d, id: nextId(p) }]);
  const updateDiet = (d) => setDiet(p => p.map(x => x.id === d.id ? d : x));
  const deleteDiet = (id) => setDiet(p => p.filter(x => x.id !== id));

  // Derived stats
  const stats = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === 'Active').length,
    activeTrainers: trainers.length,
    monthlyRevenue: payments.filter(p => p.status === 'Paid').reduce((s, p) => s + Number(p.amount), 0),
    dailyAttendance: attendance.filter(a => a.status === 'Present').length,
    pendingPayments: payments.filter(p => p.status === 'Pending').length,
  };

  // Current logged-in member data
  const myProfile = members.find(m => m.id === currentUser.memberId) || members[0];
  const myPlan = plans.find(p => p.name === myProfile?.plan);
  const myTrainer = trainers.find(t => t.id === myProfile?.trainerId);
  const myAttendance = attendance.filter(a => a.memberId === myProfile?.id);
  const myPayments = payments.filter(p => p.memberId === myProfile?.id);
  const myWorkouts = workouts.filter(w => w.memberId === myProfile?.id);
  const myDiet = diet.filter(d => d.memberId === myProfile?.id);
  const myDaysActive = myAttendance.filter(a => a.status === 'Present').length;

  return (
    <GymContext.Provider value={{
      members, addMember, updateMember, deleteMember,
      trainers, addTrainer, updateTrainer, deleteTrainer,
      plans, addPlan, updatePlan, deletePlan,
      payments, addPayment, updatePayment, deletePayment,
      attendance, addAttendance, updateAttendance, deleteAttendance,
      workouts, addWorkout, updateWorkout, deleteWorkout,
      diet, addDiet, updateDiet, deleteDiet,
      stats,
      myProfile, myPlan, myTrainer, myAttendance, myPayments,
      myWorkouts, myDiet, myDaysActive,
    }}>
      {children}
    </GymContext.Provider>
  );
}

export const useGym = () => useContext(GymContext);
