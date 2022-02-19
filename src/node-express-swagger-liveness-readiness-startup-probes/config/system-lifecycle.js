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
    const reqParamSeconds = req.params.seconds.replace('seconds:','')
    let seconds = 0
    if(!isNaN(reqParamSeconds)) {
        seconds = Number(reqParamSeconds)
    }
    let newDateTimeReadiness = new Date(new Date(Date.now()).getTime() + (1000 * seconds));
    readyToServeTime = newDateTimeReadiness; 
    res.send("OK - PUT /set-unready/:seconds - ".replace(":seconds",seconds) + os.hostname);
});

// Implement route: PUT /stress
router.put('/stress/:type/:lifespan/:deathspan/:iterations', (req, res) => {
    console.log('PUT /stress')
    const reqParamType = req.params.type
    const reqParamLifespan = req.params.lifespan
    const reqParamDeathspan = req.params.deathspan
    const reqParamIterations = req.params.deathspan
    if (reqParamType != 'cpu') {
        res.statusCode = 500;
        return res.send('ERROR - Invalid reqParamType value "$reqParamType". List of values allowed: ["cpu"].'.replace("$reqParamType",reqParamType));        
    }
    if (isNaN(reqParamLifespan)) {
        res.statusCode = 500;
        return res.send('ERROR - Invalid reqParamLifespan value "$reqParamLifespan". Not a numeric values.'.replace("$reqParamLifespan",reqParamLifespan));        
    }
    if (isNaN(reqParamDeathspan)) {
        res.statusCode = 500;
        return res.send('ERROR - Invalid reqParamDeathspan value "$reqParamDeathspan". Not a numeric values.'.replace("$reqParamDeathspan",reqParamDeathspan));        
    }
    if (isNaN(reqParamIterations)) {
        res.statusCode = 500;
        return res.send('ERROR - Invalid reqParamIterations value "$reqParamIterations". Not a numeric values.'.replace("$reqParamIterations",reqParamIterations));        
    }
    let type = 'cpu'
    let lifespan = Number(reqParamLifespan)
    let deathspan = Number(reqParamDeathspan)
    let iterations = Number(reqParamIterations)
    lifespan = req.params.lifespan;
    deathspan = req.params.deathspan;
    iterations = req.params.iterations;
    console.log({
        "NodeHog": {
            "type": type,
            "lifespan": lifespan,
            "deathspam": deathspan,
            "iterations": iterations
        }
    })
    new NodeHog(type, lifespan * 1000, deathspan * 1000, iterations).start();
    res.send("OK - /stress/:type/:lifespan/:deathspan/:iterations - ".replace(":type",type).replace(":lifespan",lifespan).replace(":deathspan",deathspan).replace(":iterations",iterations) + os.hostname);
});

// Configure routes
exports.routers = router;
