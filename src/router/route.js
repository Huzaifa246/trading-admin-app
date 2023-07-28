import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../Pages/Login/login';
import SignUp from './../Pages/Signup/signup';
import Dashboard from '../components/UI/dashboard/Dashboard';

function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      {/*
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/statistic" element={<Statistic />} />
      <Route path="/slider" element={<SliderComp />} /> */}
    </Routes>
  );
}

export default LayoutRoute;