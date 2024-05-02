import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

export default Button;
