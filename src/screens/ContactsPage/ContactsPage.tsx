// C:\my-contact-list\src\screens\ContactsPage\ContactsPage.tsx
import React, { FC, useState } from "react";
import styled from 'styled-components';
import { Contact } from "../../components/Contact/Contact";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner";
import { ContactActions } from "../../types/contactTypes";
import Modal from "../../components/Modal/Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SvgIcon from "@mui/material/SvgIcon";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactModal from '../../components/ContactModal/ContactModal';
import doodlingBackground from '../../assets/doodling.webp';

const ContactsPageContainer = styled.div`
  overflow: auto;
  position: relative;
  height: 100vh;
  width: 100vw;


  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${doodlingBackground}) no-repeat center center fixed;
    background-size: cover;
    opacity: 0.2;
    z-index: -1;
    filter: brightness(20%);
  }
`;


const ContactsPageHeader = styled.header`
  margin: 30px auto;
  max-width: 1100px;
  width: 90%;
`;

const ContactsContainer = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 1100px;
  width: 90%;
  margin: 0 auto 30px;
`;

const HeaderButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  padding: 0;

  &:hover svg {
    fill: #4682b4;
    transition: fill 0.3s;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContactPageTitle = styled.h1`
  cursor: default;
  margin: 0;
`;

const Errors = styled.div`
  z-index: 100;
  background: white;
  border: solid 1px red;
  border-radius: 15px;
  max-width: 500px;
  padding: 2rem;
  width: 60vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 18px;
`;

export const ContactsPage: FC = () => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const contacts = useAppSelector((state) => state.users.contacts);
  const [contactIdToEdit, setContactIdToEdit] = useState("");
  const [modalType, setModalType] = useState<ContactActions>(ContactActions.Edit);

  const editHandler = (id: string) => {
    setModalType(ContactActions.Edit);
    setContactIdToEdit(id);
    setIsModalVisible(true);
  };

  const handleBackButtonClick = () => navigate("/");
  const handleAddNewContact = () => {
    setModalType(ContactActions.Add);
    setIsModalVisible(true);
  };

  return (
    <>
      {isFetching && <Spinner />}
      {error ? (
        <Errors>Something went wrong &#128530;<br /> Please, try again later</Errors>
      ) : (
        <ContactsPageContainer>
          <ContactsPageHeader>
            <HeaderWrapper>
              <HeaderButton onClick={handleBackButtonClick}><SvgIcon><ArrowBackIcon /></SvgIcon></HeaderButton>
              <ContactPageTitle>Contacts</ContactPageTitle>
              <HeaderButton onClick={handleAddNewContact}><SvgIcon><PersonAddIcon /></SvgIcon></HeaderButton>
            </HeaderWrapper>
          </ContactsPageHeader>
          <ContactsContainer>
            {contacts.map((contact) => (
              <Contact
                key={contact.id}
                id={contact.id}
                name={contact.name}
                gender={contact.gender}
                location={contact.location}
                email={contact.email}
                phone={contact.phone}
                src={contact.picture.large}
                onEdit={editHandler}
              />
            ))}
            <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
              <ContactModal contactIdToEdit={contactIdToEdit} closeModal={() => setIsModalVisible(false)} type={modalType} />
            </Modal>
          </ContactsContainer>
        </ContactsPageContainer>
      )}
    </>
  );
};
