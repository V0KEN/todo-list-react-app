// import logo from './logo.svg';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';
import { FaCheck } from "react-icons/fa";
import './App.css';

function App() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completedToDos, setCompletedToDos] = useState([]);

  // Add to do to the list
  const handleAddToDo = () => {
    let newToDoItem = {
      title: title,
      description: description,
    }

    let updateToDoArr = [...toDos];
    updateToDoArr.push(newToDoItem);
    setToDos(updateToDoArr);
    localStorage.setItem('todolist', JSON.stringify(updateToDoArr));
  }
  
  // Delete to do item off the list
  const handleDelete = (index) => {
    let deletedToDo = [...toDos];
    deletedToDo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(deletedToDo));
    // Assign new list with deleted item
    setToDos(deletedToDo);
  }

  const handleComplete = ((index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '/' + mm + '/' + yyyy + ' ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...toDos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedToDos];
    updatedCompletedArr.push(filteredItem);
    setCompletedToDos(updatedCompletedArr);
    // Delete complete ones off the Ongoing
    handleDelete(index);
    localStorage.setItem('completeToDos', JSON.stringify(updatedCompletedArr));
  })

  // Delete completed to do item off the list
  const handleDeleteCompleted = (index) => {
    let deletedCompletedToDo = [...completedToDos];
    deletedCompletedToDo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(deletedCompletedToDo));
    // Assign new list with deleted item
    setCompletedToDos(deletedCompletedToDo);
  }

  // check local storage and populate it
  useEffect(()=> {
    // convert local storage data to array
    let savedToDo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedToDo = JSON.parse(localStorage.getItem('completedToDos'));

    if (savedToDo) {
      setToDos(savedToDo);
    }

    if (savedCompletedToDo) {
      setCompletedToDos(savedCompletedToDo);
    }
  },[])

  return (
      <div className="App">
        <h1>To Do List</h1>

        <div className='todo-container'>
          <div className='todo-input'>
            <div className='todo-item'>
                <label>Task</label>
                <input type='text' 
                        value={title} 
                        onChange={(e)=>setTitle(e.target.value)} 
                        placeholder='What is the task? 👀'/>
            </div>
            <div className='todo-item'>
                <label>Description</label>
                <input type='text' 
                        value={description} 
                        onChange={(e)=>setDescription(e.target.value)} 
                        placeholder='What is it about? 💁‍♂️'/>
            </div>
            <div className='todo-item-add-btn'>
                <button type='button' onClick={handleAddToDo} className='btn'>Add</button>
            </div>
          </div>
          
          <div className='status-container'>
            <button 
              className={`statusBtn ${isCompletedScreen === false && 'active'}`}
              onClick={() => setIsCompletedScreen(false)}
            >
              Ongoing
            </button>
            <button 
              className={`statusBtn ${isCompletedScreen === true && 'active'}`}
              onClick={() => setIsCompletedScreen(true)}
            >
              Completed
            </button>
          </div>

          <div className='todo-list'>

            {isCompletedScreen===false && toDos.map((item, index)=> {
              return(
                <div className='todo-list-item' key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
    
                  <div>
                    <BiSolidTrash className='trash-icon' onClick={()=>handleDelete(index)} title='Delete?'/>
                    <FaCheck className='check-icon' onClick={()=>handleComplete(index)} title='Complete?'/>
                  </div> 
                </div>
              )
            })}
            
            {isCompletedScreen===true && completedToDos.map((item, index)=> {
              return(
                // Parse completed to do to the "Completed" tab
                <div className='todo-list-item' key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Completed on: {item.completedOn}</p>
                  </div>
    
                  <div>
                    <BiSolidTrash className='trash-icon' onClick={()=>handleDeleteCompleted(index)} title='Delete?'/>
                  </div> 
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
}

export default App;
