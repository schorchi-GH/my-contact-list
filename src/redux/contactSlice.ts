import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactDataType } from '../types/contactTypes';
import uniqueId from 'lodash/uniqueId';

const SLICE_NAME = 'contacts';

type InitialState = {
  contacts: ContactDataType[];
};

export const initialContact = {
  id: '',
  name: 'John Doe',
  gender: 'Male / Female',
  location: 'Planet Earth',
  email: 'example@gmail.com',
  phone: '+0-000-000-00-00',
  picture: { large: 'https://randomuser.me/api/portraits/women/1.jpg' },
};

const initialState: InitialState = {
  contacts: Array.from({ length: 10 }, () => ({
    ...initialContact,
    id: uniqueId(),
  })),
};

const contactsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setContactsData: (state, { payload }: PayloadAction<ContactDataType[]>) => {
      state.contacts = payload;
    },
    deleteContact: (state, { payload }: PayloadAction<{ id: string }>) => {
      const newContact = state.contacts.filter((contact) => contact.id !== payload.id);
      return { contacts: newContact };
    },
    updateContactData: (state, { payload: editedContact }) => {
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === editedContact.id) {
            return editedContact;
          }
          return contact;
        }),
      };
    },
    addNewContact: (state, { payload: newContact }) => {
      state.contacts.push({ ...newContact, id: uniqueId() });
    },
  },
});

export const { setContactsData, deleteContact, updateContactData, addNewContact } =
  contactsSlice.actions;

export default contactsSlice.reducer;