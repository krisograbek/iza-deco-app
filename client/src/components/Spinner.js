import styled, { keyframes } from 'styled-components';

// Animation for the spinner
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled component for the Spinner
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;

  animation: ${rotate} 1s linear infinite;
`;

const Loader = () => {
  return <Spinner />;
}

export default Loader;
