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

// npm
var xtend = require('xtend');
var argh = require('argh')();

// ----------------------------------------------------------------------------

var config = argh.config || '/etc/cigar/server.json';
console.log('config:', config);

var defaults = {
    port  : 9124,
    store : '/var/lib/cigar/server/store',
};

var main = xtend(
    {},
    defaults,
    JSON.parse(fs.readFileSync(config, 'utf8')),
    argh
);

var peer = main.peer;
delete main.peer;

// ----------------------------------------------------------------------------

module.exports = {
    main : main,
    peer : peer,
};

// ----------------------------------------------------------------------------
