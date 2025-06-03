// pages/PortalUpdates.tsx
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
import clipBoardIcon from '../assets/clipBoard.svg';
import { copyToClipboard } from '../hooks/useClipboard.ts';
import { formatDate } from '../hooks/formatDate.ts';
import { validateVersion } from '../validators/validateVersion.ts';
import { useReleaseAndPortalUpdates } from '../hooks/useReleaseAndPortalUpdates';

export const PortalUpdates = () => {
  const { syncFromBackend } = useReleaseAndPortalUpdates();

  const [code, setCodeValue] = useState<string>('');
  const [version, setVersion] = useState(localStorage.getItem('PortalUpdatesVersion') || '');
  const [enabled, setEnabled] = useState(localStorage.getItem('PortalUpdatesEnabled') === "true");

  const [updateAt, setUpdateAt] = useState(() => {
    const saved = localStorage.getItem("PortalUpdatesUpdatedAt");
    return saved ? new Date(saved) : new Date();
  });

  const [nextScheduledUpdate, setNextScheduledUpdate] = useState(() => {
    const saved = localStorage.getItem('PortalUpdatesNextScheduledUpdate');
    return saved ? new Date(saved) : new Date();
  });

  const handleUpdateAt = (date: Date | null) => {
    if (date) {
      setUpdateAt(date);
      localStorage.setItem("PortalUpdatesUpdatedAt", date.toISOString());
    }
  };

  const handleNextScheduledUpdate = (date: Date | null) => {
    if (date) {
      setNextScheduledUpdate(date);
      localStorage.setItem('PortalUpdatesNextScheduledUpdate', date.toISOString());
    }
  };

  const generateCode = (
    startDate: Date | null,
    nextDate: Date | null,
    inputVersion: string
  ) => {
    if (!validateVersion(inputVersion)) {
      alert('Invalid version format. Please use the format X.Y.Z or X.Y (e.g., 1.0.0)');
      return;
    }

    const startDateFormatted = formatDate(startDate);
    const nextDateFormatted = formatDate(nextDate);
    if (!startDateFormatted || !nextDateFormatted) return;
    
    const updatedAt = `${startDateFormatted}T00:00:00`;
    const nextScheduledUpdate = `${nextDateFormatted}T00:00:00`;

    const generatedCode = JSON.stringify({
      version: inputVersion,
      updatedAt,
      nextScheduledUpdate,
      enabled
    });

    setCodeValue(generatedCode);
    localStorage.setItem("PortalUpdatesCode", generatedCode);
  };

  useEffect(() => {
    syncFromBackend();
  }, [syncFromBackend]);

  useEffect(() => {
    const storedCode = localStorage.getItem("PortalUpdatesCode");
    if (storedCode) setCodeValue(storedCode);
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
                value={version}
                onChange={(e) => {
                  const value = e.target.value;
                  setVersion(value);
                  localStorage.setItem('PortalUpdatesVersion', value);
                }}
              />
            </InputWrapper>

            <InputWrapper>
              <Label id="label_date" text="Last update:" />
              <CustomDatePicker
                value={updateAt}
                onChange={handleUpdateAt}
              />
            </InputWrapper>

            <InputWrapper>
              <Label id="label_nextDate" text="Next scheduled update:" />
              <CustomDatePicker
                value={nextScheduledUpdate}
                onChange={handleNextScheduledUpdate}
              />
            </InputWrapper>

            <InputWrapper>
              <CheckBox
                checked={enabled}
                value="Banner enabled"
                onChange={() => {
                  const newValue = !enabled;
                  setEnabled(newValue);
                  localStorage.setItem('PortalUpdatesEnabled', String(newValue));
                }}
              />
            </InputWrapper>

          </FormInputWrapper>

          <ButtonWrapper>
            <InputWrapper>
              <Button
                id="button_generate"
                onClick={() =>
                  generateCode(updateAt, nextScheduledUpdate, version)
                }
                text="Generate"
              />
            </InputWrapper>
          </ButtonWrapper>

          <ImgWrapper>
            <Clickableimg
              imageSrc={clipBoardIcon}
              alt="clipboard"
              active={code.trim() !== ''}
              onClick={() => {
                copyToClipboard(code);
              }}
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
