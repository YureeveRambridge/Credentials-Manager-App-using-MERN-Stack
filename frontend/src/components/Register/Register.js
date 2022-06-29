import React from 'react';
import './registerStyles.css';

/* This component creates a new user. It takes the users username and password with the password needing to be
* confirmed twice. When the new user clicks on "register" their login is stored. If the user already exists the backend will let the new
* user know the username already exist, and can try again with a different username. 
* Any new user are defaulted to a normal user and will not have access to anything until the admin user assigns permissions. */
function Register (props) {

    const handleRegisterUsername = (e) =>{
        props.handleRegisterUsername(e.target.value);
    }
    const handleRegisterPassword = (e) =>{
        props.handleRegisterPassword(e.target.value);
    }
    const handleRegisterPasswordConfirmation = (e) =>{
        props.handleRegisterPasswordConfirmation(e.target.value);
    }

    const handleRegister = (e) =>{
        e.preventDefault();
        props.handleRegister()
    }

        const {registerUsername, registerPassword, registerPasswordConfirm, registerResponse} = props;
        return (
            <div className="login-container">
                <h1>Credentials Management</h1>
                <div className="login-wrapper">
                    <h1>Register</h1>
                    <form onSubmit={handleRegister} className="login-form">
                        <input value={registerUsername}
                               onChange={handleRegisterUsername}
                               placeholder="Enter a Username"
                               type='text'
                               minLength={2}
                               required
                               autoFocus
                        /> <br/>
                        <input value={registerPassword}
                               onChange={handleRegisterPassword}
                               placeholder="Enter a password"
                               type='password'
                               minLength={8}
                               required
                               autoFocus
                        /> <br/>
                        <input value={registerPasswordConfirm}
                               onChange={handleRegisterPasswordConfirmation}
                               placeholder="Confirm password"
                               type="password"
                               minLength={8}
                               required
                        /> <br/>
                        {registerPassword ===  registerPasswordConfirm ?
                            <button type='submit' className='button-style1'>Register</button>
                            :
                            <p>Passwords do not match</p>
                        }
                        <br/>
                        {registerResponse.length > 0 ? <p>{registerResponse}</p> : null}
                        <a href="/">Login</a>
                    </form>
                </div>
            </div>
        );
}

export default Register;