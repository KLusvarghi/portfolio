import { ReactNode } from 'react';
import styled from 'styled-components';
import useSystemThemeContext from '../../hooks/useSystemThemeContext';
import { Typography } from '../c/Typography';
import { snake } from '../../styles/keyframes/keyframes';

interface ITagProps {
  children: ReactNode;
  capitalize?: boolean;
  mode?: 'dark' | 'light';
}
interface IStyledTagProps {
  $capitalize: boolean;
}

const StyledTag = styled.span<IStyledTagProps>`
  padding: 8px 14px;
  letter-spacing: 0.8px;
  transition: 0.3s ease-in-out;
  border-radius: ${(props) => props.theme.borderRadius.xxs};
  text-transform: capitalize;
  user-select: none;
  ${({ $capitalize }) => !$capitalize && `text-transform: uppercase;`}
  box-shadow: 0 0 0 1px ${(props) => props.theme.colors.bgGradient.b},
  0 0 0 2px ${(props) => props.theme.colors.bgGradient.a};

  @media (max-width: 520px) {
    p {
      font-size: 0.875em;
    }
  }

  &:hover {
    animation: ${snake} 0.8s ease-in-out;
  }
`;

const TagDark = styled(StyledTag)`
  border: 2px solid ${(props) => props.theme.colors.tecnologyStroke};
  color: ${(props) => props.theme.colors.neutral.c4};
`;

const TagLight = styled(StyledTag)`
  background: ${(props) => props.theme.colors.tecnologyStroke};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const Tag = ({ children, capitalize = true }: ITagProps) => {
  const { theme } = useSystemThemeContext();

  if (theme.title === 'dark') {
    return (
      <TagDark $capitalize={capitalize}>
        <Typography variant="body">{children}</Typography>
      </TagDark>
    );
  }
  return (
    <TagLight $capitalize={capitalize}>
      <Typography variant="body">{children}</Typography>
    </TagLight>
  );
};
