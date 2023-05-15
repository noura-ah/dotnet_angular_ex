import './App.css';
import LoginrForm from './components/LoignForm';
import RegisterForm from './components/RegisterForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import ProjectForm from './components/ProjectForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route Component={LoginrForm} path="/login" />
          <Route Component={RegisterForm} path='/signup' />
          <Route element={<RequireAuth/>} >
            <Route Component={Dashboard} path='/' />
            <Route Component={ProjectForm} path='/project/new' />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
