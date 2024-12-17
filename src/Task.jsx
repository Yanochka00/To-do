import React from 'react';
const Task =({task,onDelete, onSwitch})=>
{
    return(
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
    <input className = "checkbox"  type="checkbox"
    checked = {task.completed} 
    onChange={onSwitch} />

    <div className="text-container">
    <h4>{task.task}</h4>
    <p>{task.description}</p>
    <p className="dateCreated">{task.dateCreated}</p>
    </div>

    <button className='button1' onClick = {()=>onDelete()}>Удалить</button></div>)
}
export default Task;