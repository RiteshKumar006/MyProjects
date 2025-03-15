import React, { useEffect } from 'react'
import Navbar from './component/navbar/Navbar';
import Home from './component/home/Home';
import Footer from './component/footer/Footer';
import About from './component/about/About';
import {BrowserRouter as Router,Routes,Route  } from 'react-router-dom';
import Signup from './component/signup/Signup';
import Signin from './component/signup/Signin';
import Todo from './component/todo/Todo';
import { useDispatch } from 'react-redux';
import { authActions } from './store';
import { ToastContainer } from 'react-toastify';
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login())
    }
  })
  return (
   <>
   <Router>
     <Navbar />
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/signup' element={<Signup />} />
          <Route  path='/signin' element={<Signin />} />
          
          {/* <Route  path='/' element={<Home />} /> */}
      </Routes>
   </Router>
   <ToastContainer position="top-right" autoClose={3000} />
     {/* <About /> */}
     <Footer/>
   </>
  )
}

export default App
