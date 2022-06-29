import React from "react";
import "./divisionStyles.css";
import Credentials from "../Credentials/Credentials";

/* "Division" component displays each division with its credentials */
function Division(props) {

  /* Clones and passes the "divName", "password", "resource" and "username" from the Credentials
   *  to parent element function props.handleSelect() */
  const handleSelect = (e) => {
    props.handleSelect(e);
  };

  /* Variables passed from parent element are simplified  */
  const { divName, repoList } = props;
  return (
    <div className="division-container">

      {/* Name of the Division is displayed */}
      <h2>{divName.toUpperCase()}</h2>

        {/* The list of credentials are mapped */}
        {/* Credentials Component is rendered with each credential */}
      {repoList.map((credentials, i) => (
        <Credentials
          key={i + 1000}
          credentials={credentials}
          divName={divName}
          handleSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default Division;
