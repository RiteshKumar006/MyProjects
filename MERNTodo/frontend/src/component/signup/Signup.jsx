import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const history = useNavigate();
  // console.log("dsds",props.signin)
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = async(e) => {

    const { email, username, password } = inputs;
     e.preventDefault();
  await axios.post("http://localhost:3001/api/v1/register",{
      email,
      username,
      password
    }).then((res) => {
      if(res.data.message === "User already exists"){
        toast.error("User already exists")
      } else{
        toast.success("Signup Successfull")
        history("/signin")
      }
    });
    setInputs({
      email: "",
      username: "",
      password: "",
    });
  };
  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column  d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-50 p-5 ">
              <input
                className="p-2 my-3"
                type="email"
                name="email"
                placeholder="Enter Your mail"
                onChange={changeHandler}
                value={inputs.email}  
              />
              <input
                className="p-2 my-3"
                type="username"
                name="username"
                placeholder="UserName"
                onChange={changeHandler}
                value={inputs.username}
              />
              <input
                className="p-2 my-3"
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
                value={inputs.password}
              />
              <button className="btnSignup p-2" onClick={submitHandler}>Sign Up</button>
             
            </div>
          </div>
          <div className="col-lg-4 colLeft column signupheading d-flex justify-content-center align-items-center">
            <h1 className="text-center signupheading">
              Sign <br /> {props.signin ? "in" : "up"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
