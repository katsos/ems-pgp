import React from 'react';
import Form from '../../Form';
import { Circle } from '../../../models';

const FORM_SCHEMA = {
  id: {
    label: 'Κωδικός προγράμματος',
    type: 'number',
  },
  manager: {
    label: 'Επιστημονικός υπεύθυνος'
  },
  title: {
    label: 'Τίτλος προγράμματος'
  },
  starts_at: {
    label: 'Ημερομηνία έναρξης',
    type: 'date',
  },
  ends_at: {
    label: 'Ημερομηνία λήξης',
    type: 'date',
  },
  funding_source: {
    label: 'Φορέας χρηματοδότησης'
  },
};

class New extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSubmit(formData) {
    Circle.create(formData)
      .then(({ id }) => this.props.history.push(`/circles/${id}`))
      .catch(({ response: { data: formErrors }}) => this.setState({ formErrors }));
  }

  onCancel() {
    throw new Error('not implemented yet!');
  }

  render() {
    return (
      <Form
        schema={FORM_SCHEMA}
        errors={this.state.formErrors}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
      />
    );
  }
}

export default New;
