const express = require("express");
const router = express.Router();


const DataGateway = require('../../components/data/DataGateway');
const gateway = new DataGateway();


const metrics = require("./promClient");



// @route
// @desc
// @access  Public

router
    .route("/")
    .get(async (req, res, next) => {
        var responseTimeInMs = Date.now()
        console.log("[DS] Fulfilling GET request")
        metrics.counter
            .labels(req.method, req.route.path + 'topics', res.statusCode)
            .inc();
        var items = await gateway.topics_readAll();
        console.log("[DS] Returning GET with %i items", items.length);
        res.status(200).json(items);
        metrics.histogram
            .labels(req.method, req.route.path + 'topics', res.statusCode)
            .observe(responseTimeInMs)
        next();
    })
    .post(async (req, res, next) => {
        metrics.counter
            .labels(req.method, req.route.path + 'topics', res.statusCode)
            .inc();
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

