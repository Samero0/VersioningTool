// pages/ReleaseNotes.tsx
import {
  AppContainer,
  ButtonWrapper,
  Display,
  EditorWrapper,
  FormDisplay,
  FormInputWrapper,
  FormResult,
  ImgWrapper,
  InputWrapper,
  PreviewDisplay,
  Subtitle
} from '../styles/styles.tsx';
import { useEffect, useState } from 'react';

import { useReleaseAndPortalUpdates } from '../hooks/useReleaseAndPortalUpdates';

import Button from '../components/Button.tsx';
import Clickableimg from '../components/ClickableImg.tsx';
import CustomDatePicker from '../components/DatePicker.tsx';
import HtmlEditor from '../components/HtmlEditor.tsx';
import Input from '../components/Input.tsx';
import Label from '../components/Label.tsx';
import LivePreview from '../components/LivePreview.tsx';
import Popup from '../components/Popup.tsx';
import TextBox from '../components/Textbox.tsx';
import { cleanContent } from '../hooks/contentCleaner.ts';
import clipBoardIcon from '../assets/clipBoard.svg';
import { copyToClipboard } from '../hooks/useClipboard.ts';
import { formatDate } from '../hooks/formatDate.ts';
import { formatHtml } from '../hooks/autoFormatHtml.ts';
import { validateHtml } from '../validators/validateHtml.ts';
import { validateVersion } from '../validators/validateVersion.ts';
import { codeGenerator } from '../hooks/codeGenerator.ts';

export const ReleaseNotes = () => {
  // states
  const [code, setCodeValue] = useState<string>('');
  const [content, setContent] = useState(localStorage.getItem('ReleaseNotesContent') || '');
  const [version, setVersion] = useState(localStorage.getItem('ReleaseNotesVersion') || '');
  const [dataDate, setDataDate] = useState(() => {
    const saved = localStorage.getItem('ReleaseNotesDate');
    return saved ? new Date(saved) : new Date();
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { syncToBackend, syncFromBackend } = useReleaseAndPortalUpdates();

  // handlers
  const handleEditorChange = (newValue: string) => {
    setContent(newValue);
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDataDate(date);
      localStorage.setItem('ReleaseNotesDate', date.toISOString());
    }
  };

  const generateCode = (startDate: Date | null, inputVersion: string, inputContent: string) => {
    const inputContentCleaned = cleanContent(inputContent);
    const formattedContent = formatHtml(inputContentCleaned);
    setContent(formattedContent);

    if (!validateVersion(inputVersion)) {
      alert('Invalid version format. Please use the format X.Y.Z or X.Y (e.g., 1.0.0)');
      return;
    }

    const { isValid, errorMessage } = validateHtml(inputContentCleaned);
    if (!isValid) {
      alert(errorMessage);
      return;
    }

    const dateString = formatDate(startDate);
    const code = codeGenerator(dateString!, inputVersion, inputContentCleaned)();
    setCodeValue(code);
    localStorage.setItem("ReleaseNotesCode", code);
  };

  useEffect(() => {
    syncFromBackend(); // carga inicial desde el backend
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
                  setVersion(e.target.value);
                  localStorage.setItem('ReleaseNotesVersion', e.target.value);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Label id="label_date" text="Released on:" />
              <CustomDatePicker
                value={dataDate}
                onChange={handleDateChange}
              />
            </InputWrapper>
          </FormInputWrapper>

          <EditorWrapper>
            <Label id="label_content" text="Content:" />
            <HtmlEditor
              value={content}
              onChange={handleEditorChange}
            />
          </EditorWrapper>

          <ButtonWrapper>
            <InputWrapper>
              <Button
                id="button_generate"
                onClick={() => generateCode(dataDate, version, content)}
                text="Generate"
              />
            </InputWrapper>
          </ButtonWrapper>

          <ImgWrapper>
            <Clickableimg
              imageSrc={clipBoardIcon}
              alt="clipboard"
              active={code.trim() !== ""}
              onClick={() => { copyToClipboard(code); }}
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

        <PreviewDisplay>
          <LivePreview htmlContent={content} />
          <div>
            <ButtonWrapper>
              <InputWrapper>
                <Button 
                  id="popup_button"
                  onClick={openPopup}
                  text="Save"
                />
                {isPopupOpen && (
                  <Popup>
                    <Subtitle>Release notes:</Subtitle>
                    <FormResult>
                      <TextBox
                        id="textBox_code"
                        placeholder="Code will generate here"
                        value={localStorage.getItem("ReleaseNotesCode") ?? ""}
                      />
                    </FormResult>

                    <Subtitle>Portal updates:</Subtitle>
                    <FormResult>
                      <TextBox
                        id="textBox_code"
                        placeholder="Code will generate here"
                        value={localStorage.getItem("PortalUpdatesCode") ?? ""}
                      />
                    </FormResult>

                    <ButtonWrapper>
                      <InputWrapper>
                        <Button 
                          id="send_button"
                          onClick={() => {
                            if (!localStorage.getItem("ReleaseNotesCode") || !localStorage.getItem("PortalUpdatesCode")) {
                              alert("Generate both release notes and portal updates before sending.");
                              return;
                            }
                            
                            localStorage.setItem('ReleaseNotesContent', content);
                            localStorage.setItem('ReleaseNotesVersion', version);
                            localStorage.setItem('ReleaseNotesDate', formatDate(dataDate)!);

                            try {
                              syncToBackend();
                              alert("✅ Data sent successfully!");
                              closePopup(); 
                            } catch (error) {
                              alert("❌ Failed to send data. Please try again." + error);
                            }
                          }}
                          text="Send"
                        />
                        <Button 
                          id="cancel_button"
                          onClick={closePopup}
                          text="Cancel"
                        />
                      </InputWrapper>
                    </ButtonWrapper>
                  </Popup>
                )}
              </InputWrapper>
            </ButtonWrapper>
          </div>
        </PreviewDisplay>
      </Display>
    </AppContainer>
  );
};
