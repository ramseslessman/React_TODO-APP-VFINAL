import React from 'react';

function TodoEdit(props) {
  return (
    <form onSubmit={props.editSubmit} className="formEdit">
      <input
        className="submitEdit"
        value={props.todoEdit}
        onChange={props.editChange}
      />
      <h1 className="Update" onClick={props.editSubmit}>
        U
      </h1>
    </form>
  );
}

export { TodoEdit };
