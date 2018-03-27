import React from 'react'
import Form from './Form';
import Student from "../../../models/Student";

class New extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(params) {
    Student.create(params)
      .then(console.log)
      .catch(({ response: { data: formErrors }}) => {
        this.setState({ formErrors });
      });
  }

  render() {
    return (
      <div>
        <Form errors={this.state.formErrors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default New;
