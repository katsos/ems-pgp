import React from 'react';
import { isEqual } from 'lodash';
import Circle from '../../../models/Circle';
import BudgetFieldEdit from './BudgetFieldEdit';
import LoadingAnimation from '../../LoadingAnimation';

class Budget extends React.Component {
  constructor(props) {
    super(props);

    this.fields = (this.props.location.state &&  this.props.location.state.budget) ?
      this.props.location.state.budget.fields : null;
    this.circleId = this.props.match.params.id;
    this.state = {
      isLoading: true,
      fields: null,
      isNewFieldEnabled: false,
    };
    this.confirmChanges = this.confirmChanges.bind(this);
    this.onClickAddField = this.onClickAddField.bind(this);
    this.onClickFieldConfirm = this.onClickFieldConfirm.bind(this);
  }

  componentDidMount() {
    const fields = JSON.parse(JSON.stringify(this.fields));
    if (fields) return this.setState({ fields, isLoading: false });

    this.setState({ isLoading: true });
    Circle.getBudget(this.circleId)
      .then(({ fields }) => this.setState({ fields }))
      .catch(({ response: { data, status } }) => {
        if (status === 404) return this.setState({ fields: [] });
        console.error(data);
      })
      .finally(() =>  this.setState({ isLoading: false }));
  }

  onClickAddField() {
    this.setState({ isNewFieldEnabled: true });
  }

  toggleFieldEditMode(code, enable) {
    const { fields } = this.state;
    fields.find(f => f.code === code)
      .editMode = enable;
    this.setState({ fields });
  }

  onClickDelete(code) {
    const fields = this.state.fields.filter(f => f.code !== code);
    this.setState({ fields });
  }

  onClickFieldConfirm({ code, title, amount }) {
    const { fields } = this.state;
    fields.push({ code, title, amount });
    this.setState({ fields, isNewFieldEnabled: false });
  }

  onClickFieldConfirmReplace(index, field) {
    const { fields } = this.state;
    fields[index] = field;
    this.setState({ fields });
  }

  isDiffSectionVisible() {
    const { fields } = this.state;
    return (this.fields === null && fields.length) ||
      (this.fields !== null && !isEqual(this.fields, fields) && !fields.find(f => f.editMode));
  }

  confirmChanges() {
    const fields = this.state.fields
      .map(({ code, title, amount }) => Object({ code, title, amount: parseFloat(amount) }));
    Circle.setBudget(this.circleId, fields)
      .then(() => this.props.history.push(`/circles/${this.circleId}`));
  }

  render() {
    const { isLoading, fields, isNewFieldEnabled } = this.state;
    if (isLoading) return <LoadingAnimation />;

    return (
      <div>
        <table>
          <tbody>
            {fields.map((f, index) => (
              (f.editMode) ? (
                <BudgetFieldEdit
                  field={f}
                  onConfirm={f => this.onClickFieldConfirmReplace(index, f)}
                  onCancel={() => this.toggleFieldEditMode(f.code, false)}
                />
              ) : (
                <tr>
                  <td>{f.code}</td>
                  <td>{f.title}</td>
                  <td>{f.amount}</td>
                  <td><button onClick={() => this.toggleFieldEditMode(f.code, true)}>Επεξεργασία</button></td>
                  <td><button onClick={() => this.onClickDelete(f.code)}>Διαγραφή</button></td>
                </tr>
              )
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

        {this.isDiffSectionVisible() && (
         <div>
           <p>Υπάρχουν αλλαγές στις κατηγορίες δαπανών του προϋπολογισμού.
             <br /> Για οριστικοποίηση πατήστε το κουμπί επιβεβαίωσης.
           </p>
           <button onClick={this.confirmChanges}>Επιβεβαίωση</button>
         </div>
        )}
      </div>
    );
  }
}

export default Budget;
