import './App.css';
import { useRef } from "react";

function App() {

  const input = useRef();
  const list = useRef();

  function expandInput(e) {
    e.target.previousElementSibling.style.width = "100%";
    e.target.style.opacity = 0;
    setTimeout(
      () => {
        document.getElementById("tasks").removeChild(e.target)
      }, 1000
    );
  }

  function task(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const div = document.createElement('div');
    const remove = document.createElement('button');
    const completed = document.createElement('button');
    completed.textContent = "Completed";
    remove.textContent = "Remove";
    completed.classList.add("completed");
    remove.classList.add("remove");
    remove.addEventListener('click', (e) => {
      list.current.removeChild(e.target.parentNode.parentNode)
    })
    completed.addEventListener('click', (e) => {
      let span = e.target.parentNode.previousElementSibling;
      span.style.textDecoration = (span.style.textDecoration === "line-through") ? "none" : "line-through";
    })
    span.textContent = text;
    div.classList.add("buttons-container");
    div.append(completed);
    div.append(remove);
    li.append(span);
    li.append(div);
    list.current.appendChild(li);
  }

  function handleSubmit(e) {
    if (e.code === "Enter") {
      if (input.current.value !== "") {
        task(input.current.value)
        input.current.value = "";
      }
    }
  }

  return (
    <div className="App">
      <fieldset>
        <legend>Task Manager</legend>
      </fieldset>
      <fieldset id="tasks">
        <legend>TO DO's</legend>
        <input placeholder="Enter your task" ref={input} onKeyDown={handleSubmit} />
        <button onClick={expandInput} id="add-task">Add task</button>
        <ul ref={list}></ul>
      </fieldset>
    </div>
  );
}

export default App;