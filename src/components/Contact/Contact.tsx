import React, { FC } from "react";
import styled from 'styled-components';
import { deleteContact } from "../../redux/contactsSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Button } from "../Buttons/Button/Button";
import { CloseButton } from "../Buttons/CloseButton/CloseButton"; // Ajuste conforme a exportação do seu CloseButton
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SvgIcon from "@mui/material/SvgIcon";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

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

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  padding: 25px;
  border-radius: 10px;
  transition: box-shadow 200ms linear 0ms;
  text-align: start;
  position: relative;
  background-color: #f3f3f3;
  &:hover {
    background-color: #e8e7e7;
  }
`;

const PhotoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactImage = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  transition: transform 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  &:hover {
    cursor: pointer;
    transform: translateY(5%) scale(1.1);
  }
`;

const PersonalDescription = styled.div`
  overflow: hidden;
  word-wrap: break-word;
  margin-bottom: 10px;
`;

const ContactName = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`;

const ContactDataContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    svg {
      fill: #4682b4;
      transition: all 0.3s;
    }
    .contact-data-text {
      color: #5a5a5a;
      transition: all 0.3s;
    }
  }
`;

const ContactDataText = styled.p`
  margin-left: 10px;
`;

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

  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
  };

  return (
    <CardWrapper>
      <PhotoWrapper>
        {src ? (
          <ContactImage src={src} alt="Profile background" />
        ) : (
          <SvgIcon>
            <AccountCircleOutlinedIcon />
          </SvgIcon>
        )}
      </PhotoWrapper>
      <CloseButton onClick={handleDeleteContact} />
      <PersonalDescription>
        <ContactName>{name}</ContactName>
        <ContactDataContainer>
          <SvgIcon><PhoneIcon /></SvgIcon>
          <ContactDataText>{phone}</ContactDataText>
        </ContactDataContainer>
        <ContactDataContainer>
          <SvgIcon><MailOutlineIcon /></SvgIcon>
          <ContactDataText>{email}</ContactDataText>
        </ContactDataContainer>
        <ContactDataContainer>
          <SvgIcon><LocationOnIcon /></SvgIcon>
          <ContactDataText>{location}</ContactDataText>
        </ContactDataContainer>
      </PersonalDescription>
      <Button onClick={() => onEdit(id)} value="Edit" isIcon>
        Edit
      </Button>
    </CardWrapper>
  );
};
