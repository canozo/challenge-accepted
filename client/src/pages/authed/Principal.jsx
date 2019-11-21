import React, { Component } from 'react';
import {
  Button,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { AuthContext } from '../../context/Auth';

class Principal extends Component {
  constructor(props) {
    super(props);

    this.controller = new AbortController();
    this.textoP = 'Bienvenido a Challenge Accepted!'

    this.state = {

    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
    const {
    } = this.state;

    const { user } = this.context;

    return (
      <React.Fragment>
        <h1>Holis!</h1>
        <Switch>
          <AuthedRoute exact path={`${match.url}/`} component={() => <h1>{headerB}</h1>} />
          <AuthedRoute path={`${match.url}/crear`} component={() => <h1>crear</h1>} />
          <AuthedRoute path={`${match.url}/mios`} component={() => <h1>mios</h1>} />
          <AuthedRoute path={`${match.url}/globales`} component={() => <h1>globales</h1>} />
          <AuthedRoute render={() => <NotFound />} />
        </Switch>
      </React.Fragment>
    );
  }
}

Principal.contextType = AuthContext;

export default Principal;
