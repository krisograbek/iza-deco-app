import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FieldContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Icon = styled.span`
  margin-left: -30px;
  cursor: pointer;
`;

const Input = ({ value, onChange, disabled, placeholder }) => {
  const [editMode, setEditMode] = useState(false);
  const [localValue, setLocalValue] = useState(value);


  useEffect(() => {
    if (!editMode) {
      setLocalValue(value);
    }
  }, [value, editMode]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setLocalValue(value);
    setEditMode(false);
  };

  const handleSave = () => {
    onChange(localValue);
    setEditMode(false);
  };

  return (
    <FieldContainer>
      <StyledInput
        type="text"
        value={editMode ? localValue : value}
        onChange={(e) => setLocalValue(e.target.value)}
        disabled={!editMode}
        placeholder={placeholder}
      />
      {!editMode ? (
        <Icon onClick={handleEdit}>✏️</Icon>
      ) : (
        <>
          <Icon onClick={handleSave}>✔️</Icon>
          <Icon onClick={handleCancel}>❌</Icon>
        </>
      )}
    </FieldContainer>
  );
};

export default Input;
