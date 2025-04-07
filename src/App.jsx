import React from 'react'
import './App.css'
import{BrowserRouter as Router,Route,Routes }from'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';


axios.defaults.baseURL="http://localhost:8000";
axios.defaults.withCredentials=true;

function App() {
  return (
   <Router>
    <Toaster position='bottom-center' style={{ bottom: '50px', right: '80px', }} toastOptions={{duration:2000}}/>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
   </Router>
   
  );
}

export default App
