import React from 'react';
import { Link } from "react-router-dom";
import Student from '../../../models/Student';
import LoadingAnimation from "../../LoadingAnimation";

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
    if (this.state.isLoading) return <LoadingAnimation />;

    if (this.state.students === null) return <h3>There was a problem while fetching students.</h3>;

    return (
      <div className='Students'>
        <ul>
          {this.state.students.map(({ id, name, surname }) => (
            <li key={id}><Link to={`/students/${id}`}>{surname} {name}</Link></li>
          ))}
        </ul>

        <Link to='/students/new'>
          <button className='Students__add mdl-button mdl-js-button mdl-button--fab mdl-button--colored'>
            <i className="material-icons">add</i>
          </button>
        </Link>
      </div>
    );
  }
}

export default Index;
