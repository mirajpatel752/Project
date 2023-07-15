import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Login from './page/login';
import RegisterPage from './page/Register';
import Dashboard from './page/dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}> </Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
    </Routes>
  );
};

export default App;