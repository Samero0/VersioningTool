import {
  AppContainer,
  ButtonWrapper,
  Display,
  FormDisplay,
  FormInputWrapper,
  FormResult,
  ImgWrapper,
  InputWrapper,
} from '../styles/styles.tsx';
import { useEffect, useState } from 'react';

import Button from '../components/Button.tsx';
import CheckBox from '../components/CheckBox.tsx';
import Clickableimg from '../components/ClickableImg.tsx';
import CustomDatePicker from '../components/DatePicker.tsx';
import Input from '../components/Input.tsx';
import Label from '../components/Label.tsx';
import TextBox from '../components/Textbox.tsx';
import clipBoardIcon from '../assets/clipBoard.svg'
import { copyToClipboard } from '../hooks/useClipboard.ts';
import { formatDate } from '../hooks/formatDate.ts';
import { validateVersion } from '../validators/validateVersion.ts';

export const PortalUpdates = () => {
  // Code generation function
  const generateCode = (startDate: Date | null, nextDate: Date | null, inputVersion: string) => {

    if (!validateVersion(inputVersion)) {
      alert('Invalid version format. Please use the format X.Y.Z or X.Y (e.g., 1.0.0)');
      return;
    }

    console.log("fecha inicio", startDate)
    console.log("fecha fin", nextDate)
    // Generar código para Portal Updates
    const startDateFormated = formatDate(startDate)
    const nextDateFormated = formatDate(nextDate)
    if (!startDateFormated || !nextDateFormated)
      return 
    
    const [startDateDay, startDateMonth, startDateYear] = startDateFormated.toString().split('/')
    const updatedAt = startDateYear + '-' + startDateMonth + '-' + startDateDay + 'T00:00:00'

    const [nextDateFormatedDay, nextDateFormatedDMonth, nextDateFormatedDYear] = nextDateFormated.toString().split('/')
    const nextScheduledUpdate = nextDateFormatedDYear + '-' + nextDateFormatedDMonth + '-' + nextDateFormatedDay + 'T00:00:00'
    
    const code = `{ \\"version\\": \\"${version}\\", \\"updatedAt\\": \\"${updatedAt}\\", \\"nextScheduledUpdate\\": \\"${nextScheduledUpdate}\\", \\"enabled\\": ${enabled} }`;
    setCodeValue(code);
    
    saveCode(code);
    

  };
  const saveCode = (code:string) => {
    localStorage.setItem("PortalUpdatesCode", code)        
  }

  const [code, setCodeValue] = useState<string>('');

  const [version, setVersion] = useState(localStorage.getItem('PortalUpdatesVersion') || '')
  const [enabled, setEnabled] = useState(localStorage.getItem('PortalUpdatesEnabled') === "true")
  const [updateAt, setUpdateAt] = useState(() => {
    const saveUpdateAt = localStorage.getItem("PortalUpdatesUpdatedAt");
    return saveUpdateAt ? new Date(saveUpdateAt) : new Date();
  })

  const handleUpdateAt = (date: Date | null) => {
    if (date) {
      setUpdateAt(date);
      localStorage.setItem("PortalUpdatesUpdatedAt", date.toString())
    }
  }

  const [NextScheduledUpdate, setNextScheduledUpdate] = useState(() => {
    const saveNextScheduleUpdate = localStorage.getItem('PortalUpdatesNextScheduledUpdate');
    return saveNextScheduleUpdate ? new Date(saveNextScheduleUpdate) : new Date()
  })

  const handleNextScheduledUpdate = (date: Date | null) => {
    if (date) {
      setNextScheduledUpdate(date);
      localStorage.setItem('PortalUpdatesNextScheduledUpdate', date.toString())
    }
  }


  useEffect(() => {
    const v = localStorage.getItem("PortalUpdatesVersion")
    const upA = localStorage.getItem("PortalUpdatesUpdatedAt")
    const nSU = localStorage.getItem("PortalUpdatesNextScheduledUpdate")
    const savedCode = localStorage.getItem("PortalUpdatesCode"); 

    if (v)   setVersion(v);
    if (upA) setUpdateAt(new Date(upA));
    if (nSU) setNextScheduledUpdate( new Date(nSU));
    if (savedCode) setCodeValue(savedCode);
  }, []);

  return (    
    <AppContainer>
      <Display>
      <FormDisplay>
        <FormInputWrapper>

          <InputWrapper>
            <Label id="label_version" text="Version:" />
            <Input
              id="input_version"
              placeholder="X.Y.Z"
              value={ version }
              onChange={ (e) => {
                setVersion(e.target.value)
                localStorage.setItem('PortalUpdatesVersion', e.target.value)
              }}
            />
          </InputWrapper>

          <InputWrapper>
            <Label id="label_date" text="Last update: " />
            <CustomDatePicker
              value={ updateAt }
              onChange={ handleUpdateAt }
            />
          </InputWrapper>

          <InputWrapper>
            <Label id="label_nextDate" text="Next scheduled update: " />
            <CustomDatePicker
              value={ NextScheduledUpdate }
              onChange={ handleNextScheduledUpdate }
            />
          </InputWrapper>
      
          <InputWrapper>
            <CheckBox checked={ enabled /* true */ } value="Banner enabled" onChange={(e) => {
              setEnabled(!enabled)
              localStorage.setItem('PortalUpdatesEnabled', e.target.value)
            }}/>
          </InputWrapper>

        </FormInputWrapper>

        <ButtonWrapper>
          <InputWrapper>
            <Button
              id="button_generate"
              onClick={() => generateCode(updateAt, NextScheduledUpdate, version)}
              text="Generate"
            />
          </InputWrapper>
        </ButtonWrapper>

        <ImgWrapper>
          <Clickableimg
            imageSrc={clipBoardIcon}
            alt="clipboard"
            active={code.trim() !== ""}
            onClick={() => { copyToClipboard(code) }}
            tooltip="Copy to clipboard"
          />
        </ImgWrapper>

        <FormResult>
          <TextBox
            id="textBox_code"
            placeholder="Code will generate here"
            value={code}
          />
        </FormResult>

      </FormDisplay>

      </Display>
    </AppContainer>
  );
};
