import { Main } from '../../../styles/mainContainer';
import { Title } from '../../../components/c/Title';
import { Forms } from '../../../components/Form/Form';
import { GitHub, Linkedin, Email } from './icons';
import { Typography } from '../../../components/c/Typography';
import useSystemThemeContext from '../../../hooks/useSystemThemeContext';
import { useState } from 'react';
import svgMessage from './assets/popup.svg';
import { AnimatedSection } from '../../../components/AnimatedSection/AnimatedSection';
import {
  Wrapper,
  ContainerMessage,
  Message,
  Image,
  ContainerInformations,
  ContainerInfo,
  ContainerIcone,
  ContainerTextCopy,
} from './styles';

const Contact = () => {
  const { theme } = useSystemThemeContext();
  const [textCopy, setTextCopy] = useState(false);
  const [sucessForm, setSuccesForm] = useState(false);
  const info = [
    { index: 1, path: <GitHub />, display: 'https://github.com/KLusvarghi' },
    {
      index: 2,
      path: <Linkedin />,
      display: 'https://www.linkedin.com/in/kaua-ortolani-frontend-jr/',
    },
    {
      index: 3,
      path: <Email />,
      display: 'kauaolusvarghi@gmail.com',
    },
  ];

  const handleCopy = (text: string): void => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTextCopy(true);
      })
      .catch((err) => {
        console.error('Erro ao copiar texto: ', err);
      })
      .finally(() => {
        setTimeout(() => {
          setTextCopy(false);
        }, 2300);
      });
  };

  return (
    <Main id="contact">
      <AnimatedSection direction="toDown">
        <Title
          title="Contato"
          subtitle="Sinta-se à vontade para entrar em contato comigo enviando o formulário abaixo. Retornarei o mais breve possível!"
          position="center"
        />
      </AnimatedSection>
      <Wrapper>
        <AnimatedSection direction="toUp">
          <ContainerInformations>
            {info.map(({ index, path, display }) => (
              <ContainerInfo key={index} onClick={() => handleCopy(display)}>
                <ContainerIcone $theme={theme.title}>{path}</ContainerIcone>
                <Typography variant="body">
                  /{display.split('/').filter(Boolean).pop()}
                </Typography>
              </ContainerInfo>
            ))}
          </ContainerInformations>
        </AnimatedSection>
        <AnimatedSection direction="toRight">
          <Forms setSuccesForm={setSuccesForm} />
        </AnimatedSection>
        {textCopy && (
          <ContainerTextCopy>
            <Typography variant="body">
              Texto copiado para área de transferência!
            </Typography>
          </ContainerTextCopy>
        )}
        {sucessForm && (
          <ContainerMessage>
            <Message>
              <Image src={svgMessage} alt="icone ilustrativo de mensagem" />
              <Typography variant="body">Obrigado!</Typography>
              <Typography variant="body">Email enviado com sucesso</Typography>
            </Message>
          </ContainerMessage>
        )}
      </Wrapper>
    </Main>
  );
};

export default Contact;
