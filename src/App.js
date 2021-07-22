import { createContext, useEffect, useState } from 'react';
import './App.css';
import LoginForm from './pages/loginForm';
import SignupForm from './pages/signupForm';
import { Route, Switch } from "react-router-dom";
import Home from './pages/home';

const AuthContext = createContext();

function App() {

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

  return (
    <div>

      <AuthContext.Provider value={{ user, setUser }}>
        {/* <LoginForm />
        <SignupForm /> */}

        <Switch>
          <Route exact path="/" component={LoginForm}></Route>
          <Route path="/SignupForm" component={SignupForm}></Route>
          <Route path="/Home" component={Home}></Route>
          <Route path="/:id">Error 404 page not found</Route>
        </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export { AuthContext };
export default App;
