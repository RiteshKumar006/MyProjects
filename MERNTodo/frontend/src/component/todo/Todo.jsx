import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Todo.css";
import TodoCards from "./TodoCards";
import { toast } from "react-toastify";
import Update from "./Update";

function Todo() {
  const id = sessionStorage.getItem("id");
  const [todoInput, setTodoInput] = useState({
    title: "",
    body: "",
  });
  const [todoData, setTodoData] = useState([]);
  const [updateTodo, setUpdateTodo] = useState({})


  
  const changeHandler = (e) => {
    const { name, value } = e.target;
    // console.log("line no 11", name, value)

    setTodoInput({ ...todoInput, [name]: value });
  };

  const submit = async () => {
    if (todoInput.title === "" || todoInput.body === "") {
      toast.error("Please fill all the fields");
      return;
    } else {
      if (id) {
        console.log("before log", id, todoInput);
        await axios
          .post("http://localhost:3001/api/v2/addTask", {
            title: todoInput.title,
            body: todoInput.body,
            id: id,
          })
          .then((res) => {
            toast.success("Todo Added Successfully");
            setTodoInput({ title: "", body: "" });
            fetchTask();
          });
      } else {
        toast.error("Please login first");
      }
    }
  };

  const displayTodo = (id) => {
    const filteredTodo = todoData.filter((todo) => todo._id === id);
    setUpdateTodo(filteredTodo[0]);
    document.getElementById("todo-update").style.display = "block";
  };

  const deleteHandler = async (cartID)=>{
    if(id){
    console.log("id", cartID)
    await axios.delete(`http://localhost:3001/api/v2/deleteTask/${cartID}`,{data: {id}}).then((res)=>{
      console.log("response ", res)
      toast.success("Task Deleted Successfully")
    })
    fetchTask()
  }else {
    toast.error("Please login first")
  }
  }

  const fetchTask = async () =>{
    await axios.get(`http://localhost:3001/api/v2/getTasks/${id}`).then((res)=>{
      console.log("response",res)
      setTodoData(res.data.list)
    })
}


  useEffect(() =>{
    fetchTask()
  },[updateTodo])
  return (
    <div className="todo">
      <div className="todo-main flex-column  container d-flex justify-content-center mt-3 align-items-center">
        <div className="d-flex flex-column todo-inputs-dev w-50">
          <input
            type="text"
            style={{ borderBottom: "1px solid black" }}
            placeholder="Title"
            name="title"
            className="my-2 p-3  todo-inputs"
            value={todoInput.title}
            onChange={changeHandler}
          />
          <textarea
            type="text"
            placeholder="Enter Your Text"
            className="p-3 todo-inputs"
            name="body"
            value={todoInput.body}
            onChange={changeHandler}
          />
          <div className=" d-flex justify-content-end">
            <button className="home-btn w-50 my-3 mx-3" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="todo-cards-dev d-flex justify-content-center align-items-center">
        <div className="container  row cardBorder">
          {todoData?.map((data, index) => {
            return (
              <div className=" col-lg-3  mt-4 " key={index}>
                {/* {console.log("data ", data)} */}
                <TodoCards
                  data={data}
                  key={index}
                  id={data._id} 
                  deleteTask={(id) => deleteHandler(id)}
                  displayTodo={displayTodo}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="update container">
          <Update updateTodo={updateTodo} fetchTask={fetchTask} />
        </div>
      </div>
    </div>
  );
}

export default Todo;
