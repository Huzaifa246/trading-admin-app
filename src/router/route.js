import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../Pages/Login/login';
import Dashboard from '../components/UI/dashboard/Dashboard';
import Trades from '../components/UI/Trades/Trades';
import HeaderComponent from '../components/header/header';
import Investment from './../components/UI/Investment/Investment';

function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route element={<HeaderComponent />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/traders" element={<Trades />} />
        <Route path="/investment" element={<Investment />} />
      </Route>
    </Routes>
  );
}

export default LayoutRoute;