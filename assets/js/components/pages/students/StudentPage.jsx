import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import Student from '../../../models/Student';
import LoadingAnimation from '../../LoadingAnimation';
import PaymentList from '../../PaymentList';
import PaymentDialog from '../../PaymentDialog';
import StudentActionsMenu from './StudentActionsMenu';
import './StudentPage.scss';

class StudentPage extends React.Component {
  constructor(props) {
    super(props);

    this.studentId = this.props.match.params.id;
    const { student = null } = this.props.location.state || {};
    this.state = {
      isLoading: true,
      isPaymentDialogOpen: false,
      student,
    };
    this.onAction = this.onAction.bind(this);
    this.onAddPayment = this.onAddPayment.bind(this);
    this.fetchStudent = this.fetchStudent.bind(this);
  }

  componentDidMount() {
    if (this.state.student !== null) return this.setState({ isLoading: false });
    this.fetchStudent();
  }

  onAction(action) {
    switch (action) {
      case 'edit':
        return this.props.history.push(`/students/${this.studentId}/edit`);
      case 'delete':
        return Student.delete(this.studentId)
          .then(() => this.props.history.push('/circles'));
      case 'payment':
        this.setState({ isPaymentDialogOpen: true });
    }
  }

  onAddPayment(payment) {
    const { student } = this.state;
    const payments = [...student.payments, payment];
    Object.assign(student, { payments });
    this.setState({ student, isPaymentDialogOpen: false });
  }

  fetchStudent() {
    Student.get(this.studentId)
      .then(student => this.setState({ student }))
      .catch(console.error) // TODO
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    if (this.state.isLoading) return <LoadingAnimation />;

    const { student, student: { circle }, isPaymentDialogOpen } = this.state;
    if (student === null) return <h3>There was a problem while fetching student data.</h3>;

    return (
      <div className='StudentPage'>
        <div className='StudentPage__header'>
          <h4>{`${student.surname} ${student.name} #${student.id}`}</h4>
          <StudentActionsMenu onSelect={this.onAction} />
        </div>

        <p>Ανήκει στον κύκλο <Link to={`/circles/${circle.id}`}>{`"${circle.title}"`}</Link></p>

        {Boolean(student.payments.length) && <PaymentList student={student} afterAction={this.fetchStudent} />}

        <PaymentDialog
          isOpen={isPaymentDialogOpen}
          student={student}
          onConfirm={this.onAddPayment}
          onCancel={() => this.setState({ isPaymentDialogOpen: false })}
        />
      </div>
    );
  }
}

StudentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      student: PropTypes.shape({
        id: PropTypes.number.isRequired,
        surname: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        circle: PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
        }),
      }),
    }),
  }),
};

export default StudentPage;
