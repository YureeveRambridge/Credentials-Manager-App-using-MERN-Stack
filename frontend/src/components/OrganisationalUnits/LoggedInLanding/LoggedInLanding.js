import React from 'react';
import './loggedInLandingStyles.css';
import OrgUnit from "./OrgUnit/OrgUnit";

/* This component is the home page for all users. It renders
* all the permission a user has after the user log's in, if the user has no permission an admin user needs 
* to allocate permissions. 
*
* Information regarding navigation of the app is shown along with all the rest
* of the components. 
* The header renders the different Organization Units headings that the user can navigate to using 
* the ".map" method. 
*
* Inside each organization unit Component, if statements determine what divisions is to be allocated for that specific organization unit.
* Example: if the user has access to News Management(NM) and under News Management(NM) heading the user has access to "IT" and "Writing" divisions,
* the organization unit and the its divisions will be displayed in that order. */

function LoggedInLanding (props) {
        const {units, divisionsNM, divisionsHR, divisionsOP, divisionsSR} = props;
        return (
            <div className="landing-container">
                <div className="landing-information">
                    <p>
                        Navigate using the menu,
                        if you do not have access please contact admin.
                    </p>
                </div>
                <h2>Your access Organization and Division: </h2><br></br>
                <div className="landing-wrapper">
                    {units.map((unit, i) => (  
                        <OrgUnit
                            key={i}
                            unit={unit}
                            division={unit === 'NM' ? divisionsNM
                                    : unit === 'HR' ? divisionsHR
                                        : unit === 'OP' ? divisionsOP
                                            : unit === 'SR' ? divisionsSR : ['', '', '', '']
                            }
                        />
                    ))}
                </div>
            </div>
        );
}

export default LoggedInLanding;