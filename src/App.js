import React, { useState, useEffect } from 'react';
import './App.css';
import {firestore} from './index'

function App() {
  const [tasks,setTasks]=useState([])
  const [name, setName]=useState("")



  useEffect(()=>{
    retriveData()
  },[])


  const retriveData = ()=>{
    firestore.collection("tasks").onSnapshot((snapshot)=>{
      console.log(snapshot.docs)
      let myTask = snapshot.docs.map(d=>{
        console.log(d.data)
        const {id,name} = d.data()
        console.log(id,name)
        return {id,name}
      
      })  
      setTasks(myTask)
    })
  }

  const addTask =()=>{  
    let id = (tasks.length===0)?1:tasks[tasks.length-1].id +1
   
   firestore.collection("tasks").doc(id+'').set({id,name})
  
 }

 const deleteTask = (id)=>{
  firestore.collection("tasks").doc(id+'').delete()
}
const editTask = (id)=>{
 firestore.collection("tasks").doc(id+'').set({id,name})
}

  const renderTask = ()=>{
    if( tasks && tasks.length){
       return(
      tasks.map((task,index)=>{
        return(<li key ={index}>{task.id}:{task.name}<br/>
         <span className = 'bg'>
         <button class="btn btn-success btn-sm " onClick={()=>deleteTask(task.id)}>delete</button> 
           </span> 
           <span className ='bg'>         
              <button class="btn btn-warning btn-sm " onClick={()=>editTask(task.id)}>update</button>
              </span> 
              </li>)
      })
    )
    }
    else{
        return(<li>No task</li>)
    }
     
  }
  return (
   <div>
     <h2>Todo</h2>
      <ul>{ renderTask() }</ul>
        <h2>{name}</h2>
      <input
        type = "text"
        name = "name"
        onChange = {(e)=>setName(e.target.value)}
      /> 
      <button class="btn btn-info btn-sm" onClick ={addTask}>submit</button>   
      </div>
  );
}

export default App;
