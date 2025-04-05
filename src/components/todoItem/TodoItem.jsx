export default function TodoItem({ todo, onDelete, onToggle }) {
    return (
        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input 
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
                style={{ marginRight: '10px' }}
            />
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
            <button 
                onClick={onDelete} 
                style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
                Удалить
            </button>
        </li>
    );
}