const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

/* Function verifies a request token. If the token is not verified we return a message "Access Denied".
 * otherwise an object with role and a message is returned */
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return {
      username: decoded.username,
      role: decoded.role,
      message: "Access granted",
    };
  } catch (err) {
    return { message: "Access denied" };
  }
}

/* when a user logs in and the credentials are correct a token is generated using JWT sign with
 * the HS256 algorithm and then return the token with other related data of that user */
function createToken(
  username,
  role,
  orgUnits,
  divisionsNM,
  divisionsSR,
  divisionsHR,
  divisionsOP
) {
  let payload = {
    username: username,
    role: role,
    orgUnits: orgUnits,
    divisionsNM: divisionsNM,
    divisionsSR: divisionsSR,
    divisionsHR: divisionsHR,
    divisionsOP: divisionsOP,
  };
  const token = jwt.sign(JSON.stringify(payload), process.env.JWT_KEY, {
    algorithm: "HS256",
  });
  return {
    username: username,
    role: role,
    token: token,
    orgUnits: orgUnits,
    divisionsNM: divisionsNM,
    divisionsSR: divisionsSR,
    divisionsHR: divisionsHR,
    divisionsOP: divisionsOP,
  };
}

/* New user is a controller that creates a new user to have access to the app, when the user registers as a new user
 * the user will be a normal user, but will have access to nothing, as soon as the user is created the admin user
 * has to allocate the new users permissions */
exports.newUser = async (req, res) => {
  try {

    /* Checks if username is already taken
     * If so the message "User already exists" is returned */
    const existingUserTest = await User.findOne({
      username: req.body.username,
    });
    if (existingUserTest.username === req.body.username) {
      res.send({ message: `User already exists` });
    }
  } catch (error) {

    /* If in the try catch block tries to access an empty attribute/key value it would automatically throw
     * a catch in this case we know the user does not exist we then proceed to create the new username with password */
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });
      await user.save();
      res.send({ message: `Successfully Created User` });
    } catch (error) {
      res.send({ message: `Could not add new User: ${error}` });
    }
  }
};

/* User login controller checks if the user exists in the database and if the password matches. If it does we create a
 * token for the login and send user related data back else we respond with incorrect credentials*/
exports.userLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.findOne({ username: username, password: password });
    console.log(user.role);

    const role = user.role;
    const orgUnits = user.orgUnits;
    const divisionsNM = user.divisionsNM;
    const divisionsSR = user.divisionsSR;
    const divisionsHR = user.divisionsHR;
    const divisionsOP = user.divisionsOP;

    const data = createToken(
      username,
      role,
      orgUnits,
      divisionsNM,
      divisionsSR,
      divisionsHR,
      divisionsOP
    );
    res.send(data);
  } catch (error) {
    res.status(403).send({ message: `Login Credentials Incorrect` });
    console.log(error);
  }
};

/* The get users controller returns all users, so that the admin can change permissions. The token is checked first and
 * then we check if the user role inside the token is an admin.
 * If not the message "Access denied" is displayed, but if the user is admin we continue to fetch all users
 * and do not return the passwords or the other admin users data, only managers and normal users will be
 * returned as we don't want admin users to be lock out of the system*/
exports.getUsers = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decodedData = verifyToken(token);
    if (decodedData.role === "admin") {
      const allUsers = await User.find({ role: { $ne: "admin" } }).select(
        "-password"
      );
      res.send(allUsers);
    } else {
      res.send({ message: "Access denied" });
    }
  } catch (error) {
    res.send({ message: "Error fetching Users" });
  }
};

/* The update controller receives the user id and all the changed permissions from the front end, if the token is verified
 * we update the user by id with all the new permissions*/
exports.updatePermissions = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decodedData = verifyToken(token);

    const id = req.body.userID;
    const role = req.body.role;
    const stateNM = req.body.stateNM;
    const stateSR = req.body.stateSR;
    const stateHR = req.body.stateHR;
    const stateOP = req.body.stateOP;

    const orgUnits = [stateNM[0], stateSR[0], stateHR[0], stateOP[0]];
    const divisionsNM = [stateNM[1], stateNM[2], stateNM[3], stateNM[4]];
    const divisionsSR = [stateSR[1], stateSR[2], stateSR[3], stateSR[4]];
    const divisionsHR = [stateHR[1], stateHR[2], stateHR[3], stateHR[4]];
    const divisionsOP = [stateOP[1], stateOP[2], stateOP[3], stateOP[4]];

    if (decodedData.role === "admin") {
      await User.findByIdAndUpdate(
        { _id: id },
        {
          role: role,
          orgUnits: orgUnits,
          divisionsNM: divisionsNM,
          divisionsSR: divisionsSR,
          divisionsHR: divisionsHR,
          divisionsOP: divisionsOP,
        }
      );
      res.send({ message: "Permissions Updated" });
    } else {
      res.send({ message: "Access denied" });
    }
  } catch (error) {
    res.send({ message: "Error Updating User Permissions" });
  }
};
