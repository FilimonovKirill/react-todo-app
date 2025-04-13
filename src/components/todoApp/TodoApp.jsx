import { useEffect, useState } from 'react';
import TodoInput from '../todoInput/todoInput';
import TodoList from '../todoList/TodoList';

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

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = todos.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(todos.length / tasksPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    return (
        <div>
            <h1>Todo List</h1>
            <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
            <TodoList 
                todos={currentTasks}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                editTodo={editTodo}
                addSubtask={addSubtask}
                toggleSubtask={toggleSubtask}
                editSubtask={editSubtask}/>
            {totalPages > 1 && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    style={{
                        margin: '0 5px',
                        padding: '5px 10px',
                        backgroundColor: currentPage === number ? '#4caf50' : '#f0f0f0',
                        color: currentPage === number ? '#fff' : '#000',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                {number}
                </button>
            ))}
            </div>
        )}
        </div>
    );}

export default TodoApp;