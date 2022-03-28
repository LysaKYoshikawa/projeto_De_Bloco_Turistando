import Map from './components/Map'
import React from 'react'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import {Switch} from 'react-router'

function App() {
  return(
    <Router>
      <Switch>
        <Route path='/' exact render={() => <Login />} />
        <Route path='/turistando' render={() => <Map />} />   
      </Switch>
    </Router>
  )

}

export default App;
