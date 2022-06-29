const mongoose = require("mongoose");

/*role: "admin" or "manager" or "normal" only 3 roles default role is normal upon registering, a higher role can change
 * roles
 *
 * orgUnit : ["NM" , "SR" , "HR", "OP"] order does not matter just states where user belongs to, when registering has to
 * pick 1. later higher roles can add OUs and divisions if more than one
 *
 * divisions: ["development","writing","it","finances"] */

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "normal"
    // default: "admin"
    // default: "manager"
  },
  orgUnits: {
    type: Array,
    // default: ["NM","SR","HR", "OP"]
    default: []
  },
  divisionsNM: {
    type: Array,
    // default: ["development", "writing", "it", "finances"]
    default: []
  },
  divisionsSR: {
    type: Array,
    // default: ["development", "writing", "it", "finances"]
    default: []
  },
  divisionsHR: {
    type: Array,
    // default: ["development", "writing", "it", "finances"]
    default: []
  },
  divisionsOP: {
    type: Array,
    // default: ["development", "writing", "it", "finances"]
    default: []
  }
});

module.exports = mongoose.model("Users", userSchema);
