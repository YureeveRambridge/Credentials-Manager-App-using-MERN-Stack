import React from "react";
import { Link } from "react-router-dom";
import "./headerStyles.css";

/*  This component "Header" is rendered on all pages after the user logs in.
 *   In the header it displays tab links that are rendered as per the users permission access, example: if the user has
 *   access to "News Management" only the tab with "News Management" will be shown.
 *   However the "Home" tab will always render as is will return the user to the home page.
 *   If the route is manually types in to a different "Organizational Unit" the user will be logged out.
 *   In order not to be logged out navigation via the rendered header tabs must be used.
 *   The React-router-dom Link method is used to ensure this. */

function Header(props) {

  /* Logout function from the parent element props.handleLogout().
   *  The function will clear the login data and revert back to login page. */
  const handleLogout = () => {
    props.handleLogout();
  };

  /* Variable is simplified  */
  const { units, role } = props;
  return (
    <div id="header-container" className="header-container">
      <div className="header-heading">

        {/* Heading of the header */}
        <h1 >Credentials Manager</h1>
        <div className="header-login">
          
          {/* Welcome message and logout button that calls "handleLogout()" when clicked*/}
          <p>Welcome {props.username}!</p> 
           Role: {role.toUpperCase()}
          <button onClick={handleLogout}>Logout</button>
          
        </div>   
      </div>

      {/* Header tabs display with permission access check.
                The parent elements variable "units" is used to check access with if statements.
            */}
      <div className="header-menu">
        <Link to="/">
          <div>Home</div>
        </Link>
        {units.includes("NM") ? (
          <Link to="/NM">
            <div>News Management</div>
          </Link>
        ) : null}
        {units.includes("SR") ? (
          <Link to="/SR">
            <div>Software Reviews</div>
          </Link>
        ) : null}
        {units.includes("HR") ? (
          <Link to="/HR">
            <div>Hardware Reviews</div>
          </Link>
        ) : null}
        {units.includes("OP") ? (
          <Link to="/OP">
            <div>Opinion Publishing</div>
          </Link>
        ) : null}

        {/* Only an "admin" user can have access to this tab which is check by the parent elements variable "props.role". */}
        {role === "admin" ? (
          <Link to="/admin">
            <div>Assign Users</div>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
