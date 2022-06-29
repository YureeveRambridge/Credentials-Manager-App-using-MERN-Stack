import React, {useState, useEffect, useCallback} from 'react';
import './opStyles.css';
import AddCredentials from "../AddCredentials/AddCredentials";
import UpdateCredentials from "../UpdateCredentials/UpdateCredentials";
import Division from "../Division/Division";

/*This Component is a copy of the News management, which is thoroughly commented on. */
function OpinionPublishing (props) {

    const [data, setData] = useState([]);
    const [selectState, setSelectState] = useState(false);
    const [selectedCredentials, setSelectedCredentials] = useState([]);
    const [updatedCredentials, setUpdatedCredentials] = useState([]);
    const [addCredentials, setAddCredentials] = useState([]);
    const [addResponse, setAddResponse] = useState([]);
    const [updateResponse, setUpdateResponse] = useState([]);

    const {divisionsOP, token, role} = props

    const refresh  =  useCallback( async() => {
        let jsonData;
        const data = {
            orgUnit: 'OP',
            divisionsOP: divisionsOP
        }

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('/get/credentials', config);
            jsonData = await response.json();
            setData(jsonData)
        } catch (error){
            console.log(`Could not fetch data related to Opinion Publishing and Divisions`);
            console.log(error);
        }
    },[divisionsOP, token]);

    useEffect(() =>{
        refresh();
    },[refresh]);

    const handleUsernameChange = (e) =>{
        let placeholder = updatedCredentials
        placeholder.username = e;
        setUpdatedCredentials(placeholder);
    }
    const handlePasswordChange = (e) =>{
        let placeholder = updatedCredentials
        placeholder.password = e;
        setUpdatedCredentials(placeholder);
    }
    const handleResourceChange = (e) =>{
        let placeholder = updatedCredentials
        placeholder.resource = e;
        setUpdatedCredentials(placeholder);
    }
    const handleSelect = (e) =>{
        /*https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/*/
        const ObjectClone = Object.assign({},e);
        setSelectedCredentials(e)
        setUpdatedCredentials(ObjectClone);
        setSelectState(true);
    }
    const handleUpdate = async () =>{
        let jsonData;
        let data = {
            credentialsToUpdate: selectedCredentials,
            updatedCredentials: updatedCredentials,
            orgUnit: 'OP',
        }
        const config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('/credentials/update', config);
            jsonData = await response.json();
            setUpdateResponse(jsonData)
            setSelectedCredentials([])
            setUpdatedCredentials([])
            setSelectState(false)
        } catch (error){
            console.log(`Could not update credentials`);
            console.log(error);
        }
        refresh();
    }

    const handleUsername = (e) =>{
        let placeholder = addCredentials;
        placeholder[0] = e
        setAddCredentials(placeholder);
    }
    const handlePassword = (e) =>{
        let placeholder = addCredentials;
        placeholder[1] = e
        setAddCredentials(placeholder);
        
    }
    const handleResource = (e) =>{
        let placeholder = addCredentials;
        placeholder[2] = e
        setAddCredentials(placeholder);
    }
    const handleDivision = (e) =>{
        let placeholder = addCredentials;
        placeholder[3] = e
        setAddCredentials(placeholder);
    }
    const  handleAdd = async () =>{
        let data = {
            username: addCredentials[0],
            password: addCredentials[1],
            resource: addCredentials[2],
            divName: addCredentials[3],
            orgUnit: 'OP'
        }
        const config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(data)
        }

        try{
            const response = await fetch('/credentials/add', config);
            let jsonData = await response.json();
            setAddResponse(jsonData.message)
            setAddCredentials(['','','','']);
        } catch (error){
            console.log(`Could not add credentials`);
            console.log(error);
        }
        refresh();
    }

        let divisions = [];
        if(data.length > 0){
            for(let i = 0; i < data.length; i++){
                divisions.push(data[i].divName);
            }
        }

        return (
            <div className="ou-container">
                <h2>Opinion Publishing</h2><br></br>
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
                    {role === 'admin' || role === 'manager' ?
                        <UpdateCredentials
                            handleUsernameChange={handleUsernameChange}
                            handlePasswordChange={handlePasswordChange}
                            handleResourceChange={handleResourceChange}
                            handleUpdate={handleUpdate}
                            updatedCredentials={updatedCredentials}
                            updateResponse={updateResponse}
                            selectState={selectState}
                            divisionsAccess={divisions}
                        /> : null
                    }
                </div>
                <h2><br></br>Credentials</h2><br></br>
                <div className="ou-wrapper">
                    {data.map((division, i) => (
                        <Division
                            key={i + 300}
                            divName={division.divName}
                            repoList={division.repoList}
                            handleSelect={handleSelect}
                        />
                    ))}
                </div>
            </div>
        );
}

export default OpinionPublishing;