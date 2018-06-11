import React from 'react';
import { Link } from 'react-router-dom';
import { Circle } from '../../../models';
import LoadingAnimation from '../../LoadingAnimation';

class List extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      circles: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    Circle.getAll()
      .then(circles => this.setState({ circles }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { circles, isLoading } = this.state;
    if (isLoading) return <LoadingAnimation />;

    return (
      <div>
        {(circles.length) ? (
          <ul>
            {circles.map(({ id, title }) => (
              <li key={id}><Link to={`/circles/${id}`}>{title}</Link></li>
            ))}
          </ul>
        ) : (
          <React.Fragment>
            <p>Δεν έχετε δημιουργήσει κάποιο κύκλο σπουδών εώς τώρα.</p>
            <button
              className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
              onClick={() => this.props.history.push('/circles/new')}
            >Δημιουργια κυκλου</button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default List;
