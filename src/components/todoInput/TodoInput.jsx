import AddButton from "../addButton/AddButton"

import './todoInput.css';

export default function TodoInput({ newTodo, setNewTodo, addTodo }) {
    return (
        <div className="todo-input">
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Type here"
                maxLength={100}
                className="todo-input__field"
            />
            <AddButton onClick={addTodo}/>
        </div>
    )
}