import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { generateIdeas } from '../services/api';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

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

const Input = styled.input`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const UploadPanel = ({ onIdeasGenerated, image, setImage, textInput, setTextInput }) => {
  const [dragging, setDragging] = useState(false);
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

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleGenerateClick = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', textInput);

    const response = await generateIdeas(formData);
    console.log(response)
    onIdeasGenerated(response.data);
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
      <Input type="text" value={textInput} onChange={handleTextChange} placeholder="Enter text here" />
      <Button onClick={handleGenerateClick} disabled={!image}>
        Generate Ideas
      </Button>
    </Panel>
  );
};

export default UploadPanel;
