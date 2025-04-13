import { useEffect, useState } from 'react';
import TodoInput from '../todoInput/todoInput';
import TodoList from '../todoList/TodoList';

import './todoApp.css'

function TodoApp() {
    const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [newTodo, setNewTodo] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;

    const addTodo = () => {
        if (todos.length >= 100) {
            alert('You can only have  maximum of 100 tasks.')
        }
        if (newTodo.trim() !== '') {
            setTodos([{ text: newTodo.trim(), completed: false, subtasks: [] }, ...todos]);
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

    const editTodo = (index, newText) => {
        setTodos(
            todos.map((todo, i) => 
            i === index ? { ...todo, text: newText } : todo)
        )
    }

    const addSubtask = (taskIndex, subtaskText) => {
        const updatedTodos = [...todos];
        const task = updatedTodos[taskIndex];

        if (!task.subtasks) {
            task.subtasks = [];
        }

        if (task.subtasks.length >= 20) {
            alert('You can only have a maximum of 20 subtasks.');
            return;
        }

        const newSubtask = {
            id: `${taskIndex + 1}.${task.subtasks.length + 1}`,
            text: subtaskText.trim(),
            completed: false,
        };

        task.subtasks.push(newSubtask);
        setTodos(updatedTodos);
    };

    const toggleSubtask = (taskIndex, subtaskId) => {
        const updatedTodos = [...todos];
        const task = updatedTodos[taskIndex];

        task.subtasks = task.subtasks.map((subtask) => 
            subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask    
        );

        task.completed = task.subtasks.every((subtask) => subtask.completed);
        setTodos(updatedTodos);
    }

    const editSubtask = (taskIndex, subtaskId, newText) => {
        const updatedTodos = [...todos];
        const task = updatedTodos[taskIndex];

        task.subtasks = task.subtasks.map((subtask) => 
            subtask.id === subtaskId ? { ...subtask, text: newText } : subtask
        );

        setTodos(updatedTodos);
    }

    const deleteSubtask = (taskIndex, subtaskId) => {
        const updatedTodos = [...todos];
        const task = updatedTodos[taskIndex];

        task.subtasks = task.subtasks.filter((subtask) => subtask.id !== subtaskId);

        setTodos(updatedTodos);
    }

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = todos.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(todos.length / tasksPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    return (
        <div className='todo-app'>
            <h1 className='todo-app__title'>Todo List</h1>
            <div className="todo-app__input">
                <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
            </div>
            <TodoList 
                todos={currentTasks}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                editTodo={editTodo}
                addSubtask={addSubtask}
                toggleSubtask={toggleSubtask}
                editSubtask={editSubtask}
                deleteSubtask={deleteSubtask}/>
            {totalPages > 1 && (
            <div className="todo-app__pagination">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`todo-app__page-button ${
                        currentPage === number ? 'todo-app__page-button--active' : ''
                    }`}
                >
                {number}
                </button>
            ))}
            </div>
        )}
        </div>
    );}

export default TodoApp;