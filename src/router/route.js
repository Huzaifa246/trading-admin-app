import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../Pages/Login/login';
import Dashboard from '../components/UI/dashboard/Dashboard';
import Trades from '../components/UI/Trades/Trades';
import HeaderComponent from '../components/header/header';
import Investment from './../components/UI/Investment/Investment';
import User from '../components/UI/users/User';
import PastTrades from '../components/UI/Trades/PastTrades/PastTrades';

function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route element={<HeaderComponent />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<User />} />
        <Route path="/traders" element={<Trades />} />
        <Route path="/pastTraders" element={<PastTrades />} />
        <Route path="/investment" element={<Investment />} />

      </Route>
    </Routes>
  );
}

export default LayoutRoute;