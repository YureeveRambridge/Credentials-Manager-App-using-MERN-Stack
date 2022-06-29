import React, { useState, useEffect, useCallback } from "react";
import "./nmStyles.css";
import Division from "../Division/Division";
import AddCredentials from "../AddCredentials/AddCredentials";
import UpdateCredentials from "../UpdateCredentials/UpdateCredentials";

/* This component renders the "AddCredentials", "UpdateCredentials", and "Division" components in order to create its functionally.
 * The same is done for the "Hardware Reviews", "Opinion Publishing", and "Software Reviews" components the only difference 
 * being the variables names and values. */
function NewsManagement(props) {
  const [data, setData] = useState([]);
  const [selectState, setSelectState] = useState(false);
  const [selectedCredentials, setSelectedCredentials] = useState([]);
  const [updatedCredentials, setUpdatedCredentials] = useState([]);
  const [addCredentials, setAddCredentials] = useState(['','','','']);
  const [addResponse, setAddResponse] = useState([]);
  const [updateResponse, setUpdateResponse] = useState([]);

  const { divisionsNM, token, role } = props;

  /* Function gets the data of the requested organization unit.
   * It's called when we want to add, change or view the data related to the specific Organization unit.*/
  const refresh = useCallback(async () => {

    /*The body of Organization Unit and its divisions data request is constructed. */
    const data = {
      orgUnit: "NM",
      divisionsNM: divisionsNM,
    };

    /* Headers for the Post request is generated. The Json "data" along with the header and the token received when 
     * logging in which the backend verify's upon all requests related to credentials and users, we then stringify 
     * the data to json format before making the fetch request */
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(data),
    };

    /* Fetch request is passed the URL "/get/credentials" with the parameter "config" which contains all the request data, 
     * IF the request is successful the variable "data" is set.
     * Else the error messages will be displayed */
    try {
      const response = await fetch("/get/credentials", config);
      let jsonData = await response.json();
      setData(jsonData);
      
    } catch (error) {
      console.log(
        `Could not fetch data related to News Management and Divisions`
      );
      console.log(error);
    }
  }, [divisionsNM, token]);

  /* "UseEffect" to call the "refresh" function that fetches all data we want when page loads */
  useEffect(() => {
    refresh();
  }, [refresh]);

  /* Event handlers to take the updated credentials data for the selected credential in this organization units.
   * The form auto fills when credentials are selected in the update form. */
  const handleUsernameChange = (e) => {
    let placeholder = updatedCredentials;
    placeholder.username = e; 
    setUpdatedCredentials(placeholder);
  };
  const handlePasswordChange = (e) => {
    let placeholder = updatedCredentials;
    placeholder.password = e;
    setUpdatedCredentials(placeholder);
  };
  const handleResourceChange = (e) => {
    let placeholder = updatedCredentials;
    placeholder.resource = e;
    setUpdatedCredentials(placeholder);
  };

  /* This function clones the data "Object" sent from the parent element and stores both the original data location and the clone of that data
   * Objects are pointed to and not stored as a variable, therefore we need to make a clone. After the clones are made
   * any changes made to the data is changed in the clone while the original object is unchanged since we need to send
   * both the original and changed data to the backend to make the changes, we also have a selected state, this state
   * tells us when the user selected a credential to update or not, a update button renders accordingly only if the
   * user selected a credential from a division  */
  const handleSelect = (e) => {
    const ObjectClone = Object.assign({}, e);
    setSelectedCredentials(e);
    setUpdatedCredentials(ObjectClone);
    setSelectState(true);
  };

  /* Function handles the update event when update button is clicked. The updated credentials are sent to the
   * to the backend to make the changes. Then selected states are set to set to default */
  const handleUpdate = async () => {
    let data = {
      credentialsToUpdate: selectedCredentials,
      updatedCredentials: updatedCredentials,
      orgUnit: "NM",
    };
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("/credentials/update", config);
      let jsonData = await response.json();
      setUpdateResponse(jsonData);
      setSelectedCredentials([]);
      setUpdatedCredentials([]);
      setSelectState(false);
    } catch (error) {
      console.log(`Could not update credentials`);
      console.log(error);
    }
    refresh();
  };

  /* Event handlers to take add new credentials to a division for the organization units. */
  const handleUsername = (e) => {
    let placeholder = addCredentials;
    placeholder[0] = e;
    setAddCredentials(placeholder);
  };
  const handlePassword = (e) => {
    let placeholder = addCredentials;
    placeholder[1] = e;
    setAddCredentials(placeholder);
  };
  const handleResource = (e) => {
    let placeholder = addCredentials;
    placeholder[2] = e;
    setAddCredentials(placeholder);
  };
  const handleDivision = (e) => {
    let placeholder = addCredentials;
    placeholder[3] = e;
    setAddCredentials(placeholder);
  };
  
  /* Function handles the add event when "Add" button is clicked. The Added credentials are sent to the
   * to the backend to make the changes. Then selected states are set to set to default */
  const handleAdd = async () => {
    let data = {
      username: addCredentials[0],
      password: addCredentials[1],
      resource: addCredentials[2],
      divName: addCredentials[3],
      orgUnit: "NM",
    };
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("/credentials/add", config);
      let jsonData = await response.json();
      setAddResponse(jsonData.message);
      setAddCredentials(["", "", "", ""]);
    } catch (error) {
      console.log(`Could not add credentials`);
      console.log(error);
    }
    refresh();
  };

  /* Loops through user access abd stores the credentials they have access to  in array */
  let divisions = [];
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      divisions.push(data[i].divName);
    }
  }
  /* Header and forms for the organization units are rendered depending on the user's role.
   * Add credentials adds the credentials according to the selected division in the backend and
   * then the credential are added to the database.
   *
   * UpdateCredentials handles the Update functionality */
  return (
    <div className="ou-container">
      <h2>News Management</h2><br></br>
      <div className="ou-modification-container">
        <AddCredentials
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleDivision={handleDivision}
          handleResource={handleResource}
          handleAdd={handleAdd}
          addCredentials={addCredentials}
          addResponse={addResponse}
          divisionsAccess={divisions}
        />
        {role === "admin" || role === "manager" ? (
          <UpdateCredentials
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleResourceChange={handleResourceChange}
            handleUpdate={handleUpdate}
            updatedCredentials={updatedCredentials}
            updateResponse={updateResponse}
            selectState={selectState}
            divisionsAccess={divisions}
          />
        ) : null}
      </div>
      <h2><br></br>Credentials</h2><br></br>
      <div className="ou-wrapper">
        {data.map((division, i) => (
          <Division
            key={i + 200}
            divName={division.divName}
            repoList={division.repoList}
            handleSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default NewsManagement;
