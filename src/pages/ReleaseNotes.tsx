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

import Button from '../components/Button.tsx';
import Clickableimg from '../components/ClickableImg.tsx';
import CustomDatePicker from '../components/DatePicker.tsx';
import HtmlEditor from '../components/HtmlEditor.tsx';
import Input from '../components/Input.tsx';
import Label from '../components/Label.tsx';
import LivePreview from '../components/LivePreview.tsx';
import Popup from '../components/Popup.tsx';
import TextBox from '../components/Textbox.tsx';
import Toast from '../components/Toast.tsx';
import { cleanContent } from '../hooks/contentCleaner.ts';
import clipBoardIcon from '../assets/clipBoard.svg'
import { codeGenerator } from '../hooks/codeGenerator.ts';
import { copyToClipboard } from '../hooks/useClipboard.ts';
import { formatDate } from '../hooks/formatDate.ts';
import { formatHtml } from '../hooks/autoFormatHtml.ts';
import { useReleaseNotes } from '../hooks/useReleaseNotes.ts';
import { validateHtml } from '../validators/validateHtml.ts';
import { validateVersion } from '../validators/validateVersion.ts';

export const ReleaseNotes = () => {

  // States
  const [code, setCodeValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');  
  const [showToast, setShowToast] = useState<boolean>(false);  
  const [toastType, setToastType] = useState<'success' | 'error'>('success');  
  const { save, setSave } = useReleaseNotes();

  const [content, setContent] = useState(localStorage.getItem('ReleaseNotesContent') || '');
  const [version, setVersion] = useState(localStorage.getItem('ReleaseNotesVersion') || '')
  const [dataDate, setDataDate] = useState(() => {
    const savedDate = localStorage.getItem('ReleaseNotesDate');
    return savedDate ? new Date(savedDate) : new Date();
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // handlers
  const handleEditorChange = (newValue: string) => {
    setContent(newValue);
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // Code generation function
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

    saveCode(code)
  
  };
  
  const saveCode = (code:string) => {
    localStorage.setItem("ReleaseNotesCode", code)
    console.log(code);
  }

  const handleButtonClick = async () => {
    setSave(true)
    
    if (!save) {
      console.log(save);
      handleApiResponse(200, "Saved succesfully!")
    } else 
    handleApiResponse(400, "Something go wrong!")
    
  };

  const handleApiResponse = (status: number, message: string) => {
    setMessage(message);  
    setToastType(status === 200 ? 'success' : 'error');  
    setShowToast(true);  

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDataDate(date);
      localStorage.setItem('ReleaseNotesDate', date.toString());
    }
  }

  useEffect(() => {
    
    const v = localStorage.getItem('ReleaseNotesVersion')
    const d = localStorage.getItem('ReleaseNotesDate')
    const c = localStorage.getItem('ReleaseNotesContent')
    const savedCode = localStorage.getItem('ReleaseNotesCode');
    
    if (v) {setVersion(v)}
    if (d) {setDataDate(new Date(d))};

    if (c) {
      const cleaned = cleanContent(c);
      const formatted = formatHtml(cleaned); 
      setContent(formatted);
    }

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
                onChange={(e) => {
                  setVersion(e.target.value);
                  localStorage.setItem('version', e.target.value);
                }} 
              />
            </InputWrapper>
            <InputWrapper>
              <Label id="label_date" text="Released on:" />
              <CustomDatePicker
                value={ dataDate }
                onChange={handleDateChange}
              />
            </InputWrapper>
          </FormInputWrapper>
          
          <EditorWrapper>
            <Label id="label_content" text="Content:" />
            <HtmlEditor
              value={ content }
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
                {
                isPopupOpen && (<Popup>

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
                          id="toast_button"
                          onClick={handleButtonClick}
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
                )
                }
              </InputWrapper>
            </ButtonWrapper>
            {showToast && (
              <Toast type={toastType} message={message}>
                
              </Toast>
            )}
          </div>
        </PreviewDisplay>
      </Display>
    </AppContainer>
  );
};
