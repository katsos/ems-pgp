import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import Button from '@material-ui/core/Button';
import Student from '../../../models/Student';
import LoadingAnimation from '../../LoadingAnimation';
import './StudentPage.scss';
import PaymentList from '../../PaymentList';

class StudentPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.studentId = this.props.match.params.id;
    const { student = null } = this.props.location.state || {};
    this.state = {
      isLoading: true,
      student,
    };
    this.fetchStudent = this.fetchStudent.bind(this);
  }

  componentDidMount() {
    if (this.state.student !== null) return this.setState({ isLoading: false });
    this.fetchStudent();
  }

  fetchStudent() {
    Student.get(this.studentId)
      .then(student => this.setState({ student }))
      .catch(console.error) // TODO
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    if (this.state.isLoading) return <LoadingAnimation />;

    const { student, student: { circle } } = this.state;
    if (student === null) return <h3>There was a problem while fetching student data.</h3>;

    return (
      <div className='StudentPage'>
        <div className='StudentPage__header'>
          <h4>{`${student.surname} ${student.name} #${student.id}`}</h4>
          <Link to={`/students/${student.id}/edit`}>
            <Button className='StudentPage__edit'>Edit</Button>
          </Link>
        </div>

        <p>Ανήκει στον κύκλο <Link to={`/circles/${circle.id}`}>{`"${circle.title}"`}</Link></p>
        <PaymentList student={student} afterAction={this.fetchStudent} />
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
