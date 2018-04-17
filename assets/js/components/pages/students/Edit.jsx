import React from 'react';
import Form from '../../Form';
import Student from "../../../models/Student";

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
      formErrors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(params) {
    Student.create(params)
      .then(student => this.props.history.push(`/students/${student.id}`, { student }))
      .catch(({ response: { data: formErrors }}) => {
        this.setState({ formErrors });
      });
  }

  render() {
    return (
      <div>
        <Form schema={FORM_SCHEMA} errors={this.state.formErrors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default Edit;
