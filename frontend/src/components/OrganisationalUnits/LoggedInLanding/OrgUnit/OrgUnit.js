import React from "react";
import "./orgUnitStyles.css";
import Card from 'react-bootstrap/Card';


/* This component checks the permissions of user on the homepage and renders the access accordingly*/
function OrgUnit(props) {
  const { unit, division } = props;
  let unitFull;

  /* Switch case to change the abbreviation to the full name of the division*/
  switch (unit) {
    case "NM":
      unitFull = "News Management";
      break;
    case "HR":
      unitFull = "Hardware Reviews";
      break;
    case "SR":
      unitFull = "Software Reviews";
      break;
    case "OP":
      unitFull = "Opinion Publishing";
      break;
    default: 
      unitFull = false;
  }

  /* if statements checks if "unitFull" is not false and then the divisions array indexes. If an index is empty we don't render
   * that array index the represents a division. */
  if (unitFull) {
    return (
      <Card className="orgunit-container">
        <Card.Body>
          <Card.Title>{unitFull}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Divisions:</Card.Subtitle>
          <Card.Text>
            <ul>
              {division[0] ? <li>{division[0].toUpperCase()}</li> : null}
              {division[1] ? <li>{division[1].toUpperCase()}</li> : null}
              {division[2] ? <li>{division[2].toUpperCase()}</li> : null}
              {division[3] ? <li>{division[3].toUpperCase()}</li> : null}
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>

    );
  }        else {
            return null;
        }
}

export default OrgUnit;
