import React from 'react';
import { styled } from 'styled-components';

interface PopupProps {
  children: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  width: 1200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const PopupTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1em;
  color: #333;
`;

const Popup: React.FC<PopupProps> = ({ children }) => {
  return (
    <Overlay>
      <PopupContainer>
        <PopupTitle>You are going to save this information.</PopupTitle>
        {children}
      </PopupContainer>
    </Overlay>
  );
};

export default Popup;
