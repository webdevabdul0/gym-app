import React from 'react';

export default function WorkoutPlan() {
  return (
    <div>
      <h1 className="page-title">My Workout Routine</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Exercise Name</th>
              <th>Sets & Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Monday</b></td>
              <td>Bench Press</td>
              <td>4 Sets x 12 Reps</td>
            </tr>
            <tr>
              <td><b>Tuesday</b></td>
              <td>Squats & Leg Press</td>
              <td>4 Sets x 10 Reps</td>
            </tr>
            <tr>
              <td><b>Wednesday</b></td>
              <td>Deadlift & Rows</td>
              <td>3 Sets x 8 Reps</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}