#!/usr/bin/env node
// ----------------------------------------------------------------------------
//
// cigar-server
//
// * https://github.com/chilts/cigar-server
// * https://npmjs.org/package/cigar-server
//
// Copyright 2013 Andrew Chilton. All Rights Reserved.
//
// License: MIT
//
// ----------------------------------------------------------------------------

// core
var fs = require('fs');
var http = require('http');

// npm
var ini = require('ini');
var log = require('log2')();

// local
var cfg = require('./lib/cfg.js');
var web = require('./lib/web.js');
var api = require('./lib/api.js');

// ----------------------------------------------------------------------------
// server

var apiServer = http.createServer();
apiServer.on('request', api);

var apiPort = cfg.main.apiPort || 9124;
apiServer.listen(apiPort, function() {
    log('API Server listening on port ' + apiPort);
});

var webServer = http.createServer();
webServer.on('request', web);

var webPort = cfg.main.webport || 9125;
webServer.listen(webPort, function() {
    log('Web Server listening on port ' + webPort);
});

// ----------------------------------------------------------------------------
