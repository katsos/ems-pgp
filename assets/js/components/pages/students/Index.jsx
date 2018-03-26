import React from 'react';
import Student from '../../../models/Student';
import LoadingAnimation from "../../LoadingAnimation";

class Index extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      students: null,
    }
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
      <div>
        <h3>Students landing page</h3>
        <ul>
          {this.state.students.map(({ name, surname }) => {
            return (
              <li>
                {surname} {name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Index;
