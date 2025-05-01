import './App.css';

function App() {
  return (
    <div className="App">
      <fieldset>
        <legend>Task Manager</legend>
      </fieldset>
      <fieldset id="tasks">
        <legend>TO DO's</legend>
        <div id="task-input">
          <input placeholder="Enter your task" />
          <button>Add</button>
        </div>
      </fieldset>
    </div>
  );
}

export default App;