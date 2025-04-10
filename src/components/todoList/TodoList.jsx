import TodoItem from "../todoItem/todoItem"

export default function TodoList({ todos, deleteTodo, toggleTodo, editTodo }) {
    return (
        <ul>
            {todos.map((todo, index) => (
                <TodoItem 
                    key={index} 
                    todo={todo} 
                    onDelete={() => deleteTodo(index)} 
                    onToggle={() => toggleTodo(index)}
                    onEdit={(newText) => editTodo(index, newText)}
                />
            ))}
        </ul>
    )
}