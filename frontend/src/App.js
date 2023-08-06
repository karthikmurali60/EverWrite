import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import TrashPage from './pages/TrashPage';
import PrivateRoutes from './utils/PrivateRoutes';
import EditorPage from './pages/EditorPage';
import Cookies from 'js-cookie';
import './App.css';
import React from 'react';

function App() {
  function isLoggedIn() {
    if (Cookies.get('username') !== undefined) {
        return true;
    }

    return false;
  }

  return (
    <Router>
        <Routes>
          <Route element={<PrivateRoutes/>}>
              <Route path='/home' element={<HomePage/>} />
              <Route path='/trash' element={<TrashPage/>} />
              <Route path='/:user/notes/:user_id' element={<EditorPage/>} />
          </Route>
          <Route path='/' element={isLoggedIn() ? <HomePage/> : <LandingPage/>}/>
        </Routes>
    </Router>
  );
}

export default App;
