import { Col, Container, Row } from 'react-grid-system';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Typography } from '../../components/Typography/Typography';
import { Button } from '../../components/Button/Button';
import erro404 from './assets/error-404.svg';

// import LayoutBase from "../LayoutBase"

const StylizedImage = styled.img`
  max-width: 100%;
  width: 140px;
  height: 140px;
`;

const Pagina404 = () => {
  return (
    <Container>
      <Row justify="center">
        <Col xxl={6} xl={6} lg={6} md={8} sm={12} style={{ marginTop: '48px' }}>
          <figure>
            <StylizedImage alt="Not Found" src={erro404} />
          </figure>
        </Col>
        <Col>
          <Typography>Ops! Não encontramos essa página</Typography>
          <Typography variant="body" component="body">
            Acho que você escolheu a porta errada, porque eu não consegui dar
            uma olhada na que você está procurando.
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <Link to="..">
              <Button variant="secundaria">Voltar ao inicio</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Pagina404;
