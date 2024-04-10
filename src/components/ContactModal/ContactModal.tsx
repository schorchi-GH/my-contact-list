// ContactModal.tsx
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addNewContact, updateContactData } from '../../redux/contactsSlice';
import { Button } from '../Buttons/Button/Button';
import { ContactActions, ContactDataType } from '../../types/contactTypes';

import uploadIcon from '../../assets/upload.png';

// Styled components
const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const ModalBody = styled.div`
  margin-top: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

// Componente ContactModal
interface ContactModalProps {
  contactIdToEdit?: string;
  closeModal: () => void;
  type: ContactActions;
}

export const ContactModal: React.FC<ContactModalProps> = ({ contactIdToEdit, closeModal, type }) => {
  const dispatch = useAppDispatch();
  const selectedContact = useAppSelector(state =>
    state.users.contacts.find(contact => contact.id === contactIdToEdit)
  );

  const [contactData, setContactData] = useState<ContactDataType>(selectedContact || {
    id: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    gender: 'Non-binary',
    picture: { large: '' },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (type === ContactActions.Add) {
      dispatch(addNewContact(contactData));
    } else {
      dispatch(updateContactData(contactData));
    }
    closeModal();
  };

  return (
    <ModalOverlay>
      <ModalBox>
        <ModalHeader>
          <ModalTitle>{type === ContactActions.Edit ? 'Edit Contact' : 'Add New Contact'}</ModalTitle>
          <Button onClick={closeModal}>Close</Button>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Label htmlFor="name">Name</Label>
            <InputField id="name" name="name" value={contactData.name} onChange={handleInputChange} />
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Save</Button>
          </ModalFooter>
        </form>
      </ModalBox>
    </ModalOverlay>
  );
};

export default ContactModal;
