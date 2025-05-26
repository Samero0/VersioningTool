import React from "react";
import { styled } from "styled-components";

interface CheckBoxProps {
  checked: boolean;
  value: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledCheckBox = styled.input`
  cursor: pointer;
`;

const CheckBoxContainer = styled.div`
    display:flex;
    flex-direction: row;
    gap:3px;
`;

const CheckBox: React.FC<CheckBoxProps> = ({ checked, value, type = "checkbox", onChange }) => {
  return (
    <CheckBoxContainer>
      <StyledCheckBox checked={checked} type={type} onChange={onChange} />
      {value}
    </CheckBoxContainer>
  );
};

export default CheckBox;
