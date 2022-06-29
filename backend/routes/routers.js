const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users.controller");
const divisionControllers = require("../controllers/divisions.controller");
const credentialsControllers = require("../controllers/credentials.controller");

/* POST to add a new user. */
router.post("/user/register", usersControllers.newUser);

/* POST login details from frontend to check if credentials match on db if it matches we send back the token, username,
 * role */
router.post("/user/login", usersControllers.userLogin);

/*POST Admin. these are operations that occur by the admin, one gets the users to be able to change user permissions*/
router.get("/users/get", usersControllers.getUsers);

/*Patch from admin that is able to update permissions after changes*/
router.patch("/user/grant/permission", usersControllers.updatePermissions);

/*Divisions Controllers*/
/*POST all four below fetches data according to user permissions*/
router.post("/get/credentials", divisionControllers.getDivisionCredentials);

/*PATCH Adding Credentials and updating credentials*/
router.patch("/credentials/add", credentialsControllers.addCredentials);
router.patch("/credentials/update", credentialsControllers.updateCredentials);

module.exports = router;
