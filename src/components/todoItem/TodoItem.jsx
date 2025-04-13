import { useState } from 'react';

import './todoItem.css';

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
    <li className='todo-item'>
        <div className='todo-item__content'>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
                className='todo-item__checkbox'
            />
            {isEditing ? (
                <div style={{ flex: 1 }}>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className='todo0item__edit-input'
                    />
                    <button onClick={handleSave} className='todo-item__button'>
                        Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className='todo-item__button'>
                        Cancel
                    </button>
                </div>
            ) : (
                <div
                    onClick={onToggle}
                    className={`todo-item__text ${todo.completed ? 'todo-item__text--completed' : ''}`}
                >
                {todo.text}
                </div>
            )}
            <div className='todo-item__actions'>
                <button
                    onClick={() => setIsAddingSubtask(true)}
                    className="todo-item__button add-button"
                >
                    Add Subtask
                </button>
                {!isEditing && (
                    <button
                        onClick={handleEdit}
                        className="todo-item__button edit-button"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={onDelete}
                    className="todo-item__button delete-button"
                >
                    Delete
                </button>
            </div>
        </div>

        {isAddingSubtask && (
            <div className="todo-item__subtask-form">
                <input
                    type="text"
                    value={subtaskText}
                    onChange={(e) => setSubtaskText(e.target.value)}
                    className="todo-item__subtask-input"
                    placeholder="Enter subtask"
                />
                <button onClick={handleAddSubtask} className="todo-item__subtask-add-button">
                    Add
                </button>
                <button onClick={() => setIsAddingSubtask(false)} className="todo-item__subtask-cancel-button">
                    Cancel
                </button>
            </div>
            )}

        {todo.subtasks && todo.subtasks.length > 0 && (
            <ul className='todo-item__subtasks'>
                {todo.subtasks.map((subtask) => (
                <li key={subtask.id} className='todo-item__subtask'>
                    <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => onToggleSubtask(subtask.id)}
                    className='todo-item__subtask-checkbox'
                    />
                <span
                    className={`todo-item__subtask-text ${
                        subtask.completed ? 'todo-item__subtask-text--completed' : ''
                    }`}
                >
                {subtask.text}
                </span>
                <button
                    onClick={() => onEditSubtask(subtask.id, prompt('Edit subtask:', subtask.text))}
                    className="todo-item__subtask-button edit-button"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDeleteSubtask(subtask.id)}
                    className="todo-item__subtask-button delete-button"
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