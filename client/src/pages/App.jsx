import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Toolbar from '../components/Toolbar';
import { AuthedRoute } from '../routes';
import { MenuProvider } from '../context/Menu';
import { AuthContext } from '../context/Auth';
import { Crear, Mios, Logros } from './authed';
import NotFound from './NotFound';
import Intro from './Intro';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

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
        title: 'Mis Logros',
        path: '/app/logros',
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
              <AuthedRoute exact path={`${match.url}/`} component={Intro} />
              <AuthedRoute path={`${match.url}/crear`} component={Crear} />
              <AuthedRoute path={`${match.url}/mios`} component={Mios} />
              <AuthedRoute path={`${match.url}/logros`} component={Logros} />
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
