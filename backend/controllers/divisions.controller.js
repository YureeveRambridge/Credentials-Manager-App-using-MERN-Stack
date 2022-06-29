const Div = require('../models/division.model');
const jwt = require('jsonwebtoken');

/* Function verifies a request token. If the token is not verified we return a message "Access Denied".
 * otherwise an object with role and a message is returned */
function verifyToken(token){
    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return {role: decoded.role, message: 'Access granted'};
    } catch (err) {
        return {message: 'Access denied'};
    }
}

/* Function fetches the credentials of an organization unit and division according to data given by frontend */
async function getDivisions(body, token){
    try {
        let verifyResponse = verifyToken(token);
        if(verifyResponse.message === 'Access denied'){
            return(verifyResponse);
        } else {
            const orgUnit = body.orgUnit;
            let divisions;

            if(orgUnit === 'NM'){
                divisions = body.divisionsNM;
            }
            if(orgUnit === 'SR'){
                divisions = body.divisionsSR;
            }
            if(orgUnit === 'HR'){
                divisions = body.divisionsHR;
            }
            if(orgUnit === 'OP'){
                divisions = body.divisionsOP;
            }

            let dataArray = [];
            let placeholder;
            for (let i = 0; i < divisions.length; i++) {
                placeholder = await Div.find({orgUnit: orgUnit, divName: divisions[i]});
                if(placeholder.length > 0){
                    dataArray.push(placeholder[0]);
                }
            }
            return(dataArray);
        }
    } catch (error) {
        return ({message: `Could not fetch Credentials`});
    }
}

/* Fetches data according to frontend request */
exports.getDivisionCredentials = async (req, res) => {
    const fetchedData = await getDivisions(req.body, req.headers['authorization']);
    res.send(fetchedData);
}
