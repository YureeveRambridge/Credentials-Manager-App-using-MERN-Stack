import "./App.css";
import Login from "./components/Login/Login";
import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Header from "./components/header/Header";
import LoggedInLanding from "./components/OrganisationalUnits/LoggedInLanding/LoggedInLanding";
import NewsManagement from "./components/OrganisationalUnits/NewsManagement/NewsManagement";
import SoftwareReviews from "./components/OrganisationalUnits/SoftwareReviews/SoftwareReviews";
import HardwareReviews from "./components/OrganisationalUnits/HardwareReviews/HardwareReviews";
import OpinionPublishing from "./components/OrganisationalUnits/Opinion Publishing/OpinionPublishing";
import UserAssign from "./components/UserAssign/UserAssign";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLogin] = useState("");
  const [data, setData] = useState([]);
  const [falseLogin, setFalseLogin] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerResponse, setRegisterResponse] = useState("");

  /* Event Handlers for the Login component:
   * The login event handlers are lifted to the this component "App" and are handled here.
   * Username is the form input for the username as is the password and is stored in state on change
   * they are then passed down as props to the login component to display the input to the user.
   *
   * "handleLogin" is called when the submit button is clicked in the form and lifted to the parent App.js handler.
   * The handler then sends a request with the login details to the backend
   * to checks if the user exists and if the password matches, if so the frontend will
   * receive a token and other data related to that user and is stored in states, at the same time we set a state
   * that says we are logged in and clear the username and password field, this state is then later used to render
   * other components that only logged in users can see */

  const handleUsername = (e) => {
    setUsername(e);
  };
  const handlePassword = (e) => {
    setPassword(e);
  };
  const handleLogin = async () => {
    let jsonData;
    const data = {
      username,
      password,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch("/user/login", config);
      jsonData = await response.json();
      if (response.ok) {
        setData(jsonData);
        setLogin(true);
        setFalseLogin("");
        setUsername("");
        setPassword("");
      } else {
        setFalseLogin(jsonData.message);
      }
    } catch (error) {
      console.log(`Login Error`);
      console.log(error);
    }
  };

  /* Register event handlers work similar to the login but here we except a username and to type in the password
   * twice to confirm it is correct. When the Register button is click an event handler in the parent sends a
   * request to the backend to add the user. The backend tests if the user already exists with that username and
   * if not the user is created with a normal role and no permissions and a message is displayed that the
   * user is created, the registered user can then log in but has no access to anything except the home page which
   * says to ask the admin to grant specific access. */
  const handleRegisterUsername = (e) => {
    setRegisterUsername(e);
  };
  const handleRegisterPassword = (e) => {
    setRegisterPassword(e);
  };
  const handleRegisterPasswordConfirmation = (e) => {
    setRegisterPasswordConfirm(e);
  };
  const handleRegister = async () => {
    let jsonData;
    const data = {
      username: registerUsername,
      password: registerPasswordConfirm,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch("/user/register", config);
      jsonData = await response.json();
      setRegisterResponse(jsonData.message);
    } catch (error) {
      console.log(`Register Error`);
      console.log(error);
    }
  };

  /* The logout clears the logged in state and other related data such as the token and then we redirect the login page */
  const handleLogout = () => {
    setLogin(false);
    setData([]);
    window.location.assign("/");
  };

  /*Declaring a variable to construct a component according to a state*/
  let notLoggedIn = null;

  /* If the logged in state is not true then it returns a component according to the pathname in the URL
   * if path is '/' we know it is log in page and if not we know it is register component */
  if (!loggedIn) {
    if (window.location.pathname === "/") {
      notLoggedIn = (
        <Route
          path="/"
          exact
          render={() => (
            <Login
              handleUsername={handleUsername}
              handlePassword={handlePassword}
              handleLogin={handleLogin}
              username={username}
              password={password}
              falseLogin={falseLogin}
            />
          )}
        />
      );
    } else {
      notLoggedIn = (
        <Route
          path="/register"
          exact
          render={() => (
            <Register
              handleRegisterUsername={handleRegisterUsername}
              handleRegisterPassword={handleRegisterPassword}
              handleRegisterPasswordConfirmation={
                handleRegisterPasswordConfirmation
              }
              handleRegister={handleRegister}
              registerUsername={registerUsername}
              registerPassword={registerPassword}
              registerPasswordConfirm={registerPasswordConfirm}
              registerResponse={registerResponse}
            />
          )}
        />
      );
    }
  }
  
  /* React browser router is used. The "notLoggedIn" component is called to be rendered.
   *
   * If the user is logged in we render the other pages according to the routes
   * for example when a user is logged in a route is made for the "LoggedInLanding" component as well as for
   * the other Organizational Units such as News Management (NM), the extra Route for admins only calls "userAssign"
   * and will only render if the logged in user is admin, each route renders a component accordingly with props and
   * event handlers*/
  return (
    <BrowserRouter>
      {notLoggedIn}
      {loggedIn ? (
        <Header
          units={data.orgUnits}
          role={data.role}
          username={data.username}
          handleLogout={handleLogout}
        />
      ) : null}
      {loggedIn ? (
        <Route
          path="/"
          exact={true}
          render={() => (
            <LoggedInLanding
              units={data.orgUnits}
              username={data.username}
              divisionsNM={data.divisionsNM}
              divisionsSR={data.divisionsSR}
              divisionsHR={data.divisionsHR}
              divisionsOP={data.divisionsOP}
              role={data.role}
            />
          )}
        />
      ) : null}
      {loggedIn ? (
        <Route
          path="/NM"
          exact={true}
          render={() => (
            <NewsManagement
              role={data.role}
              divisionsNM={data.divisionsNM}
              token={data.token}
            />
          )}
        />
      ) : null}
      {loggedIn ? (
        <Route
          path="/SR"
          exact={true}
          render={() => (
            <SoftwareReviews
              role={data.role}
              divisionsSR={data.divisionsSR}
              token={data.token}
            />
          )}
        />
      ) : null}
      {loggedIn ? (
        <Route
          path="/HR"
          exact={true}
          render={() => (
            <HardwareReviews
              role={data.role}
              divisionsHR={data.divisionsHR}
              token={data.token}
            />
          )}
        />
      ) : null}
      {loggedIn ? (
        <Route
          path="/OP"
          exact={true}
          render={() => (
            <OpinionPublishing
              role={data.role}
              divisionsOP={data.divisionsOP}
              token={data.token}
            />
          )}
        />
      ) : null}
      {loggedIn && data.role === "admin" ? (
        <Route
          path="/admin"
          exact={true}
          render={() => <UserAssign token={data.token} />}
        />
      ) : null}
    </BrowserRouter>
  );
}

export default App;
