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
    {
      id: '3',
      name: 'Carlos Pereira',
      gender: 'Male',
      location: 'Brasília',
      email: 'carlos.pereira@example.com',
      phone: '+55-61-99876-5432',
      picture: { large: 'https://randomuser.me/api/portraits/men/31.jpg' },
    },
    {
      id: '4',
      name: 'Fernanda Lima',
      gender: 'Female',
      location: 'Curitiba',
      email: 'fernanda.lima@example.com',
      phone: '+55-41-98765-4321',
      picture: { large: 'https://randomuser.me/api/portraits/women/30.jpg' },
    },
    {
      id: '5',
      name: 'Roberto Santos',
      gender: 'Male',
      location: 'Salvador',
      email: 'roberto.santos@example.com',
      phone: '+55-71-98765-4321',
      picture: { large: 'https://randomuser.me/api/portraits/men/32.jpg' },
    },
    {
      id: '6',
      name: 'Luciana Freitas',
      gender: 'Female',
      location: 'Porto Alegre',
      email: 'luciana.freitas@example.com',
      phone: '+55-51-98765-4321',
      picture: { large: 'https://randomuser.me/api/portraits/women/31.jpg' },
    },
    {
      id: '7',
      name: 'Gabriel Almeida',
      gender: 'Male',
      location: 'Fortaleza',
      email: 'gabriel.almeida@example.com',
      phone: '+55-85-98765-4321',
      picture: { large: 'https://randomuser.me/api/portraits/men/33.jpg' },
    },
    {
      id: '8',
      name: 'Tatiane Ribeiro',
      gender: 'Female',
      location: 'Manaus',
      email: 'tatiane.ribeiro@example.com',
      phone: '+55-92-98765-4321',
      picture: { large: 'https://randomuser.me/api/portraits/women/32.jpg' },
    },
    {
      id: '9',
      name: 'Eduardo Rocha',
      gender: 'Male',
      location: 'Belém',
      email: 'eduardo.rocha@example.com',
      phone: '+55-91-98765-4321',
      picture: { large: 'https://randomuser.me/api/portraits/men/34.jpg' },
    },
    {
      id: '10',
      name: 'Patricia Monteiro',
      gender: 'Female',
      location: 'Recife',
      email: 'patricia.monteiro@example.com',
      phone: '+55-81-98765-4321',
      picture: { large: 'https://randomuser.me/api/portraits/women/33.jpg' },
    },
    {
      id: '11',
      name: 'Rodrigo Lima',
      gender: 'Male',
      location: 'Belo Horizonte',
      email: 'rodrigo.lima@example.com',
      phone: '+55-31-98765-4321',
      picture: { large: 'https://randomuser.me/api/portraits/men/35.jpg' },
    },
    {
      id: '12',
      name: 'Camila Gonçalves',
      gender: 'Female',
      location: 'São Luís',
      email: 'camila.goncalves@example.com',
      phone: '+55-98-98765-4321',
      picture: { large: 'https://randomuser.me/api/portraits/women/34.jpg' },
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
