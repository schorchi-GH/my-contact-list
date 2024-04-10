import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;

const ModalContent = styled.div`
  z-index: 1060;
  background: white;
  border-radius: 10px;
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  font-size: 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
`;

interface ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={e => e.stopPropagation()}>
        <ModalContent>
          <ModalHeader>
            <CloseButton onClick={onClose}>X</CloseButton>
          </ModalHeader>
          {children}
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default Modal;
