import React from "react";
import { Link } from 'react-router-dom';
import LoadingAnimation from "../../LoadingAnimation";
import Student from "../../../models/Student";
import VerticalTable from "../../VerticalTable";

const FIELDS = [
  {
    variable: 'id',
  }, {
    variable: 'name',
  }, {
    variable: 'surname',
  }, {
    label: 'E-mail',
    variable: 'email',
  }, {
    variable: 'registered_at',
  },
];

class StudentPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      student: null,
    };
  }

  componentWillMount() {
    const { student = null } = this.props.location.state || {};
    this.setState({ student });
  }

  componentDidMount() {
    if (this.state.student !== null) {
      return this.setState({ isLoading: false });
    }

    const { id } = this.props.match.params;
    Student.get(id)
      .then(student => this.setState({ student }))
      .catch(console.error)
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    if (this.state.isLoading) return <LoadingAnimation />;

    const { student } = this.state;
    if (student === null) return <h3>There was a problem while fetching student data.</h3>;

    return (
      <div className='StudentPage'>
        <Link to={`/students/${student.id}/edit`}>
          <button className='StudentPage__edit'>Edit</button>
        </Link>
        <VerticalTable data={student} fields={FIELDS} />
      </div>
    );
  }
}

export default StudentPage;
