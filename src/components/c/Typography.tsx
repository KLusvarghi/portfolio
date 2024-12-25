import styled from 'styled-components';
import { ReactNode } from 'react';
import useSystemThemeContext from '../../hooks/useSystemThemeContext';
import { css } from 'styled-components';

interface IStyledTypographProps {
  $theme: string;
}

const components = {
  intro: styled.h1<IStyledTypographProps>`
    font-size: 3.5em;
    line-height: 1.2;
    font-weight: 600;
    font-family: ${(props) => props.theme.font.poppins};
    color: ${(props) => props.theme.colors.primaries.a};
    margin: 0;
  `,

  title: styled.h2<IStyledTypographProps>`
    font-size: 3.5em;
    font-weight: 600;
    line-height: auto;
    font-family: ${(props) => props.theme.font.poppins};
    margin: 0;
    ${(props) => {
      switch (props.$theme) {
        case 'dark':
          return css`
            color: ${(props) => props.theme.colors.neutral.c1};
          `;
        default:
          return css`
            color: ${(props) => props.theme.colors.neutral.c10};
          `;
      }
    }}
  `,

  subtitle: styled.h3<IStyledTypographProps>`
    font-size: 2em;
    font-weight: 450;
    font-family: ${(props) => props.theme.font.roboto};
    ${(props) => {
      switch (props.$theme) {
        case 'dark':
          return css`
            color: ${(props) => props.theme.colors.neutral.c3};
          `;
        default:
          return css`
            color: ${(props) => props.theme.colors.neutral.c9};
          `;
      }
    }}

    @media (min-width: 1296px) {
      max-width: 76%;
    }
  `,
  
  h4: styled.h4<IStyledTypographProps>`
    font-size: 2em;
    font-weight: 500;
    font-family: ${(props) => props.theme.font.poppins};
    margin-bottom: 12px;

    ${(props) => {
      switch (props.$theme) {
        case 'dark':
          return css`
            color: ${(props) => props.theme.colors.neutral.c2};
          `;
        default:
          return css`
            color: ${(props) => props.theme.colors.neutral.c9};
          `;
      }
    }}

    @media (max-width: 830px) {
      font-size: 1.625em;
    }
  `,

  h5: styled.h4<IStyledTypographProps>`
    font-size: 1.375em;
    font-weight: 600;
    font-family: ${(props) => props.theme.font.poppins};
    ${(props) => {
      switch (props.$theme) {
        case 'dark':
          return css`
            color: ${(props) => props.theme.colors.neutral.c3};
          `;
        default:
          return css`
            color: ${(props) => props.theme.colors.neutral.c5};
          `;
      }
    }}
  `,

  body: styled.p<IStyledTypographProps>`
    font-size: 1.125em;
    font-weight: 400;
    font-family: ${(props) => props.theme.font.roboto};
    color: ${(props) => props.theme.colors.title.p};

    ${(props) => {
      switch (props.$theme) {
        case 'dark':
          return css`
            color: ${(props) => props.theme.colors.neutral.c4};
          `;
        default:
          return css`
            color: ${(props) => props.theme.colors.neutral.c7};
          `;
      }
    }}

    @media (max-width: 520px) {
      font-size: 1em;
    }
  `,

  body2: styled.p<IStyledTypographProps>`
    font-size: 0.75em;
    font-weight: 400;
    font-family: ${(props) => props.theme.font.roboto};
    ${(props) => {
      switch (props.$theme) {
        case 'dark':
          return css`
            color: ${(props) => props.theme.colors.neutral.c3};
          `;
        default:
          return css`
            color: ${(props) => props.theme.colors.neutral.c5};
          `;
      }
    }}
  `,

  bodyMenu: styled.p<IStyledTypographProps>`
    font-size: 1em;
    font-weight: 500;
    font-family: ${(props) => props.theme.font.poppins};
    color: ${(props) => props.theme.colors.menu.tp};
  `,
};

interface ITypographerProps {
  variant?: keyof typeof components;
  children: ReactNode;
  onCLick?: () => void;
}

export const Typography = ({
  variant = 'title',
  children,
  onCLick,
}: ITypographerProps) => {
  const { theme } = useSystemThemeContext();

  const ContainerTypography = components[variant];
  return (
    <ContainerTypography onClick={onCLick} $theme={theme.title}>
      {children}
    </ContainerTypography>
  );
};
