import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addNewContact, updateContactData } from '../../redux/contactsSlice';
import './ContactModal.scss';
import { Button } from '../Buttons/Button/Button';
import upload from '../../assets/upload.png';
import { ContactActions, ContactDataType } from '../../types/contactTypes';

interface ContactModalProps {
  contactIdToEdit?: string;
  closeModal: () => void;
  type: ContactActions;
}

const ContactModal: React.FC<ContactModalProps> = ({ contactIdToEdit, closeModal, type }) => {
  const dispatch = useAppDispatch();
  const selectedContact = useAppSelector(state => state.users.contacts.find(contact => contact.id === contactIdToEdit));
  const [contactData, setContactData] = useState<ContactDataType>(selectedContact || {
    id: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    gender: 'Non-binary',
    picture: { large: '' },
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setContactData(prev => ({ ...prev, picture: { large: fileReader.result as string } }));
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const saveDataHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (type === ContactActions.Add) {
      dispatch(addNewContact(contactData));
    } else if (type === ContactActions.Edit && contactIdToEdit) {
      dispatch(updateContactData({ ...contactData, id: contactIdToEdit }));
    }
    closeModal();
  };

  return (
    <div className="modal-content">
      <div className="edit-modal-header">
        <p className="modal-title">{type === ContactActions.Edit ? 'Edit Contact' : 'Add New Contact'}</p>
      </div>
      <div className="modal-body">
        <form onSubmit={saveDataHandler} className="contact-form">
          <div className="img-preview-wrapper">
            {contactData.picture.large && <img src={contactData.picture.large} alt="preview" className="contact-image-preview" />}
          </div>
          <label className="modal-label upload">
            <img src={upload} alt="Upload avatar" className="upload-image-icon" />
            <input type="file" accept="image/*" onChange={handleUploadFile} hidden />
          </label>
          <div className="form-fields">
            <input type="text" name="name" value={contactData.name} onChange={handleInputChange} placeholder="Name" className="modal-input" />
            <input type="email" name="email" value={contactData.email} onChange={handleInputChange} placeholder="Email" className="modal-input" />
            <input type="tel" name="phone" value={contactData.phone} onChange={handleInputChange} placeholder="Phone" className="modal-input" />
            <input type="text" name="location" value={contactData.location} onChange={handleInputChange} placeholder="Location" className="modal-input" />
            <select name="gender" value={contactData.gender} onChange={handleInputChange} className="modal-input">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>
          </div>
          <Button type="submit" isIcon={true} value="Save">Save</Button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
