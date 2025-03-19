import React from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import TaskList from './components/TaskList'



function App() {
  return (
    <>
     <Router>
       <div className='container'>
        <Header />
         <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/Login' element={<Login />}></Route>
            <Route path='/Register' element={<Register />}></Route>
            <Route path='/alltasks' element={<TaskList />}></Route>
         </Routes>
       </div>
     </Router>
     <ToastContainer />
     </>
  );
}

export default App;
