import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMembers from './pages/admin/AdminMembers';
import AdminPayments from './pages/admin/AdminPayments';
import AdminPlans from './pages/admin/AdminPlans';
import AdminReports from './pages/admin/AdminReports';
import AdminTrainers from './pages/admin/AdminTrainers';
import Attendance from './pages/user/Attendance';
import DietPlan from './pages/user/DietPlan';
import Membership from './pages/user/Membership';
import Profile from './pages/user/Profile';
import UserDashboard from './pages/user/UserDashboard';
import WorkoutPlan from './pages/user/WorkoutPlan';
import './App.css';

const adminLinks = [
  ['/admin/dashboard', '▦', 'Overview'], ['/admin/members', '♙', 'Members'], ['/admin/trainers', '✦', 'Trainers'],
  ['/admin/plans', '◇', 'Plans'], ['/admin/payments', '◈', 'Payments'], ['/admin/attendance', '◷', 'Attendance'], ['/admin/reports', '▤', 'Reports'],
];
const userLinks = [
  ['/user/dashboard', '▦', 'Overview'], ['/user/profile', '♙', 'My Profile'], ['/user/workout', '◈', 'Workout Plan'],
  ['/user/diet', '◇', 'Diet Plan'], ['/user/attendance', '◷', 'Attendance'], ['/user/membership', '✦', 'Membership'],
];

function PortalLayout({ type, children }) {
  const isAdmin = type === 'admin';
  const links = isAdmin ? adminLinks : userLinks;
  const title = isAdmin ? 'Admin Console' : 'Member Portal';
  const subtitle = isAdmin ? 'Gym operations & management' : 'Your fitness journey';

  return <div className="portal-layout">
    <aside className="portal-sidebar">
      <Link to="/" className="portal-brand"><span>⚡</span><div>IRON<span>HUB</span><small>{title}</small></div></Link>
      <div className="portal-role"><span className={isAdmin ? 'role-dot admin-dot' : 'role-dot'}></span>{subtitle}</div>
      <nav className="portal-nav">
        <p>{isAdmin ? 'MANAGEMENT' : 'MY FITNESS'}</p>
        {links.map(([path, icon, label]) => <NavLink key={path} to={path}><i>{icon}</i>{label}</NavLink>)}
      </nav>
      <div className="sidebar-bottom"><Link to="/">← Back to website</Link></div>
    </aside>
    <div className="portal-main">
      <header className="portal-header"><div><span className="header-kicker">IRONHUB / {isAdmin ? 'ADMIN' : 'MEMBER'}</span><h3>{isAdmin ? 'Management Dashboard' : 'Welcome back, Ali'}</h3></div><div className="header-user"><div className="avatar">{isAdmin ? 'AD' : 'AA'}</div><div><b>{isAdmin ? 'Administrator' : 'Ali Ahmed'}</b><small>{isAdmin ? 'System Admin' : 'Gold Member'}</small></div></div></header>
      <main className="portal-content">{children}</main>
    </div>
  </div>;
}

function AppRoutes() {
  const location = useLocation();
  if (location.pathname === '/') return <Home />;
  const isAdmin = location.pathname.startsWith('/admin');
  return <PortalLayout type={isAdmin ? 'admin' : 'user'}><Routes>
    <Route path="/admin/dashboard" element={<AdminDashboard />} /><Route path="/admin/members" element={<AdminMembers />} /><Route path="/admin/trainers" element={<AdminTrainers />} /><Route path="/admin/plans" element={<AdminPlans />} /><Route path="/admin/payments" element={<AdminPayments />} /><Route path="/admin/attendance" element={<AdminAttendance />} /><Route path="/admin/reports" element={<AdminReports />} />
    <Route path="/user/dashboard" element={<UserDashboard />} /><Route path="/user/profile" element={<Profile />} /><Route path="/user/workout" element={<WorkoutPlan />} /><Route path="/user/diet" element={<DietPlan />} /><Route path="/user/attendance" element={<Attendance />} /><Route path="/user/membership" element={<Membership />} />
    <Route path="*" element={<Home />} />
  </Routes></PortalLayout>;
}

export default function App() { return <Router><AppRoutes /></Router>; }
