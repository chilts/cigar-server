// ----------------------------------------------------------------------------

// npm
var level = require('level');
var log2 = require('log2');

// local
var cfg = require('./cfg.js');

// ----------------------------------------------------------------------------

var log = log2();

var db = level(cfg.main.store, { valueEncoding : 'json' });

// add these 'peers' to the database
var peers = Object.keys(cfg.peer);
console.log(peers);
peers.forEach(function(peerName) {
    log('Found peer ' + peerName);
    db.put('peer!' + peerName, cfg.peer[peerName], function(err) {
        if (err) {
            log.error('Error putting peer into DB : ', err);
        }
        log('Peer ' + peerName + ' put into DB : ' + JSON.stringify(cfg.peer[peerName]));
    });
});

// ----------------------------------------------------------------------------

module.exports = db;

// ----------------------------------------------------------------------------
