import './App.css';
import { useRef } from "react";

function App() {

  const input = useRef();
  const list = useRef();

  function handleSubmit() {
    if (input.current.value !== "") {
      const li = document.createElement('li');
      li.textContent = input.current.value;
      list.current.appendChild(li);
    }
  }

  return (
    <div className="App">
      <fieldset>
        <legend>Task Manager</legend>
      </fieldset>
      <fieldset id="tasks">
        <legend>TO DO's</legend>
        <form id="task-input" onSubmit={handleSubmit} action="#">
          <input placeholder="Enter your task" ref={input} />
        </form>
        <ol ref={list}>
          <li>First Item</li>
        </ol>
      </fieldset>
    </div>
  );
}

export default App;