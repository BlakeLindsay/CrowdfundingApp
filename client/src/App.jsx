import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/nav/nav';
import Signup from './components/signup/signup';
import Login from './components/login/login';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      {/* <Signup /> */}
      <Login />
    </BrowserRouter>
  );
}

export default App;
