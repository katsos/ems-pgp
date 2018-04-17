import React from 'react';
import Form from '../../Form';
import Student from "../../../models/Student";
import LoadingAnimation from "../../LoadingAnimation";

const FORM_SCHEMA = {
  name: {
    label: 'Name',
  },
  surname: {
    label: 'Surname',
  },
  email: {
    label: 'E-mail',
    type: 'email',
  },
  registered_at: {
    label: 'Registered at',
    type: 'date',
  },
};

class Edit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      formErrors: {},
      student: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { student = null } = this.props.location.state || {};
    if (student) return this.setState({ isLoading: false, student });

    if (this.state.student !== null) {
      return this.setState({ isLoading: false });
    }

    const { id } = this.props.match.params;
    Student.get(id)
      .then(student => this.setState({ student }))
      .catch(console.error)
      .finally(() => this.setState({ isLoading: false }));
  }

  onSubmit(params) {
    Student.create(params)
      .then(student => this.props.history.push(`/students/${student.id}`, { student }))
      .catch(({ response: { data: formErrors }}) => {
        this.setState({ formErrors });
      });
  }

  render() {
    const { isLoading, formErrors, student } = this.state;
    if (isLoading) return <LoadingAnimation />;

    return (
      <div>
        <Form initialData={student} schema={FORM_SCHEMA} errors={formErrors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default Edit;
