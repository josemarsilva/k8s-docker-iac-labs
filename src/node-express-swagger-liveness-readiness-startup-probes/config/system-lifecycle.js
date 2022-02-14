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
    console.log('GET /health-check - ' + isHealthCheck)
    if (isHealthCheck) {
        res.send("OK - GET /health-check - " + os.hostname);
    } else {
        res.statusCode = 500;
        return res.send('');
    }
});

// Implement route: GET /ready-to-serve
router.get('/ready-to-serve', (req, res) => {
    console.log('GET /ready-to-serve')  
    if (isReadyToServe()) {
        return res.send('OK - GET /ready-to-serve - ' + os.hostname);
    } else {
        res.statusCode = 500;
        return res.send('');
    }   
});

// Implement route: GET /when-will-you-be-ready
router.get('/when-will-you-be-ready', (req, res) => {
    console.log('GET /when-will-you-be-ready')
    isHealthCheckTxt = isHealthCheck ? 'True' : 'False'
    isReadyToServeTxt = isReadyToServe() ? 'True' : 'False'
    let currentTimestamp = new Date(Date.now())
    let differenceTimestamp = readyToServeTime - currentTimestamp
    let waitAmount = 'null'
    if (differenceTimestamp > 0) {
        waitAmount = Math.trunc(differenceTimestamp / 1000) + ' secs'
        if (differenceTimestamp > 1000 * 60) {
            waitAmount = Math.trunc(differenceTimestamp / 1000 / 60) + ' mins'
            if (differenceTimestamp > 1000 * 60 * 60) {
                waitAmount = Math.trunc(differenceTimestamp / 1000 / 60) + ' hours'
            }    
        }
    }
    responseTxt = ( 
        'OK - GET /when-will-you-be-ready - ' +
            '"is_ready_to_serve": <isReadyToServeTxt> - ' +
            '"wait_amount": <waitAmount> - ' +
            '"is_health_check": <isHealthCheckTxt> - ' +
            '"current_timestamp": "<current_timestamp>" - ' +
            '"readness_timestamp": "<readness_timestamp>"'
    ).replace('<isReadyToServeTxt>',isReadyToServeTxt).replace('<isHealthCheckTxt>', isHealthCheckTxt).replace('<current_timestamp>',currentTimestamp).replace('<readness_timestamp>',readyToServeTime).replace('<waitAmount>', waitAmount)
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
router.put('/set-unready/:seconds', (req, res) => {
    console.log('PUT /set-unready/:seconds')
    let reqParamSeconds = req.params.seconds.replace('seconds:','')
    let seconds = 0
    if(!isNaN(reqParamSeconds)) {
        seconds = Number(reqParamSeconds)
    }
    let newDateTimeReadiness = new Date(new Date(Date.now()).getTime() + (1000 * seconds));
    readyToServeTime = newDateTimeReadiness; 
    res.send("OK - PUT /set-unready/:seconds - ".replace(":seconds",seconds) + os.hostname);
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

// Configure routes
exports.routers = router;
