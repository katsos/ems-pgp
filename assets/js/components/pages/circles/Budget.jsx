import React from 'react';
import Circle from '../../../models/Circle';
import LoadingAnimation from '../../LoadingAnimation';

class Budget extends React.PureComponent {
  constructor(props) {
    super(props);

    this.circleId = this.props.match.params.id;
    this.state = {
      isLoading: true,
      budget: null,
    };
  }

  componentDidMount() {
    const budget = (this.props.location.state) ?
      this.props.location.state.budget : null;
    if (budget) return this.setState({ budget, isLoading: false });

    this.setState({ isLoading: true });
    Circle.getBudget(this.circleId)
      .then(budget => this.setState({ budget }))
      // TODO: catch
      .finally(() =>  this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, budget } = this.state;
    if (isLoading) return <LoadingAnimation />;

    return (
      <h3>{budget.fields.length}</h3>
    );
  }
}

export default Budget;
