import React, { Component } from 'react';
import { Section } from 'react-landing-page';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class Crear extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      titulo: '',
      descripcion: '',
      recompensa: 0,
      modal: false,
      error: false,
    };
  }

  toggle() {
    const { modal } = this.state;

    this.setState({
      titulo: '',
      modal: !modal,
    });
  }

  submit() {
    const {
      titulo,
      descripcion,
      recompensa,
    } = this.state;
    console.log({ titulo, descripcion, recompensa });
  }

  render() {
    const {
      titulo,
      descripcion,
      recompensa,
      modal,
      error,
    } = this.state;

    return (
      <React.Fragment>
        <Section
          heading="Crear Challenges 🤔"
          subhead="Se creativo, y piensa bien en la recompensa de tus challenges!"
        />
        <Form>
          <FormGroup>
            <Label for="titulo">Titulo</Label>
            <Input
              type="textarea"
              name="titulo"
              id="titulo"
              value={titulo}
              onChange={e => this.setState({ titulo: e.target.value })}
            />
            <FormText color="muted">El titulo de tu challenge, ej: "Maratón Fria"</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="descripcion">Descripción</Label>
            <Input
              type="textarea"
              name="descripcion"
              id="descripcion"
              value={descripcion}
              onChange={e => this.setState({ descripcion: e.target.value })}
            />
            <FormText color="muted">
              La descripción, incluye detalles! ej: "Correr por Central Park mientras esté nevando por 15 minutos!"
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="recompensa">Recompensa</Label>
            <Input
              type="select"
              name="recompensa"
              id="recompensa"
              value={recompensa}
              onChange={e => this.setState({ recompensa: e.target.value })}
            >
              <option value={0}>Selecciona una</option>
              <option value={1}>Lps. 100.00</option>
              <option value={2}>Lps. 200.00</option>
              <option value={3}>Lps. 500.00</option>
              <option value={4}>Lps. 750.00</option>
              <option value={5}>Lps. 1,000.00</option>
              <option value={6}>Lps. 2,000.00</option>
            </Input>
            <FormText color="muted">
              La recompensa de tu challenge. Nadie quiere trabajar de gratis, piensala bien!
            </FormText>
          </FormGroup>
          <Button
            block
            color="success"
            onClick={this.submit}
          >
            Crear Challenge
          </Button>
        </Form>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Aviso</ModalHeader>
          <ModalBody>
            {error ? 'Error al agregar el challenge!' : 'Challenge agregado con exito!'}
          </ModalBody>
          <ModalFooter>
            <Button block color="primary" onClick={this.toggle}>Ok</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default Crear;
