import { createContext, useEffect, useState } from 'react';
import './App.css';
import LoginForm from './pages/loginForm';
import SignupForm from './pages/signupForm';
import { Redirect, Route, Switch } from "react-router-dom";
import Home from './pages/home';

const AuthContext = createContext();

function App() {

  const [currentUser, setCurrent] = useState([]);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("saved");

    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });


  useEffect(() => {
    console.log("User :", user)
    localStorage.setItem('saved', JSON.stringify(user));
  }, [user])

  useEffect(() => {
    console.log("Current =>", currentUser.length)
  }, [currentUser])

  return (
    // window.localStorage.removeItem('saved')
    <div>
      <AuthContext.Provider value={{ user, setUser, currentUser, setCurrent }}>
        <Switch>
          <Route exact path="/" component={LoginForm}></Route>
          <Route path="/SignupForm" component={SignupForm}></Route>
          <Route path="/Home" render={() => currentUser.length === 1 ? <Home /> : (<Redirect to="/" />)} ></Route>
          <Route path="/:id">Error 404 page not found</Route>
        </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export { AuthContext };
export default App;
