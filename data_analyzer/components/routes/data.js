const express = require("express");
const router = express.Router();

const DataGateway = require('../data/DataGateway');
const gateway = new DataGateway();

// @route
// @desc
// @access  Public
router.get("/", async (req, res) => {

  
  console.log("[DA] Fulfilling GET request")
  var items = await gateway.readAll();
  console.log("[DA] Returning GET with %i items", items.length);
  return res.status(200).json(items);

});


module.exports = router;
