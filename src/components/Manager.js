import Calendar from "react-calendar";

function ManagerSection(
  {setDate, date, upcomingCount, pendingCount, completedCount, inCompletedCount, todos, closeManager, Manager}
){

    return (
      <fieldset id="manager" className={Manager}>
        <legend>Task Manager</legend>
        <button className='hamburger close-manager' onClick={(e)=>closeManager(e)}>
          <div></div>
          <div></div>
        </button>
        <Calendar style={{ backgroundColor: "black" }} onChange={setDate} value={date} 
          tileClassName={({ date, view }) => {
            if (view === "month") {
              return todos.some(todo => new Date(todo.dateTime).toDateString() === date.toDateString()) ? "highlighted-date" : "";
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
    );
}

export default ManagerSection;