import React from 'react';
import IntroComp from './pages/IntroComp';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CouponDegen from './pages/CouponDegen';
import AdminAuth from './pages/auth/AdminAuth';
import AdminComp from './pages/AdminComp';
import Admin from './pages/auth/Admin';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Barlow&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald&family=Yantramanav&family=Six+Caps&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
      </style>
      <Routes>
        <Route path='/' element={<IntroComp />} />
        <Route path='/coupon-degen' element={<CouponDegen />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin' element={<AdminComp />} />
      </Routes>
    </Router>
  );
}

export default App;
