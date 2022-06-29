import React, { useState } from "react";
import "./userAssignFormStyles.css";
import Form from "react-bootstrap/Form";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

function UserAssignForm(props) {

    const forceUpdate = useForceUpdate();

    /*events that handle the permissions granted*/
  const handleOU = (e) => {
    props.handleOU(e.target.value);
    forceUpdate();
  };
  const handleDevelopment = (e) => {
    props.handleDevelopment(e.target.value);
    forceUpdate();
  };
  const handleWriting = (e) => {
    props.handleWriting(e.target.value);
    forceUpdate();
  };
  const handleIT = (e) => {
    props.handleIT(e.target.value);
    forceUpdate();
  };
  const handleFinances = (e) => {
    props.handleFinances(e.target.value);
    forceUpdate();
  };


  const { orgUnit, selectedUserData } = props;

  /*converting the acronym to full name*/
  let fullOrgUnit;
  if (orgUnit === "NM") {
    fullOrgUnit = "News Management";
  }
  if (orgUnit === "SR") {
    fullOrgUnit = "Software Reviews";
  }
  if (orgUnit === "HR") {
    fullOrgUnit = "Hardware Reviews";
  }
  if (orgUnit === "OP") {
    fullOrgUnit = "Opinion Publishing";
  }

  /*here we generate a component that returns a part of a form the form is of type radio, The OU and all divisions
   * have 2 radio buttons that specify grant access or no access only one radio per OU or division can be selected
   * either giving access or not. The selected users permissions are passed down to this component to pre assign the
   * current permissions of that user, the changes are made and saved in state, thereafter if the admin user made the
   * changes the refresh event is called and the users will be fetched again but by now the user has been updated and
   * the new permissions should reflect*/
  return (
    <form id="test" className="user-form-container">
      <h2>{fullOrgUnit} Permissions</h2>

      <div className="mb-3">
        <Form.Check
          type="radio"
          label="Access"
          name={`ou-permission${orgUnit}`}
          value={orgUnit}
          defaultChecked={selectedUserData[0].length > 0}
          onClick={handleOU}
        />
        <br />
        <Form.Check
          type="radio"
          name={`ou-permission${orgUnit}`}
          value={''}
          label="No Access"
          id={`inline-radio-2`}
          defaultChecked={selectedUserData[0].length === 0}
          onClick={handleOU}
        />
        <br /><hr/>
      </div>

      {selectedUserData[0] ? (
        <div>
          <h3>Division Permissions:</h3>
          <p>Development :</p>
          <Form.Check
            type="radio"
            label="Access"
            name={`development${orgUnit}`}
            value="development"
            defaultChecked={selectedUserData[0].length > 0 && selectedUserData[1].length > 0}
            onClick={handleDevelopment}
          />
          <br />
          <Form.Check
            type="radio"
            name={`development${orgUnit}`}
            value="F"
            label="No Access"
            defaultChecked={selectedUserData[0].length === 0 || selectedUserData[1].length === 0}
            onClick={handleDevelopment}
          />
          <br /><hr/>
        </div>
      ) : null}

      {selectedUserData[0].length > 0 ? (
        <div>
          <p>Writing :</p>
          <Form.Check
            type="radio"
            label="Access"
            name={`writing${orgUnit}`}
            value="writing"
            defaultChecked={selectedUserData[0].length > 0 && selectedUserData[2].length > 0}
            onChange={handleWriting}
          />
          <br />
          <Form.Check
            type="radio"
            name={`writing${orgUnit}`}
            value="F"
            label="No Access"
            defaultChecked={selectedUserData[0].length === 0  || selectedUserData[2].length === 0 }
            onChange={handleWriting}
          />
          <br /><hr/>
        </div>
      ) : null}

      {selectedUserData[0].length > 0  ? (
        <div>
          <p>IT :</p>
          <Form.Check
            type="radio"
            name={`it${orgUnit}`}
            value="it"
            label="Access"
            defaultChecked={selectedUserData[0].length > 0 && selectedUserData[3].length > 0}
            onChange={handleIT}
          />
          <br />
          <Form.Check
            type="radio"
            name={`it${orgUnit}`}
            value="F"
            label="No Access"
            defaultChecked={selectedUserData[0].length === 0 || selectedUserData[3].length === 0}
            onChange={handleIT}
          />
          <br /><hr/>
        </div>
      ) : null}
      {selectedUserData[0].length > 0 ? (
        <div>
          <p>Finances :</p>
          <Form.Check
            type="radio"
            name={`finances${orgUnit}`}
            value="finances"
            label="Access"
            checked={selectedUserData[0].length > 0 && selectedUserData[4].length > 0}
            onChange={handleFinances}
          />
          <br />
          <Form.Check
            type="radio"
            name={`finances${orgUnit}`}
            value="F"
            label="No Access"
            checked={selectedUserData[0].length === 0 || selectedUserData[4].length === 0}
            onChange={handleFinances}
          />
          <br />
        </div>
      ) : null}
    </form>
  );
}

export default UserAssignForm;
