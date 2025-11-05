import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './App.css';
import App2 from './component/App2.js';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const isAuthenticated = localStorage.getItem('userData');
  return (
    
    <App2/>
    
  );
}

export default App;

