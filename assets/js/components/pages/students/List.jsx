import React from 'react';
import moment from 'moment';
import sumBy from 'lodash/sumBy';
import Link from 'react-router-dom/Link';
import AddIcon from '@material-ui/icons/Add';
import { Button, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import Student from '../../../models/Student';
import LoadingAnimation from '../../LoadingAnimation';
import './StudentList.scss';

class Index extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      students: null,
    };
  }

  componentDidMount() {
    Student.getAll()
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
          <Link to='/students/new'>
            <Button variant='fab' color='primary' aria-label='add'><AddIcon /></Button>
          </Link>
        </div>
        {students.length === 0 ? (
          <p>Δεν υπάρχει κανένας καταχωρημένος φοιτητής εώς τώρα.<br />
            Πατήστε το κουμπί στα δεξιά για να εισάγετε νέο.
          </p>
        ) : (
          <Table className='StudentList__table'>
            <TableHead>
              <TableRow>
                <TableCell>ΟΝΟΜΑΤΕΠΩΝΥΜΟ</TableCell>
                <TableCell>ΚΥΚΛΟΣ</TableCell>
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
                  <TableCell>
                    <Link to={`/circles/${s.circle.id}`}>{s.circle.title}</Link>
                  </TableCell>
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

export default Index;
