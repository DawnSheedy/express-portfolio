import './App.css';
import Initialization from './components/initialization';
import Login from './components/login'
import axios from 'axios'

import React, { useState, useEffect } from 'react';
import ModZone from './components/modzone';

function App() {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    axios.get('/auth/current-session').then(({ data }) => {
      setAuth(data);
    })
  }, [])

  if (auth === null) {
    // Default state where no session exists
    return <Initialization />
  }
  if (auth) {
    //Zone for when we're logged in
    return <ModZone user={auth} />
  }
  //Normal userland
  return <Login />
}

export default App;
