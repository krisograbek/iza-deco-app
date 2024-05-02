import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TextAreaContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px; // Adjust the height as needed
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none; // Prevent resizing to maintain layout integrity
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const Icon = styled.span`
  margin-left: 10px;
  cursor: pointer;
`;

const InputArea = ({ value, onChange, placeholder }) => {
  const [editMode, setEditMode] = useState(false);
  const [localValue, setLocalValue] = useState(value);


  useEffect(() => {
    if (!editMode) {
      setLocalValue(value);
    }
  }, [value, editMode]);

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setLocalValue(value);
    setEditMode(false);
  };

  const handleSave = () => {
    onChange(localValue);
    setEditMode(false);
  };

  return (
    <TextAreaContainer>
      <TextArea
        value={editMode ? localValue : value}
        onChange={(e) => setLocalValue(e.target.value)}
        disabled={!editMode}
        placeholder={placeholder}
      />
      <IconContainer>
        {!editMode ? (
          <Icon onClick={handleEdit}>✏️</Icon>
        ) : (
          <>
            <Icon onClick={handleSave}>✔️</Icon>
            <Icon onClick={handleCancel}>❌</Icon>
          </>
        )}
      </IconContainer>
    </TextAreaContainer>
  );
};

export default InputArea;
