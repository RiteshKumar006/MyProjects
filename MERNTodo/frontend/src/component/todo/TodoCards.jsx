import React from "react";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";

function TodoCards({ data, id , deleteTask , displayTodo, }) {
    
  
 const  updateFunction = ()=>{
  displayTodo(id)
  }

    // console.log("data ", data)
  return (
    <div className="cardCapsul">
      <div className="card">
        <div className="card-body">
          <div className="d-flex ">
            <input
              type="checkbox"
              onChange={(e) => console.log(e.target.checked)}
              className="form-check-input"
            />
            <h5 className="card-title ms-2">{data.title}</h5>
          </div>
          <p className="card-text">{data.body}</p>
          <div className="d-flex justify-content-between card-icon-head ">
            <div onClick={() => deleteTask(id)} >
              <AiTwotoneDelete  className="mb-1"/> <strong>Delete</strong>
            </div>
            <div onClick={() => updateFunction()}>
              <FaEdit className="mb-1" /> <strong>Edit</strong>
            </div>
          </div>
          {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default TodoCards;
