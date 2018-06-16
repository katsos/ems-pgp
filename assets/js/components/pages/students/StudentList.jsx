import React from 'react';
import moment from 'moment';
import sumBy from 'lodash/sumBy';
import Link from 'react-router-dom/Link';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import { Circle, Student } from '../../../models';
import LoadingAnimation from '../../LoadingAnimation';
import './StudentList.scss';

class StudentList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.cycleId = this.props.match.params.id;
    this.state = {
      isLoading: true,
      students: null,
    };
  }

  componentDidMount() {
    const resource = (this.cycleId) ?
      Circle.getStudents(this.cycleId) : Student.getAll();

    resource
      .then(students => this.setState({ students }))
      .finally(() => this.setState({ isLoading: false }));
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
                {!this.cycleId && <TableCell>ΚΥΚΛΟΣ</TableCell>}
                <TableCell numeric>ΑΡΙΘΜΟΣ ΠΛΗΡΩΜΩΝ</TableCell>
                <TableCell numeric>ΣΥΝΟΛΟ ΠΛΗΡΩΜΩΝ</TableCell>
                <TableCell numeric>ΥΠΟΛΟΙΠΟ</TableCell>
                <TableCell numeric>ΗΜΕΡΟΜΗΝΙΑ ΚΑΤΑΧΩΡΗΣΗΣ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(s => (
                <TableRow key={s.id}>
                  <TableCell>
                    <Link to={`/students/${s.id}`}>{`${s.surname} ${s.name}`}</Link>
                  </TableCell>
                  {!this.cycleId && (
                    <TableCell>
                      <Link to={`/circles/${s.circle.id}`}>{s.circle.title}</Link>
                    </TableCell>
                  )}
                  <TableCell numeric>{s.payments.length}</TableCell>
                  <TableCell numeric>{sumBy(s.payments, 'amount')}</TableCell>
                  <TableCell numeric>{s.circle.tuition - sumBy(s.payments, 'amount')}</TableCell>
                  <TableCell numeric>{moment(s.created_at).format('L')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

export default StudentList;
