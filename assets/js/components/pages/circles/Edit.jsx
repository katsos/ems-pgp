import React from 'react';
import Form from '../../Form';
import { Circle } from '../../../models';
import LoadingAnimation from '../../LoadingAnimation';

const FORM_SCHEMA = {
  id: {
    label: 'Κωδικός προγράμματος',
    type: 'number',
  },
  manager: {
    label: 'Επιστημονικός υπεύθυνος',
  },
  title: {
    label: 'Τίτλος προγράμματος',
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
    label: 'Φορέας χρηματοδότησης',
  },
  tuition: {
    label: 'Δίδακτρα (Συνολικά)',
    type: 'number',
  },
};

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.cycleId = this.props.match.params.id;
    this.state = {
      cycle: null,
      formErrors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    Circle.get(this.cycleId)
      .then(cycle => this.setState({ cycle }));
      // TODO: catch
  }

  onSubmit(formData) {
    Circle.update(this.cycleId, formData)
      .then(({ id }) => this.props.history.push(`/circles/${id}`))
      .catch(({ response: { data: formErrors }}) => this.setState({ formErrors }));
  }

  onCancel() {
    throw new Error('not implemented yet!');
  }

  render() {
    const { formErrors, cycle } = this.state;
    if (cycle === null) return <LoadingAnimation />;
    return (
      <Form
        initialData={cycle}
        schema={FORM_SCHEMA}
        errors={formErrors}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
      />
    );
  }
}

export default Edit;
