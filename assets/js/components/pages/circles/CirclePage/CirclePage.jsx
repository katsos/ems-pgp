import React from 'react';
import moment from 'moment';
import Link from 'react-router-dom/Link';
import { Circle } from '../../../../models';
import LoadingAnimation from '../../../LoadingAnimation';
import BudgetSection from './BudgetSection';
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

    const { budget, students,
      total_income: totalIncome,
      total_income_expectation: totalIncomeExpectation,
      total_outcome: totalOutcome,
      total_outcome_expectation: totalOutcomeExpectation,
    } = circle;

    return (
      <div className='CirclePage'>
        <h3>{circle.title}</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <Link to={`/circles/${circle.id}/students`}>{`${circle.students.length} καταχωρημένοι φοιτητές`}</Link>
              </td>
            </tr>
            <tr>
              <td>Κωδικός προγράμματος:</td>
              <td>{circle.id}</td>
            </tr>
            <tr>
              <td>Επιστημονικός υπεύθυνος:</td>
              <td>{circle.manager}</td>
            </tr>
            <tr>
              <td>Φορέας χρηματοδότησης:</td>
              <td>{circle.funding_source}</td>
            </tr>
            <tr>
              <td>Διάρκεια προγράμματος:</td>
              <td>{`Από ${moment(circle.starts_at).format('L')} εώς ${moment(circle.ends_at).format('L')}`}</td>
            </tr>
            {totalOutcomeExpectation !== null && (
              <tr>
                <td>Συνολικός προϋπολογισμος εξόδων:</td>
                <td>{totalOutcomeExpectation}</td>
              </tr>
            )}
            <tr>
              <td>Συνολικά έξοδα:</td>
              <td>{totalOutcome}</td>
            </tr>
            {totalIncomeExpectation !== null && (
              <tr>
                <td>Συνολικός προϋπολογισμός εσόδων:</td>
                <td>{totalIncomeExpectation}</td>
              </tr>
            )}
            <tr>
              <td>Συνολικά έσοδα:</td>
              <td>{totalIncome}</td>
            </tr>
          </tbody>
        </table>

        <BudgetSection budget={budget} circleId={this.circleId} />
      </div>
    );
  }
}

export default CirclePage;
