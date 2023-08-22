import React, { useState, useEffect } from 'react';
import LayoutRoute from './router/route';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { SidebarProvider, AuthDataContext, AuthDataProvider } from './store/index';
import axios from "axios";
import { decryption } from './Services/encryptionDecryption';

function App() {
  const [authData, setAuthData] = useState({});
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(
          `${process.env.REACT_APP_API}/api/admin/auth/${token}`
        )
        .then((response) => {
          if (token) {
            setAuthData(decryption(response.data.data));
            return true;
          }
          else{
            localStorage.removeItem("token");
            return;
          }
        })
        .catch((error) => {
          localStorage.removeItem("token");
          return;
        });
    }
  }, [token]);
  return (
    <>
      <SidebarProvider>
        {/* <AuthDataProvider> */}
        <AuthDataContext.Provider value={{ authData, setAuthData }}>
          <LayoutRoute />
        </AuthDataContext.Provider>
        {/* </AuthDataProvider> */}
      </SidebarProvider>
    </>
  );
}

export default App;
