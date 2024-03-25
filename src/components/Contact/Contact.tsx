import { FC, useCallback } from "react";
import { deleteContact } from "../../redux/contactsSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Button } from "../Buttons/Button/Button";
import { CloseButton } from "../Buttons/CloseButton/CloseButton";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SvgIcon from "@mui/material/SvgIcon";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./Contact.scss";

interface ContactProps {
  id: string;
  name: string;
  gender: string;
  location: string;
  src: string;
  email: string;
  phone: string;
  onEdit: (id: string) => void;
}

export const Contact: FC<ContactProps> = ({
  id,
  src,
  name,
  location,
  email,
  phone,
  onEdit,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteContact = useCallback(() => {
    dispatch(deleteContact({ id }));
  }, [id, dispatch]);

  return (
    <div className="card-wrapper">
      <div className="content-wrapper">
        <div className="photo-wrapper">
          {src ? (
            <img src={src} alt="Profile background" className="contact-image" />
          ) : (
            <SvgIcon className="avatar-icon">
              <AccountCircleOutlinedIcon />
            </SvgIcon>
          )}
        </div>
        <CloseButton onClick={handleDeleteContact} />
        <div className="personal-description">
          <p className="contact-name">{name}</p>
          <div className="contact-data-container">
            <SvgIcon>
              <PhoneIcon />
            </SvgIcon>
            <p className="contact-data-text">{phone}</p>
          </div>
          <div className="contact-data-container">
            <SvgIcon>
              <MailOutlineIcon />
            </SvgIcon>
            <p className="contact-data-text">{email}</p>
          </div>
          <div className="contact-data-container">
            <SvgIcon>
              <LocationOnIcon />
            </SvgIcon>
            <p className="contact-data-text">{location}</p>
          </div>
        </div>
      </div>
      <Button onClick={() => onEdit(id)} value="Edit" isIcon>
        Edit
      </Button>
    </div>
  );
};
