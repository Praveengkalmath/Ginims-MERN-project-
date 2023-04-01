import { useState } from 'react';
import axios from 'axios';
import Get from './get';

const Add = () => {
    const [taskName, setTaskName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState('');
   
  
    const handleSubmit = (e) => {
      e.preventDefault();
    
      const data = {
        taskName,
        startDate,
        endDate,
        priority,
       
      };
    
      axios.post('http://localhost:5000/tasks', data)
        .then((response) => {
          alert(response.data.message);
          
        })
        .catch((error) => {
          alert(error.data.message);
         
        });
    };
    return ( 
      <>
      
        <form className='m-auto bg-secondary mt-5 w-75 border border-5 border-dark rounded-5' onSubmit={handleSubmit}>
        <h1>GINIMS TASK MANAGEMENT</h1>
        <div className='m-3'>
          <label className='fs-3'>Task Name:</label>
          <input  className='w-75' type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
        </div>
        <div className='m-3'>
          <label className='fs-3'>Start Date:</label>
          <input className='w-75' type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className='m-3'>
          <label className='fs-3'>End Date:</label>
          <input  className='w-75' type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div className='m-3'>
          <label className='fs-3'>Priority:</label>
          <select  className='w-75' value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="">--Select Priority--</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className='m-3'>
          <button className='btn btn-success'>Create Task</button>
        </div>
      </form>

      <hr  className='bg-dark border border-5 border-dark'/>

      <Get/>
      </>
     );
}
 
export default Add;



