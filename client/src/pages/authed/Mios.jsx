import React, { Component } from 'react';
import { Section } from 'react-landing-page';
import {
  Button,
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardFooter,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import requests from '../../requests/challenges';

class Mios extends Component {
  constructor(props) {
    super(props);

    this.controller = new AbortController();
    this.getChallengeData = this.getChallengeData.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      challenges: [],
      modal: false,
      correo: '',
    };
  }

  componentDidMount() {
    this.getChallengeData();
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  getChallengeData() {
    requests.getBy()
      .then(res => this.setState({ challenges: res }))
      .catch(err => console.log(err));
  }

  toggle(correo) {
    const { modal } = this.state;
    this.setState({
      correo,
      modal: !modal,
    });
  }

  render() {
    const { challenges, modal, correo } = this.state;

    if (challenges.length === 0) {
      return (
        <React.Fragment>
          <Section
            heading="Tus Challenges! 😎"
            subhead="Aún no has creado un challenge! Crea uno y participa en la comunidad!"
          />
          <Modal isOpen={modal} toggle={() => this.toggle('')}>
            <ModalHeader toggle={() => this.toggle('')}>Ups!</ModalHeader>
            <ModalBody>
              Aún no estamos listos para ofrecerte mensajería con otros usuarios en la plataforma, lo sentimos!
              <br />
              <br />
              Mientras nos preparamos, puedes ponerte en contacto con este usuario enviando un correo a <b>{correo}</b>!
            </ModalBody>
            <ModalFooter>
              <Button block color="info" onClick={() => this.toggle('')}>Ok!</Button>
            </ModalFooter>
          </Modal>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Section
          heading="Tus Challenges! 😎"
          subhead="Todos los challenges que has patrocinado!"
        />
        <Row>
          {challenges.map(challenge => (
            <Col key={challenge.id_challenge} sm="4" className="py-3">
              <Card>
                <CardHeader tag="h4" className="text-center">{challenge.titulo}</CardHeader>
                <CardBody>
                  <CardSubtitle>{challenge.descripcion}</CardSubtitle>
                  <CardText><b>{`Lps. ${challenge.recompensa}.00`}</b></CardText>
                  <div className="text-center">
                    <Button
                      disabled={challenge.retado ? false : true}
                      color="info"
                      onClick={() => this.toggle(challenge.correo)}
                    >
                      <span role="img" aria-label="chat">💬</span>
                    </Button>
                  </div>
                </CardBody>
                <CardFooter className="text-muted">
                  Challenge aceptado por: {challenge.retado || 'Nadie aún!'}
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal isOpen={modal} toggle={() => this.toggle('')}>
          <ModalHeader toggle={() => this.toggle('')}>Ups!</ModalHeader>
          <ModalBody>
            Aún no estamos listos para ofrecerte mensajería con otros usuarios en la plataforma, lo sentimos!
            <br />
            <br />
            Mientras nos preparamos, puedes ponerte en contacto con este usuario enviando un correo a <b>{correo}</b>!
          </ModalBody>
          <ModalFooter>
            <Button block color="info" onClick={() => this.toggle('')}>Ok!</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Mios;
