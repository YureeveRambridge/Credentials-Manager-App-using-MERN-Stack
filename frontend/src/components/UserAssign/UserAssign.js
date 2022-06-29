import React, {useState, useEffect, useCallback} from 'react';
import './userAssignStyles.css';
import UserAssignForm from "../UserAssignForm/UserAssignForm";
import Users from "../Users/Users";

/* This component renders for admin users only. The role of Admins are to gives permissions to other users, can change the
* roles of other users amd have access to everything.
* The component renders once per organization unit and displays radio buttons in order to allocate access to the selected user. */
function UserAssign (props) {

        const [selectedUserID, setSelectedUserID] = useState('');
        const [userName, setUserName] = useState('');
        const [role, setRole] = useState('');
        const [stateNM, setStateNM] = useState(['', '', '', '', '']);
        const [stateSR, setStateSR] = useState(['', '', '', '', '']);
        const [stateOP, setStateOP] = useState(['', '', '', '', '']);
        const [stateHR, setStateHR] = useState(['', '', '', '', '']);
        const [data, setData] = useState([]);
        const [selectState, setSelectState] = useState(false);
        const [permissionsResponse, setPermissionsResponse] = useState('');

    /* Function fetches all registered users from the database*/
    const refresh = useCallback(async() => {
        let jsonData;

        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': props.token
            }
        }

        try{
            const response = await fetch('/users/get', config);
            jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData);

        } catch (error){
            console.log(`Could not fetch Users from Database`);
            console.log(error);
        }
    },[props.token]);

    /* Function is called to update state values according to the arguments given in this case we expect
    * a index of the array to be updated, which organizational unit the change belong to and the data to replace that
    * index */
    const updateState = useCallback((index, orgUnit, data) => {
        let placeholder;
        if(orgUnit === 'NM'){
            placeholder = stateNM;
            if(data.length > 0 && data !== 'F'){
                placeholder[index] = data;
                setStateNM(placeholder);
            }else if(data === 'F'){
                placeholder[index] = '';
                setStateNM(placeholder);
            }else {
                placeholder = ['', '', '', '', '']
                setStateNM(placeholder)
            }
            console.log(stateNM);
        }
        if(orgUnit === 'SR'){
            placeholder = stateSR;
            if(data.length > 0 && data !== 'F'){
                placeholder[index] = data;
                setStateSR(placeholder);

            }else if(data === 'F'){
                placeholder[index] = '';
                setStateSR(placeholder);
            }
            else {
                placeholder = ['', '', '', '', '']
                setStateSR(placeholder);
            }
        }
        if(orgUnit === 'HR'){
            placeholder = stateHR;
            if(data.length > 0 && data !== 'F'){
                placeholder[index] = data;
                setStateHR(placeholder);
            }
            else if(data === 'F'){
                placeholder[index] = '';
                setStateHR(placeholder);
            }
            else {
                placeholder = ['', '', '', '', '']
                setStateHR(placeholder);
            }
        }
        if(orgUnit === 'OP'){
            placeholder = stateOP;
            if(data.length > 0 && data !== 'F'){
                placeholder[index] = data;
                setStateOP(placeholder);
            }
            else if(data === 'F'){
                placeholder[index] = '';
                setStateOP(placeholder);

            }
            else {
                placeholder = ['', '', '', '', '']
                setStateOP(placeholder);
            }
        }
    },[stateHR, stateNM, stateOP, stateSR]);

