const express = require("express");
const router = express.Router();


const DataGateway = require('../../components/data/DataGateway');
const gateway = new DataGateway();


const client = require("prom-client");
const counter1 = new client.Counter({
    name: "chris_counter1",
    help: "Any Arbitary value to help identify this counter",
});


// @route
// @desc
// @access  Public

router
    .route("/")
    .get(async (req, res, next) => {
        console.log("[DS] Fulfilling GET request")
        counter1.inc();
        var items = await gateway.topics_readAll();
        console.log("[DS] Returning GET with %i items", items.length);
        res.status(200).json(items);
        next();
    })
    .post(async (req, res, next) => {

        console.log("[DS] Fulfilling PUT new topic request: %s", req.body);
        res.json(await gateway.topics_Insert(req.body))
    })
    .delete(async (req, res, next) => {

        console.log("[DS] Fulfilling DELETE request")
        res.json(await gateway.topics_Delete(req.body))
    });

//For development, cleans the feeds associated with topics    
router
    .route("/clean")
    .get(async (req, res, next) => {
        var items = await gateway.topics_readAll();
        for (let i = 0; i < items.length; i++) {
            items[i].feeds = [];
        }
        gateway.topics_Save(items);
        res.json({ "Status": "Cleaned" });
    });

module.exports = router;

