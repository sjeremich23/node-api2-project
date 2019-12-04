const express = require("express");
const db = require("../data/db");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  // we are using the query string parameters
  // we can use limit to decide how many hibs to get from the database
});
module.exports = router;
