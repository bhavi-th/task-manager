import './App.css';
import { useRef, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {

  const [date, setDate] = useState(new Date());

  const [upcomingCount, setUpcomingCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);


  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todo")) === null ? [] : JSON.parse(localStorage.getItem("todo")));
  if (todos === null) {
    localStorage.setItem("todo", todos);
  }

  const [taskCount, setTaskCount] = useState(
    localStorage.getItem("todo") && JSON.parse(localStorage.getItem("todo")).length > 0
      ? JSON.parse(localStorage.getItem("todo")).at(-1).id + 1
      : 0
  );

  const [completedCount, setCompletedCount] = useState(0);
  const [inCompletedCount, setInCompletedCount] = useState(0);
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todo")) || [];

    storedTodos.forEach(element => {
      element["completed"] ? setCompletedCount(prev => prev + 1) : setInCompletedCount(prev => prev + 1);
    });

  }, [setCompletedCount, setInCompletedCount]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todo")) || [];
    const now = new Date();

    // Calculate upcoming and pending tasks
    const upcomingTasks = storedTodos.filter(todo => new Date(todo.dateTime) > now).length;
    const pendingTasks = storedTodos.filter(todo => !todo.completed && new Date(todo.dateTime) <= now).length;

    // Update state
    setUpcomingCount(upcomingTasks);
    setPendingCount(pendingTasks);
  }, [todos]); // Runs whenever `todos` updates

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [category, setCategory] = useState("Personal");

  const [showForm, setShowForm] = useState(false);

  const list = useRef();

  function task({ id, taskName, description, dateTime, category }) {
    setTaskName("");
    setDescription("");
    setDateTime("");
    setCategory("");
    setTaskCount(prev => prev + 1);

    if (id === taskCount) {
      let newTask = {
        id: id || taskCount,
        taskName,
        description,
        dateTime,
        category,
        completed: false
      }

      setTodos(prev => [...prev, newTask])
      localStorage.setItem("todo", JSON.stringify([...todos, newTask]));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    task({ id: taskCount, taskName, description, dateTime, category });
    // e.target.parentNode.classList.add("collapsed");
    setShowForm(prev => !prev);
  }

  return (
    <div className="App">
      <fieldset id="manager">
        <legend>Task Manager</legend>
        <Calendar style={{ backgroundColor: "black" }} onChange={setDate} value={date}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              return todos.some(todo => new Date(todo.dateTime).toDateString() === date.toDateString())
                ? "highlighted-date"
                : "";
            }
          }}
        />
        <p>
          Upcomming Tasks
          <span>{upcomingCount}</span>
        </p>
        <p>
          Pending Tasks
          <span>{pendingCount}</span>
        </p>
        <p>
          Completed Tasks
          <span>{completedCount}</span>
        </p>
        <p>
          Incompleted Tasks
          <span>{inCompletedCount}</span>
        </p>
      </fieldset>
      <fieldset id="tasks">
        <legend>TO DO's</legend>
        <div id="todos-header">
          <p id="current-date">{date.toDateString()}</p>
          <button
            id="toggle-form"
            onClick={() => setShowForm(prev => !prev)}
          >
            {showForm ? "Close Form" : "Add Task"}
          </button>
        </div>

        <ul ref={list}>
          {todos.filter(todo => {
            const taskDate = new Date(todo.dateTime).toDateString();
            const selectedDate = date.toDateString();
            return taskDate === selectedDate;
          }).map(todo => (
            <li key={todo.id} data-id={todo.id} className={todo.completed ? "completed-task" : ""}>
              <div className="text-container">
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.taskName}</span>
                <p style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.description}</p>
              </div>
              <div className="buttons-container">
                <button
                  className="completed"
                  onClick={(e) => {
                    let completedbtn = e.target;
                    let li = completedbtn.closest("li");
                    let taskId = parseInt(li.getAttribute("data-id"));

                    // Toggle completed state for the clicked task
                    let updatedTodos = todos.map((todo) => {
                      if (todo.id === taskId) {
                        return { ...todo, completed: !todo.completed };
                      }
                      return todo;
                    });

                    // Update state and localStorage
                    setTodos(updatedTodos);
                    localStorage.setItem("todo", JSON.stringify(updatedTodos));

                    // Immediately update completed/incompleted counts
                    const completedTasks = updatedTodos.filter((todo) => todo.completed).length;
                    const inCompletedTasks = updatedTodos.length - completedTasks;
                    setCompletedCount(completedTasks);
                    setInCompletedCount(inCompletedTasks);

                    // Update button text dynamically
                    completedbtn.textContent = updatedTodos.find((todo) => todo.id === taskId).completed
                      ? "Incompleted"
                      : "Completed";

                    // Update UI text decoration
                    let textContainer = li.querySelector(".text-container span");
                    textContainer.style.textDecoration =
                      textContainer.style.textDecoration === "line-through" ? "none" : "line-through";
                  }}
                >
                  {todos.find((t) => t.id === todo.id)?.completed ? "Incompleted" : "Completed"}
                </button>
                <button className="remove" onClick={(e) => {
                  let li = e.target.closest("li"); // Find the closest <li> element
                  let taskId = parseInt(li.getAttribute("data-id"));

                  // Filter out the deleted task
                  let updatedTodos = todos.filter(todo => todo.id !== taskId);

                  // Update state and localStorage
                  setTodos(updatedTodos);
                  localStorage.setItem("todo", JSON.stringify(updatedTodos));

                  // Update completed and incompleted counts
                  const completedTasks = updatedTodos.filter(todo => todo.completed).length;
                  const inCompletedTasks = updatedTodos.length - completedTasks;
                  setCompletedCount(completedTasks);
                  setInCompletedCount(inCompletedTasks);
                }}>Remove</button>
              </div>
              <span className="time">{todo.dateTime.substring(11, 16)}</span>
              <span className="category">{todo.category}</span>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset id="list-form" className={showForm ? "expanded" : "collapsed"}>
        <legend>List Form</legend>
        <form onSubmit={handleSubmit}>
          <input placeholder="Enter your task" onChange={(e) => setTaskName(e.target.value)} value={taskName} required />
          <textarea rows="8" placeholder="Enter the description of the task" onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
          <input type="datetime-local" onChange={(e) => setDateTime(e.target.value)} value={dateTime} required />
          <select onChange={(e) => setCategory(e.target.value)} value={category} required >
            <option>Personal</option>
            <option>Work</option>
            <option>Home</option>
            <option>Finance</option>
            <option>Social</option>
            <option>Travel</option>
            <option>Studies</option>
          </select>
          <button id="add-task" type="submit">Add task</button>
        </form>
      </fieldset>
    </div>
  );
}

export default App;