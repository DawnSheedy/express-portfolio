import './App.css';
import Initialization from './components/initialization';
import Home from './components/home';
import axios from 'axios'

import React, { useState, useEffect } from 'react';
import AuthZone from './components/authzone';

function App() {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    axios.get('/auth/current-session').then(({ data }) => {
      setAuth(data);
    })
  }, [])

  if (auth === null) {
    return <Initialization />
  }
  if (auth) {
    return <AuthZone user={auth} />
  }
  return <Home />
}

export default App;
