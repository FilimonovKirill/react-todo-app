import { useState } from 'react';

export default function TodoItem({
    todo,
    onDelete,
    onToggle,
    onEdit,
    onAddSubtask,
    onToggleSubtask,
    onEditSubtask,
    onDeleteSubtask,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [isAddingSubtask, setIsAddingSubtask] = useState(false);
    const [subtaskText, setSubtaskText] = useState('');

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(todo.text);
    };

    const handleSave = () => {
        if (editText.trim() !== '') {
            onEdit(editText);
            setIsEditing(false);
        }
    };

    const handleAddSubtask = () => {
        if (subtaskText.trim() === '') {
            alert('Subtask cannot be empty.');
            return;
        }
        onAddSubtask(subtaskText);
        setSubtaskText('');
        setIsAddingSubtask(false);
    };

    return (
    <li style={{ marginBottom: '20px', listStyleType: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
                style={{ marginRight: '10px' }}
            />
            {isEditing ? (
                <div style={{ flex: 1 }}>
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button onClick={handleSave} style={{ marginRight: '5px' }}>
                    Save
                </button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
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
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setIsAddingSubtask(true)} style={{ cursor: 'pointer' }}>
                Add Subtask
                </button>
                {!isEditing && (
                <button onClick={handleEdit} style={{ cursor: 'pointer' }}>
                    Edit
                </button>
                )}
                <button onClick={onDelete} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                Delete
                </button>
            </div>
        </div>

        {isAddingSubtask && (
        <div style={{ marginTop: '10px' }}>
            <input
                type="text"
                value={subtaskText}
                onChange={(e) => setSubtaskText(e.target.value)}
                placeholder="Enter subtask"
                maxLength={20}
                style={{ marginRight: '10px', padding: '5px' }}
            />
            <button onClick={handleAddSubtask}>Add</button>
            <button onClick={() => setIsAddingSubtask(false)} style={{ marginLeft: '5px' }}>
            Cancel
            </button>
        </div>
        )}

        {todo.subtasks && todo.subtasks.length > 0 && (
            <ul style={{ marginTop: '10px', paddingLeft: '20px', listStyleType: 'circle' }}>
                {todo.subtasks.map((subtask) => (
                <li key={subtask.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => onToggleSubtask(subtask.id)}
                    style={{ marginRight: '10px' }}
                    />
                <span
                    style={{
                        textDecoration: subtask.completed ? 'line-through' : 'none',
                        flex: 1,
                    }}
                >
                {subtask.text}
                </span>
                <button
                    onClick={() => onEditSubtask(subtask.id, prompt('Edit subtask:', subtask.text))}
                    style={{ marginLeft: '10px' }}
                >
                    Edit
                </button>
                <button
                    onClick={() => onDeleteSubtask(subtask.id)}
                    style={{ marginLeft: '5px' }}
                >
                    Delete
                </button>
                </li>
            ))}
            </ul>
        )}
        </li>
    );
}