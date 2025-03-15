 import React from 'react'
 import "./home.css"
 
 function Home() {
   return (
     <>
        <div className='home d-flex justify-content-center align-items-center'>
            <div className='container d-flex justify-content-center align-items-center flex-column'>
              <h1 className='text-center'>
                Organize your <br/> Work and life, finally.
              </h1>
              <p>
                Becomefocused,Organised, and clam with <br/> todo App.The world's #1 task manager App
              </p>

              <button className='home-btn'>
                  Make ToDo
              </button>
            </div>
        </div>
     </>
   )
 }
 
 export default Home
 