const mongoose = require("mongoose");

const divisionSchema = mongoose.Schema({

  /* NM, SR, HR, OP only one organization unit */
  orgUnit: {
    type: String,
    required: true,
    /* default: "SR" */
  },

  /* finances, IT, writing, development only one division*/
  divName: {
    type: String,
    required: true,
  /* default: "finances" */
  },

  /*[{resource: "www.kshbda.com", username: 'mike', password: '88888'},{resource: "www.aksjdn.com", username: 'admin', password: 'test12'}] */
  repoList: {
    type: Array,
    default:
      []
  }
});

module.exports = mongoose.model("divisions", divisionSchema);
