
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import VerifyCodePage from './Components/VerifyCodePage';
import Alert from './Components/Alert';


function App() {
  return (
    <div>
      <Alert />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<VerifyCodePage />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </div>
  );
}

export default App;
