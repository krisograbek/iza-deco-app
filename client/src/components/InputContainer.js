import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f3f3f3;
  border-radius: 8px;
`;

const InputContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default InputContainer;
