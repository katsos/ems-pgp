import React from 'react';
import { Link } from 'react-router-dom';

function StudentsList({ students, cycleId }) {
  if (students.length === 0) return (
    <div>
      <p>Δεν υπάρχουν καταχωρημένοι φοιτητές στο παρόν κύκλο.</p>
      <Link to={`/cirlces/${cycleId}/new_students`}>ΠΡΟΣΘΗΚΗ ΦΟΙΤΗΤΩΝ</Link>
    </div>
  );

  return (
      <table>
        <tbody>
        {students.map(s => (
          <tr key={s.id}>
            <td>s.id</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
}

export default StudentsList;
