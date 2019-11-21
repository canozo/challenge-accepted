import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { AuthContext } from '../context/Auth';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.registrarme = this.registrarme.bind(this);

    this.state = {
      correo: '',
      password: '',
      nombresM: '',
      correoM: '',
      passwordM: '',
      mostrarModal: false,
      alerta: {
        error: false,
        mostrar: false,
        mensaje: '',
      },
    };
  }

  componentDidMount() {
    const { expired } = this.context;

    if (expired) {
      this.setState({
        alerta: {
          error: true,
          mostrar: true,
          mensaje: 'Sesion expirada, por favor vuelva a iniciar sesión!',
        },
      });
    }
  }

  submit(login, correo, password) {
    login(correo.trim(), password)
      .catch(() => {
        this.setState({
          alerta: {
            error: true,
            mostrar: true,
            mensaje: 'Error al hacer login, no existe un usuario con esas credenciales!',
          },
        });
      });
  }

  registrarme(register, nombres, email, password) {
    register(nombres, email, password)
      .catch(() => {
        this.setState({
          alerta: {
            error: true,
            mostrar: true,
            mensaje: 'Error al registrarse!',
          },
        });
      });
  }

  toggle() {
    const { mostrarModal } = this.state;

    this.setState({
      correoM: '',
      passwordM: '',
      mostrarModal: !mostrarModal,
    });
  }

  render() {
    const { correo, password, alerta, nombresM, correoM, passwordM, mostrarModal } = this.state;

    const { login, register } = this.context;

    return (
      <div className="Login">
        <h3>Iniciar sesion</h3>
        <Form className="form">
          <FormGroup>
            <Label for="correo">Usuario</Label>
            <Input
              value={correo}
              onChange={e => this.setState({ correo: e.target.value })}
              name="correo"
              id="correo"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Contraseña</Label>
            <Input
              type="password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              name="password"
              id="password"
            />
          </FormGroup>
          {!alerta.mostrar ? null : (
            <Alert color={alerta.error ? 'danger' : 'success'}>
              {alerta.mensaje}
            </Alert>
          )}
          <Button
            color="success"
            block
            onClick={() => { this.submit(login, correo, password); }}
          >
            Ingresar
          </Button>
          <Button
            color="link"
            block
            onClick={this.toggle}
          >
            Crear Cuenta
          </Button>
        </Form>
        <Modal
          centered
          isOpen={mostrarModal}
          toggle={this.toggle}
        >
          <ModalHeader
            toggle={this.toggle}
          >
            Crear Cuenta
          </ModalHeader>
          <ModalBody>
            <Form>
            <FormGroup>
                <Label for="nombresM">Nombre y Apellido</Label>
                <Input
                  value={nombresM}
                  onChange={e => this.setState({ nombresM: e.target.value })}
                  name="nombresM"
                  id="nombresM"
                />
              </FormGroup>
              <FormGroup>
                <Label for="correoM">Correo</Label>
                <Input
                  value={correoM}
                  onChange={e => this.setState({ correoM: e.target.value })}
                  name="correoM"
                  id="correoM"
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordM">Contraseña</Label>
                <Input
                  type="password"
                  value={passwordM}
                  onChange={e => this.setState({ passwordM: e.target.value })}
                  name="passwordM"
                  id="passwordM"
                />
              </FormGroup>
              <Button
                color="info"
                block
                onClick={() => { this.registrarme(register, nombresM, correoM, passwordM); }}
              >
                Registrarme
              </Button>
              {' '}
              <Button
                color="secondary"
                block
                onClick={this.toggle}
              >
                Cancelar
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default Login;
