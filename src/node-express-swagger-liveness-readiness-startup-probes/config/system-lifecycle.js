var express = require('express');
var router = express.Router();
const os = require('os')

// Stress Test - https://github.com/jaredgorski/nodehog/blob/master/README.md
const NodeHog = require('nodehog');

// Is `health-check` Probe controls
let isHealthCheck = true;

// Is `ready-to-serve` Probe controls
let readyToServeTime = new Date(Date.now());
let isReadyToServe = () => { 
    return readyToServeTime < new Date(Date.now());
};

// Implement route: GET /health-check
router.get('/health-check', (req, res) => {
    console.log('GET /health-check')
    res.send("OK - GET /health-check - " + os.hostname);
});

// Implement route: GET /ready-to-serve
router.get('/ready-to-serve', (req, res) => {
    console.log('GET /ready-to-serve')  
    if (isReadyToServe()) {
        return res.send('OK - GET /ready-to-serve - ' + os.hostname);
    } else {
        res.statusCode = 500;
        return res.send('ERROR - statusCode 500');
    }   
});

// Implement route: GET /when-will-you-be-ready
router.get('/when-will-you-be-ready', (req, res) => {
    console.log('GET /when-will-you-be-ready')
    isHealthCheckTxt = isHealthCheck ? 'True' : 'False'
    isReadyToServeTxt = isReadyToServe() ? 'True' : 'False'
    responseTxt = ( 
        'OK - GET /when-will-you-be-ready - ' +
            '"isHealthCheck": <isHealthCheckTxt> - ' +
            '"is_ready_to_serve": <isReadyToServeTxt> - ' +
            '"current_timestamp": "<current_timestamp>" - ' +
            '"readness_timestamp": "<readness_timestamp>"'
    ).replace('<isReadyToServeTxt>',isReadyToServeTxt).replace('<isHealthCheckTxt>', isHealthCheckTxt).replace('<current_timestamp>',new Date()).replace('<readness_timestamp>',readyToServeTime)
    return res.send(responseTxt + ' - ' + os.hostname);
});

// Implement route: GET /get-delayed
router.get('/get-delayed', (req, res) => {
    console.log('GET /get-delayed')
    res.send("OK - GET /get-delayed - " + os.hostname);
});

// Implement route: PUT /set-unhealth
router.put('/set-unhealth', (req, res) => {
    console.log('PUT /set-unhealth')
    isHealthCheck = false;
    res.send("OK - PUT /set-unhealth - " + os.hostname);
});

// Implement route: PUT /set-health
router.put('/set-health', (req, res) => {
    console.log('PUT /set-health')
    isHealthCheck = true;
    res.send("OK - PUT /set-health - " + os.hostname);
});

// Implement route: PUT /set-unready
router.put('/set-unready/seconds:seconds', (req, res) => {
    console.log('PUT /set-unready/:seconds')
    const newDateTimeReadiness = new Date(new Date(Date.now()).getTime() + (1000 * req.params.seconds));
    readyToServeTime = newDateTimeReadiness;    
    res.send("OK - PUT /set-unready - " + os.hostname);
});

// Implement route: PUT /stress
router.put('/stress/lifespan/:lifespan/deathspan/:deathspan/iterations/:iterations', (req, res) => {
    console.log('PUT /stress')
    const type = 'cpu';
    const lifespan = req.params.lifespan * 1000; // in milliseconds
    const deathspan = req.params.deathspan * 1000;
    const iterations = req.params.iterations;
    new NodeHog(type, lifespan, deathspan, iterations).start();
    res.send("OK - PUT /stress - " + os.hostname);
});

// Implement route: healthMiddlewares
var healthMiddlewares = function (req, res, next) {
    console.log('healthMiddlewares()')
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
