import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home'
import Form from './Form'



function App() {
  return (
    <div id="app">
      <nav>
        {/* NavLinks here */}
        <NavLink to="/" style={{ marginRight: '10px' }}>Home</NavLink>
          <NavLink to="/order" style={{ marginRight: '10px' }}>Order</NavLink>
   
      </nav>
      <Routes>
      {/* Route and Routes here */}
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Form />} />
      </Routes>
    </div>
  )
}

export default App
