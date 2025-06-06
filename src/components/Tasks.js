import {useRef} from 'react'

function Tasks(
    {showManager, setShowForm, showForm, todos, setTodos, setCompletedCount, date, setInCompletedCount}
){
    const list = useRef();
    return(
      <fieldset id="tasks">
        <legend>TO DO's</legend>
        <div id="todos-header">
          <button className="hamburger" onClick={(e)=>showManager(e)}>
            <div></div>
            <div></div>
            <div></div>
          </button>
          <p id="current-date">{date.toDateString()}</p>
          <button
            id="toggle-form"
            onClick={() => setShowForm(prev => !prev)}
          >
            {showForm ? "Close Form" : "Add Task"}
          </button>
          <button id="mini-toggle-form" onClick={()=>{setShowForm(prev=>!prev)}}>
            Add Task
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
    )
}

export default Tasks;