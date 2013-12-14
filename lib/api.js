// ----------------------------------------------------------------------------
//
// cigar-server.js
//
// Copyright 2013 Andrew Chilton. All Rights Reserved.
//
// License: MIT
//
// ----------------------------------------------------------------------------

// npm
var express = require('express');

// local
var cfg = require('./cfg.js');
var db = require('./db.js');
var log = require('./log.js');

// ----------------------------------------------------------------------------

var api = express();

api.use(express.json());

api.put('/stat', function(req, res) {
    var msg = req.query.name + ' - ' + JSON.stringify(req.body);
    log('Received: ' + msg);

    var key = 'stat!' + req.query.server + '!' + req.query.type + '!' + req.query.name + '!' + req.query.ts;
    db.put(key, req.body, function(err) {
        if (err) {
            console.error(err);
            return res.json({ ok : false, err : err });
        }
        log('Stored: ' + msg);
        res.json({ ok: true, msg : 'Stored' });
    });
});

function checkBasicAuth(req, res, next) {
    next();
}

// ----------------------------------------------------------------------------

module.exports = api;

// ----------------------------------------------------------------------------
