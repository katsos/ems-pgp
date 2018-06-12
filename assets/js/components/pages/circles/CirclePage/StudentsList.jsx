import React from 'react';
import { Link } from 'react-router-dom';

function StudentsList({ students, cycleId }) {
  if (students.length === 0) return (
    <div>
      <p>Δεν υπάρχουν καταχωρημένοι φοιτητές στο παρόν κύκλο.</p>
      <Link to={`/circles/${cycleId}/new_students`}>ΠΡΟΣΘΗΚΗ ΦΟΙΤΗΤΩΝ</Link>
    </div>
  );

  return (
    <table>
      <thead>
        <tr>
          <td>ΕΠΩΝΥΜΟ</td>
          <td>ΟΝΟΜΑ</td>
        </tr>
      </thead>
      <tbody>
      {students.map(({ id, name, surname }) => (
        <tr key={id}>
          <td>{surname}</td>
          <td>{name}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default StudentsList;
