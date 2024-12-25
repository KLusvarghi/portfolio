import { GitHub } from '../../../components/Icons/GitHub';
import { Linkedin } from '../../../components/Icons/Linkedin';
import { Instagram } from '../../../components/Icons/Instagram';
import { Cv } from '../../../components/Icons/Cv';
import { Typography } from '../../../components/c/Typography';
import { Link as LinkScroll } from 'react-scroll';
import { Button } from '../../../components/Button/Button';
import { RefProps } from '../../../types/auxProps';
import { WhatsApp } from '../../../components/Icons/WhatsApp';
import { AnimatedSection } from '../../../components/AnimatedSection/AnimatedSection';
import UseWindowSize from '../../../hooks/useWindowSize';
import {
  Main,
  Wrapper,
  ContainerFreela,
  ContainerIcons,
  ContainerContent,
  ContainerTitle,
  ContainerDescription,
  ContainerButton,
  ContainerNextArrow,
  ContainerNextmobile,
} from './styles';

const Introduction = ({ refContainer }: RefProps) => {
  const width = UseWindowSize();
  const options = {
    spy: true,
    smooth: true,
    offset: -162,
    duration: 500,
    isDynamic: true,
  };

  return (
    <Main ref={refContainer} id="intro">
      <Wrapper>
        {width > 832 && (
          <AnimatedSection direction="toUp">
            <ContainerFreela>
              <Typography variant="body">Disponível para freelance!</Typography>
              <Typography variant="body">Disponível para freelance!</Typography>
            </ContainerFreela>
          </AnimatedSection>
        )}
        <ContainerContent>
          <AnimatedSection direction="toDown">
            <ContainerTitle>
              {width > 832 ? (
                <>
                  <Typography>E ai, me chamo Kauã Lusvarghi</Typography>
                  <Typography variant="intro">
                    Eu sou desenvolvedor web front-end
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="body">E ai, eu me chamo</Typography>
                  <Typography>Kauã Lusvarghi</Typography>
                  <Typography variant="intro">
                    Eu sou desenvolvedor web
                  </Typography>
                </>
              )}
            </ContainerTitle>
          </AnimatedSection>
          <ContainerDescription>
            <AnimatedSection direction="toRight">
              <Typography variant="body">
                Sou um jovem engenheiro de software especializado aplicações em
                web, em busca do primeiro emprego na área de tecnologia. Sou
                apaixonado por desafios que me permitam criar e desenvolver
                interfaces intuitivas e eficientes a partir de código.
              </Typography>
            </AnimatedSection>
          </ContainerDescription>
          <AnimatedSection direction="toLeft">
            <ContainerButton>
              <LinkScroll to="contact" {...options}>
                <Button variant="outline">Contato</Button>
              </LinkScroll>
              <LinkScroll to="projects" {...options}>
                <Button variant="primary" icon={true}>
                  Projetos
                </Button>
              </LinkScroll>
            </ContainerButton>
          </AnimatedSection>
        </ContainerContent>
        <AnimatedSection direction="toUp">
          <ContainerIcons>
            <GitHub />
            <Instagram />
            <Linkedin />
            <WhatsApp />
            <Cv />
          </ContainerIcons>
        </AnimatedSection>
      </Wrapper>
      <ContainerNextArrow>
        <span></span>
        <span></span>
        <span></span>
      </ContainerNextArrow>
      <ContainerNextmobile />
    </Main>
  );
};

export default Introduction;
