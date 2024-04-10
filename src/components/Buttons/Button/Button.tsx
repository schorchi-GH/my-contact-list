import React, { ReactNode } from 'react';
import styled from 'styled-components';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isIcon?: boolean;
  value?: "Edit" | "Save" | "Login";
  children: ReactNode;
}

interface SvgIconProps {
  component: React.ElementType;
  className?: string;
}

const StyledSvgIcon = styled(({ component: Component, className }: SvgIconProps) => (
  <Component className={className} />
))`
  width: 17px;
  height: 17px;
  margin-left: 5px;
`;

const ButtonIcon = {
  Edit: EditOutlinedIcon,
  Save: SaveOutlinedIcon,
};

const StyledButton = styled.button`
    // Estilos omitidos para brevidade
`;

export const Button = ({
  onClick,
  value,
  children,
  type = "button",
  isIcon,
}: ButtonProps) => (
  <StyledButton onClick={onClick} value={value} type={type}>
    {children}
    {isIcon && value && Object.hasOwnProperty.call(ButtonIcon, value) ? (
      <StyledSvgIcon component={ButtonIcon[value as keyof typeof ButtonIcon]} />
    ) : null}
  </StyledButton>
);
