import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from './components/nav/nav';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import CreateCampaign from './components/create_campaign/Create_Campaign';


function App() {
  const [token, setToken] = useState("");

  // Initialize the isLoggedIn state as false (user is not logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(initializeToken, []);

  function initializeToken() {
    const storedToken = localStorage.token;
    console.log("TOKEN:", storedToken);

    if (storedToken) {
      setToken(storedToken);
      // Set the isLoggedIn state to true when a token is loaded from local storage
      setIsLoggedIn(true);
    }
  }

  function updateToken(newToken) {
    setToken(newToken);
    localStorage.token = newToken;

    // Set the isLoggedIn state to true when a token is updated (user is logged in)
    setIsLoggedIn(true);
  }

  function clearToken() {
    setToken(""); // Clear the token when logging out
    localStorage.removeItem("token"); // Remove the token from local storage

    // Set the isLoggedIn state to false when the user logs out
    setIsLoggedIn(false);
  }
  return (
    <BrowserRouter>
      <Navbar token={token} clearToken={clearToken} />
      <Routes>
      <Route path="/signup" element={<Signup setToken={updateToken} />} />
      <Route path="/login" element={<Login setToken={updateToken} />} />
      <Route path="/create" element={<CreateCampaign setoken={updateToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
