import Map from './components/Map'
import React from 'react'
import Login from './components/Login'
import Rating from './components/Rating'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import {Switch} from 'react-router'

function App() {
  return(
    <Router>
      <Switch>
        <Route path='/' exact render={() => <Login />} />
        <Route path='/turistando' render={() => <Map />} />  
        <Route path='/rating' render={() => <Rating />} /> 
      </Switch>
    </Router>
  )

}

export default App;
