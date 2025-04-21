import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection';
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <>
     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-red'>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
     </Routes>
     </div>
    </>
  )
}

export default App
