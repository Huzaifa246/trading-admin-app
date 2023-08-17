import LoginForm from './Pages/Login/login';
import LayoutRoute from './router/route';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { SidebarProvider, AuthDataProvider } from './store/index';

function App() {
  return (
    <>
      <SidebarProvider>
        {/* <AuthDataProvider> */}
          <LayoutRoute />
        {/* </AuthDataProvider> */}
      </SidebarProvider>
    </>
  );
}

export default App;
