import React, { createContext, useState, useContext } from 'react';

// Create a context for AuthData
export const AuthDataContext = createContext("");

// export const AuthDataProvider = ({ children }) => {
//   const [authData, setAuthData] = useState({});

//   return (
//     <AuthDataContext.Provider value={{ authData, setAuthData }}>
//       {children}
//     </AuthDataContext.Provider>
//   );
// };

// export const useAuthData = () => {
//   const context = useContext(AuthDataContext);
//   if (!context) {
//     throw new Error('useAuthData must be used within an AuthDataProvider');
//   }
//   return context;
// };

//----FOR SIDEBAR
const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};