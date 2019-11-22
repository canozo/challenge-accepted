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
} from 'reactstrap';
import { AuthContext } from '../context/Auth';
import requests from '../requests/challenges';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.controller = new AbortController();
    this.getChallengeData = this.getChallengeData.bind(this);
    this.aceptar = this.aceptar.bind(this);
    this.rechazar = this.rechazar.bind(this);

    this.state = {
      challenges: [],
    };
  }

  componentDidMount() {
    this.getChallengeData();
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  getChallengeData() {
    requests.getAvailable()
      .then(res => this.setState({ challenges: res }))
      .catch(err => console.log(err));
  }

  aceptar(id) {
    const payload = { id };
    requests.accept(this.controller.signal, payload)
      .then(() => this.getChallengeData())
      .catch(err => console.log(err));
  }

  rechazar(id) {
    const payload = { id };
    requests.deny(this.controller.signal, payload)
      .then(() => this.getChallengeData())
      .catch(err => console.log(err));
  }

  render() {
    const { challenges } = this.state;
    const { user } = this.context;

    if (challenges.length === 0) {
      return (
        <React.Fragment>
        <Section
          heading={`🎉 Bienvenido a Challenge Accepted, ${user.nombre.split(' ')[0]}! 🎉`}
          subhead="No hay Challenges Disponibles! Sé el primero en crear uno!"
        />
      </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Section
          heading={`🎉 Bienvenido a Challenge Accepted, ${user.nombre.split(' ')[0]}! 🎉`}
          subhead="Challenges Disponibles:"
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
                    <Button color="success" onClick={() => this.aceptar(challenge.id_challenge)}>
                      <span role="img" aria-label="thumbs up">👍</span>
                    </Button>
                    {' '}
                    <Button color="danger" onClick={() => this.rechazar(challenge.id_challenge)}>
                      <span role="img" aria-label="thumbs down">👎</span>
                    </Button>
                  </div>
                </CardBody>
                <CardFooter className="text-muted">Propuesto por: {challenge.retador}</CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

Intro.contextType = AuthContext;

export default Intro;
