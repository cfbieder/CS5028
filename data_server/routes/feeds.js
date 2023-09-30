const express = require("express");
const router = express.Router();

const DataGateway = require('../../components/data/DataGateway');
const gateway = new DataGateway();


const metrics = require("./promClient");



router
  .route("/")
  .get(async (req, res) => {
    var responseTimeInMs = Date.now()
    metrics.counter
      .labels(req.method, req.route.path + 'feeds', res.statusCode)
      .inc();
    console.log("[DS] Fulfilling GET request")
    var items = await gateway.feeds_ReadAll();
    console.log("[DS] Returning GET with %i items", items.length);
    responseTimeInMs = responseTimeInMs - Date.now()
    res.status(200).json(items);
    metrics.histogram
      .labels(req.method, req.route.path + 'feeds', res.statusCode)
      .observe(responseTimeInMs)
  });

router
  .route("/selected/:ids")
  .get(async (req, res) => {
    console.log("[DS] Fulfilling GET request for selected feeds")
    var items = await gateway.feeds_ReadMany(JSON.parse(req.params.ids));
    console.log("[DS] Returning GET with %i items", items.length);
    return res.status(200).json(items);
  })

router
  .route("/collection")
  .delete(async (req, res, next) => {
    console.log("[DS] Fulfilling DELETE request")
    res.json(await gateway.feeds_ClearAll(req.body))
  });




module.exports = router;
