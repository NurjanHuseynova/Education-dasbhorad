import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './app/pages/Sidebar/Sidebar';
import Login from "./app/pages/Login/Login";
import Home from './app/pages/Home/Home';
import Universities from './app/pages/Universities/Universities';
import Schools from './app/pages/Schools/Schools';
import HighSchools from './app/pages/HighSchools/HighSchools';
import ProContainer from './app/components/ProContainer';

const App = () => {
  return (
    <Router>
     <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/highSchools" element={<HighSchools />} />
          </Routes>
    </Router>
  );
};

export default App;