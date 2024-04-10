import React from 'react';
import styled from 'styled-components';
import SvgIcon from "@mui/material/SvgIcon";
import ClearIcon from "@mui/icons-material/Clear";

interface CloseButtonProps {
  onClick?: () => void;
  dataDismiss?: string;
  ariaLabel?: string;
}

const StyledCloseButton = styled.button`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s;

    svg {
      fill: #4682b4;
      transition: all 0.3s;
    }
  }
`;

export const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <StyledCloseButton onClick={onClick} type="button">
      <SvgIcon>
        <ClearIcon />
      </SvgIcon>
    </StyledCloseButton>
  );
};
