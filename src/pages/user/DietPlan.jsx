import React from 'react';

export default function DietPlan() {
  return (
    <div>
      <h1 className="page-title">My Daily Diet Plan</h1>
      <div className="grid-cards">
        <div className="card">
          <h3>Breakfast</h3>
          <p style={{ marginTop: '8px', color: '#64748b' }}>4 Egg Whites + Oatmeal + Black Coffee</p>
        </div>
        <div className="card">
          <h3>Lunch</h3>
          <p style={{ marginTop: '8px', color: '#64748b' }}>200g Grilled Chicken + Brown Rice</p>
        </div>
        <div className="card">
          <h3>Dinner</h3>
          <p style={{ marginTop: '8px', color: '#64748b' }}>Fish / Mutton + Green Salad</p>
        </div>
      </div>
    </div>
  );
}