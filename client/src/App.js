import './App.css';
import Nav from './pages/nav'
import Student from './pages/student'
import Home from './pages/Home'
import {Classes} from './pages/Classes'
import {Fee} from './pages/Fee'
import {Teachers} from './pages/Teachers'
import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    <Nav />
      <Switch>
        <Route exact path= "/">
          <Home/>
        </Route>
        <Route exact path= "/students">
          <Student/>
        </Route>
        <Route exact path= "/fee">
          <Fee/>
        </Route>
        <Route exact path= "/classes">
          <Classes/>
        </Route>
        <Route exact path= "/teachers">
          <Teachers/>
        </Route>
      </Switch>
    </>
    // <div>
    //   <h1>Check git  </h1>
    // </div>
  );
}

export default App;
