import styled, { css } from 'styled-components';
import { Typography } from './Typography';

interface ITitlePorps {
  title: string;
  subtitle?: string;
  position?: 'flex-start' | 'center';
}

interface IStyledthemeProps {
  $position?: 'flex-start' | 'center';
}

const ContainerTitle = styled.span<IStyledthemeProps>`
  display: flex;
  flex-direction: column;
  ${(props) => {
    switch (props.$position) {
      case 'center':
        return css`
          justify-content: center;
          align-items: center;
          text-align: center;
        `;
      default:
        return css`
          h2 {
            text-align: start !important;
          }
        `;
    }
  }}

  @media (max-width: 830px) {
    h2 {
      font-size: 2.25em;
    }
    h3 {
      font-size: 1.5em;
    }

    h2,
    h3 {
      text-align: center;
    }
  }
  @media (max-width: 502px) {
    h2 {
      font-size: 1.625em;
    }
    h3 {
      font-size: 1.125em;
    }
  }
`;

const Separator = styled.span`
  background: ${(props) => props.theme.colors.primaries.a};
  width: 58px;
  height: 5px;
  border-radius: 5px;
  margin: 10px 0 22px;
`;

export const Title = ({
  title,
  subtitle,
  position = 'center',
}: ITitlePorps) => {
  return (
    <ContainerTitle $position={position}>
      <Typography variant="title">{title}</Typography>
      <Separator />
      {subtitle && <Typography variant="subtitle">{subtitle}</Typography>}
    </ContainerTitle>
  );
};
