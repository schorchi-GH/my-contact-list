import React from 'react';
import styled from 'styled-components';
import spinner from "../../assets/spinner.svg";

const SpinnerWrapper = styled.div`
  margin: auto;
  text-align: center;
  position: absolute;
  background: rgba(255,255,255,0.5);
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
`;

export const Spinner = () => {
  return (
    <SpinnerWrapper>
      <img src={spinner} alt="Loading spinner..." />
    </SpinnerWrapper>
  );
};
