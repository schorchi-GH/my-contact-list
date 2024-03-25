import SvgIcon from "@mui/material/SvgIcon";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import "./Button.scss";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isIcon?: boolean;
  value: string;
  children: string;
}

const ButtonIcon = {
  Edit: <EditOutlinedIcon />,
  Save: <SaveOutlinedIcon />,
};

export const Button = ({
  onClick,
  value,
  children,
  type,
  isIcon,
}: ButtonProps) => {
  return (
    <button className="button" onClick={onClick} value={value} type={type}>
      {children}
      {isIcon && (
        <SvgIcon className="edit-icon">
          {ButtonIcon[value as keyof typeof ButtonIcon]}
        </SvgIcon>
      )}
    </button>
  );
};
