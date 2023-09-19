const express = require("express");
const router = express.Router();

const DataGateway = require('../../components/data/DataGateway');
const gateway = new DataGateway();

// @route
// @desc
// @access  Public

router
    .route("/")
    .get(async (req, res) => {
        console.log("[DS] Fulfilling GET request")
        var items = await gateway.topics_readAll();
        console.log("[DS] Returning GET with %i items", items.length);
        return res.status(200).json(items);
    })
    .post(async (req, res, next) => {

        console.log("[DS] Fulfilling PUT new topic request: %s", req.body);
        res.json(await gateway.topics_Insert(req.body))
    })
    .delete(async (req,res,next) => {

        console.log("[DS] Fulfilling DELETE request")
        res.json(await gateway.topics_Delete(req.body))
    });

//For development, cleans the feeds associated with topics    
router
    .route("/clean")
    .get(async (req, res) => {
        var items = await gateway.topics_readAll();
        for (let i=0; i< items.length; i++) {
            items[i].feeds = [];
          }
        gateway.topics_Save(items);  
        res.json({"Status" : "Cleaned"});
    });

module.exports = router;

