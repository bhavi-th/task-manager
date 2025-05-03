import './App.css';
import { useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {

  const [date, setDate] = useState(new Date());

  const input = useRef();
  const list = useRef();

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
      <fieldset id="manager">
        <legend>Task Manager</legend>
        <Calendar style={{ backgroundColor: "black" }} onChange={setDate} value={date} />
        <p>
          Upcomming Tasks
          <span>0</span>
        </p>
        <p>
          Completed Tasks
          <span>0</span>
        </p>
        <p>
          Incompleted Tasks
          <span>0</span>
        </p>
      </fieldset>
      <fieldset id="tasks">
        <legend>TO DO's</legend>
        <p id="current-date">{date.toDateString()}</p>
        <ul ref={list}></ul>
      </fieldset>
      <fieldset id="list-form">
        <legend>List Form</legend>
        <input placeholder="Enter your task" ref={input} onKeyDown={handleSubmit} />
        <button id="add-task" onClick={() => task(input.current.value)}>Add task</button>
      </fieldset>
    </div>
  );
}

export default App;