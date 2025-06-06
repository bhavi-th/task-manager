function ListForm(
  {showForm, setShowForm, handleSubmit, setTaskName, taskName, setDescription, description, setDateTime, dateTime, setCategory, category}
){
    
  return (
    <fieldset id="list-form" className={showForm ? "expanded" : "collapsed"}>
      <legend>List Form</legend>
      <button className='hamburger close-form' onClick={()=>setShowForm(prev=>!prev)}>
        <div></div>
        <div></div>
      </button>
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
  );
}

export default ListForm;