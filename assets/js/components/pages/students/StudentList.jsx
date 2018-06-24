import React from 'react';
import Link from 'react-router-dom/Link';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import { Circle, Student } from '../../../models';
import LoadingAnimation from '../../LoadingAnimation';
import StudentListRow from './StudentListRow';
import './StudentList.scss';

class StudentList extends React.Component {
  constructor(props) {
    super(props);

    this.cycleId = this.props.match.params.id;
    this.state = {
      isLoading: true,
      students: null,
    };
    this.onDelete = this.onDelete.bind(this);
    this.onAddPayment = this.onAddPayment.bind(this);
  }

  componentDidMount() {
    const resource = (this.cycleId) ?
      Circle.getStudents(this.cycleId) : Student.getAll();

    resource
      .then(students => this.setState({ students }))
      .finally(() => this.setState({ isLoading: false }));
  }

  onDelete(studentId) {
    const students = this.state.students.filter(s => s.id !== studentId);
    this.setState({ students });
  }

  onAddPayment(studentId, payment) {
    const { students } = this.state;
    const studentIndex = students.findIndex(s => s.id === studentId);
    students[studentIndex].payments.push(payment);
    this.setState({ students });
  }

  render() {
    const { isLoading, students } = this.state;
    if (isLoading) return <LoadingAnimation />;
    if (students === null) {
      return (
        <h3>
          Υπήρξε ένα πρόβλημα. Παρακαλώ δοκιμάστε να κάνετε ανανέωση τη σελίδα.<br />
          Εάν το πρόβλημα συνεχίσει να υπάρχει, επικοινωνήστε με τον υπεύθυνο λογισμικού του πανεπιστημίου.
        </h3>
      );
    }

    return (
      <div className='StudentList'>
        <div className='StudentList__header'>
          <h3>Φοιτητές</h3>
          {this.cycleId && (
            <Link to={`/circles/${this.cycleId}/new_students`}>
              <Button variant='fab' color='primary' aria-label='add'><AddIcon /></Button>
            </Link>
          )}
        </div>
        {students.length === 0 ? (
          <div>
            <p>Δεν υπάρχει κανένας καταχωρημένος φοιτητής εώς τώρα.
              {this.cycleId && (
                <div>
                  <br />
                  Για να εισάγεται νέο φοιτητή, πατήστε το κουμπί που βρίσκεται στα δεξιά.
                </div>
              )}
            </p>
            {!this.cycleId && (
              <ol>
                <li>Πηγαίνετε στη <Link to='/circles'>λίστα κύκλων</Link></li>
                <li>Επιλέξτε τον κύκλο που θέλετε να εγγράψετε τον νέο φοιτητή</li>
                <li>Στις ενέργειες του κύκλου, επιλέξτε "Προσθήκη φοιτητή"</li>
              </ol>
            )}
          </div>
        ) : (
          <Table className='StudentList__table'>
            <TableHead>
              <TableRow>
                <TableCell>ΟΝΟΜΑΤΕΠΩΝΥΜΟ</TableCell>
                <TableCell numeric>ΑΡ. ΜΗΤΡΩΟΥ</TableCell>
                {!this.cycleId && <TableCell>ΚΥΚΛΟΣ</TableCell>}
                <TableCell numeric>ΑΡΙΘΜΟΣ ΠΛΗΡΩΜΩΝ</TableCell>
                <TableCell numeric>ΣΥΝΟΛΟ ΠΛΗΡΩΜΩΝ</TableCell>
                <TableCell numeric>ΥΠΟΛΟΙΠΟ</TableCell>
                <TableCell numeric>ΗΜΕΡΟΜΗΝΙΑ ΚΑΤΑΧΩΡΗΣΗΣ</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(s => (
                <StudentListRow
                  key={s.id}
                  student={s}
                  onDelete={this.onDelete}
                  onAddPayment={this.onAddPayment}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

export default StudentList;
