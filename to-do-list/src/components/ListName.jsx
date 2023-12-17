import React, { useState, useRef, useEffect } from 'react';

const ListName = ({ tittle, onTittleChange, darkMode, style }) => {
  const [editing, setEditing] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (editing && titleRef.current) {
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
      event.preventDefault();
      handleTittleBlur();
    }
  };

  const handleTittleBlur = () => {
    setEditing(false);
    const trimmedTittle = titleRef.current.textContent.trim();

    if (trimmedTittle !== '') {
      onTittleChange(trimmedTittle);
    } else {
      setEditing(false);
      // Restablecer el título anterior solo si no está en blanco
      titleRef.current.textContent = tittle;
    }

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
      spellCheck={false} // Desactivar verificación ortográfica
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
    >
      {tittle}
    </h3>
  );
};

export default ListName;
