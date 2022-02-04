var express = require('express');
var router = express.Router();

// Test stress - https://github.com/jaredgorski/nodehog/blob/master/README.md
const NodeHog = require('nodehog');

// Is `health-check` and `ready-to-serve` Probe controls
let isHealthCheck = true;
let readToServeTime = new Date(Date.now());
let isReadyToServe = () => { 
    return readToServeTime < new Date(Date.now());
};


// Implement route: PUT /stress
router.put('/stress/lifespan/:lifespan/deathspan/:deathspan/iterations/:iterations', (req, res) => {
    console.log('PUT /stress')
    const type = 'cpu';
    const lifespan = req.params.lifespan * 1000; // in milliseconds
    const deathspan = req.params.deathspan * 1000;
    const iterations = req.params.iterations;
    new NodeHog(type, lifespan, deathspan, iterations).start();
    res.send("OK - PUT /stress");
});

// Implement route: GET /ready-to-serve
router.get('/ready-to-serve', (req, res) => {
    console.log('GET /ready-to-serve')
  
    if (isReadyToServe()) {
        res.statusCode = 200;
        return res.send('OK - GET /ready-to-serve');
    } else {
        res.statusCode = 500;
        return res.send('');
    }   
});

// Implement route: GET /health-check
router.get('/health-check', (req, res) => {
    console.log('GET /health-check')
   
    res.send("OK - GET /health-check");
});

// Implement route: PUT /unhealth
router.put('/unhealth', (req, res) => {
    console.log('PUT /unhealth')

    isHealthCheck = false;
    res.send("OK - PUT /unhealth");
});

// Implement route: PUT /unready-for
router.put('/unready-for/:seconds', (req, res) => {
    
    const dado = new Date(new Date(Date.now()).getTime() + (1000 * req.params.seconds));
    readToServeTime = dado;    
    res.send("OK - PUT /unready-for");
});

// Implement route: PUT /unready-for
var healthMiddlewares = function (req, res, next) {
    
    if (isHealthCheck) {
        next();
    } else {
        res.statusCode = 500;
        return res.send('');
    }   
};

// Configure routes
exports.routers = router;
exports.middlewares = { healthMiddleware: healthMiddlewares};
