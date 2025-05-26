import {
HomeAppContainer,
List,
ListItem,
Paragraph,
Subtitle,
TextWrapper,
Title
} from "../styles/styles";

import TextBox from "../components/Textbox";
import { useReleaseNotes } from "../hooks/useReleaseNotes";

const Home = () => {

  const { releaseNotes } = useReleaseNotes();

  console.log(releaseNotes)
  return (
    <HomeAppContainer>
      <TextWrapper>
        <Title>Versioning Tool</Title>
        <Paragraph>
          This is a lightweight utility designed to streamline version tracking and scheduling. 
          Simply fill out a straightforward form, and the app will validate the input data to ensure everything is correct before 
          generating a structured object for Portal Updates & Release Notes.
          <strong> Beyond just generating structured code snippets, this tool now connects directly with a database:</strong>
        </Paragraph>
        
        <List>
          <ListItem>
            On load, it fetches the most recent <strong>Portal Update</strong> and <strong>Release Notes</strong> data.
          </ListItem>
          <ListItem>
            You can then review or modify the information using the built-in form and the text editor.
          </ListItem>
          <ListItem>
            When you're ready, click <strong>Generate</strong> to create a preview of the final code.
          </ListItem>
          <ListItem>
            Once confirmed via the <strong>Save</strong> and popup confirmation, your changes are securely stored back in the database.
          </ListItem>
        </List>

        
        <Subtitle>Portal Updates:</Subtitle>
        <TextBox
          id="textBox_code"
          value='{"version": "X.Y.Z", "updatedAt": "DD/MM/YYYY", "nextScheduledUpdate": "DD/MM/YYYY", "enabled": true/false}'
          size="small"
        />
        <Subtitle>Release Notes:</Subtitle>
        <TextBox
          id="textBox_code"
          value='[{"version":"X.Y.Z", "date":"DD/MM/YYY", "content":HTML}]'
          size='small'
        />
      </TextWrapper>
    </HomeAppContainer>
  );
};

export default Home;
