import styled from 'styled-components';

const Panel = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box; // Ensure padding does not affect the width
`;

export default Panel;
