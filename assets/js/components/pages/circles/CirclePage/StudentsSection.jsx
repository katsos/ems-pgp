import React from 'react';
import StudentsList from "./StudentsList";

class StudentsSection extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { students, cycleId } = this.props;
    return (
      <div>
        <h3>Φοιτητές</h3>
        <StudentsList students={students} cycleId={cycleId} />
      </div>
    );
  }
}

export default StudentsSection;
