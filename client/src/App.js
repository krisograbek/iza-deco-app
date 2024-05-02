import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import UploadPanel from './components/UploadPanel';
import IdeasPanel from './components/IdeasPanel';
import Container from './components/AppContainer';


const App = () => {
  const [image, setImage] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState('');

  // Info from /generateIdeas
  const [design, setDesign] = useState('');
  const [person, setPerson] = useState({ personality: "", taste: "" });
  const [artSuggestions, setArtSuggestions] = useState([]);

  const handleIdeasGenerated = (data) => {
    setDesign(data.design);
    setPerson(data.person);
    setArtSuggestions(data.art_suggestions);
  };


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>

        <UploadPanel
          onIdeasGenerated={handleIdeasGenerated}
          image={image}
          setImage={setImage}
          additionalInfo={additionalInfo}
          setAdditionalInfo={setAdditionalInfo}
          person={person}
          setPerson={setPerson}
        />
        <IdeasPanel
          ideas={artSuggestions}
          design={design}
          person={person}
          additionalInfo={additionalInfo}
        />
      </Container>

    </ThemeProvider>
  );
};

export default App;
