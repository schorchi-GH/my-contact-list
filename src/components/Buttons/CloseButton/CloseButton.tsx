import SvgIcon from "@mui/material/SvgIcon";
import ClearIcon from "@mui/icons-material/Clear";

import "./CloseButton.scss";

interface CloseButtonProps {
  onClick?: () => void;
  dataDismiss?: string;
  ariaLabel?: string;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button className="close-button" onClick={onClick} type="button">
      <SvgIcon>
        <ClearIcon />
      </SvgIcon>
    </button>
  );
};
