import React from "react";
import "./addCredentialsStyles.css";

/* The "AddCredentials" component allows a user who has access to a or all the divisions to add
 *  new credentials. Users will only be allowed to make changes to the division they have access to. */

function AddCredentials(props) {
  /*  The following event handlers pass credentials (username, password, resource) entered in the html input tags from the form below
   *   to the parent element's functions (prop functions) passed into this component when called. */
  const { addCredentials, addResponse, divisionsAccess } = props;

  /* The following functions pass the "e.target.value" to parent element to props.function() */
  const eventHandlerUsername = (e) => {
    props.handleUsername(e.target.value);
  };
  const eventHandlerPassword = (e) => {
    props.handlePassword(e.target.value);
  };
  const eventHandlerDivision = (e) => {
    props.handleDivision(e.target.value);
  };
  const eventHandlerResource = (e) => {
    props.handleResource(e.target.value);
  };

  /*  When the "add" button is clicked the parent element function props.handleAdd() is sent to the parent element,
   *  which adds the credentials to the DB. "e.preventDefault()" stops browser from refreshing */
  const eventHandlerAdd = (e) => {
    e.preventDefault();
    props.handleAdd();
    cancelCourse()
  };

  /* Function refreshes document */
  const cancelCourse = () => { 
    document.getElementById("create-course-form").reset();
}
  /* Variables passed from parent element simplified  */
  return (
    <div className="add-form-container">

      {/* Form Heading */}
      <h4>Add Credential</h4><br></br>
      <form id="create-course-form" onSubmit={eventHandlerAdd} className="new-credentials-form">

        {/* Input for username, password, resource, division */}
        <input
          defaultValue={addCredentials[0]}
          onChange={eventHandlerUsername}
          placeholder="Username"
          type="text"
          required
        />{" "}
        <br />

        <input
          defaultValue={addCredentials[1]}
          onChange={eventHandlerPassword}
          placeholder="Password"
          type="text"
          required
        />{" "}
        <br />

        <input
          defaultValue={addCredentials[2]}
          onChange={eventHandlerResource}
          placeholder="Resource"
          type="text"
          required
        />{" "}
        <br />

        <select
          defaultValue={addCredentials[3]}
          onChange={eventHandlerDivision}
          required
        >
          {/* Default value */}
          <option value="">
            Select Division
          </option>

          {/* If the user does not have access to a division the division dropdown value will not be show as an option to be selected.
                        Access is determined with the parent variable "divisionsAccess" and if statements.
                    */}
          {divisionsAccess.includes("finances") ? (
            <option value="finances">Finances</option>
          ) : null}

          {divisionsAccess.includes("writing") ? (
            <option value="writing">Writing</option>
          ) : null}

          {divisionsAccess.includes("it") ? (
            <option value="it">IT</option>
          ) : null}

          {divisionsAccess.includes("development") ? (
            <option value="development">Development</option>
          ) : null}
        </select>
        <br />
        <br />

        {/* "Add" button */}
        <button type="submit" className="button-style2">
          Add
        </button>{" "}
        <br />

        {/* After the "add" button is clicked, a response will be returned to the parent element "addResponse" 
                    and will inform the user weather there submission was successful or not.
                */}
        <p>{addResponse.length > 0 ? addResponse : null}</p>
      </form>
    </div>
  );
}

export default AddCredentials;
