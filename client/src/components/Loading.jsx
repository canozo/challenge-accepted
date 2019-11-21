import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.contar = this.contar.bind(this);
    this.state = {
      dots: 1,
      text: props.text,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.contar(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  contar() {
    const { dots } = this.state;
    this.setState({ dots: dots + 1 });
  }

  render() {
    const { dots, text } = this.state;
    return <h1>{`${text}${'.'.repeat(dots % 4)}`}</h1>;
  }
}

Loading.propTypes = {
  text: PropTypes.string,
};

Loading.defaultProps = {
  text: 'Cargando',
};

export default Loading;
