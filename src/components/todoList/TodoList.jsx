import TodoItem from "../todoItem/todoItem"

import './todoList.css';

export default function TodoList({
    todos,
    deleteTodo,
    toggleTodo,
    editTodo,
    addSubtask,
    toggleSubtask,
    editSubtask,
    deleteSubtask
}) {
    return (
        <ul className="todo-list">
            {todos.map((todo, index) => (
                <TodoItem 
                    key={index} 
                    todo={todo} 
                    onDelete={() => deleteTodo(index)} 
                    onToggle={() => toggleTodo(index)}
                    onEdit={(newText) => editTodo(index, newText)}
                    onAddSubtask={(subtaskText) => addSubtask(index, subtaskText)}
                    onToggleSubtask={(subtaskId) => toggleSubtask(index, subtaskId)}
                    onEditSubtask={(subtaskId, newText) => editSubtask(index, subtaskId, newText)}
                    onDeleteSubtask={(subtaskId) => deleteSubtask(index, subtaskId)}
                />
            ))}
        </ul>
    )
}