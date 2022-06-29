import React from "react";
import "./credentialsStyles.css";

/*  This component renders the credentials of users from a division.
 *   Each division credentials display has a click event.
 *   When a division's credentials display is selected the credentials of the
 *   division user is sent to the parent element to auto fill the update form. */

function Credentials(props) {
    
  /* Variables passed from parent element simplified  */
  const { credentials, divName } = props;

  /* Passes the "credentials" to parent element function props.handleSelect() */
  const handleSelect = () => {
    let data = {
      resource: credentials.resource,
      username: credentials.username,
      password: credentials.password,
      divName: divName,
    };
    props.handleSelect(data);
  };

  return (
    /* Division user credentials display */

    <a href="#header-container" style={{textDecoration: 'none'}}>
    <div className="credentials-container" onClick={handleSelect}>
      <p className="credentials-wrapper">
        Username: {credentials.username} <br />
        Password: {credentials.password} <br />
        Resource: {credentials.resource} <br />
      </p>
    </div>
    </a>
  );
}

export default Credentials;
