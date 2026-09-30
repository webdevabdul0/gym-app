import React from 'react';
import { Link } from 'react-router-dom';

const programs = [
  {
    icon: '🏋️',
    title: 'Strength Training',
    text: 'Build strength with structured workouts designed for steady progress.',
  },
  {
    icon: '🔥',
    title: 'Fat Loss & Cardio',
    text: 'Improve endurance and support your fitness goals with focused cardio.',
  },
  {
    icon: '🥗',
    title: 'Nutrition Plans',
    text: 'Follow practical meal plans that complement your training routine.',
  },
];

const plans = [
  {
    name: 'Basic',
    price: '3,000',
    features: ['Gym access', 'Locker room', 'Basic workout plan'],
  },
  {
    name: 'Gold',
    price: '7,000',
    features: ['Full gym access', 'Trainer support', 'Workout + diet plan'],
    featured: true,
  },
  {
    name: 'Premium',
    price: '10,000',
    features: ['Everything in Gold', 'Personal coaching', 'Priority support'],
  },
];

export default function Home() {
  return (
    <div className="home-page">

      {/* Navigation */}
      <header className="home-nav">
        <Link className="home-brand" to="/">
          <span className="brand-mark">⚡</span>
          <span>
            IRON<span>HUB</span>
          </span>
        </Link>

        <nav className="home-links">
          <a href="#about">About</a>
          <a href="#programs">Programs</a>
          <a href="#plans">Membership</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <Link className="nav-login" to="/user/dashboard">
            Member Login
          </Link>

          <Link className="nav-admin" to="/admin/dashboard">
            Admin Portal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">
            TRAIN HARD • STAY CONSISTENT • GET STRONG
          </p>

          <h1>
            Build a stronger
            <br />
            <span>version of you.</span>
          </h1>

          <p className="hero-copy">
            A complete fitness management experience for memberships,
            workouts, attendance and progress — all in one place.
          </p>

          <div className="hero-buttons">
            <a className="primary-btn" href="#plans">
              Explore Memberships <span>→</span>
            </a>

            <a className="ghost-btn" href="#programs">
              Explore Programs
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>500+</strong>
              <span>Members</span>
            </div>

            <div>
              <strong>12</strong>
              <span>Expert Trainers</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Gym Access</span>
            </div>
          </div>
        </div>

        <div className="hero-badge">
          <span>01</span>

          <div>
            <b>YOUR FITNESS</b>
            <small>OUR COMMITMENT</small>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="section-label">
          WHY IRONHUB
        </div>

        <div className="about-grid">
          <div>
            <h2>
              Everything you need to
              <br />
              <span>train smarter.</span>
            </h2>
          </div>

          <div>
            <p className="section-lead">
              IRONHUB brings the everyday gym experience into one simple
              management system. Members can keep track of their plans and
              progress while staff manage the gym from a dedicated admin portal.
            </p>

            <div className="feature-row">
              <span>01</span>
              <b>Personalized plans</b>
              <p>
                Workout and diet information stays organized in your member portal.
              </p>
            </div>

            <div className="feature-row">
              <span>02</span>
              <b>Simple management</b>
              <p>
                Manage members, trainers, payments and attendance from one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="section dark-section">
        <div className="section-head">
          <div>
            <div className="section-label">
              WHAT WE OFFER
            </div>

            <h2>
              Programs built for <span>progress.</span>
            </h2>
          </div>

          <p>
            Choose a routine that matches your goals and keep your progress organized.
          </p>
        </div>

        <div className="program-grid">
          {programs.map((item, index) => (
            <div className="program-card" key={item.title}>
              <div className="program-number">
                0{index + 1}
              </div>

              <div className="program-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <a href="#plans">
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Plans */}
      <section id="plans" className="section plans-section">
        <div className="section-head">
          <div>
            <div className="section-label">
              MEMBERSHIP
            </div>

            <h2>
              Choose your <span>plan.</span>
            </h2>
          </div>

          <p>
            Flexible options for different training needs.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              className={`plan-card ${
                plan.featured ? 'featured-plan' : ''
              }`}
              key={plan.name}
            >

              {plan.featured && (
                <div className="popular-tag">
                  MOST POPULAR
                </div>
              )}

              <h3>{plan.name}</h3>

              <div className="plan-price">
                <span>Rs</span>
                {plan.price}
                <small>/ month</small>
              </div>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>

              {/* Selected plan is now sent to Membership page */}
              <Link
                className={
                  plan.featured
                    ? 'primary-btn full-btn'
                    : 'outline-btn full-btn'
                }
                to={`/user/membership?plan=${plan.name}`}
              >
                Choose {plan.name}
              </Link>

            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div>
          <div className="section-label">
            READY TO START?
          </div>

          <h2>
            Your next chapter
            <br />
            <span>starts today.</span>
          </h2>
        </div>

        <Link className="primary-btn" to="/user/dashboard">
          Enter Member Portal →
        </Link>
      </section>

      {/* Footer */}
      <footer id="contact" className="home-footer">
        <div className="home-brand">
          <span className="brand-mark">⚡</span>

          <span>
            IRON<span>HUB</span>
          </span>
        </div>

        <p>
          Gym & Fitness Management System
        </p>

        <div>
          <Link to="/user/dashboard">
            Member Portal
          </Link>

          <Link to="/admin/dashboard">
            Admin Portal
          </Link>
        </div>

        <small>
          © 2026 IRONHUB. All rights reserved.
        </small>
      </footer>

    </div>
  );
}
