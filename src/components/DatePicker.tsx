import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import React from 'react';
import styled from 'styled-components';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const DatePickerContainer = styled.div`
  .react-datepicker__input-container input {
      padding: 10px 20px 10px 40px;
      color: black;
      border: 1px #6E6E6E solid;
      border-radius: 10px;
    }

    .react-datepicker__triangle {
      display: none;
    }

    .react-datepicker__header {
      background-color: #3D74B4;
    }

    .react-datepicker__input-container svg {
      margin-right: 10px;
      fill: #3D74B4; 
      width: 20px; 
      height: 20px; 
    }

    .react-datepicker__day:hover {
      background-color: #3D74B4;
      color:white;
    }
`;

const CustomDatePicker: React.FC<DatePickerProps> = ({ value, onChange}) => {
  return (
    <DatePickerContainer>
      <DatePicker
        selected={value}
        onChange={onChange}
        showIcon
        dateFormat="yyyy-MM-dd"
      />
    </DatePickerContainer>
  );
};

export default CustomDatePicker;
