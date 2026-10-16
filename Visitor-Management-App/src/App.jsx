import React from 'react'
import HomePage from './Pages/HomePage'
import Navbar from './Pages/Navbar'
import { Routes,Route } from 'react-router'
import AddVisitor from './Pages/AddVisitor'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/AddVisitors' element={<AddVisitor/>}></Route>
    </Routes>
    </>
  )
}

export default App