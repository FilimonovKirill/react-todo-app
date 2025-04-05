import { useEffect, useState } from 'react';
import TodoInput from '../todoInput/todoInput';
import TodoList from '../todoList/TodoList';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo.trim(), completed: false}]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  }

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) => i === index ? {...todo, completed: !todo.completed } : todo) 
    )
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
    </div>
  );
}

export default TodoApp;