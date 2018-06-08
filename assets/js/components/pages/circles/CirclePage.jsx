import React from 'react';
import moment from 'moment';
import { Circle } from '../../../models';
import LoadingAnimation from '../../LoadingAnimation';

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

    return (
      <div>
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
              <td>Τίτλος προγράμματος</td>
              <td>{circle.title}</td>
            </tr>
            <tr>
              <td>Φορέας χρηματοδότησης</td>
              <td>{circle.funding_source}</td>
            </tr>
            <tr>
              <td>Διάρκει προγράμματος</td>
              <td>{`Από ${moment(circle.starts_at).format('L')} εώς ${moment(circle.ends_at).format('L')}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CirclePage;
