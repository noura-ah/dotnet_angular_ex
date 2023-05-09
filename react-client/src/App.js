import './App.css';
import LoginrForm from './components/LoignForm';
import RegisterForm from './components/RegisterForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route Component={LoginrForm} path="/login" />
          <Route Component={RegisterForm} path='/signup' />
          <Route Component={RequireAuth}>
            <Route Component={Dashboard} path='/' />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
