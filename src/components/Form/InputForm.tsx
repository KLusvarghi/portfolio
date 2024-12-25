import { ErrorMessage } from 'formik';
import styled from 'styled-components';
import { Typography } from '../c/Typography';

export interface IStyledClassProps {
  $gridArea: string;
}

export interface IFormInputProps {
  placeholder: string;
  name: string;
  type?: string;
  gridArea: string;
  value: string;
}

const ContainerEstilizado = styled.div<IStyledClassProps>`
  width: 100%;
  position: relative;
  grid-area: ${({ $gridArea }) => $gridArea};
`;

const InputEstilizadoBase = styled.input<IStyledClassProps>`
  width: 100%;
  background: ${(props) => props.theme.colors.form.a};
  color: ${(props) => props.theme.colors.neutral.c7};
  padding: 20px 10px;
  font-size: 1.125em;
  font-family: ${(props) => props.theme.font.roboto};
  border-radius: 5px 4px 0 0;
  transition: 0.1s ease-in;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.primaries.a};

  &:focus {
    background: ${(props) => props.theme.colors.form.b};
    transform: scale(1.02);
    border-radius: 5px;
    outline: none;
    border: none;
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primaries.a};
  }
`;

const Error = styled.div`
  margin-top: 4px;
  p {
    color: #e92525;
  }
`;
// .attrs({ as: 'input' }), isso significa que o componente estilizado será renderizado como um elemento <input>.
const InputEstilizado = styled(InputEstilizadoBase).attrs({ as: 'input' })``;
const TextAreaEstilizado = styled(InputEstilizadoBase).attrs({
  as: 'textarea',
})``;

export const InputText = ({
  placeholder,
  name,
  type,
  gridArea,
  value,
  onChange,
  onBlur,
}: IFormInputProps & {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}) => {
  return (
    <ContainerEstilizado $gridArea={gridArea}>
      <InputEstilizado
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        $gridArea={gridArea}
      />
      <ErrorMessage name={name}>
        {(mensagens) => (
          <Error>
            <Typography variant="body">{mensagens}</Typography>
          </Error>
        )}
      </ErrorMessage>
    </ContainerEstilizado>
  );
};

export const TextArea = ({
  placeholder,
  name,
  gridArea,
  value,
  onChange,
  onBlur,
}: IFormInputProps & {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
}) => {
  return (
    <ContainerEstilizado $gridArea={gridArea}>
      <TextAreaEstilizado
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={6}
        $gridArea={gridArea}
      />
      <ErrorMessage name={name}>
        {(mensagens) => (
          <Error>
            <Typography variant="body">{mensagens}</Typography>
          </Error>
        )}
      </ErrorMessage>
    </ContainerEstilizado>
  );
};
