import React, { useState } from 'react';
import styled from 'styled-components';
import { generateImage } from '../services/api';
import Loader from './Spinner';
import Button from './Button';
import ImageContainer from './ImageContainer';
import StyledImage from './StyledImage';
import Panel from './Panel';


const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  display: block;
  position: relative;
  padding: 10px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
  border: 2px solid ${props => props.theme.colors.secondary};
  border-radius: 5px;
  transition: background-color 0.2s;

  // This will hide the actual checkbox entirely
  input[type="checkbox"] {
    display: none;
  }

  // This changes the background color of the label when the associated checkbox is checked
  input[type="checkbox"]:checked + & {
    background-color: ${props => props.theme.colors.info};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;


const IdeasPanel = ({ ideas, design, person, textInput }) => {
  const [selectedIdeas, setSelectedIdeas] = useState([]);
  const [images, setImages] = useState([]);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);

  const handleCheckboxChange = (idea) => {
    setSelectedIdeas(prev => {
      const currentIdea = `${idea.art_type}: ${idea.description.substring(0, 100)}`;
      if (prev.includes(currentIdea)) {
        return prev.filter(item => item !== currentIdea);
      } else {
        return [...prev, currentIdea];
      }
    });
  };


  const handleGenerateClick = async () => {
    // Filter the ideas array for only the selected items.
    setIsGeneratingImages(true);
    const selectedIdeasDetails = ideas.filter(idea =>
      selectedIdeas.includes(`${idea.art_type}: ${idea.description.substring(0, 100)}`));

    // Empty the images before generating new ones.
    setImages([]);

    for (const selectedIdea of selectedIdeasDetails) {
      const postData = {
        idea: selectedIdea,
        design: design,
        person: person,
        textInput: textInput // Include this if you need the text input from the form
      };

      try {
        const response = await generateImage(postData);
        console.log("Response from generating images:", response)
        // Immediately display each image as it's generated by updating the state.
        setImages(prevImages => [...prevImages, response.data]);
      } catch (error) {
        console.error('Error generating image:', error);
        // Optionally handle the error, e.g., by displaying an error message.
      }
    }
    setIsGeneratingImages(false);
  };

  return (
    <Panel>
      <CheckboxContainer>
        {ideas.map((idea, index) => {
          const checkboxId = `checkbox-${index}`;
          return (
            <div key={index}>
              <HiddenCheckbox
                id={checkboxId}
                type="checkbox"
                checked={selectedIdeas.includes(`${idea.art_type}: ${idea.description.substring(0, 100)}`)}
                onChange={() => handleCheckboxChange(idea)}
              />
              <StyledLabel htmlFor={checkboxId}>
                {`${idea.art_type}: ${idea.description.substring(0, 100)}...`}
              </StyledLabel>
            </div>
          );
        })}
      </CheckboxContainer>

      <Button onClick={handleGenerateClick} disabled={selectedIdeas.length === 0}>
        Generate Images
      </Button>
      {isGeneratingImages && (
        <>
          <p>Generating images</p>
          <Loader />
        </>
      )}
      <ImageContainer>
        {images.map((image, index) => (
          <StyledImage
            src={image.url}
            alt={`Trouble opening ${image.url}`}
          />
        ))}
      </ImageContainer>
    </Panel>
  );
};

export default IdeasPanel;
