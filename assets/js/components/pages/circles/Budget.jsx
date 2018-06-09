import React from 'react';
import Circle from '../../../models/Circle';
import BudgetFieldEdit from './BudgetFieldEdit';
import LoadingAnimation from '../../LoadingAnimation';

class Budget extends React.Component {
  constructor(props) {
    super(props);

    this.budget = (this.props.location.state) ?
      this.props.location.state.budget : null;
    this.circleId = this.props.match.params.id;
    this.state = {
      isLoading: true,
      budget: null,
      isNewFieldEnabled: false,
    };
    this.onClickAddField = this.onClickAddField.bind(this);
    this.onClickFieldConfirm = this.onClickFieldConfirm.bind(this);
  }

  componentDidMount() {
    if (this.budget) return this.setState({ budget: this.budget, isLoading: false });

    this.setState({ isLoading: true });
    Circle.getBudget(this.circleId)
      .then(budget => this.setState({ budget }))
      // TODO: catch
      .finally(() =>  this.setState({ isLoading: false }));
  }

  onClickAddField() {
    this.setState({ isNewFieldEnabled: true });
  }

  onClickDelete(code) {
    const { budget } = this.state;
    const fields = budget.fields.filter(f => f.code !== code);
    this.setState({ budget: Object.assign(budget, { fields })});
  }

  onClickFieldConfirm({ code, title, amount }) {
    const { budget } = this.state;
    budget.fields.push({ code, title, amount });
    this.setState({ budget, isNewFieldEnabled: false });
  }

  render() {
    const { isLoading, budget, isNewFieldEnabled } = this.state;
    if (isLoading) return <LoadingAnimation />;

    return (
      <div>
        <table>
          <tbody>
            {budget.fields.map(({ code, title, amount }) => (
              <tr key={code}>
                <td>{code}</td>
                <td>{title}</td>
                <td>{amount}</td>
                <td><button>Επεξεργασία</button></td>
                <td><button onClick={() => this.onClickDelete(code)}>Διαγραφή</button></td>
              </tr>
            ))}
            {isNewFieldEnabled && (
              <BudgetFieldEdit
                onConfirm={this.onClickFieldConfirm}
                onCancel={() => this.setState({ isNewFieldEnabled: false })}
              />
            )}
          </tbody>
        </table>
        <button onClick={this.onClickAddField}>Προσθήκη νέας κατηγορίας</button>
      </div>
    );
  }
}

export default Budget;
