import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { generateIdeas } from '../services/api';
import Loader from './Spinner';
import InputContainer from './InputContainer';
import Input from './Input';
import InputArea from './InputArea';
import Button from './Button';
import Panel from './Panel';


const FileInputContainer = styled.div`
  border: 2px dashed ${props => props.theme.colors.secondary};
  padding: 20px;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
  color: ${props => props.theme.colors.dark};
`;

const ImagePreview = styled.img`
  max-width: 500px;
  max-height: 500px;
  width: auto;
  height: auto;
  margin-bottom: 10px;
`;

const UploadPanel = ({ onIdeasGenerated, image, setImage, additionalInfo, setAdditionalInfo, person, setPerson }) => {
  const [dragging, setDragging] = useState(false);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files.length) {
      setImage(files[0]);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length) {
      setImage(event.target.files[0]);
    }
  };

  const handleGenerateClick = async () => {
    setIsGeneratingIdeas(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', additionalInfo);

    const response = await generateIdeas(formData);
    console.log(response)
    onIdeasGenerated(response.data);
    setIsGeneratingIdeas(false);
  };

  return (
    <Panel>
      <FileInputContainer
        onClick={handleFileInputClick}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <ImagePreview src={URL.createObjectURL(image)} alt="Uploaded" />
        ) : (
          <p>Drag and drop an image here, or click to select a file to upload.</p>
        )}
      </FileInputContainer>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <InputContainer>
        <Input value={additionalInfo} onChange={setAdditionalInfo} placeholder="Enter additional info" />
        <Input value={person.taste} onChange={(value) => setPerson(prev => ({ ...prev, taste: value }))} placeholder="Taste" />
        <InputArea value={person.personality} onChange={(value) => setPerson(prev => ({ ...prev, personality: value }))} placeholder="Personality" />
      </InputContainer>
      <Button onClick={handleGenerateClick} disabled={!image}>
        Generate Ideas
      </Button>
      {isGeneratingIdeas && (
        <>
          <p>Generating ideas...</p>
          <Loader />
        </>
      )}
    </Panel>
  );
};

export default UploadPanel;
