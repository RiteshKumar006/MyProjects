import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';

function Update({updateTodo,fetchTask}) {
  console.log("updateTodo", updateTodo)
  const [inputs, setInputs] = useState({
    title: updateTodo.title,
    body: updateTodo.body
  })

  useEffect(() => {
    // setTimeout(() =>{
      setInputs({
        title: updateTodo.title,
        body: updateTodo.body
      })
    // },[1000])
  },[updateTodo])

  const closeModal = () => {
    document.getElementById("todo-update").style.display = "none";
  }

  const submit = async () => {
    if(inputs.title === "" || inputs.body === ""){
      toast.error("Please fill all the fields");
    }else {
      await axios.put(`http://localhost:3001/api/v2/updateTask/${updateTodo._id}`,{
       inputs
      }).then((res) => {
        console.log("response todo update", res)
        toast.success("Task Updated Successfully")
        fetchTask()
        closeModal()
      })
    }
  }

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name] : value });
  }
  return (
    <div className='conainer mt-5'>
    <div className='d-flex flex-column justify-content-center '>
            <div className='d-flex justify-content-between'>
            <h2>Update Your Task</h2>
            <span onClick={closeModal} className='fs-3 cross-icon'><AiOutlineClose  /></span>
            </div>
            <input type='text' name='title' onChange={change} value={inputs.title} className='todo-inputs-update'></input>
            <textarea className='todo-inputs-update' name='body' onChange={change} value={inputs.body}/>
            <button className='w-25 home-btn mt-5' onClick={submit} >Update</button>
            
    </div>
    

    </div>
  )
}

export default Update