/* Event handlers are part of a specific OU form and handles the changes accordingly */

    /* UseEffect load refresh  function every time the page loads  */
    const handleNM = useCallback((e) =>{
        updateState(0, 'NM', e);
    },[updateState]);

    useEffect(() =>{
        refresh();
    },[refresh, handleNM]);

    const handleDevelopmentNM = (e) =>{
        updateState(1, 'NM', e);
    }

    const handleWritingNM = (e) =>{
        updateState(2, 'NM', e);
    }

    const handleITNM = (e) =>{
        updateState(3, 'NM', e);
    }

    const handleFinancesNM = (e) =>{
        updateState(4, 'NM', e);
    }

    const handleSR = (e) =>{
        updateState(0, 'SR', e);
    }

    const handleDevelopmentSR = (e) =>{
        updateState(1, 'SR', e);
    }

    const handleWritingSR = (e) =>{
        updateState(2, 'SR', e);
    }

    const handleITSR = (e) =>{
        updateState(3, 'SR', e);
    }

    const handleFinancesSR = (e) =>{
        updateState(4, 'SR', e);
    }

    const handleHR = (e) =>{
        updateState(0, 'HR', e);
    }

    const handleDevelopmentHR = (e) =>{
        updateState(1, 'HR', e);
    }

    const handleWritingHR = (e) =>{
        updateState(2, 'HR', e);
    }

    const handleITHR = (e) =>{
        updateState(3, 'HR', e);
    }

    const handleFinancesHR = (e) =>{
        updateState(4, 'HR', e);
    }

    const handleOP = (e) =>{
        updateState(0, 'OP', e);
    }

    const handleDevelopmentOP = (e) =>{
        updateState(1, 'OP', e);
    }

    const handleWritingOP = (e) =>{
        updateState(2, 'OP', e);
    }

    const handleITOP = (e) =>{
        updateState(3, 'OP', e);
    }

    const handleFinancesOP = (e) =>{
        updateState(4, 'OP', e);
    }

    /* Event handler for role change */
    const handleRole = (e) =>{
        setRole(e.target.value);
    }

    /* Event handler fot selecting a user. Users details automatically populate the form inputs and
    * can then see where the user permissions and change options */
    const handleSelect = (e) =>{
        const userID = e[0];
        const userName = e[1];
        const role = e[2];
        const orgUnits = e[3];
        const divisionsNM = e[4];
        const divisionsSR = e[5];
        const divisionsHR = e[6];
        const divisionsOP = e[7];

        let placeholderNM = [];
        placeholderNM[0] = (orgUnits.includes('NM') ? 'NM' : '');
        placeholderNM[1] = (divisionsNM.includes('development') ? 'development' : '');
        placeholderNM[2] = (divisionsNM.includes('writing') ? 'writing' : '');
        placeholderNM[3] = (divisionsNM.includes('it') ? 'it' : '');
        placeholderNM[4] = (divisionsNM.includes('finances') ? 'finances' : '');

        let placeholderSR = ['', '', '', '', ''];
        placeholderSR[0] = (orgUnits.includes('SR') ? 'SR' : '');
        placeholderSR[1] = (divisionsSR.includes('development') ? 'development' : '');
        placeholderSR[2] = (divisionsSR.includes('writing') ? 'writing' : '');
        placeholderSR[3] = (divisionsSR.includes('it') ? 'it' : '');
        placeholderSR[4] = (divisionsSR.includes('finances') ? 'finances' : '');

        let placeholderHR = ['', '', '', '', ''];
        placeholderHR[0] = (orgUnits.includes('HR') ? 'HR' : '');
        placeholderHR[1] = (divisionsHR.includes('development') ? 'development' : '');
        placeholderHR[2] = (divisionsHR.includes('writing') ? 'writing' : '');
        placeholderHR[3] = (divisionsHR.includes('it') ? 'it' : '');
        placeholderHR[4] = (divisionsHR.includes('finances') ? 'finances' : '');

        let placeholderOP = ['', '', '', '', ''];
        placeholderOP[0] = (orgUnits.includes('OP') ? 'OP' : '');
        placeholderOP[1] = (divisionsOP.includes('development') ? 'development' : '');
        placeholderOP[2] = (divisionsOP.includes('writing') ? 'writing' : '');
        placeholderOP[3] = (divisionsOP.includes('it') ? 'it' : '');
        placeholderOP[4] = (divisionsOP.includes('finances') ? 'finances' : '');

        setSelectedUserID(userID);
        setUserName(userName);
        setRole(role);
        setStateNM(placeholderNM);
        setStateSR(placeholderSR);
        setStateOP(placeholderOP);
        setStateHR(placeholderHR);
        setSelectState(true);
    }

    /* Event handler for when the "grant access" button is clicked. It makes changes to a users
    * permissions by sending a request to the backend with the change information */
    const  handlePermissionsGrant = async (e) => {
        e.preventDefault();
        let jsonData;
        const data = {
            userID: selectedUserID,
            role: role,
            stateNM: stateNM,
            stateSR: stateSR,
            stateHR: stateHR,
            stateOP: stateOP,
        }

        const config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': props.token
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('/user/grant/permission', config);
            jsonData = await response.json();
            setPermissionsResponse(jsonData.message)
            setSelectState(false)
            refresh();

        } catch (error){
            console.log(`Could not send permissions update`);
            console.log(error);
        }
    }

        return (
            <div className="user-assign-container">
                <h2>Assign User Permissions</h2><br></br>
                { selectState ?
                    <form onSubmit={handlePermissionsGrant}>
                        <h3>User: {userName}</h3>
                        <div className='user-assign-role'>
                            <select defaultValue={role} onChange={handleRole} required>
                                <option defaultValue="" disabled hidden>Select Division</option>
                                <option defaultValue="normal">Normal</option>
                                <option defaultValue="manager">Manager</option>
                                <option defaultValue="admin">Admin</option>
                            </select><br/><br/>
                        </div>

                        <div className='form-assign-wrapper'>
                            <UserAssignForm
                                orgUnit="NM"
                                handleOU={handleNM}
                                handleDevelopment={handleDevelopmentNM}
                                handleWriting={handleWritingNM}
                                handleIT={handleITNM}
                                handleFinances={handleFinancesNM}
                                selectedUserData={stateNM}
                            />

                            <UserAssignForm
                                orgUnit="SR"
                                handleOU={handleSR}
                                handleDevelopment={handleDevelopmentSR}
                                handleWriting={handleWritingSR}
                                handleIT={handleITSR}
                                handleFinances={handleFinancesSR}
                                selectedUserData={stateSR}
                            />

                            <UserAssignForm
                                orgUnit="HR"
                                handleOU={handleHR}
                                handleDevelopment={handleDevelopmentHR}
                                handleWriting={handleWritingHR}
                                handleIT={handleITHR}
                                handleFinances={handleFinancesHR}
                                selectedUserData={stateHR}
                            />

                            <UserAssignForm
                                orgUnit="OP"
                                handleOU={handleOP}
                                handleDevelopment={handleDevelopmentOP}
                                handleWriting={handleWritingOP}
                                handleIT={handleITOP}
                                handleFinances={handleFinancesOP}
                                selectedUserData={stateOP}
                            />
                        </div>
                        <div className="user-assign-submit">
                            <button type="submit">Change</button>
                        </div>
                    </form> :
                    <p>Click on a user to edit permissions</p>
                }
                { permissionsResponse.length > 0 ? <p>{permissionsResponse}</p> : null}
                <div className="users-container">
                    <h2><br></br>Users</h2>
                    {data.map((user) => (
                        <Users
                            key={user._id}
                            id={user._id}
                            username={user.username}
                            role={user.role}
                            orgUnits={user.orgUnits}
                            divisionsNM={user.divisionsNM}
                            divisionsSR={user.divisionsSR}
                            divisionsHR={user.divisionsHR}
                            divisionsOP={user.divisionsOP}
                            handleSelect={handleSelect}
                        />
                    ))}
                </div>
            </div>
        );
}

export default UserAssign;