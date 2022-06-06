import React from 'react';
import './style.css';
import { TodoList } from './components/TodoList';
import { TodoCounter } from './components/TodoCounter';
import { TodoSearch } from './components/TodoSearch';
import { TodoItem } from './components/TodoItem';
import { TodoForm } from './components/TodoForm';
import { TodoEdit } from './components/TodoEdit';

function App() {
  React.useEffect(() => {
    const localStorageTodos = localStorage.getItem('TODOS_V1');
    let parsedTodos;
    if (!localStorageTodos) {
      localStorage.setItem('TODOS_V1', JSON.stringify([]));
      parsedTodos = [];
    } else {
      parsedTodos = JSON.parse(localStorageTodos);
    }
    setTodos(parsedTodos);
  }, []);
  const [todos, setTodos] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodo = todos.filter((todo) => todo.completed == true).length;
  const totalTodos = todos.length;

  let searchedTodos = [];
  if (searchValue.length < 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem('TODOS_V1', stringifiedTodos);
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(newTodos);
  };

  const deleteTodo = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    saveTodos(newTodos);
  };

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      id: Date.now(),
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };

  const todoUpdate = (id, todoEdit) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: todoEdit } : todo
    );
    saveTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <div className="conteiner">
        <h1 className="titleApp">TODO LIST APP</h1>
        <TodoCounter total={totalTodos} completed={completedTodo} />
        <TodoForm addTodo={addTodo} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
        <TodoList>
          {searchedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              text={todo.text}
              onComplete={() => completeTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              todos={todo}
              id={todo.id}
              todoUpdate={todoUpdate}
            />
          ))}
        </TodoList>
      </div>
    </div>
  );
}

export default App;
