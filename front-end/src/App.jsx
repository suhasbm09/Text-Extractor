import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Result from './Pages/Result';
import './index.css';

function App() {
  return (
    <Router>
      <div className='bg-gray-950 text-white min-h-screen flex justify-center items-center'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
