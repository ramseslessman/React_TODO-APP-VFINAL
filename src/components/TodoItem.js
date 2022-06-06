import React from 'react';
import {TodoEdit} from './TodoEdit';

function TodoItem(props) {
  const [modoEdit, setModoEdit] = React.useState(false);
  const [todoEdit, setTodoEdit] = React.useState(props.text);

  const edit = () => {
    setModoEdit(true);
  };
  const editChange = (event) => {
    setTodoEdit(event.target.value);
  };

  const editSubmit = (event) => {
    event.preventDefault();
    props.todoUpdate(props.id, todoEdit);
    setTodoEdit(todoEdit);
    setModoEdit(false);
  };
  return (
    <div>
      {modoEdit ? (
        <TodoEdit
          editSubmit={editSubmit}
          todoEdit={todoEdit}
          editChange={editChange}
          
        />
      ) : (
        <li className="todoList">
          <h1 onClick={props.onComplete} className="buttonCompleted">
            {props.todos.completed ? (
              <span className="completed"> C </span>
            ) : (
              <span className="complete"> C </span>
            )}
          </h1>
          <p className="todoText">{props.text}</p>
          <h1 onClick={edit} className="buttonEdit">
            E
          </h1>
          <h1 onClick={props.onDelete} className="buttonDelete">
            X
          </h1>
        </li>
      )}
    </div>
  );
}

export { TodoItem };
