import React, { useState, useRef, useEffect } from 'react';

const ListName = ({ tittle, onTittleChange, darkMode, style }) => {
  const [editing, setEditing] = useState(false);
  const [editedTittle, setTittleEditado] = useState(tittle || 'Título de la lista');
  const titleRef = useRef(null);

  useEffect(() => {
    if (editing && titleRef.current) {
      // Seleccionar automáticamente el texto completo al entrar en modo de edición
      const range = document.createRange();
      range.selectNodeContents(titleRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [editing]);

  const handleTittleClick = () => {
    setEditing(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evitar el salto de línea por defecto
      handleTittleBlur();
    }
  };

  const handleTittleBlur = () => {
    if (editedTittle.trim() === '') {
      setTittleEditado('Título de la lista');
    }
    setEditing(false);
    onTittleChange(editedTittle);
    
    if (titleRef.current) {
      titleRef.current.blur();
    }
  };

  return (
    <h3
      ref={titleRef}
      onClick={handleTittleClick}
      contentEditable
      onBlur={handleTittleBlur}
      onKeyDown={handleKeyDown}
      style={{
        outline: 'none',
        cursor: 'text',
        backgroundColor: darkMode ? '#121F3D' : '#D9D9D9',
        color: darkMode ? '#ffff' : '#000',
        border: editing ? '2px solid #5D38F1' : 'none',
        borderRadius: editing ? '10px' : '0',
        padding: editing ? '5px' : '0',
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: editing ? editedTittle : tittle }}
    />
  );
};

export default ListName;
