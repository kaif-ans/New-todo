import React from "react";
import "./App.css";

function App() {
  const [input, setInput] = React.useState("");
  const [list, setList] = React.useState([]);
  const completed = list.filter((td) => td.isChecked === true);
  const pending = list.filter((td) => td.isChecked === false);

  function handleChange(event) {
    setInput(event.target.value);
  }
  
  function handleChangeList(event, id) {
    setList((prevValue) =>
      prevValue.map((todo) =>
        todo.id === id ? { ...todo, isChecked: event.target.checked } : todo
      )
    );
  }

  function addItem() {
    setList((prevValue) => [
      ...prevValue,
      { id: list.length, todo: input, isChecked: false, isEdit: false },
    ]);
    setInput("");
  }

  function deleteList(id) {
    const deleteLi = list.filter((li) => li.id !== id);
    setList(deleteLi);
  }

  function reset() {
    setList([]);
  }

  function editList(id) {
    setList((prevValue) =>
      //Edited List
      prevValue.map((el) => (el.id === id ? { ...el, isEdit: !el.isEdit } : el))
    );
  }

  function handleEdit(event, id) {
    setList((prevValue) =>
      prevValue.map((td) =>
        td.id === id ? { ...td, todo: event.target.value } : td
      )
    );
  }

  return (
    <div>
      <div className="input-div">
        <label>
          <input
            type="text"
            placeholder="Add New Todo..."
            onChange={handleChange}
            value={input.trimStart()}
          />
          <button
            className="add-btn"
            disabled={input.trimStart() === "" ? true : false}
            onClick={addItem}
          >
            +
          </button>
        </label>
      </div>

      <div className="todos-div">
        <div className="todo-reset">
          <h1>Todo's</h1>
          <button onClick={reset}>Reset</button>
        </div>
        <h5>
          {list.length} Total, {completed.length} Completed and {pending.length}{" "}
          Pending
        </h5>
        <div className="full-list">
          <div className="list-heading">
            <span>#</span>
            <span>Todo Title</span>
            <span>Status</span>
            <span> </span>
          </div>
          <section>
            {list.length > 0 &&
              list.map((td, i) => (
                <li
                  key={i}
                  style={{
                    backgroundColor: td.isChecked ? "lightgreen" : "#eee",
                  }}
                >
                  <input
                    type="checkbox"
                    className="check-box"
                    onChange={(e) => handleChangeList(e, td.id)}
                  />
                  {td.isChecked === false && td.isEdit ? (
                    <input
                      type="text"
                      className="edit-input"
                      value={td.todo}
                      onChange={(e) => handleEdit(e, td.id)}
                    />
                  ) : td.isChecked ? (
                    <s>{td.todo}</s>
                  ) : (
                    td.todo
                  )}
                  <span>{td.isChecked ? <s>Completed</s> : "Pending"}</span>
                  <span>
                    <i
                      className="fa fa-pencil pencil"
                      onClick={() => editList(td.id)}
                    ></i>
                    <span> </span>
                    <i
                      className="fa fa-trash-o trash"
                      onClick={() => deleteList(td.id)}
                    ></i>
                  </span>
                </li>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
