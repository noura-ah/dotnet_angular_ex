import './App.css';
import LoginrForm from './components/Auth/LoignForm';
import RegisterForm from './components/Auth/RegisterForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Project/Dashboard'
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import ProjectForm from './components/Project/ProjectForm';
import CreateProject from './components/Project/CreateProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectDetails from './components/Project/ProjectDetails';

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
            <Route Component={CreateProject} path='/project/new' />
            <Route Component={UpdateProject} path='/project/:id/edit' />
            <Route Component={ProjectDetails} path='/project/:id'/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
