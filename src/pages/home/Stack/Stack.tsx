import { Title } from '../../../components/c/Title';
// import redux from './assets/redux.svg';
import styledcomponent from './assets/styledcomponents.svg';
import storybookSvg from './assets/storybook.svg';
import cssSvg from './assets/css.svg';
import viteSvg from './assets/vite.svg';
import figmaSvg from './assets/figma-border.svg';
import gitSvg from './assets/git.svg';
import githubSvg from './assets/github.svg';
import htmlSvg from './assets/html.svg';
import javascriptSvg from './assets/javascript.svg';
import nextjsSvg from './assets/nextjs.svg';
import reactSvg from './assets/react.svg';
import sapSvg from './assets/sap.svg';
import sassSvg from './assets/sass.svg';
import tailwindSvg from './assets/tailwind.svg';
import typescriptSvg from './assets/typescript.svg';
import vscodeSvg from './assets/vscode.svg';
import { Main } from '../../../styles/mainContainer';
import { IUseWindoSizeProps } from '../../../types/auxProps';
import { AnimatedSection } from '../../../components/AnimatedSection/AnimatedSection';
import { useState } from 'react';
import { Typography } from '../../../components/c/Typography';
import {
  Container,
  ContainerCarrosel,
  ContainerImg,
  Tag,
  StackImg,
} from './styles';

export const Stack = ({ width }: IUseWindoSizeProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const svgFiles = [
    { index: 1, path: cssSvg, name: 'CSS' },
    { index: 2, path: htmlSvg, name: 'Html' },
    { index: 3, path: javascriptSvg, name: 'Javascript' },
    { index: 4, path: typescriptSvg, name: 'Typescript' },
    { index: 5, path: reactSvg, name: 'React' },
    // { index: 10, path: redux, name: 'Redux' },
    { index: 6, path: nextjsSvg, name: 'NextJs' },
    { index: 7, path: tailwindSvg, name: 'TailwindCSS' },
    { index: 8, path: sassSvg, name: 'SASS' },
    { index: 9, path: styledcomponent, name: 'Styled-Component' },
    { index: 10, path: storybookSvg, name: 'Storybook' },
    { index: 11, path: sapSvg, name: 'SAP' },
    { index: 12, path: gitSvg, name: 'Git' },
    { index: 13, path: githubSvg, name: 'Github' },
    { index: 14, path: vscodeSvg, name: 'Vscode' },
    { index: 15, path: figmaSvg, name: 'Figma' },
    { index: 16, path: viteSvg, name: 'Vite' },
  ];

  const toogleState = () => {
    setActive(!active);
  };

  return (
    <Main id="stack">
      <AnimatedSection direction="toDown">
        <Title
          title="Minha Stack de tecnologias"
          subtitle="Aqui estão as linguagens, tecnologias e metodologias que detenho conhecimento e estudo diariamente"
          position={width >= 1012 ? 'flex-start' : 'center'}
        />
      </AnimatedSection>
      <Container>
        <ContainerCarrosel>
          {svgFiles.map(({ index, path, name }) => (
            <ContainerImg
              $active={active}
              className="item"
              key={index}
              $delay={index}
              $length={svgFiles.length}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && width >= 1100 && (
                <Tag>
                  <Typography variant="body">{name}</Typography>
                </Tag>
              )}
              {width < 1100 && (
                <Tag>
                  <Typography variant="body">{name}</Typography>
                </Tag>
              )}
              <StackImg
                onMouseEnter={toogleState}
                onMouseLeave={toogleState}
                src={path}
                alt={`SVG ${name}`}
              />
            </ContainerImg>
          ))}
        </ContainerCarrosel>
      </Container>
    </Main>
  );
};

export default Stack;
