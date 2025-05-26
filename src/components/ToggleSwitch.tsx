import { useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
    display: flex;
    border: 1px solid #383838;
    overflow: hidden;
`;

const ToggleOption = styled.div<{ active: boolean }>`
    display: flex;
    align-items: center;  
    justify-content: center;  
    padding: 8px;
    text-align: center;
    cursor: pointer;
    flex: 1;
    background-color: ${({ active }) => (active ? "#3D74B4" : "transparent")};
    color: ${({ active }) => (active ? "white" : "black")};
    transition: background-color 0.3s ease, color 0.3s ease;
    white-space: nowrap;  
    overflow: hidden;  
    text-overflow: ellipsis; 
    &:hover {
        background-color: ${({ active }) => (active ? "#2B5A8A" : "#ddd")};
    }
`;

interface ToggleSwitchProps {
  option1: string;
  option2: string;
  onToggle?: (selected: string) => void;
}

const ToggleSwitch = ({ option1, option2, onToggle }: ToggleSwitchProps) => {
  const [selected, setSelected] = useState(option1);

  const handleToggle = (option: string) => {
    setSelected(option);
    if (onToggle) onToggle(option);
  };

  return (
    <ToggleContainer>
      <ToggleOption active={selected === option1} onClick={() => handleToggle(option1)}>
        {option1}
      </ToggleOption>
      <ToggleOption active={selected === option2} onClick={() => handleToggle(option2)}>
        {option2}
      </ToggleOption>
    </ToggleContainer>
  );
};

export default ToggleSwitch;
