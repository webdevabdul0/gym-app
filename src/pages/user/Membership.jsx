import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Membership() {
  const [searchParams] = useSearchParams();

  // Get selected plan from Home page
  const selectedPlan = searchParams.get('plan') || 'Gold';

  const planDetails = {
    Basic: {
      price: 'Rs 3,000',
      expiry: '2026-04-15',
    },

    Gold: {
      price: 'Rs 7,000',
      expiry: '2026-04-15',
    },

    Premium: {
      price: 'Rs 10,000',
      expiry: '2026-04-15',
    },
  };

  const currentPlan = planDetails[selectedPlan] || planDetails.Gold;

  return (
    <div>
      <h1 className="page-title">
        Membership Status
      </h1>

      <div
        className="card"
        style={{ maxWidth: '400px' }}
      >
        <h3>
          {selectedPlan} Subscription
        </h3>

        <p style={{ marginTop: '10px' }}>
          Status:{' '}
          <span className="badge badge-success">
            Active
          </span>
        </p>

        <p
          style={{
            marginTop: '6px',
            color: '#64748b',
          }}
        >
          Plan Price: {currentPlan.price}
        </p>

        <p
          style={{
            marginTop: '6px',
            color: '#64748b',
          }}
        >
          Expiry Date: {currentPlan.expiry}
        </p>

        <button
          className="btn"
          style={{
            marginTop: '16px',
            width: '100%',
          }}
        >
          Renew Plan
        </button>
      </div>
    </div>
  );
}
