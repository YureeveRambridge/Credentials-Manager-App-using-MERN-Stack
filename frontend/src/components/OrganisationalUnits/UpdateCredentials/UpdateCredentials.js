import React from "react";
import "./updateCredentialsStyles.css";

/* This component handles the updating of credentials. When the user selects a credential to update the form, the form automatically
 * populates with the selected credentials. the handlers updates the credentials as the user changes them.
 * The  update button only shows if the user selected a credential to update. A message will appear to the user if
 * the update was successful or not */

function UpdateCredentials(props) {
  const {
    updatedCredentials,
    selectState,
    updateResponse,
    handleUpdate,
    handleUsernameChange,
    handlePasswordChange,
    handleResourceChange,
  } = props;

  const usernameChange = (e) => {
    handleUsernameChange(e.target.value);
  };
  const passwordChange = (e) => {
    handlePasswordChange(e.target.value);
  };
  const resourceChange = (e) => {
    handleResourceChange(e.target.value);
  };
  const update = (e) => {
    e.preventDefault();
    handleUpdate();
    cancelCourse();
  };
  const cancelCourse = () => {
    document.getElementById("create--form").reset();
  };

  const username = updatedCredentials.username;
  const password = updatedCredentials.password;
  const resource = updatedCredentials.resource;

  return (
    <div className="add-form-container">
      <h4>Update Credential</h4><br></br>
      <form
        id="create--form"
        onSubmit={update}
        className="new-credentials-form"
      >
        <input
          defaultValue={username}
          onChange={usernameChange}
          placeholder="Click a credential to update"
          type="text"
          required
          size="25"
        />{" "}
        <br />
        <input
          defaultValue={password}
          onChange={passwordChange}
          placeholder="Click a credential to update"
          type="text"
          required
          size="25"
        />{" "}
        <br />
        <input
          defaultValue={resource}
          onChange={resourceChange}
          placeholder="Click a credential to update"
          type="text"
          required
          size="25"
        />{" "}
        <br />
        {selectState ? (
          <button type="submit" className="button-style2">
            Update
          </button>
        ) : (
          <p>Click on a Credential below to update</p>
        )}
        <br />
        <p>{updateResponse.length > 0 ? updateResponse : null}</p>
      </form>
    </div>
  );
}
export default UpdateCredentials;
