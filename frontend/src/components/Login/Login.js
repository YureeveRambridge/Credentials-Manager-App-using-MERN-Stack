import React from "react";
import "./loginStyles.css";
import Button from 'react-bootstrap/Button'

/*  The "Login" component is the first page that renders to a user.
 *   The page has two inputs (username and password) with a "login" button.
 *   The "username" and "password" is stored in parents state.
 *   When the "Login" button is clicked the stored details are checked weather its incorrect, if so the backend
 *   sends a message to be displayed on the login page informing the user of the error.
 *   Correct login details will route to the landing home page.
 *   A new user will be an informed to register by clicking on visible link which will take the user to the register page. */

function Login(props) {
  
  /* Passes the "username" to parent element function props.handleUsername() */
  const handleUsername = (e) => {
    props.handleUsername(e.target.value);
  };
  /* Passes the "password" to parent element function props.handlePassword() */
  const handlePassword = (e) => {
    props.handlePassword(e.target.value);
  };
  
  /*  When the "login" button is clicked the parent element function props.handleLogin()
   *   is called in the parent element, which adds the new user details to the DB.
   *  e.preventDefault() stops browser from refreshing */
  const handleLogin = (e) => { 
    e.preventDefault();
    props.handleLogin();
  };

  /* Variables passed from parent element simplified  */
  const { username, password, falseLogin } = props;
  return (
    <div className="login-container">

      {/* Heading of page */}
      <h1 style={{padding: "3%", backgroundColor: "rgb(250, 169, 70)"}}>Credentials Management</h1>
      <div className="login-wrapper">

        {/* Form heading */}
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="login-form">

          {/* Input for username */}
          <input
            value={username}
            onChange={handleUsername}
            placeholder="Username"
            type="text"
            minLength={2}
            required
            autoFocus
          />{" "}
          <br />

          {/* Input for password */}
          <input
            value={password}
            onChange={handlePassword}
            placeholder="Password"
            type="password"
            minLength={8}
            required
          />{" "}
          <br />

          {/* Login button */}
          <Button type="submit" className="button-style1" variant="primary">
            Login
          </Button>
          <br />

          {/* After the "login" button is clicked, a response will be returned to the parent element "falseLogin" 
                        and will inform the user weather there submission was successful or not.
                    */}
          <p>{falseLogin.length > 1 ? falseLogin : null}</p>

          {/* Register Link */}
          <p>
            <a href="/register">Register</a> If you don't have login details.{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
