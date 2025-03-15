import React from "react";
import "./navbar.css"
import { RiCalendarTodoLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { authActions } from "../../store";
function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch()
  console.log("isLoggedIn", isLoggedIn);
  const logouthandle = () =>{
    dispatch(authActions.logout())
    sessionStorage.removeItem("id")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <RiCalendarTodoLine />
            
           <b> Todo </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active btn-nav" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active btn-nav" aria-current="page" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active btn-nav" aria-current="page" to="/todo">
                  Todo
                </Link>
              </li>
              {!isLoggedIn && <>
                <li className="nav-item">
                <Link className="nav-link active btn-nav" aria-current="page" to="/signup">
                  SignUp
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link active btn-nav" aria-current="page" to="/signin">
                  Login
                </Link>
              </li>
              </>}
              { isLoggedIn && <li onClick={logouthandle} className="nav-item ">
              <Link className="nav-link active btn-nav" aria-current="page" to="/signin">
                  Logout
                </Link>
              </li>}
            </ul>
           
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
