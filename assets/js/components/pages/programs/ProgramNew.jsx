import React from 'react';
import Program from '../../../models/Program';
import Form from "../../Form";

const FORM_SCHEMA = {
  title: {
    label: 'Title'
  },
  year: {
    label: 'Year',
    type: 'number',
  },
};

class ProgramNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(params) {
    // TODO: add modal to confirm that the addition was intentional

    Program.create(params)
      .then(({ id }) => this.props.history.push(`/programs/${id}`))
      .catch(({ response: { data: formErrors }}) => this.setState({ formErrors }));
  }

  render() {
    const { formErrors } = this.state;
    return (
      <div>
        <Form schema={FORM_SCHEMA} errors={formErrors} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default ProgramNew;
