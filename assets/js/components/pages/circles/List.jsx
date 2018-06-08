import React from 'react';
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

    return <h3>{circles.length}</h3>;
  }
}

export default List;
