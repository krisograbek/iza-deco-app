import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import UploadPanel from './components/UploadPanel';
import IdeasPanel from './components/IdeasPanel';


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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

      </div>
    </ThemeProvider>
  );
};

export default App;
