import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import UploadPanel from './components/UploadPanel';
import IdeasPanel from './components/IdeasPanel';


const App = () => {
  const [image, setImage] = useState(null);
  const [textInput, setTextInput] = useState('');

  // Info from /generateIdeas
  const [design, setDesign] = useState('');
  const [person, setPerson] = useState({});
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
          textInput={textInput}
          setTextInput={setTextInput}
        />
        <IdeasPanel
          ideas={artSuggestions}
          design={design}
          person={person}
          textInput={textInput}
        />

      </div>
    </ThemeProvider>
  );
};

export default App;
