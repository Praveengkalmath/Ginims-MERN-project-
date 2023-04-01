import React, { useState } from 'react';
import axios from 'axios';

function EditTask(props) {
  const [task, setTask] = useState({
    task: '',
    startDate: '',
    endDate: '',
    priority: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask(prevTask => {
      return {
        ...prevTask,
        [name]: value
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskId = props.match.params.id;
    axios.put(`/tasks/${taskId}`, task)
      .then(response => {
        console.log(response);
        // redirect to task details page
        props.history.push(`/tasks/${taskId}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className='w-100' onSubmit={handleSubmit}>
        <label>TaskName:</label>
        <input type="text" name="task" value={task.task} onChange={handleChange} />

        <label>Start Date:</label>
        <input type="date" name="startDate" value={task.startDate} onChange={handleChange} />

        <label>End Date:</label>
        <input type="date" name="endDate" value={task.endDate} onChange={handleChange} />

        <label>Priority:</label>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value=""></option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className='ms-3 btn btn-outline-warning' type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;





