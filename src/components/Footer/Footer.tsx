import styled from 'styled-components';
import { Typography } from '../c/Typography';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Instagram } from '../../components/Icons/Instagram';
import { WhatsApp } from '../../components/Icons/WhatsApp';
import { GitHub } from '../../components/Icons/GitHub';
import { Linkedin } from '../../components/Icons/Linkedin';
import { Cv } from '../../components/Icons/Cv';
import { Button } from '../Button/Button';
import useSystemThemeContext from '../../hooks/useSystemThemeContext';
import {
  ContainerFooter,
  Nav,
  UlFooter,
  LiFooter,
  ContainerIcons,
  Separator,
} from './styles';

const Main = styled.footer`
  padding: 32px 0;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

interface IFooterLinksProps {
  options: {
    spy: boolean;
    smooth: boolean;
    offset: number;
    duration: number;
    isDynamic: boolean;
  };
  isHome: boolean;
  isCertificates: boolean;
  isProject: boolean;
  isNotFound: boolean;
}

const FooterLinks = ({
  options,
  isHome,
  isCertificates,
  isProject,
  isNotFound,
}: IFooterLinksProps) => {
  return (
    <>
      {isCertificates || isProject || isNotFound ? (
        <LiFooter>
          <RouterLink to="/">
            <Button variant="footer">Home</Button>
          </RouterLink>
        </LiFooter>
      ) : (
        <LiFooter>
          <ScrollLink to="intro" {...options}>
            <Button variant="footer">Home</Button>
          </ScrollLink>
        </LiFooter>
      )}
      {!isHome && (
        <>
          <LiFooter>
            <ScrollLink to="about" {...options}>
              <Button variant="footer">Sobre</Button>
            </ScrollLink>
          </LiFooter>
          <LiFooter>
            <ScrollLink to="stack" {...options}>
              <Button variant="footer">Stack</Button>
            </ScrollLink>
          </LiFooter>
          <LiFooter>
            <ScrollLink to="projects" {...options}>
              <Button variant="footer">Projetos</Button>
            </ScrollLink>
          </LiFooter>
          <LiFooter>
            <ScrollLink to="contact" {...options}>
              <Button variant="footer">Contato</Button>
            </ScrollLink>
          </LiFooter>
        </>
      )}
      {!isCertificates && (
        <LiFooter>
          <RouterLink to={'/certificados'}>
            <Button variant="footer">Certificados</Button>
          </RouterLink>
        </LiFooter>
      )}
    </>
  );
};

export const Footer = () => {
  const { theme } = useSystemThemeContext();
  const location = useLocation();
  const isCertificates = location.pathname.includes('certificados');
  const isProject = location.pathname.includes('projetos');
  const isNotFound = location.pathname.includes('404');
  const isHome = isCertificates || isProject || isNotFound;
  const options = {
    spy: true,
    smooth: true,
    offset: -162,
    duration: 500,
    isDynamic: true,
  };

  return (
    <Main>
      <ContainerFooter>
        <Typography variant="h5">Navegue até</Typography>
        <Nav>
          <UlFooter>
            <FooterLinks
              options={options}
              isHome={isHome}
              isCertificates={isCertificates}
              isProject={isProject}
              isNotFound={isNotFound}
            />
          </UlFooter>
        </Nav>
        <ContainerIcons>
          <GitHub theme={theme.title} footer={true} />
          <Instagram theme={theme.title} footer={true} />
          <Linkedin theme={theme.title} footer={true} />
          <WhatsApp theme={theme.title} footer={true} />
          <Cv theme={theme.title} footer={true} />
        </ContainerIcons>
        <Separator />
        <Typography variant="body2">
          © 2024 by Kauã Lusvarghi | Todos os direitos reservados{' '}
        </Typography>
      </ContainerFooter>
    </Main>
  );
};
