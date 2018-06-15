import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { Button, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';

import { Circle } from '../../../models';
import LoadingAnimation from '../../LoadingAnimation';
import './CircleList.scss';

class CircleList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      circles: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    Circle.getAll()
      .then(circles => this.setState({ circles }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { circles, isLoading } = this.state;
    if (isLoading) return <LoadingAnimation />;

    return (
      <div className='CircleList'>
        <div className='CircleList__header'>
          <h3>Κύκλοι</h3>
          <Link to='/circles/new'>
            <Button variant='fab' color='primary' aria-label='add'><AddIcon /></Button>
          </Link>
        </div>
        {circles.length === 0 ? (
          <p>Δεν έχει καταχωρηθει κανένας κύκλος εώς τώρα.<br />
            Πατήστε το κουμπί στα δεξιά για να εισάγετε νέο.
          </p>
        ) : (
          <Table className='CircleList__table'>
            <TableHead>
              <TableRow>
                <TableCell>ΚΩΔΙΚΟΣ</TableCell>
                <TableCell>ΤΙΤΛΟΣ</TableCell>
                <TableCell numeric>ΠΟΣΟ ΧΡΗΜΑΤΟΔΟΤΗΣΗΣ</TableCell>
                <TableCell numeric>ΕΣΟΔΑ</TableCell>
                <TableCell numeric>ΕΞΟΔΑ</TableCell>
                <TableCell numeric>ΑΡΙΘΜΟΣ ΦΟΙΤΗΤΩΝ</TableCell>
                <TableCell numeric>ΗΜΕΡΟΜΗΝΙΑ ΔΗΜΙΟΥΡΓΙΑΣ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {circles.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>
                     <Link to={`/circles/${c.id}`}>{c.title}</Link>
                  </TableCell>
                  <TableCell numeric>{c.total_outcome_expectation}</TableCell>
                  <TableCell numeric>{c.total_income}</TableCell>
                  <TableCell numeric>{c.total_outcome}</TableCell>
                  <TableCell numeric>{c.students.length}</TableCell>
                  <TableCell numeric>{moment(c.created_at).format('L')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

export default CircleList;
