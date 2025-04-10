import { useState } from 'react';

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(todo.text);
    }

    const handleSave = () => {
        if (editText.trim() !== '') {
            onEdit(editText);
            setIsEditing(false);
        }
    }

    const handleCancel = () => {
        setEditText(todo.text);
        setIsEditing(false);
    }

    return (
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input 
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
                style={{ marginRight: '10px' }}
            />
            {isEditing ? (
                <div style={{ flex: 1}}>
                    <input 
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        style={{ marginRight: '10px', padding: '5px'}}
                    />
                    <button onClick={handleSave} style={{ marginRight: '5px' }}>
                        Save
                    </button>
                    <button onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div 
                onClick={onToggle} 
                style={{
                    flex: 1,
                    cursor: 'pointer',
                    padding: '5px 10px',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    backgroundColor: todo.completed ? '#e0e0e0' : 'transparent',
                    borderRadius: '5px',
                    transition: 'background-color 0.2s',
                }}
            >
                {todo.text}
            </div>
            )}
            <div style={{ display: 'flex', gap: '10px'}}>
                {!isEditing && (
                    <button onClick={handleEdit} style={{ cursor: 'pointer' }}>
                        Edit
                    </button>
                )}
                <button onClick={onDelete} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                    Delete
                </button>
            </div>
        </li>
    );
}