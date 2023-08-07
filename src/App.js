import LoginForm from './Pages/Login/login';
import LayoutRoute from './router/route';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { SidebarProvider } from './store/index';

function App() {
  return (
    <>
      <SidebarProvider>
        <LayoutRoute />
      </SidebarProvider>
    </>
  );
}

export default App;
