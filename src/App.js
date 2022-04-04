import Map from "./components/Map";
import Login from "./components/Login";
import Rating from "./components/Rating";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import React, { useState } from "react";
import Acesso from "./components/Acesso";

function App() {
  const [user, setUser] = useState({
    id: 1,
    name: "pedro",
    avatar: "",
  });

  if (user === null) {
    return <Login />;
  }
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Login />} />
        <Route path="/acesso" exact render={() => <Acesso />} />
        <Route path="/turistando" render={() => <Map />} />
        <Route path="/rating" render={() => <Rating />} />
      </Switch>
    </Router>
  );
}

export default App;
