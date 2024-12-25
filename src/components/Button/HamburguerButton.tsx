import { forwardRef } from 'react';
import styled from 'styled-components';
import useSystemThemeContext from '../../hooks/useSystemThemeContext';
import { Typography } from '../c/Typography';

const ContainerHamburguer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  transition: 0.2s ease-in;
  padding: 8px;
  border-radius: 5px;
  user-select: none;
  background-color: ${(props) => props.theme.colors.menu.bg};

  &:hover {
    background-color: ${(props) => props.theme.colors.menu.hover};
    transform: scale(1.05);
  }
`;

interface IStateHambuguerProps {
  active: boolean;
  onClick: () => void;
}

export const HamburguerButton = forwardRef<
  HTMLDivElement,
  IStateHambuguerProps
>(({ active, onClick }, ref) => {
  const { theme } = useSystemThemeContext();
  const fill = theme.title === 'dark' ? '#F4F5F6' : '#121212';

  return (
    <ContainerHamburguer ref={ref} onClick={onClick}>
      {active ? (
        <>
          <Typography variant="bodyMenu">Fechar</Typography>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 7L17 17"
              stroke={fill}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M17 7L7 17"
              stroke={fill}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </>
      ) : (
        <>
          <Typography variant="bodyMenu">Menu</Typography>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 8C2 7.73478 2.10536 7.48043 2.29289 7.29289C2.48043 7.10536 2.73478 7 3 7H13.308C13.5732 7 13.8276 7.10536 14.0151 7.29289C14.2026 7.48043 14.308 7.73478 14.308 8C14.308 8.26522 14.2026 8.51957 14.0151 8.70711C13.8276 8.89464 13.5732 9 13.308 9H3C2.73478 9 2.48043 8.89464 2.29289 8.70711C2.10536 8.51957 2 8.26522 2 8ZM2 4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H17C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4C18 4.26522 17.8946 4.51957 17.7071 4.70711C17.5196 4.89464 17.2652 5 17 5H3C2.73478 5 2.48043 4.89464 2.29289 4.70711C2.10536 4.51957 2 4.26522 2 4ZM2 12C2 11.7348 2.10536 11.4804 2.29289 11.2929C2.48043 11.1054 2.73478 11 3 11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12C18 12.2652 17.8946 12.5196 17.7071 12.7071C17.5196 12.8946 17.2652 13 17 13H3C2.73478 13 2.48043 12.8946 2.29289 12.7071C2.10536 12.5196 2 12.2652 2 12ZM2 16C2 15.7348 2.10536 15.4804 2.29289 15.2929C2.48043 15.1054 2.73478 15 3 15H13.308C13.5732 15 13.8276 15.1054 14.0151 15.2929C14.2026 15.4804 14.308 15.7348 14.308 16C14.308 16.2652 14.2026 16.5196 14.0151 16.7071C13.8276 16.8946 13.5732 17 13.308 17H3C2.73478 17 2.48043 16.8946 2.29289 16.7071C2.10536 16.5196 2 16.2652 2 16Z"
              fill={fill}
            />
          </svg>
        </>
      )}
    </ContainerHamburguer>
  );
});

HamburguerButton.displayName = 'HamburguerButton';
export default HamburguerButton;
