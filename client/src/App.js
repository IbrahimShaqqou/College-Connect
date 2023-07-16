import './App.css';

import "./index.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/login";
import Post from "./pages/post";
import NotFound from "./pages/NotFound";

function App() {
  return <div className="App">
      <Router>
        <Switch>
        <Route exact path="/register">
          <Register/>
        </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="./post/:id">
        <Post/>
      </Route>
      <Route> <NotFound/>   </Route>
      </Switch>
      </Router>
    </div>;
}

export default App;
