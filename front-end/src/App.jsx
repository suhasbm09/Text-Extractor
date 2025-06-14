import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Result from './Pages/Result';
import './index.css';

function App() {
  return (
    <Router>
      <div className='bg-gradient-to-bl from-gray-900 via-black to-gray-950 text-white min-h-screen flex justify-center align-middle items-center'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
