import React, { useState } from 'react';
import * as IoIcons from 'react-icons/io';
import { IconContext } from 'react-icons';
import '../App.css';

function ListTask({ tasks, onTaskCompleted, onTaskDeleted, onTaskEdit, darkMode }) {
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleTaskClick = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleKeyDown = (event, taskId, editedTaskName) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setEditingTaskId(null);
      onTaskEdit(taskId, editedTaskName);
    }
  };

  const handleTaskBlur = (taskId, editedTaskName) => {
    setEditingTaskId(null);
    onTaskEdit(taskId, editedTaskName);
  };

  return (
    <ul style={{ marginTop: '10px', padding: 0, listStyle: 'none' }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ listStyle: 'none', padding: '0' }}>
          <span
            onClick={() => handleTaskClick(task.id)}
            onBlur={(e) => handleTaskBlur(task.id, e.target.textContent)}
            contentEditable={editingTaskId === task.id}
            onKeyDown={(e) => handleKeyDown(e, task.id, e.target.textContent)}
            spellCheck={false}
            style={{
              backgroundColor: '#796CE1',
              marginBottom: '10px',
              textDecoration: task.completed ? 'line-through' : 'none',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '16px',
              padding: '6px',
              width: '100%',
            }}
          >
            {task.name}
            <IconContext.Provider value={{ color: darkMode ? '#ffff' : '#000' }}>
              <IoIcons.IoIosCheckmark
                id="completeTask"
                onClick={() => onTaskCompleted(task.id)}
                style={{
                  marginLeft: 'auto',
                  fontSize: '2em',
                  cursor: 'pointer',
                  color: task.completed ? '#6eff0d' : darkMode ? '#ffff' : '#000',
                }}
              />
              <IoIcons.IoIosClose
                id="deleteTask"
                onClick={() => onTaskDeleted(task.id)}
                style={{
                  marginLeft: '8px',
                  fontSize: '2em',
                  cursor: 'pointer',
                }}
              />
            </IconContext.Provider>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ListTask;
