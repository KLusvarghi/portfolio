import { Head } from '../../components/Head/Head';
import { Title } from '../../components/c/Title';
import { useState } from 'react';
import { Filter } from './Filter/Filter';
import { Itens } from './Itens/Itens';
import { Main, Wrapper, ContainerArrow } from './styles';
import { ArrowBack } from '../../components/Icons/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { AnimatedSection } from '../../components/AnimatedSection/AnimatedSection';
import useSystemThemeContext from '../../hooks/useSystemThemeContext';
import { ModalZoom } from './ModalZoom/ModalZoom';

const Certificates = () => {
  const [filter, setFilter] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const { theme } = useSystemThemeContext();
  const navigate = useNavigate();

  return (
    <Main>
      <Head
        title="Certificados | Kauã Ortolani Lusvarghi"
        description="Página com todos meus certificados"
      />
      <ContainerArrow onClick={() => navigate('/')}>
        <ArrowBack theme={theme.title} />
      </ContainerArrow>
      <AnimatedSection direction="toDown">
        <Title title="Minhas certificações tech" />
      </AnimatedSection>
      <Wrapper>
        <AnimatedSection direction="toRight">
          <Filter filter={filter} setFilter={setFilter} />
        </AnimatedSection>
        <AnimatedSection direction="toUp">
          <Itens
            filter={filter}
            onSelectedPhoto={(photo) => setSelectedPhoto(photo)}
          />
        </AnimatedSection>
      </Wrapper>
      <ModalZoom photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </Main>
  );
};

export default Certificates;
