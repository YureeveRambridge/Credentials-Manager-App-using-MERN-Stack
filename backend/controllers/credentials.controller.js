const Div = require("../models/division.model");
const jwt = require("jsonwebtoken");

/* Function verifies a request token. If the token is not verified we return a message "Access Denied".
 * otherwise an object with role and a message is returned */
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return { role: decoded.role, message: "Access granted" };
  } catch (err) {
    return { message: "Access denied" };
  }
}

/* Function checks for duplicate usernames to the same organization unit and division.
 * If username is taken user can use a different username */
async function checkDuplicates(orgUnit, divName, username) {
  const placeholder = await Div.find({ orgUnit: orgUnit, divName: divName });
  console.log("placeholder: " + placeholder);
  let list = placeholder[0].repoList;
  console.log("list: " + list);

  for (let i = 0; i < list.length; i++) {
    if (list[i].username === username) {
      return true;
    }
  }
  return false;
}

/* This controller adds credentials to the given organization unit and division after successful verification of token.
 * Duplicates or if the user already exists is checked and only then are the new credentials added.
 * New credentials are pushed to the end of the selected organization unit and divisions list */
exports.addCredentials = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    let verifyResponse = verifyToken(token);
    console.log(verifyResponse.message);
    if (verifyResponse.message === "Access denied") {
      res.send(verifyResponse);
    } else {
      const username = req.body.username;
      const password = req.body.password;
      const resource = req.body.resource;
      const orgUnit = req.body.orgUnit;
      const divName = req.body.divName;

      let duplicateState = await checkDuplicates(orgUnit, divName, username);

      if (duplicateState) {

        res.send({
          message: `Could not add Credentials to Database, Credentials already exist`,
        });
      } else {

        let constructCredential = {
          resource: resource,
          username: username,
          password: password,
        };

        const placeholder = await Div.find({
          orgUnit: orgUnit,
          divName: divName,
        });
        const credentialRepoID = placeholder[0]._id;
        const list = placeholder[0].repoList;
        list.push(constructCredential);

        await Div.findByIdAndUpdate(
          { _id: credentialRepoID },
          { repoList: list }
        );

        res.send({
          message: `Added new Credentials to ${divName.toUpperCase()}`,
        });
      }
    }
  } catch (error) {
    res.send({ message: `Could not add Credentials to Database` });
    console.log(error);
  }
};

/* Update credentials works similar to the add credentials but does not check for duplicates or if the user exists.
 * In the frontend a users credentials must be selected from the existing list before updating
 * Then credentials are found by ID and the list for that credential is updated.
 * For loop replaces the old data with the updated data */
exports.updateCredentials = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    let verifyResponse = verifyToken(token);

    if (verifyResponse.message === "Access denied") {
      res.send(verifyResponse);
    } else if (
      verifyResponse.role === "management" ||
      verifyResponse.role === "admin"
    ) {
      const credentialsToUpdate = req.body.credentialsToUpdate;
      const updatedCredentials = req.body.updatedCredentials;
      const divName = credentialsToUpdate.divName;
      const orgUnit = req.body.orgUnit;

      const placeholder = await Div.find({
        orgUnit: orgUnit,
        divName: divName,
      });
      const credentialRepoID = placeholder[0]._id;
      const list = placeholder[0].repoList;
      for (let i = 0; i < list.length; i++) {
        if (list[i].username === credentialsToUpdate.username) {
          list[i].resource = updatedCredentials.resource;
          list[i].username = updatedCredentials.username;
          list[i].password = updatedCredentials.password;
          break;
        }
      }
      await Div.findByIdAndUpdate(
        { _id: credentialRepoID },
        { repoList: list }
      );

      res.send({ message: `Updated Credentials in ${divName.toUpperCase()}` });
    } else {
      res.send({ message: "Access denied" });
    }
  } catch (error) {
    res.send({ message: `Could not Update Credentials in Database` });
  }
};
