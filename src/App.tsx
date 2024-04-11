import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import backgroundImage from './assets/doodling.webp';
import { LoginPage } from './screens/LoginPage/LoginPage';
import { ContactsPage } from './screens/ContactsPage/ContactsPage';

const GlobalStyle = createGlobalStyle`
  body {
    background: url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </>
  );
}

export default App;
