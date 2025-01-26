import React from "react";
import "./Navbar.css"
import { RiCalendarTodoLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <RiCalendarTodoLine />
            
           <b> Todo </b>
          </a>
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
                <a className="nav-link active btn-nav" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active btn-nav" aria-current="page" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active btn-nav" aria-current="page" href="#">
                  SignUp
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link active btn-nav" aria-current="page" href="#">
                  Login
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link active" aria-current="page" href="#">
                  <img alt="Logout" className="user-img" src="https://cdn-icons-png.flaticon.com/512/6676/6676023.png" />
                </a>
              </li>
            </ul>
           
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
