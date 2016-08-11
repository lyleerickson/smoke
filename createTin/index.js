'use strict';

var mysql = require('mysql');
var https = require('https');
var dbf = require('./db_fxns');
var hf = require('./https_fxns.js');

exports.handler = (event, context, callback) => {

    var connection = dbf.getDBConnection();
    connection.connect(function(err) {

        dbf.handleDBError(err, callback);
        var httpsOptions = hf.getHTTPSOptions();
        https.get(httpsOptions, function(res) {
            var nextIDString = '';
            res.on('data', function (chunk) {
                nextIDString += chunk;
            });
            res.on('end', function() {
                var nextIDObj = JSON.parse(nextIDString);
                var nextID = nextIDObj.id;
                nextID.replace(/['"]+/g, '');
                var queryString = 'INSERT INTO tin (id, blend, tin_number, grams, package_date, acquire_date, '+
                    'open_date, finish_date, acquire_cost, note, last_update) '+
                    'VALUES ('+
                    connection.escape(nextID)+', '+
                    connection.escape(event.blend)+', '+
                    connection.escape(event.tin_number)+', '+
                    connection.escape(event.grams)+', '+
                    connection.escape(event.package_date)+', '+
                    connection.escape(event.acquire_date)+', '+
                    connection.escape(event.open_date)+', '+
                    connection.escape(event.finish_date)+', '+
                    connection.escape(event.acquire_cost)+', '+
                    connection.escape(event.note)+', '+
                    "'"+(new Date()).toISOString().substring(0, 10)+"'"+');';

                connection.query(queryString, function(err,rows,fields) {
                    dbf.handleDBError(err, callback);
                    connection.end(dbf.handleDBErrorAndCallback(err,callback,nextID));
                });
            });
        });
    });
}
