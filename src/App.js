import './App.css';
import { useState, useEffect } from "react";
import ManagerSection from "./components/Manager.js";
import "react-calendar/dist/Calendar.css";
import Tasks from './components/Tasks.js';
import ListForm from './components/ListForm.js';

function App() {

  const [date, setDate] = useState(new Date());

  const [upcomingCount, setUpcomingCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [Manager, setManager] = useState("");

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

  // const list = useRef();

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

  function showManager(e){
    setManager("show-manager");
  }

  function closeManager(e){
    setManager("");
  }

  return (
    <div className="App">
      
      <ManagerSection setDate={setDate} date={date} upcomingCount={upcomingCount} pendingCount={pendingCount} completedCount={completedCount} inCompletedCount={inCompletedCount} todos={todos} closeManager={closeManager} Manager={Manager}/>

      <Tasks showManager={showManager} setShowForm={setShowForm} showForm={showForm} todos={todos} setTodos={setTodos} date={date} setCompletedCount={setCompletedCount} setInCompletedCount={setInCompletedCount} />
      
      <ListForm showForm={showForm} setShowForm={setShowForm} handleSubmit={handleSubmit} setTaskName={setTaskName} taskName={taskName} setDescription={setDescription} description={description} setDateTime={setDateTime} dateTime={dateTime} setCategory={setCategory} category={category} />

    </div>
  );
}

export default App;