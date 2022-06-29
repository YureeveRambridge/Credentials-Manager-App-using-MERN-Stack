import React from "react";
import "./usersStyles.css";

/* This component renders for only admin users showing each users permissions. */
function Users(props) {

  const {
    id,
    username,
    role,
    orgUnits,
    divisionsNM,
    divisionsSR,
    divisionsHR,
    divisionsOP
  } = props;

  const handleSelect = (e) => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });

    e.preventDefault();
    let data = [
      id,
      username,
      role,
      orgUnits,
      divisionsNM,
      divisionsSR,
      divisionsHR,
      divisionsOP
    ];

    props.handleSelect(data);
  };

  let dataComponentNM = null,
    dataComponentSR = null,
    dataComponentHR = null,
    dataComponentOP = null;

  if (orgUnits.includes("NM")) {
    dataComponentNM = (
      <div>
        <h4>News Management Permissions:</h4>
        <ul>
          {console.log(username)}
          {console.log(divisionsNM[0].length)}
          {console.log(divisionsNM)}
          {divisionsNM[0].length > 0 ? (
            <li>{divisionsNM[0].toUpperCase()}</li>
          ) : null}
          {divisionsNM[1].length > 0 ? (
            <li>{divisionsNM[1].toUpperCase()}</li>
          ) : null}
          {divisionsNM[2].length > 0 ? (
            <li>{divisionsNM[2].toUpperCase()}</li>
          ) : null}
          {divisionsNM[3].length > 0 ? (
            <li>{divisionsNM[3].toUpperCase()}</li>
          ) : null}
        </ul>
      </div>
    );
  }
  if (orgUnits.includes("SR")) {
    dataComponentSR = (
      <div>
        <h4>Software Reviews Permissions:</h4>
        <ul>          {console.log(username)}
          {console.log(divisionsSR[0].length)}
          {console.log(divisionsSR)}
          {divisionsSR[0].length > 0 ? (
            <li>{divisionsSR[0].toUpperCase()}</li>
          ) : null}
          {divisionsSR[1].length > 0 ? (
            <li>{divisionsSR[1].toUpperCase()}</li>
          ) : null}
          {divisionsSR[2].length > 0 ? (
            <li>{divisionsSR[2].toUpperCase()}</li>
          ) : null}
          {divisionsSR[3].length > 0 ? (
            <li>{divisionsSR[3].toUpperCase()}</li>
          ) : null}
        </ul>
      </div>
    );
  }
  if (orgUnits.includes("HR")) {
    dataComponentHR = (
      <div>
        <h4>Hardware Reviews Permissions:</h4>
        <ul>
          {divisionsHR[0].length > 0 ? (
            <li>{divisionsHR[0].toUpperCase()}</li>
          ) : null}
          {divisionsHR[1].length > 0 ? (
            <li>{divisionsHR[1].toUpperCase()}</li>
          ) : null}
          {divisionsHR[2].length > 0 ? (
            <li>{divisionsHR[2].toUpperCase()}</li>
          ) : null}
          {divisionsHR[3].length > 0 ? (
            <li>{divisionsHR[3].toUpperCase()}</li>
          ) : null}
        </ul>
      </div>
    );
  }
  if (orgUnits.includes("OP")) {
    dataComponentOP = (
      <div>
        <h4>Opinion Publishing Permissions:</h4>
        <ul>
          {divisionsOP[0].length > 0 ? (
            <li>{divisionsOP[0].toUpperCase()}</li>
          ) : null}
          {divisionsOP[1].length > 0 ? (
            <li>{divisionsOP[1].toUpperCase()}</li>
          ) : null}
          {divisionsOP[2].length > 0 ? (
            <li>{divisionsOP[2].toUpperCase()}</li>
          ) : null}
          {divisionsOP[3].length > 0 ? (
            <li>{divisionsOP[3].toUpperCase()}</li>
          ) : null}
        </ul>
      </div>
    );
  }

  return (
    <div className="user-Container" onClick={handleSelect}>
      <h4>
        Name: {username}<br/><br/>
        Role: {role}<br/><br/>
      </h4>
      <div className="user-organizations-container">
        {dataComponentNM}
        {dataComponentSR}
        {dataComponentHR}
        {dataComponentOP}
      </div>
    </div>
  );
}

export default Users;
