import React, { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import {authActions} from "../../store/index"

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const changeHandler = async(e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
      
      }

      const signinHandler = async(e) => {
        e.preventDefault();
        const { email, password } = input;
        await axios.post("http://localhost:3001/api/v1/singin",{
            email,
            password
        }).then(res =>{
            console.log("res", res)
            toast.success("Signin Successfull");
            if(res.data.message === "Please Signup first"){
              toast.error("Please Signup first")
              return
            }
            sessionStorage.setItem("id", res.data.others._id)
            dispatch(authActions.login())
            history("/todo")
          })
      }
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
                value={input.email}
                onChange={changeHandler}
              />
              {/* <input className='p-2 my-3' type='username' name='usern ame' placeholder='UserName' /> */}
              <input
                className="p-2 my-3"
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={changeHandler}
              />
              <button className="btnSignup p-2" onClick={signinHandler}>SignIn</button>
            </div>
          </div>
          <div className="col-lg-4 colLeft column signupheading d-flex justify-content-center align-items-center">
            <h1 className="text-center signupheading">
              Sign <br /> in
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
