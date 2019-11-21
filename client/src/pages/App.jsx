import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Toolbar from '../components/Toolbar';
import { AuthedRoute } from '../routes';
import { MenuProvider } from '../context/Menu';
import { AuthContext } from '../context/Auth';
import NotFound from './NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
    this.headerB = 'Bienvenido a Challenge Accepted!';
    this.items = [];
  }

  componentDidMount() {
    this.setState({
      items: [{
        title: 'Principal',
        path: '/app',
      }, {
        title: 'Crear Challenge',
        path: '/app/crear',
      }, {
        title: 'Mis Challenges',
        path: '/app/mios',
      }, {
        title: 'Challenges Globales',
        path: '/app/globales',
      }, {
        title: 'Salir',
        path: '/logout',
      }],
    });
  }

  render() {
    const { items } = this.state;
    const { match } = this.props;

    return (
      <MenuProvider>
        <Toolbar
          items={items}
        />
        <br />
        <Container>
          <Row>
            <Col>
            <Switch>
              <AuthedRoute exact path={`${match.url}/`} component={() => <h1>{this.headerB}</h1>} />
              <AuthedRoute path={`${match.url}/crear`} component={() => <h1>crear</h1>} />
              <AuthedRoute path={`${match.url}/mios`} component={() => <h1>mios</h1>} />
              <AuthedRoute path={`${match.url}/globales`} component={() => <h1>globales</h1>} />
              <Route render={() => <NotFound />} />
            </Switch>
            </Col>
          </Row>
        </Container>
        <br />
      </MenuProvider>
    );
  }
}

App.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
};

App.contextType = AuthContext;

export default App;
