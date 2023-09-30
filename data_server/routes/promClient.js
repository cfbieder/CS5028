const client = require("prom-client");
//const collectDefaultMetrics = client.collectDefaultMetrics;

const histogram = new client.Histogram({
    name: 'app_histogram',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [5,20,40,60,80]  // buckets for response time from 0.1ms to 500ms
  })

  const counter = new client.Counter({
    name: "app_counter",
    help: "Number of times route is called",
    labelNames: ['method', 'route', 'code']
});



const metrics = {
    histogram,
    counter
}

//Collect Promethues Default metrics
//collectDefaultMetrics();

module.exports = metrics


/*
// Prom Client Metrics

// Type 1 : Counter
const counter = new client.Counter({
    name: "chris_counter",
    help: "Any Arbitary value to help identify this counter",
});

// Type 2 : Gauge
const gauge = new client.Gauge({
    name: "chris_gauge",
    help: "Any Arbitary value to help identify this gauge",
});

// Type 3 : Histogram
const histogram = new client.Histogram({
    name: "type_histogram",
    help: "Any Arbitary value to help identify this histogram",
});

// type 4 : Summaries
const summary = new client.Summary({
    name: "type_summary",
    help: "Any Arbitary value to help identify this summary",
});

*/