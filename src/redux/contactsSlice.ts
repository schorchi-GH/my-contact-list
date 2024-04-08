import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactDataType } from '../types/contactTypes';

const initialState = {
  contacts: [
    {
      id: '1',
      name: 'João Silva',
      gender: 'Male',
      location: 'São Paulo',
      email: 'joao.silva@example.com.br',
      phone: '+55-11-98765-4321',
      picture: { large: 'https://randomuser.me/api/portraits/men/30.jpg' },
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      gender: 'Female',
      location: 'Rio de Janeiro',
      email: 'maria.oliveira@example.com.br',
      phone: '+55-21-97654-3210',
      picture: { large: 'https://randomuser.me/api/portraits/women/29.jpg' },
    },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactsData(state, action: PayloadAction<ContactDataType[]>) {
      state.contacts = action.payload;
    },
    deleteContact(state, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    updateContactData(state, action: PayloadAction<ContactDataType>) {
      state.contacts = state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact);
    },
    addNewContact(state, action: PayloadAction<Omit<ContactDataType, 'id'>>) {
      const newId = String(Math.max(0, ...state.contacts.map(contact => parseInt(contact.id, 10))) + 1);
      state.contacts.push({ ...action.payload, id: newId });
    },
  },
});

export const { setContactsData, deleteContact, updateContactData, addNewContact } = contactsSlice.actions;
export default contactsSlice.reducer;
