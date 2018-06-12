import React from 'react';
import { Link } from 'react-router-dom';
import StudentListRow from './StudentListRow';

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
        <th>Επώνυμο</th>
        <th>Όνομα</th>
        <th/>
      </tr>
      </thead>
      <tbody>
        {students.map(s => <StudentListRow key={s.id} student={s}/>)}
      </tbody>
    </table>
  );
}

export default StudentsList;
