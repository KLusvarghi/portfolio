import styled from 'styled-components';
import { Typography } from '../../../components/c/Typography';
import { Button } from '../../../components/Button/Button';
import erro404 from './assets/error-404.svg';
import { Head } from '../../../components/Head/Head';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
  margin: 22px 0 40px;

  @media (max-width: 786px) {
    h2 {
      font-size: 3em;
    }
  }
`;

const StylizedImage = styled.img`
  max-width: 100%;
  width: 340px;
  height: 340px;

  @media (max-width: 400px) {
    width: 240px;
    height: 240px;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Wrapper>
      <Head
        title="404 - Página não encontrada..."
        description="Pagina não encontrada"
      />
      <figure>
        <StylizedImage alt="Not Found" src={erro404} />
      </figure>
      <ContainerText>
        <Typography>Ops! Não encontramos essa página</Typography>
        <Typography variant="body">
          Acho que você escolheu a porta errada, porque eu não consegui dar uma
          olhada na que você está procurando.
        </Typography>
      </ContainerText>
      <Button onClick={goHome}>Voltar ao inicio</Button>
    </Wrapper>
  );
};

export default NotFound;
