// import React from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import LoginForm from '../Pages/Login/login';
// import Dashboard from '../components/UI/dashboard/Dashboard';
// import Trades from '../components/UI/Trades/Trades';
// import HeaderComponent from '../components/header/header';
// import Investment from './../components/UI/Investment/Investment';
// import User from '../components/UI/users/User';
// import PastTrades from '../components/UI/Trades/PastTrades/PastTrades';

// const isUserLoggedIn = () => {
//   const token = localStorage.getItem('token');
//   return token !== null;
// };

// function PrivateRoute({ element, path }) {
//   if (isUserLoggedIn()) {
//     return <Route path={path} element={element} />;
//   } else {
//     return <Navigate to="/" replace />;
//   }
// }

// function LayoutRoute() {
//   return (
//     <Routes>
//       <Route path="/" element={<LoginForm />} />
//       <Route element={<HeaderComponent />}>
//         <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
//         <Route path="/users" element={<PrivateRoute element={<User />} />} />
//         <Route path="/traders" element={<PrivateRoute element={<Trades />} />} />
//         <Route path="/pastTraders" element={<PrivateRoute element={<PastTrades />} />} />
//         <Route path="/investment" element={<PrivateRoute element={<Investment />} />} />
//       </Route>
//     </Routes>
//   );
// }

// export default LayoutRoute;
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../Pages/Login/login';
import Dashboard from '../components/UI/dashboard/Dashboard';
import HeaderComponent from '../components/header/header';
import Investment from './../components/UI/Investment/Investment';
import User from '../components/UI/users/User';
import PastTrades from '../components/UI/Trades/PastTrades/PastTrades';
import Trades from '../components/UI/Trades/Trades'; // Adjust the import path
import ProtectedRoutes from '../Services/ProtectedRoutes/ProtectedRoutes';

function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route element={<HeaderComponent />}>
        <Route path="/dashboard" element={<ProtectedRoutes element={<Dashboard />} />} />
        <Route path="/users" element={<ProtectedRoutes element={<User />} />} />
        <Route path="/traders" element={<ProtectedRoutes element={<Trades />} />} />
        <Route path="/pastTraders" element={<ProtectedRoutes element={<PastTrades />} />} />
        <Route path="/investment" element={<ProtectedRoutes element={<Investment />} />} />
      </Route>
    </Routes>
  );
}

export default LayoutRoute;
