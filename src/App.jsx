import './App.css';
import React, { Component } from "react";
import Task from './Task';

class App extends Component
{
   constructor(props)
  {
      super(props);
      this.state = { task: '', taskList: [], description: '', showMessage: false, filterCompleted: false }
  }
    handleSetTask = (e) => {this.setState({ task: e.target.value })}
    handleSetDescription = (e) => {this.setState({ description: e.target.value })}
    handleButton = () => {
      const { task, description} = this.state;
      if(task.trim() === '')
      {
        this.setState({ showMessage: true })
      } else
      {      
        const newTask = {id: Date.now(), 
        task, description,
        completed: false,
        dateCreated: new Date().toLocaleString(),
        }
      this.setState((prevState) => ({
      taskList: [...prevState.taskList, newTask],
      task: '', description: '', showMessage: false 
      }));
    }
    }

    handleDelete = (id) => {
      this.setState((prevState) => {
      const newTaskList = prevState.taskList.filter((task) => task.id !== id)
      return { taskList: newTaskList }
      })
    }

    handleCompleted = (id) => {
      this.setState((prevState) => {
      const newTaskList = prevState.taskList.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task)
      return { taskList: newTaskList }
      })
    }
  

  switchFilter = () => {
    this.setState((prevState) => ({ filterCompleted: !prevState.filterCompleted }))
}

    render()
 {
  const { task, description, taskList, showMessage, filterCompleted } = this.state
  const filteredTasks = filterCompleted ? taskList.filter(task => !task.completed) : taskList
  const sortTask = filteredTasks.sort((x,y)=>
    {
      return(x.completed === y.completed)? 0:x.completed ? 1:-1
    })
    return (<div id = "root">
    <div className = 'title'>Todo List</div>
   <div className = "state-task">
   <input value = {task}
   onChange = { this.handleSetTask }
   placeholder = "Введите задачу"/>

   <button className ='button'
   onClick = { this.handleButton }> Добавить </button></div>

    <input className = 'input1' value = {description}
   onChange = { this.handleSetDescription }
   placeholder = "Введите описание задачи"/>

   {showMessage && <p className="error-message">Введите задачу!</p>} 

   <button className = 'unfulfilled' 
    onClick = {this.switchFilter}>
    {filterCompleted ? "Показать все" : "Только невыполненные"}
    </button>

   <div className = "task-list">
    {sortTask.map((item) => (
    <Task key = {item.id} task = {item} onDelete = {()=> this.handleDelete(item.id)}
    onSwitch = {()=>this.handleCompleted(item.id)}/>))}
    </div></div>)
  }
}
export default App