import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Display = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:center;
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;

export const FormDisplay = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: fit-content;
  border: 2px solid #383838;
  border-radius: 25px;
  padding: 10px;
  gap: 10px;
  margin: 10px;
`;

export const PreviewDisplay = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  border: 2px solid #383838;
  border-radius: 25px;
  padding: 20px;
  gap: 10px;
  margin: 8px;
`;

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  gap: 1em;
  align-items: center;
  justify-content: center;
`;

export const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

export const FormResult = styled.div`
  padding: 10px;
  display: flex;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items:center;
  height: fit-content;
  border: 2px solid #383838;
  border-radius: 25px;
  padding: 20px;
  gap: 5px;
  margin: 20px;
`;
export const Title = styled.h1`
  color: #333;
`;
export const Subtitle = styled.h3`
  color: #333;
  align-self:flex-start;
`;
export const Paragraph = styled.p`
  color: #333;
  font-size: 16px;
`;

export const List = styled.ul`
  color: #333;
  font-size: 16px;
  padding-left: 20px;
  margin-top: 10px;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
  line-height: 1.5;
`;

export const HomeAppContainer = styled.div`
display: flex;
flex-direction: column;
align-items:center;
width: 100%;
height: 100%;
`;