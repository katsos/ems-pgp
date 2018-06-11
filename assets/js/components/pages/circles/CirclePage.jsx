import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Circle } from '../../../models';
import LoadingAnimation from '../../LoadingAnimation';
import './CirclePage.scss';

class CirclePage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.circleId = this.props.match.params.id;
    this.state = {
      circle: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    Circle.get(this.circleId)
      .then(circle => this.setState({ circle }))
      // TODO: .catch()
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, circle } = this.state;
    if (isLoading) return <LoadingAnimation />;

    const { budget = null } = circle;
    return (
      <div className='CirclePage'>
        <h3>{circle.title}</h3>
        <table>
          <tbody>
            <tr>
              <td>Κωδικός προγράμματος</td>
              <td>{circle.id}</td>
            </tr>
            <tr>
              <td>Επιστημονικός υπεύθυνος</td>
              <td>{circle.manager}</td>
            </tr>
            <tr>
              <td>Φορέας χρηματοδότησης</td>
              <td>{circle.funding_source}</td>
            </tr>
            <tr>
              <td>Διάρκεια προγράμματος</td>
              <td>{`Από ${moment(circle.starts_at).format('L')} εώς ${moment(circle.ends_at).format('L')}`}</td>
            </tr>
          </tbody>
        </table>
        {budget ? <BudgetSection budget={budget} /> : (
          <div className='CirclePage'>
            <hr />
            <p>Δεν έχει καταχωρηθέι προϋπολογισμός για αυτό το πρόγραμμα. <br />
              Δημιουργήστε τον προϋπολογισμό πατώντας το κουμπί. <br />
              <span>Δεν θα μπορείτε να καταγράψετε συναλλαγές έως ώτου υπάρξει επιτυχής καταχώρηση.</span>
            </p>
            <Link
              className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
              to={`/circles/${this.circleId}/budget`}
            >ΔΗΜΙΟΥΡΓΙΑ ΠΡΟΫΠΟΛΟΓΙΣΜΟΥ</Link>
          </div>
        )}
      </div>
    );
  }
}

function BudgetSection({ budget }) {
  return (
    <div className='CirclePage__budget'>

      <div className='CirclePage__budget__header'>
        <h3>Προϋπολογισμός</h3>
        <Link
          className='mdl-button mdl-js-button mdl-button--primary CirclePage__budget__header__edit'
          to={{
            pathname: `/circles/${this.circleId}/budget`,
            state: { budget },
          }}
        >
          <i className="material-icons">mode_edit</i>
        </Link>
      </div>
      <div>Δημιουργήθηκε στις {moment(budget.created_at).format('L')}</div>

      <table className='CirclePage__budget__table'>
        <thead>
        <tr>
          <th colSpan='2'>Κατηγορίες Δαπανών</th>
          <th>Προυπολογυσμός</th>
        </tr>
        </thead>
        <tbody>
        {budget.fields.map(({code, title, amount}) => (
          <tr key={code}>
            <td>{code}</td>
            <td>{title}</td>
            <td>{amount}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default CirclePage;
