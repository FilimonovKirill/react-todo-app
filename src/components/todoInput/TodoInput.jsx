import AddButton from "../addButton/AddButton"

export default function TodoInput({ newTodo, setNewTodo, addTodo }) {
    return (
        <div id="todo-input">
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Введите задачу"
                maxLength={100}
            />
            <AddButton onClick={addTodo}/>
        </div>
    )
}