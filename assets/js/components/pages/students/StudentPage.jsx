import React from "react";
import LoadingAnimation from "../../LoadingAnimation";
import Student from "../../../models/Program";

class StudentPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      student: null,
    }
  }

  componentWillMount() {
    const { student = null } = this.props.location.state || {};
    this.setState({ student })
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

    if (this.state.student === null) return <h3>There was a problem while fetching student data.</h3>;

    return (
      <div>
        {this.state.student.id}
      </div>
    )
  }
}

export default StudentPage;
